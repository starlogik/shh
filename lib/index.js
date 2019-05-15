"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const writeln_1 = require("writeln");
const graceful_fs_1 = __importDefault(require("graceful-fs"));
const deasync_1 = __importDefault(require("deasync"));
const logger = new writeln_1.Writeln('secrets-manager');
const secretsManager = new aws_sdk_1.SecretsManager({ region: 'eu-west-1' });
const jsonRegex = /{".+":.+}/;
function decryptSync(filePath, pattern) {
    let config;
    (async function () {
        config = await decrypt(filePath, pattern);
    })();
    deasync_1.default.loopWhile(() => !config);
    return config;
}
exports.decryptSync = decryptSync;
async function decrypt(filePath, pattern = /^secret:(.+)$/) {
    const json = await getFile(filePath);
    const config = JSON.parse(json);
    await walkAndDecrypt(config, pattern);
    return config;
}
exports.decrypt = decrypt;
async function walkAndDecrypt(section, pattern) {
    for (const key in section) {
        const val = section[key];
        if (typeof (val) === 'string') {
            const match = val.match(pattern);
            if (match !== null) {
                const decryptedVal = await decryptSecret(match[1]);
                if (decryptedVal)
                    section[key] = decryptedVal;
            }
        }
        else {
            await walkAndDecrypt(val, pattern);
        }
    }
}
async function decryptSecret(SecretId) {
    try {
        const { SecretString, SecretBinary } = await secretsManager.getSecretValue({ SecretId }).promise();
        if (SecretString) {
            if (jsonRegex.test(SecretString)) {
                logger.debug(`Decrypted secret JSON "${SecretId}"`);
                return JSON.parse(SecretString);
            }
            else {
                logger.debug(`Decrypted secret string "${SecretId}"`);
                return SecretString;
            }
        }
        else if (SecretBinary) {
            logger.debug(`Decrypted secret binary "${SecretId}"`);
            const buffer = Buffer.from(SecretBinary.toString(), 'base64');
            return buffer.toString('ascii');
        }
        else {
            throw new Error(`Could not find value for "${SecretId}"`);
        }
    }
    catch (err) {
        logger.error(err.message, err);
    }
}
function getFile(filePath) {
    return new Promise(function (resolve, reject) {
        graceful_fs_1.default.readFile(filePath, 'ascii', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}
//# sourceMappingURL=index.js.map
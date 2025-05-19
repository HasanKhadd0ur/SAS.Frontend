import {Injectable} from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class CryptojsService {

    keySize: number;
    iterationCount: number;

    constructor() {
        this.keySize = 128 / 32;
        this.iterationCount = 1000;
    }

    private generateKey(salt: any, passPhrase: any) {
        return CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), {
            keySize: this.keySize,
            iterations: this.iterationCount,
        });
    }

    private _encrypt(salt: any, iv: any, passPhrase: any, plainText: any) {
        const key = this.generateKey(salt, passPhrase);
        const encrypted = CryptoJS.AES.encrypt(plainText, key, {
            iv: CryptoJS.enc.Hex.parse(iv),
        });
        return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    }

    private _decrypt(salt: any, iv: any, passPhrase: any, cipherText: any) {
        const key = this.generateKey(salt, passPhrase);
        const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(cipherText),
        });
        const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
            iv: CryptoJS.enc.Hex.parse(iv),
        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    encrypt(inputString: string) {
        const key = CryptoJS.lib.WordArray.random(256 / 8).toString(
            CryptoJS.enc.Hex
        );
        const iv = CryptoJS.lib.WordArray.random(128 / 8).toString(
            CryptoJS.enc.Hex
        );
        const salt = CryptoJS.lib.WordArray.random(128 / 8).toString(
            CryptoJS.enc.Hex
        );

        const ciphertext = this._encrypt(salt, iv, key, inputString);

        return btoa(`${key}|${iv}|${salt}|${ciphertext}`);
    }

    decrypt(encryptedString: string) {
        const decryptedString = atob(encryptedString);
        const parts = decryptedString.split("|");

        if (parts.length !== 4) {
            throw new Error("The encrypted string is not in the correct format.");
        }

        const key = parts[0];
        const iv = parts[1];
        const salt = parts[2];
        const cipherText = parts[3];

        return this._decrypt(salt, iv, key, cipherText);
    }

    private generateSalt(value: string): string {
        return CryptoJS.SHA256(value).toString(CryptoJS.enc.Hex).substring(0, 16);
    }

    encryptParam(value: number | string): string {
        if (value == null) {
            return null;
        }
        const uuid = uuidv4();
        const salt = this.generateSalt(uuid);
        const key = this.generateKey(uuid, salt);
        const encrypted = CryptoJS.AES.encrypt(value.toString(), key.toString()).toString();
        const encodedEncrypted = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encrypted));
        return `${uuid}|${encodedEncrypted}`;
    }

    private decryptParam(encrypted: string): string {
        const [uuid, encodedEncrypted] = encrypted.split('|');
        const salt = this.generateSalt(uuid);
        const key = this.generateKey(uuid, salt);
        const temp = CryptoJS.enc.Base64.parse(encodedEncrypted).toString(CryptoJS.enc.Utf8);
        const decrypted = CryptoJS.AES.decrypt(temp, key.toString());
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    decryptParamAsNumber(encrypted: string): number {
        if (encrypted == null || encrypted == '') {
            return null;
        }
        return Number(this.decryptParam(encrypted));
    }

    decryptParamAsString(encrypted: string): string {
        if (encrypted == null || encrypted == '') {
            return null;
        }
        return this.decryptParam(encrypted);
    }
}

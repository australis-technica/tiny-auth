export interface ICrypto {
    encrypt(text: string): string;
    decrypt(text: string):String
}
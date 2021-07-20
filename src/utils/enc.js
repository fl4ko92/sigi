import CryptoJS from 'crypto-js/crypto-js'

// Default KEY and iv using AES-128-CBC encryption mode, key 16 is required, key, and it may be the same iv
const KEY = CryptoJS.enc.Utf8.parse('123')
const IV = CryptoJS.enc.Utf8.parse('')

// AES encryption: a string key iv return base64
export function encrypt (word, keyStr, ivStr) {
    let key = KEY
    // key offset
    let iv = IV

    if (keyStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr)
        iv = CryptoJS.enc.Utf8.parse(ivStr)
    }

    const srcs = CryptoJS.enc.Utf8.parse(word)
    // ciphertext
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    })
    // console.log("-=-=-=-", encrypted.ciphertext)
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/**
   * AES decryption: string key iv return base64
 *
 */
export function decrypt (word, keyStr, ivStr) {
    let key = KEY
    let iv = IV

    if (keyStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr)
        iv = CryptoJS.enc.Utf8.parse(ivStr)
    }

    const base64 = CryptoJS.enc.Base64.parse(word)
    const src = CryptoJS.enc.Base64.stringify(base64)

    var decrypt = CryptoJS.AES.decrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    })

    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
    return decryptedStr.toString()
}

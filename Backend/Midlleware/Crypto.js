const crypto = require('crypto')
const secretKey = 'FaicalBahsiS'

const CryptPassword = (Password) =>{
    const hash = crypto.createHmac('sha256',secretKey)
    .update(Password)
    .digest('hex')

    return hash
}

module.exports = {CryptPassword}


// Hash-based => message authentication code (or HMAC) 
// is a cryptographic technique that combines public
//  keys, private keys, and a hash into a mix hackers
//   can't unpack. Use HMAC, and you'll tap into a 
//   method that can both encrypt data and check the 
//   integrity of information you get in return.
// Parameters: This method accept three parameters as mentioned avobe and described below:

// algorithm: It is dependent on the accessible algorithms which are favored by the version of OpenSSL on the platform. It returns string. The examples are sha256, sha512, etc.
// key: It is the HMAC key which is used to create the cryptographic HMAC hash. It returns string, Buffer, TypedArray, DataView, or KeyObject. And if it is a KeyObject, then its type must be secret.
// options: It is optional parameter and used to control stream behavior. It returns an object.
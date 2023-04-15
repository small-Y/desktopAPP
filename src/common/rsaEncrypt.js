import JSEncrypt from 'jsencrypt/bin/jsencrypt'

// 可以在这个网站生成私钥和公钥
// 密钥对生成 http://web.chacuo.net/netrsakeypair

// 这个网站生成的公钥，项目暂时使用这个公钥
const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2bqycr5EcM7l6b0aIP8X4PYTqvG5Q4lCq91dhMUVMfr/2qYAdH17nHZbfBLLs+Srpno3h0lXgiK/x/Msyehu7lU32Wk/StC3QPsK1UMM/YCBX3isLXMJw/PnMX45PkIpDZXHUvNQTe1g6s4uDKrdQ6JYgDq6icjH/FsWP/PUrdqyw9OYjzJIPfCYe6x8TqVhAaP5bYYVYVzlQBSA2KqUEhOlMn2TIRLaFy/AC5S+EeFAcFXonj4zJjooOIiPlMPJwanCMXJCfdU2thu5EBkayTa5v18qT6s1UENinYXWyMwBrWO/dDr8acAFNR5KAFpmOjvi4rJX05HyXTeujlLDKQIDAQAB'

// smpe框架中私钥也放在了前端，但是一般私钥不会放在前端
const privateKey = 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDZurJyvkRwzuXp'
+'vRog/xfg9hOq8blDiUKr3V2ExRUx+v/apgB0fXucdlt8Esuz5KumejeHSVeCIr/H'
+'8yzJ6G7uVTfZaT9K0LdA+wrVQwz9gIFfeKwtcwnD8+cxfjk+QikNlcdS81BN7WDq'
+'zi4Mqt1DoliAOrqJyMf8WxY/89St2rLD05iPMkg98Jh7rHxOpWEBo/lthhVhXOVA'
+'FIDYqpQSE6UyfZMhEtoXL8ALlL4R4UBwVeiePjMmOig4iI+Uw8nBqcIxckJ91Ta2'
+'G7kQGRrJNrm/XypPqzVQQ2KdhdbIzAGtY790OvxpwAU1HkoAWmY6O+LislfTkfJd'
+'N66OUsMpAgMBAAECggEAGScTRGQsneeY8eaxpQwzIv7qiL4CDAZIWHhrPFJUP4Di'
+'m8y/krWIWSvnJ684LyEEn2fREGTtohAHnb6+9thOMGRR3mDlOexgrzYRK0/iqUp2'
+'J6RWJ635e9SqabJORJ36BiK+cxu+tDHvF1EYSshWZWDU3oNqV06Fo+aV7G9rq2W4'
+'3wNfkX6XilppgtIY/I56tBGb71TfO7+Ro7QDoucSwydnmXuq1+nVP8di1rCVQ4Fv'
+'SV5ruIStEhJp/PyAceQjO0uouQ0665JjQTFFuaruZ/4SVjc9h5LPTsVz6W1HbbnG'
+'dDql81qCets10v7334MR4wMS+7FDx7iKL+Kkq6r9sQKBgQDxmfBvH+uWKgZRMp/+'
+'/bvnQO33KCC7bvE4TzcMefcN/hWBU897pRG/iJYslYW9v+cNIQQDokeTWBVHRbmY'
+'nq6zQaJpBoRcOja8EtxKGD5eblowLDmJRYkftA9pR/VbITW51vuBOCagXjYcpFjU'
+'n4kWZ+4gi7Y99Q++o4/9em+bnQKBgQDmtIwSt3ZFCC791cruosq7BxDUwq4zJGc7'
+'n5+h6053odVnTBc0vzxoGplaLdG7tc3g2JPlFnWkAbFe46TATkgKUA0p320JxlSj'
+'Bl7Qn3HG6ECUYqOo21L7fJiC7KKt70xKit1vBvGA9O2ZxhFoT182ZCQ8lSAHTmLC'
+'RHbQEusN/QKBgAzgfI0fsWnGgaGwRhDMK0ivED/dFqmGxzqOFkwG8CEBytmiwus/'
+'KAwCVqa3rXIomUL84H7lFlWHG1M6JyM4Se1p8SMR4tobjDFH/A/C7QgRb6MjqEll'
+'uGJFMZEV8cDSq09lYvBHMt/XRaEPLWDfw+m6zllTuPniZt1tUE5dSTeNAoGBANzs'
+'K+6IbOMyMP22Szw1+/kZjQ6Q1wv2Yj0AYHdHw75f5OGkRdym/IucXRm0ItGkCWC1'
+'RPrthP3m+Rkq2UumKuplOhXM9LeVitsKcKVK6kNViPIPezVpwY8+AzXssOPq8Z24'
+'WM/HUGDzKsxElcrTpxOI1gKFs0QL1hq+QSCD3T9pAoGBAJDovs+S8rqYVFPB86uK'
+'VGiApBKW3rqOylvsgvoKMwfYmTt1YwSEAHYAl93kHYHiEL9XzbJBQh3Pz+Dp11Pd'
+'x3TUl6RxEB9Z6wqPtajXVy9Tf6BN1og8pA6o/qGZeo+wTyitDHwpbLEHu9QlyYSw'
+'3XjzRrFQ/Yl6LLY2OH1YIVwH'

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  console.log(txt)
  return encryptor.encrypt(txt) // 对需要加密的数据进行加密
}

// 解密 -- 使用私钥解密，登录用不到
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey)
  return encryptor.decrypt(txt)
}
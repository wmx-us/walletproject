// 样式配置
export const styleConfig = {
  publicKey:
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC0nf3XQxOCL59bUEno36+d0PoGu82WDaeN6vYzlO5p5JOttGIuw0BLjXjJhpKrwU41tmYVygr+t3+y2GAgavEy2R+RSWCYgLEwpi8xjeV5ZfAWORYILF2YuZsG+276HapgQYxajzUlnHrO+En6LJ9sUglg9VTQNnawwKD6/cy8IQIDAQAB",
  style: {
    btnUrl: "https://minio.tianai.cloud/public/captcha-btn/btn3.png",
    bgUrl:
      "https://mp-42572008-0d04-49f4-87ad-4d39dccf92ab.cdn.bspapp.com/cloudstorage/tac-bg.png",
    logoUrl:
      "https://mp-42572008-0d04-49f4-87ad-4d39dccf92ab.cdn.bspapp.com/cloudstorage/tac-logo.png",
    moveTrackMaskBgColor: "#f7b645",
    moveTrackMaskBorderColor: "#ef9c0d",
  },
};

// 密码至少包含 数字和英文，长度6-20
export const reg: RegExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;

// 用户名 5~20 数字或者字母的正则
export const regUsename:RegExp = /^[a-zA-Z0-9]{5,20}$/;

export const rsaPublicKey: string =
  "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDvdFaV3m4sLmjbmWg46e/m2Yhu/wKRMZLUe8PrmXAzH8E18t8bdmmvntDSUoBnLmK4AJgJKmj78CVf18iIxQKeXInNst554OSJmktHdhf4K/0odLqTf4+bv0neHNXJN4GwB9XAUiw5azXLX7y+eeuXAN9VL9IpCFuQmlW+wZbnAwIDAQAB";
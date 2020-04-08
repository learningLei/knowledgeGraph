// created by leisiwen on 2020/4/8

// 工具函数

export function objToQueryString (object) {
  if (!object) {
    return ''
  }
  return '?' +
    Object.keys(object).map((key) =>
      encodeURIComponent(key) + '=' + encodeURIComponent(object[key])
    ).join('&')
}

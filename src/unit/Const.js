// created by leisiwen on 2020/4/8

// 封装fetch请求

import fetch from 'isomorphic-fetch'

export function executeFetch (...args) {
  return new Promise(async (resolve, reject) => {
    // eslint-disable-next-line one-var
    let response = {}, result = ''
    args[1].credentials = 'include'
    // console.log(args[1].credentials);
    try {
      response = await fetch(...args)
      result = await response.json()
    } catch (e) {
      reject(e)
    }
    response.status === 200 ? resolve(result) : reject(result)
  })
}

export const hostname = 'http://192.168.0.105:8080'

export const address = {
  graph: hostname
}

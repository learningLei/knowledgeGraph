// created by leisiwen on 2020/4/8

// 图谱数据接口

import { objToQueryString } from '../../tool'
import {executeFetch, hostname} from '../../Const'

export function AddGraph (info) {
  let url = `${hostname}/insertGraph${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function getAllEntitiesByCourse (info) {
  let url = `${hostname}/findAllEntitiesByCourse${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function getAllLinksByCourse (info) {
  let url = `${hostname}/findAllLinksByCourse${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

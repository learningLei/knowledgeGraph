// created by leisiwen on 2020/6/19

// 发布作业信息接口

import { objToQueryString } from '../../tool'
import {executeFetch, hostname} from '../../Const'

export function insertTpaper (info) {
  let url = `${hostname}/insertTpaper${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function getTaperByAccount (info) {
  let url = `${hostname}/findTaperByAccount${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',

    header: {
      'Content-Type': 'application/json'
    }
  })
}

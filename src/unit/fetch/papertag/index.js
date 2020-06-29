// created by leisiwen on 2020/6/16

// 作业标签信息数据接口

import { objToQueryString } from '../../tool'
import {executeFetch, hostname} from '../../Const'

export function insertPaperTag (info) {
  let url = `${hostname}/insertPaperTag${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function getPaperTagByCourseAndAccount (info) {
  let url = `${hostname}/findPaperTagByCourseAndAccount${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function getPaperTagByCourseAndPnumber (info) {
  let url = `${hostname}/findPaperTagByCourseAndPnumber${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

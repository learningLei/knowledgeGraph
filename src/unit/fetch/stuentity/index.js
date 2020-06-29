// created by leisiwen on 2020/4/20

// 学生节点数据接口

import { objToQueryString } from '../../tool'
import {executeFetch, hostname} from '../../Const'

export function findIsStuEntityExist (info) {
  let url = `${hostname}/findIsStuEntityExist${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function insertStuEntity (info) {
  let url = `${hostname}/insertStuEntity${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function updateStuEntityByAccountAndEntity (info) {
  let url = `${hostname}/updateStuEntityByAccountAndEntity${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function updateKfByAccountAndEntity (info) {
  let url = `${hostname}/updateKfByAccountAndEntity${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function getCountByAccountAndCourse (info) {
  let url = `${hostname}/findCountByAccountAndCourse${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function getAllStuEntityByAccountAndCourse (info) {
  let url = `${hostname}/findAllStuEntityByAccountAndCourse${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',

    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function getAllKfByAccountAndCourse (info) {
  let url = `${hostname}/findAllKfByAccountAndCourse${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',

    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function getLevelNumber (info) {
  let url = `${hostname}/findLevelNumber${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function getStuEntityByCourseAndEntity (info) {
  let url = `${hostname}/findStuEntityByCourseAndEntity${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',

    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function getStuEntityByCourseAndStudent (info) {
  let url = `${hostname}/findStuEntityByCourseAndStudent${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',

    header: {
      'Content-Type': 'application/json'
    }
  })
}

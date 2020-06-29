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

export function getEntitiesNumberByCourseExcept (info) {
  let url = `${hostname}/findEntitiesNumberByCourseExcept${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function getPptPageByNameAndCourse (info) {
  let url = `${hostname}/findPptPageByNameAndCourse${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function updateEntityById (info) {
  let url = `${hostname}/updateEntityById${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function deleteEntityById (info) {
  let url = `${hostname}/deleteEntityById${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function setPptPageByEntity (info) {
  let url = `${hostname}/setPptPageByEntity${objToQueryString(info)}`

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

export function updateLinkById (info) {
  let url = `${hostname}/updateLinkById${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

export function deleteLinkById (info) {
  let url = `${hostname}/deleteLinkById${objToQueryString(info)}`

  return executeFetch(url, {
    methods: 'Get',
    header: {
      'Content-Type': 'application/json'
    }
  })
}

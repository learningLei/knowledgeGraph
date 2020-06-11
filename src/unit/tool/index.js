// 引入VueRouter
import router from '../../router'
// import { getPptPageByCourseAndName } from '../fetch/graph'

// created by leisiwen on 2020/4/8

// 工具函数
var echarts = require('echarts')
// 示例化vueRouter，否则无法路由跳转

export function objToQueryString (object) {
  if (!object) {
    return ''
  }
  return '?' +
    Object.keys(object).map((key) =>
      encodeURIComponent(key) + '=' + encodeURIComponent(object[key])
    ).join('&')
}

// 时间格式转换函数
export function formatDate (format, timestamp) {
  let jsdate = ((timestamp) ? new Date(timestamp) : new Date())
  let date = {
    'M+': jsdate.getMonth() + 1,
    'd+': jsdate.getDate(),
    'h+': jsdate.getHours(),
    'm+': jsdate.getMinutes(),
    's+': jsdate.getSeconds(),
    'q+': Math.floor((jsdate.getMonth() + 3) / 3),
    'S+': jsdate.getMilliseconds()
  }

  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (jsdate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
    }
  }

  return format
}

// 计算两个时间相差天数
export function DateDiff (sDate1, sDate2) {
  var aDate, oDate1, oDate2, iDays
  aDate = sDate1.split('-')
  oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  aDate = sDate2.split('-')
  oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)
  return iDays
}

// 绘制学生知识点等级图
export function drawLevelBarChart (level, levelNumber) {
  var myChart = echarts.init(document.getElementById('levelBarChart'))
  var option = {
    title: {
      text: '知识点等级统计'
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
      }
    },
    legend: {
      data: [{
        name: '占所有知识点的百分比'
      }]
    },
    xAxis: {
      data: level,
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: 16
        }
      }
    },
    yAxis: {
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: 16
        }
      }
    },
    series: [{
      name: '占所有知识点的百分比',
      type: 'bar',
      data: levelNumber
    }]
  }
  myChart.setOption(option)
}

// 绘制知识点学习图
export function drawKnowledgeBarChart (knowledge, knowledgeNumber) {
  var myChart = echarts.init(document.getElementById('knowledgeBarChart'))
  var option = {
    title: {
      text: '知识点学习情况统计'
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true
        }
      }
    },
    legend: {
      data: [{
        name: '知识点学习总次数'
      }]
    },
    grid: {left: '2%', right: '2%', bottom: '10%', containLabel: true},
    xAxis: [{
      type: 'value',
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: 16
        }
      }
    }],
    yAxis: [{
      type: 'category',
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: 16
        }
      },
      data: knowledge
    }],
    series: [{
      name: '知识点学习总次数',
      type: 'bar',
      barWidth: '60%',
      data: knowledgeNumber
    }]
  }
  myChart.setOption(option)
}

// 绘制大纲图谱
export function drawOutlineChart (data, links, courseName) {
  let myChart = echarts.init(document.getElementById('courseOutlineGraph'))

  let option = {
    title: {
      text: ''

    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    label: {
      normal: {
        show: true,
        textStyle: {
          fontSize: 12
        }
      }
    },
    legend: {
      x: 'center',
      show: false,
      data: ['课程', '章']
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        focusNodeAdjacency: true,
        roam: true,
        categories: [{
          name: '课程',
          itemStyle: {
            normal: {
              color: '#' + Math.floor(Math.random() * 16777215).toString(16)
            }
          }
        }, {
          name: '章',
          itemStyle: {
            normal: {
              color: '#' + Math.floor(Math.random() * 16777215).toString(16)
            }
          }
        }],
        label: {
          normal: {
            show: true,
            textStyle: {
              // 实体字体大小
              fontSize: 18
            }
          }
        },
        force: {
          // 关系线长度
          repulsion: 1000,
          edgeLength: [150, 100],
          layoutAnimation: false
          // 因为力引导布局会在多次迭代后才会稳定, 这个参数决定是否显示布局的迭代动画
        },
        // 实体形状类型
        symbol: 'circle',
        symbolSize: 75,
        // 边类型
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [4, 15],
        edgeLabel: {
          normal: {
            show: true,
            textStyle: {
              // 关系字体大小
              fontSize: 16
            },
            formatter: '{c}'
          }
        },
        data: data,
        links: links,
        lineStyle: {
          normal: {
            opacity: 0.9,
            // 关系线粗细
            width: 1,
            curveness: 0
          }
        }
      }
    ]
  }
  myChart.setOption(option)
  myChart.on('click', {dataType: 'node'}, function (params) {
    // window.open('http://editor.minslab.info/service-player?title=' + params.name)
    var nodeName = params.name
    router.push({path: '/chapter', query: {course: courseName, chapter: nodeName}})
    // console.log(router.query.nodeName)
    // window.routerRefresh()
  })
}

// export function drawChapterChart (data, links) {
//   let myChart = echarts.init(document.getElementById('courseChapterGraph'))

//   let option = {
//     title: {
//       text: ''

//     },
//     tooltip: {},
//     animationDurationUpdate: 1500,
//     animationEasingUpdate: 'quinticInOut',
//     label: {
//       normal: {
//         show: true,
//         textStyle: {
//           fontSize: 12
//         }
//       }
//     },
//     legend: {
//       x: 'center',
//       show: false,
//       data: ['章', '节', '小节']
//     },
//     series: [
//       {
//         type: 'graph',
//         layout: 'force',
//         focusNodeAdjacency: true,
//         roam: true,
//         categories: [{
//           name: '章',
//           itemStyle: {
//             normal: {
//               color: '#' + Math.floor(Math.random() * 16777215).toString(16)
//             }
//           }
//         }, {
//           name: '节',
//           itemStyle: {
//             normal: {
//               color: '#' + Math.floor(Math.random() * 16777215).toString(16)
//             }
//           }
//         }, {
//           name: '小节',
//           itemStyle: {
//             normal: {
//               color: '#' + Math.floor(Math.random() * 16777215).toString(16)
//             }
//           }
//         }],
//         label: {
//           normal: {
//             show: true,
//             textStyle: {
//               // 实体字体大小
//               fontSize: 18
//             }
//           }
//         },
//         force: {
//           // 关系线长度
//           repulsion: 1000,
//           edgeLength: [150, 100],
//           layoutAnimation: false
//           // 因为力引导布局会在多次迭代后才会稳定, 这个参数决定是否显示布局的迭代动画
//         },
//         symbol: 'circle',
//         symbolSize: 75,
//         edgeSymbol: ['none', 'arrow'],
//         edgeSymbolSize: [4, 15],
//         edgeLabel: {
//           normal: {
//             show: true,
//             textStyle: {
//               // 关系字体大小
//               fontSize: 16
//             },
//             formatter: '{c}'
//           }
//         },
//         data: data,
//         links: links,
//         lineStyle: {
//           normal: {
//             opacity: 0.9,
//             // 关系线粗细
//             width: 1,
//             curveness: 0
//           }
//         }
//       }
//     ]
//   }
//   myChart.setOption(option)
//   myChart.on('click', {dataType: 'node'}, function (params) {
//     console.log(0)
//   })
// }

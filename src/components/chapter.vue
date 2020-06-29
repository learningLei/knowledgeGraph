<template>
  <div id="app">
    <div class="test">
      <div id="courseChapterGraph" class="chapter_graph"></div>
      <div>
        <iframe :src="pptPageSite" id="ppt" width="100%" height="1200px"></iframe>
        <!-- <iframe src="http://editor.minslab.info/service-player?title=%E5%86%B3%E7%AD%96%E6%A0%91#/12" width="100%" height="1200px"></iframe> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getAllEntitiesByCourse, getAllLinksByCourse, setPptPageByEntity } from '../unit/fetch/graph'
import { findIsStuEntityExist, insertStuEntity, updateStuEntityByAccountAndEntity, getCountByAccountAndCourse } from '../unit/fetch/stuentity'
import { formatDate } from '../unit/tool'

export default {
  name: 'chapter',
  data () {
    return {
      chapterName: this.$route.query.chapter,
      courseName: this.$route.query.course,
      entities: [],
      relationships: [],
      // ppt播放网页
      pptPageSite: '',
      // 传过来的ppt页数
      pptPage: this.$route.query.pptPage,
      // 实体节点和ppt页数对应
      enppts: new Map()
    }
  },
  mounted () {
    this.init()
    // 根据浏览器窗口动态调整宽高
    function changePptPageIframe () {
      const ppt = document.getElementById('ppt')
      const deviceWidth = document.body.clientWidth
      const deviceHeight = document.body.clientHeight
      ppt.style.width = (Number(deviceWidth)) + 'px' // 数字是页面布局宽度差值
      ppt.style.height = (Number(deviceHeight)) + 'px' // 数字是页面布局高度差
    }

    changePptPageIframe()

    window.onresize = function () {
      changePptPageIframe()
    }
  },
  methods: {
    async init () {
      this.pptPageSite = 'http://editor.minslab.info/service-player?title=' + this.chapterName + '#/'
      if (this.pptPage !== 0 && this.pptPage != null && this.pptPage !== undefined) {
        this.pptPageSite = 'http://editor.minslab.info/service-player?title=' + this.chapterName + '#/' + this.pptPage
      }
      document.getElementById('ppt').src = this.pptPageSite
      // 获取实体数据
      try {
        this.entities = []
        const info = await getAllEntitiesByCourse({
          course: this.courseName,
          mapName: this.chapterName + '章节知识图谱'
        })
        for (var i = 0; i < [...info.data].length; i++) {
          var entity = {
            name: [...info.data][i].name,
            category: [...info.data][i].category,
            draggable: 'true'
          }
          this.entities.push(entity)
          this.enppts.set([...info.data][i].name, [...info.data][i].pptPage)
        }
      } catch (e) {
        console.log(e.message)
      }
      await setPptPageByEntity({
        course: this.courseName,
        mapName: this.chapterName + '章节知识图谱',
        name: this.chapterName
      })
      // 获取关系数据
      try {
        this.relationships = []
        const info = await getAllLinksByCourse({
          course: this.courseName,
          mapName: this.chapterName + '章节知识图谱'
        })
        for (var j = 0; j < [...info.data].length; j++) {
          var relationship = {
            source: [...info.data][j].source,
            target: [...info.data][j].target,
            value: [...info.data][j].relationship
          }
          this.relationships.push(relationship)
        }
      } catch (e) {
        console.log(e.message)
      }
      this.drawChapterChart(this.entities, this.relationships)
      document.getElementById('ppt').src = document.getElementById('ppt').src
    },
    async updateStuEntity (nodeName) {
      const info = await findIsStuEntityExist({
        stuAccount: 'S00001',
        entityName: nodeName,
        course: this.courseName
      })
      var time = formatDate('yyyy-MM-dd', new Date())
      if (info.data === 0) {
        await insertStuEntity({
          stuAccount: 'S00001',
          stuName: '张三',
          entityName: nodeName,
          course: this.courseName,
          count: 1,
          recentDate: time,
          chapter: this.chapterName + '章节知识图谱'
        })
      } else {
        const info = await getCountByAccountAndCourse({
          stuAccount: 'S00001',
          entityName: nodeName,
          course: this.courseName
        })
        var count = info.data
        await updateStuEntityByAccountAndEntity({
          stuAccount: 'S00001',
          stuName: '张三',
          entityName: nodeName,
          course: this.courseName,
          count: count + 1,
          recentDate: time
        })
      }
    },
    drawChapterChart (data, links) {
      let that = this
      var echarts = require('echarts')
      let myChart = echarts.init(document.getElementById('courseChapterGraph'))

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
          data: ['章', '节', '小节']
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            focusNodeAdjacency: true,
            roam: true,
            categories: [{
              name: '章',
              itemStyle: {
                normal: {
                  color: '#' + Math.floor(Math.random() * 16777215).toString(16)
                }
              }
            }, {
              name: '节',
              itemStyle: {
                normal: {
                  color: '#' + Math.floor(Math.random() * 16777215).toString(16)
                }
              }
            }, {
              name: '小节',
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
            symbol: 'circle',
            symbolSize: 75,
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
        var nodeName = params.name
        that.updateStuEntity(nodeName)
        that.pptPageSite = 'http://editor.minslab.info/service-player?title=' + that.chapterName + '#/' + that.enppts.get(nodeName)
        document.getElementById('ppt').src = that.pptPageSite
      })
    }
    // refreshFrame () {
    //   document.getElementById('ppt').src = document.getElementById('ppt').src
    // }
  }
}
</script>

<style scoped>
.chapter_graph {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div id="courseOutlineGraph" class="graph_container">
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { getAllEntitiesByCourse, getAllLinksByCourse } from '../unit/fetch/graph'

export default {
  name: 'course',
  data () {
    return {
      entities: [],
      links: []
    }
  },
  mounted () {
    this.init()
    this.drawChart(this.entities, this.links)
  },
  methods: {
    async init () {
      this.initGraphEntities()
      // console.log(this.entities)
      this.initGraphLinks()
      // console.log(this.links)
    },
    async initGraphEntities () {
      try {
        this.entities = []
        const info = await getAllEntitiesByCourse({
          course: '机器学习',
          mapName: '机器学习大纲知识图谱'
        })
        // console.log(info)
        info.data.map((item, index) => {
          var entity = {
            name: item.name,
            category: item.category,
            draggable: 'true'
          }
          this.entities.push(entity)
        })
      } catch (e) {
        console.log(e.message)
      }
    },
    async initGraphLinks () {
      try {
        this.links = []
        const info = await getAllLinksByCourse({
          course: '机器学习',
          mapName: '机器学习大纲知识图谱'
        })
        info.data.map((item, index) => {
          var link = {
            source: item.source,
            target: item.target,
            value: item.relationship
          }
          this.links.push(link)
        })
      } catch (e) {
        console.log(e.message)
      }
    },
    drawChart (entities, links) {
      // console.log(entities)
      // console.log(links)
      let myChart = this.$echarts.init(document.getElementById('courseOutlineGraph'))
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
                  color: '#009800'
                }
              }
            }, {
              name: '章',
              itemStyle: {
                normal: {
                  color: '#4592FF'
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
              // 因为力引导布局会在多次迭代后才会稳定, 这个参数决定是否显示布局的迭代动画(节点数量过多, 图在迭代的过程中会旋转),
              // 在浏览器端节点数据较多(>100)的时候不建议关闭, 布局过程会造成浏览器假死
            },
            edgeSymbolSize: [4, 50],
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
            data: entities,
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
    }
  }

}
</script>

<style scoped>
.graph_container {
  width: 1600px;
  height: 900px;
  margin: 0 auto;
}
</style>

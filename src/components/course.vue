<template>
<div id="app">
  <div id="courseOutlineGraph" class="graph_container">
  </div>
  <!-- <div v-for="(item, index) in entities" :key="index">
    <p>{{item.name}}</p>
  </div> -->
</div>
</template>

<script>
import { getAllEntitiesByCourse, getAllLinksByCourse } from '../unit/fetch/graph'

export default {
  name: 'course',
  data () {
    return {
      entities: [],
      relationships: []
    }
  },
  created: function () {
    console.log(0)
    this.init()
  },
  mounted () {
    console.log(1)
    this.drawChart()
  },
  methods: {
    async init () {
      console.log(2)
      this.initGraphEntities()
      this.initGraphLinks()
    },
    async initGraphEntities () {
      console.log(3)
      try {
        this.entities = []
        const info = await getAllEntitiesByCourse({
          course: '机器学习',
          mapName: '机器学习大纲知识图谱'
        })
        for (var i = 0; i < [...info.data].length; i++) {
          var entity = {
            name: [...info.data][i].name,
            category: [...info.data][i].category,
            draggable: 'true'
          }
          this.entities.push(entity)
        }
        // console.log(this.entities)
      } catch (e) {
        console.log(e.message)
      }
    },
    async initGraphLinks () {
      console.log(4)
      try {
        this.relationships = []
        const info = await getAllLinksByCourse({
          course: '机器学习',
          mapName: '机器学习大纲知识图谱'
        })
        for (var i = 0; i < [...info.data].length; i++) {
          var relationship = {
            source: [...info.data][i].source,
            target: [...info.data][i].target,
            value: [...info.data][i].relationship
          }
          this.relationships.push(relationship)
        }
        console.log(this.relationships)
      } catch (e) {
        console.log(e.message)
      }
    },
    drawChart () {
      console.log(5)
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
            data: this.entities,
            links: this.relationships,
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
      // console.log(option.series.type)
      // console.log(option.series.links)
      // }
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

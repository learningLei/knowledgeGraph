<template>
    <div id="app">
        <div id="main" class="graph_body"></div>
    </div>
</template>

<script>
export default {
  name: 'graph',
  methods: {
    drawChart () {
      let myChart = this.$echarts.init(document.getElementById('main'))
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
        // 颜色图标
        // legend: {
        //   x: 'center',
        //   show: false,
        //   data: ['课程', '章', '节', '小节']
        // },
        // 数据
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbolsize: 45,
            focusNodeAdjacency: true,
            roam: true,
            // 实体类别
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
            data: [{
              name: '机器学习',
              category: '课程',
              draggable: 'true'
            }, {
              name: '绪论',
              category: 1,
              draggable: 'true'
            }, {
              name: '决策树',
              category: 1,
              draggable: 'true'
            }, {
              name: '模型评估',
              category: 1,
              draggable: 'true'
            }, {
              name: '贝叶斯模型',
              category: 1,
              draggable: 'true'
            }, {
              name: '回归模型',
              category: 1,
              draggable: 'true'
            }, {
              name: '神经网络',
              category: 1,
              draggable: 'true'
            }, {
              name: '支持向量机',
              category: 1,
              draggable: 'true'
            }, {
              name: '集成学习',
              category: 1,
              draggable: 'true'
            }, {
              name: '聚类',
              category: 1,
              draggable: 'true'
            }],
            links: [{
              source: 0,
              target: 1,
              value: '包含'
            }, {
              source: 0,
              target: 2,
              value: '包含'
            }, {
              source: 0,
              target: 3,
              value: '包含'
            }, {
              source: 0,
              target: 4,
              value: '包含'
            }, {
              source: 0,
              target: 5,
              value: '包含'
            }, {
              source: 0,
              target: 6,
              value: '包含'
            }, {
              source: 0,
              target: 7,
              value: '包含'
            }, {
              source: 0,
              target: 8,
              value: '包含'
            }, {
              source: 0,
              target: 9,
              value: '包含'
            }],
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
  },
  mounted () {
    this.drawChart()
  }
}
</script>

<style scoped>
.graph_body {
    width: 1600px;
    height: 900px;
    margin: 0 auto;
}
</style>>

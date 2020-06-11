<template>
<div id="app">
  <div id="courseOutlineGraph" class="outline_graph">
  </div>
</div>
</template>

<script>
import { getAllEntitiesByCourse, getAllLinksByCourse } from '../unit/fetch/graph'
import { drawOutlineChart } from '../unit/tool'

export default {
  name: 'course',
  data () {
    return {
      courseName: '机器学习',
      entities: [],
      relationships: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      // this.initGraphEntities()
      // this.initGraphLinks()
      // 获取实体数据
      try {
        this.entities = []
        const info = await getAllEntitiesByCourse({
          course: this.courseName,
          mapName: this.courseName + '大纲知识图谱'
        })
        for (var i = 0; i < [...info.data].length; i++) {
          var entity = {
            name: [...info.data][i].name,
            category: [...info.data][i].category,
            draggable: 'true'
          }
          this.entities.push(entity)
        }
      } catch (e) {
        console.log(e.message)
      }
      // 获取关系数据
      try {
        this.relationships = []
        const info = await getAllLinksByCourse({
          course: this.courseName,
          mapName: this.courseName + '大纲知识图谱'
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
      // 关系图可视化
      drawOutlineChart(this.entities, this.relationships, this.courseName)
    }
    // async initGraphEntities () {
    //   try {
    //     this.entities = []
    //     const info = await getAllEntitiesByCourse({
    //       course: '机器学习',
    //       mapName: '机器学习大纲知识图谱'
    //     })
    //     for (var i = 0; i < [...info.data].length; i++) {
    //       var entity = {
    //         name: [...info.data][i].name,
    //         category: [...info.data][i].category,
    //         draggable: 'true'
    //       }
    //       this.entities.push(entity)
    //     }
    //     this.drawChart(this.entities, this.relationships)
    //     // console.log(this.entities)
    //   } catch (e) {
    //     console.log(e.message)
    //   }
    // },
    // async initGraphLinks () {
    //   // console.log(4)
    //   try {
    //     this.relationships = []
    //     const info = await getAllLinksByCourse({
    //       course: '机器学习',
    //       mapName: '机器学习大纲知识图谱'
    //     })
    //     for (var i = 0; i < [...info.data].length; i++) {
    //       var relationship = {
    //         source: [...info.data][i].source,
    //         target: [...info.data][i].target,
    //         value: [...info.data][i].relationship
    //       }
    //       this.relationships.push(relationship)
    //     }
    //     this.drawChart(this.entities, this.relationships)
    //     // console.log(this.relationships)
    //   } catch (e) {
    //     console.log(e.message)
    //   }
    // },
  }

}
</script>

<style scoped>
.outline_graph {
  width: 1600px;
  height: 900px;
}
</style>

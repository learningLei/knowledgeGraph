<template>
  <div class="level-container">
    <el-row style="margin-bottom: 50px">
      <el-col :offset="5" :span="1"><p style="font-size: 18px">课程：</p></el-col>
      <el-col :span="2" >
        <el-select placeholder="选择课程" v-model="course" >
          <el-option v-for="item in courseList" :key="item.id" :label="item.course" :value="item.course"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button @click="showKnowledgeLevel">确定</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="5" :span="6">
        <el-table :data="stuEntityInfos" stripe border style="width:361px; margin-top: 100px">
          <el-table-column prop="entityName" label="知识点" width="180"></el-table-column>
          <el-table-column prop="level" label="掌握级别" width="180"></el-table-column>
          <!-- <el-table-column prop="recentDate" label="最近一次学习时间" width="180"></el-table-column> -->
        </el-table>
        <el-button @click="updateLevel" style="margin-top: 20px">更新</el-button>
      </el-col>
      <el-col :offset="1" :span="12">
        <div id="levelBarChart" style="width: 800px; height: 600px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getEntitiesNumberByCourseExcept } from '../unit/fetch/graph'
import { getAllStuEntityByAccountAndCourse, getCountByAccountAndCourse, updateStuEntityByAccountAndEntity, getLevelNumber } from '../unit/fetch/stuentity'
import { formatDate, DateDiff, drawLevelBarChart } from '../unit/tool'

export default {
  name: 'student',
  data () {
    return {
      stuEntityInfos: [],
      courseList: [{
        id: 0,
        course: '机器学习'
      }, {
        id: 1,
        course: '数据结构'
      }],
      course: '',
      entitiesNum: 0,
      level: ['青铜', '白银', '黄金', '铂金', '钻石', '星耀', '王者'],
      levelNumber: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
    },
    async showKnowledgeLevel () {
      this.stuEntityInfos = []
      const info = await getAllStuEntityByAccountAndCourse({
        stuAccount: 'S00001',
        course: this.course
      })
      this.stuEntityInfos = [...info.data]
      const info1 = await getEntitiesNumberByCourseExcept({
        course: this.course,
        mapName: this.course + '大纲知识图谱'
      })
      this.entitiesNum = info1.data
      this.levelNumber = []
      for (var i = 0; i < this.level.length; i++) {
        const info = await getLevelNumber({
          stuAccount: 'S00001',
          course: this.course,
          level: this.level[i]
        })
        if (this.entitiesNum !== 0) {
          this.levelNumber.push((info.data / this.entitiesNum).toFixed(2) * 100)
        }
      }
      drawLevelBarChart(this.level, this.levelNumber)
    },
    // async initLevelData () {
    //   for (var i = 0; i < this.level.length; i++) {
    //     const info = await getLevelNumber({
    //       stuAccount: 'S00001',
    //       course: '机器学习',
    //       level: this.level[i]
    //     })
    //     this.levelNumber.push(info.data)
    //   }
    //   drawLevelBarChart(this.level, this.levelNumber)
    // },
    async updateLevel () {
      for (var i = 0; i < this.stuEntityInfos.length; i++) {
        const info = await getCountByAccountAndCourse({
          stuAccount: 'S00001',
          entityName: this.stuEntityInfos[i].entityName,
          course: '机器学习'
        })
        var count = info.data
        var levelDrop = parseInt(DateDiff(formatDate('yyyy-MM-dd', new Date()), this.stuEntityInfos[i].recentDate) / 7)
        await updateStuEntityByAccountAndEntity({
          stuAccount: 'S00001',
          stuName: '张三',
          entityName: this.stuEntityInfos[i].entityName,
          course: '机器学习',
          count: count - levelDrop,
          recentDate: formatDate('yyyy-MM-dd', new Date())
        })
      }
      drawLevelBarChart(this.level, this.levelNumber)
      this.init()
    }
  }
}
</script>

<style scoped>
.level-container {
  /* width: 360px;
  height: 600px; */
  margin: 0 auto;
}
</style>

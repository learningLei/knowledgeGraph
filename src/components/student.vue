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
      <el-col :offset="4" :span="7">
        <el-table :data="stuKfInfos" stripe border style="width:721px; margin-top: 80px">
          <el-table-column prop="entityName" label="知识点" width="180"></el-table-column>
          <el-table-column prop="kf" label="熟悉程度值" width="180"></el-table-column>
          <el-table-column prop="level" label="掌握级别" width="180"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="toStudyKnowledge(scope.row)">去学习</el-button>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="recentDate" label="最近一次学习时间" width="180"></el-table-column> -->
        </el-table>
        <!-- <el-button @click="updateLevel" style="margin-top: 20px">更新</el-button> -->
      </el-col>
      <el-col :offset="1" :span="12">
        <div id="levelBarChart" style="width: 800px; height: 600px;"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import router from '../router'
import { getEntitiesNumberByCourseExcept, setPptPageByEntity, getPptPageByNameAndCourse } from '../unit/fetch/graph'
// eslint-disable-next-line no-unused-vars
import { getAllKfByAccountAndCourse, getAllStuEntityByAccountAndCourse, getCountByAccountAndCourse, updateStuEntityByAccountAndEntity, updateKfByAccountAndEntity, getLevelNumber } from '../unit/fetch/stuentity'
import { getPaperTagByCourseAndAccount } from '../unit/fetch/papertag'
// eslint-disable-next-line no-unused-vars
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
      levelNumber: [],
      ratioSum: 0,
      stuKfInfos: [],
      dataInterval: 5 * 60 * 1000, // 定时刷新时间5min
      updateInterval: null // 定时器标识，清除用
    }
  },
  mounted () {
    this.init()
    const self = this
    this.updateInterval = setInterval(function () {
      self.showKnowledgeLevel()
    }, self.dataInterval)
  },
  beforeDestroy () {
    clearInterval(this.updateInterval)
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
      // 更新学习次数count值
      for (var i = 0; i < this.stuEntityInfos.length; i++) {
        const info = await getCountByAccountAndCourse({
          stuAccount: 'S00001',
          entityName: this.stuEntityInfos[i].entityName,
          course: this.course
        })
        var count = info.data
        var levelDrop = parseInt(DateDiff(formatDate('yyyy-MM-dd', new Date()), this.stuEntityInfos[i].recentDate) / 7)
        await updateStuEntityByAccountAndEntity({
          stuAccount: 'S00001',
          stuName: '张三',
          entityName: this.stuEntityInfos[i].entityName,
          course: this.course,
          count: count - levelDrop,
          recentDate: formatDate('yyyy-MM-dd', new Date())
        })
      }
      // 更新KF值
      for (var j = 0; j < this.stuEntityInfos.length; j++) {
        const info = await getCountByAccountAndCourse({
          stuAccount: 'S00001',
          entityName: this.stuEntityInfos[j].entityName,
          course: this.course
        })
        const count = info.data
        const info2 = await getPaperTagByCourseAndAccount({
          course: this.course,
          tag: this.stuEntityInfos[j].entityName,
          account: 'S00001',
          name: '张三'
        })
        this.ratioSum = info2.data
        var num = this.ratioSum * 7 + Math.round(count * 10000 / 24) * 3
        var kf = Math.ceil(num / 100)
        await updateKfByAccountAndEntity({
          stuAccount: 'S00001',
          stuName: '张三',
          entityName: this.stuEntityInfos[j].entityName,
          course: this.course,
          kf: kf
        })
      }

      // 获取知识熟悉度数据
      this.stuKfInfos = []
      const info2 = await getAllKfByAccountAndCourse({
        stuAccount: 'S00001',
        course: this.course
      })
      this.stuKfInfos = [...info2.data]

      // 图示学习百分比
      const info1 = await getEntitiesNumberByCourseExcept({
        course: this.course,
        mapName: this.course + '大纲知识图谱'
      })
      this.entitiesNum = info1.data
      this.levelNumber = []
      for (var k = 0; k < this.level.length; k++) {
        const info = await getLevelNumber({
          stuAccount: 'S00001',
          course: this.course,
          level: this.level[k]
        })
        if (this.entitiesNum !== 0) {
          this.levelNumber.push((info.data / this.entitiesNum).toFixed(2))
        }
      }
      drawLevelBarChart(this.level, this.levelNumber)
    },
    async toStudyKnowledge (row) {
      await setPptPageByEntity({
        course: row.course,
        mapName: row.chapter + '章节知识图谱',
        name: row.chapter
      })
      const info = await getPptPageByNameAndCourse({
        course: row.course,
        name: row.entityName,
        mapName: row.chapter + '章节知识图谱'
      })
      var pptPage = info.data
      router.push({path: '/chapter', query: {course: row.course, chapter: row.chapter, pptPage: pptPage}})
    }
    // async updateLevel () {
    //   this.stuEntityInfos = []
    //   const info = await getAllStuEntityByAccountAndCourse({
    //     stuAccount: 'S00001',
    //     course: this.course
    //   })
    //   this.stuEntityInfos = [...info.data]
    //   // 更新学习次数count值
    //   for (var i = 0; i < this.stuEntityInfos.length; i++) {
    //     const info = await getCountByAccountAndCourse({
    //       stuAccount: 'S00001',
    //       entityName: this.stuEntityInfos[i].entityName,
    //       course: this.course
    //     })
    //     var count = info.data
    //     var levelDrop = parseInt(DateDiff(formatDate('yyyy-MM-dd', new Date()), this.stuEntityInfos[i].recentDate) / 7)
    //     await updateStuEntityByAccountAndEntity({
    //       stuAccount: 'S00001',
    //       stuName: '张三',
    //       entityName: this.stuEntityInfos[i].entityName,
    //       course: this.course,
    //       count: count - levelDrop,
    //       recentDate: formatDate('yyyy-MM-dd', new Date())
    //     })
    //   }
    //   this.showKnowledgeLevel()
    // }
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

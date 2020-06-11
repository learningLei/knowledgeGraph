<template>
  <div class="container">
    <el-tabs type="border-card" tab-position="left" @tab-click="handleClick">
      <el-tab-pane label="图谱管理">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="图谱创建" name="first"></el-tab-pane>
          <el-tab-pane label="图谱编辑" name="second">
            <div style="margin-top: 50px">
              <el-switch style="display: block" v-model="value1" active-color="#13ce66" inactive-color="#ff4949" active-text="编辑/删除知识图谱数据" inactive-text="新增知识图谱数据"></el-switch>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div style="margin-top: 30px">
        <el-row>
          <el-col :offset="3" :span="1"><p style="font-size: 18px">课程：</p></el-col>
          <el-col :span="2" >
            <el-select placeholder="选择课程" v-model="course" >
              <el-option v-for="item in courseList" :key="item.id" :label="item.course" :value="item.course"></el-option>
            </el-select>
          </el-col>
          <el-col :offset="1" :span="2"><p style="font-size: 18px">图谱类型：</p></el-col>
          <el-col :span="2">
            <el-select placeholder="选择图谱类型" v-model="mapType" >
              <el-option v-for="item in mapTypeList" :key="item.id" :label="item.mapType" :value="item.mapType"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2" :offset="1">
            <el-button v-if="!showChapterChoose" @click="getChapterData">确定</el-button>
          </el-col>
          <el-col :offset="1" :span="1"><p v-if="showChapterChoose && mapType == '章节知识图谱'" style="font-size: 18px">章节：</p></el-col>
          <el-col :span="2">
            <el-select v-if="showChapterChoose && mapType == '章节知识图谱'" placeholder="选择章节" v-model="chapter" >
              <el-option v-for="item in chapterList" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-col>
          <el-col :span="4" :offset="1">
            <el-button v-if="showChapterChoose"  @click="getEntitiesAndLinks">确定</el-button>
            <el-button v-if="showChapterChoose && mapType == '章节知识图谱'" @click="backToChoose">上一步</el-button>
          </el-col>
        </el-row>
        </div>
        <div v-if="value1 && activeName == 'second'" style="margin-top: 40px">
          <el-row>
            <el-col :span="8" :offset="2">
              <el-table :data="entities" style="width: 100%" border>
                <el-table-column prop="name" label="节点名称" width="200">
                  <template slot-scope="scope">
                    <span v-if="!showEntityEdit[scope.$index]">{{scope.row.name}}</span>
                    <el-input v-if="showEntityEdit[scope.$index]" placeholder="输入节点名称" v-model="name" clearable></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="category" label="类别" width="200">
                  <template slot-scope="scope">
                    <span v-if="!showEntityEdit[scope.$index]">{{scope.row.category}}</span>
                    <el-input v-if="showEntityEdit[scope.$index]" placeholder="输入类别名称" v-model="category" clearable></el-input>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" v-if="!showEntityEdit[scope.$index]"  @click="editEntityConfirm(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" v-if="!showEntityEdit[scope.$index]" @click="deleteEntity(scope.row.id)">删除</el-button>
                    <el-button size="mini" v-if="showEntityEdit[scope.$index]" @click="updateEntity(scope.$index, scope.row)">确定</el-button>
                    <el-button size="mini" v-if="showEntityEdit[scope.$index]" @click="editEntityReturn(scope.$index)">取消</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="12" :offset="2">
              <el-table :data="links"  style="width: 100%"  border>
                <el-table-column prop="source" label="源节点" width="200">
                  <template slot-scope="scope">
                    <span v-if="!showLinkEdit[scope.$index]">{{scope.row.source}}</span>
                    <el-input v-if="showLinkEdit[scope.$index]" placeholder="输入源节点名称" v-model="source" clearable></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="relationship" label="关系" width="200">
                  <template slot-scope="scope">
                    <span v-if="!showLinkEdit[scope.$index]">{{scope.row.relationship}}</span>
                    <el-input v-if="showLinkEdit[scope.$index]" placeholder="输入关系名称" v-model="relationship" clearable></el-input>
                  </template>
                </el-table-column>
                <el-table-column prop="target" label="目标节点" width="200">
                  <template slot-scope="scope">
                    <span v-if="!showLinkEdit[scope.$index]">{{scope.row.target}}</span>
                    <el-input v-if="showLinkEdit[scope.$index]" placeholder="输入目标节点名称" v-model="target" clearable></el-input>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" v-if="!showLinkEdit[scope.$index]" @click="editLinkConfirm(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" v-if="!showLinkEdit[scope.$index]" @click="deleteLink(scope.row.id)">删除</el-button>
                    <el-button size="mini" v-if="showLinkEdit[scope.$index]" @click="updateLink(scope.$index, scope.row)">确定</el-button>
                    <el-button size="mini" v-if="showLinkEdit[scope.$index]" @click="editLinkReturn(scope.$index)">取消</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>

      <el-tab-pane label="学习情况查看">
        <el-tabs v-model="activeName2" @tab-click="handleClick">
          <el-tab-pane label="学生学习情况" name="third">
            <el-row style="margin-top: 30px">
              <el-col :offset="3" :span="1"><p style="font-size: 18px">课程：</p></el-col>
                <el-col :span="2">
                  <el-select placeholder="选择课程" v-model="scourse" >
                    <el-option v-for="item in courseList" :key="item.id" :label="item.course" :value="item.course"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="2" :offset="1">
                  <el-button @click="showStudentStudies">确定</el-button>
                </el-col>
            </el-row>
            <el-row>
              <el-table :data="stuStudies" style="width: 541px; margin: 30px 0px 0px 180px;" border :default-sort="{prop: 'count', order: 'descending'}">
                <el-table-column prop="account" label="学生账号" width="180"></el-table-column>
                <el-table-column prop="name" label="学生姓名" width="180"></el-table-column>
                <el-table-column prop="count" sortable label="学习次数" width="180"></el-table-column>
              </el-table>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="知识点学习统计" name="fourth">
            <el-row style="margin-top: 30px">
              <el-col :offset="3" :span="1"><p style="font-size: 18px">课程：</p></el-col>
              <el-col :span="2">
                <el-select placeholder="选择课程" v-model="scourse" >
                  <el-option v-for="item in courseList" :key="item.id" :label="item.course" :value="item.course"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2" :offset="1">
                <el-button v-if="!showChapterChoose2" @click="chooseChapter">确定</el-button>
              </el-col>
              <el-col :offset="1" :span="1"><p v-if="showChapterChoose2" style="font-size: 18px">章节：</p></el-col>
              <el-col :span="2">
                <el-select v-if="showChapterChoose2" placeholder="选择章节" v-model="chapter" >
                  <el-option v-for="item in chapterList" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </el-col>
              <el-col :span="2">
                <el-button v-if="showChapterChoose2" @click="showKnowledgeData">查看</el-button>
              </el-col>
              <el-col :span="2">
                <el-button v-if="showChapterChoose2" @click="backToChoose">上一步</el-button>
              </el-col>
            </el-row>
            <div id="knowledgeBarChart" style="width: 800px ; height: 600px; margin: 60px auto;"></div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getAllEntitiesByCourse, getAllLinksByCourse, updateEntityById, deleteEntityById, updateLinkById, deleteLinkById } from '../unit/fetch/graph'
import { getStuEntityByCourseAndEntity, getStuEntityByCourseAndStudent } from '../unit/fetch/stuentity'
import { drawKnowledgeBarChart } from '../unit/tool'

export default {
  name: 'teacher',
  data () {
    return {
      courseList: [{
        id: 0,
        course: '机器学习'
      }, {
        id: 1,
        course: '数据结构'
      }],
      mapTypeList: [{
        id: 0,
        mapType: '大纲知识图谱'
      }, {
        id: 1,
        mapType: '章节知识图谱'
      }],
      activeName: 'first',
      activeName2: 'third',
      value1: true,
      chapterList: [],
      course: '',
      mapType: '',
      showChapterChoose: false,
      chapter: '',
      entities: [],
      links: [],
      showEntityEdit: [],
      name: '',
      category: '',
      showLinkEdit: [],
      source: '',
      relationship: '',
      target: '',
      scourse: '',
      showChapterChoose2: false,
      knowledges: [],
      knowledgeNumbers: [],
      studentList: [],
      stuStudies: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
    },
    handleClick () {
      this.course = ''
      this.mapType = ''
      this.chapter = ''
      this.scourse = ''
      this.entities = []
      this.links = []
      this.knowledges = []
      this.knowledgeNumbers = []
      drawKnowledgeBarChart()
    },
    async getChapterData () {
      if (this.mapType === '大纲知识图谱') {
        // console.log(this.activeName)
        if (this.activeName === 'second') {
          this.getEntitiesAndLinks()
        } else {
          window.open('http://graph.minslab.info/service/redirect.html?username=leisiwen&password=leisiwen&redirect=/maps/construct.html?mapname=' + this.course + this.mapType)
        }
      } else if (this.mapType === '章节知识图谱') {
        this.chapterList = []
        const info = await getAllEntitiesByCourse({
          course: this.course,
          mapName: this.course + '大纲知识图谱'
        })
        this.chapterList = [...info.data]
        this.showChapterChoose = true
      } else {
        alert('error!')
      }
    },
    backToChoose () {
      this.showChapterChoose = false
      this.chapter = ''
      this.showChapterChoose2 = false
      this.chapterList = []
      this.knowledges = []
      this.knowledgeNumbers = []
      drawKnowledgeBarChart()
    },
    async getEntitiesAndLinks () {
      if (this.activeName === 'first') {
        window.open('http://graph.minslab.info/service/redirect.html?username=leisiwen&password=leisiwen&redirect=/maps/construct.html?mapname=' + this.chapter + this.mapType)
      }
      if (this.value1 === false && this.activeName === 'second') {
        if (this.mapType === '大纲知识图谱') {
          window.open('http://graph.minslab.info/service/redirect.html?username=leisiwen&password=leisiwen&redirect=/maps/structure.html?mapname=' + this.course + this.mapType + '%26username=leisiwen')
        } else {
          window.open('http://graph.minslab.info/service/redirect.html?username=leisiwen&password=leisiwen&redirect=/maps/structure.html?mapname=' + this.chapter + this.mapType + '%26username=leisiwen')
        }
      } else if (this.value1 === true && this.activeName === 'second') {
        if (this.mapType === '大纲知识图谱') {
          this.entities = []
          const info1 = await getAllEntitiesByCourse({
            course: this.course,
            mapName: this.course + this.mapType
          })
          this.entities = [...info1.data]
          for (var i = 0; i < this.entities.length; i++) {
            this.showEntityEdit.push(false)
          }
          this.links = []
          const info2 = await getAllLinksByCourse({
            course: this.course,
            mapName: this.course + this.mapType
          })
          this.links = [...info2.data]
          for (var j = 0; j < this.links.length; j++) {
            this.showLinkEdit.push(false)
          }
        } else {
          this.entities = []
          const info1 = await getAllEntitiesByCourse({
            course: this.course,
            mapName: this.chapter + this.mapType
          })
          this.entities = [...info1.data]
          for (var m = 0; m < this.entities.length; m++) {
            this.showEntityEdit.push(false)
          }
          this.links = []
          const info2 = await getAllLinksByCourse({
            course: this.course,
            mapName: this.chapter + this.mapType
          })
          this.links = [...info2.data]
          for (var n = 0; n < this.links.length; n++) {
            this.showLinkEdit.push(false)
          }
        }
      }
    },
    async chooseChapter () {
      this.chapterList = []
      const info = await getAllEntitiesByCourse({
        course: this.scourse,
        mapName: this.scourse + '大纲知识图谱'
      })
      this.chapterList = [...info.data]
      this.showChapterChoose2 = true
    },
    async showKnowledgeData () {
      this.knowledges = []
      const info1 = await getAllEntitiesByCourse({
        course: this.scourse,
        mapName: this.chapter + '章节知识图谱'
      })
      const data = [...info1.data]
      for (var i = 0; i < data.length; i++) {
        this.knowledges.push(data[i].name)
      }
      this.knowledgeNumbers = []
      for (var j = 0; j < this.knowledges.length; j++) {
        const info2 = await getStuEntityByCourseAndEntity({
          course: this.scourse,
          entityName: this.knowledges[j]
        })
        this.knowledgeNumbers.push(info2.data)
      }
      drawKnowledgeBarChart(this.knowledges, this.knowledgeNumbers)
    },
    async showStudentStudies () {
      this.studentList = [{
        account: 'S00002',
        name: '王二'
      },
      {
        account: 'S00001',
        name: '张三'
      }]
      for (var i = 0; i < this.studentList.length; i++) {
        const info = await getStuEntityByCourseAndStudent({
          course: this.scourse,
          stuAccount: this.studentList[i].account,
          stuName: this.studentList[i].name
        })
        var stuStudy = {
          account: this.studentList[i].account,
          name: this.studentList[i].name,
          count: info.data
        }
        this.stuStudies.push(stuStudy)
      }
    },
    editEntityConfirm (index, row) {
      this.name = row.name
      this.category = row.category
      this.showEntityEdit[index] = true
      this.getEntitiesAndLinks()
    },
    editEntityReturn (index) {
      this.showEntityEdit[index] = false
      this.getEntitiesAndLinks()
    },
    editLinkConfirm (index, row) {
      this.source = row.source
      this.relationship = row.relationship
      this.target = row.target
      this.showLinkEdit[index] = true
      this.getEntitiesAndLinks()
    },
    editLinkReturn (index) {
      this.showLinkEdit[index] = false
      this.getEntitiesAndLinks()
    },
    async updateEntity (index, row) {
      await updateEntityById({
        id: row.id,
        name: this.name,
        category: this.category
      })
      this.showEntityEdit[index] = false
      this.getEntitiesAndLinks()
    },
    async updateLink (index, row) {
      await updateLinkById({
        id: row.id,
        source: this.source,
        relationship: this.relationship,
        target: this.target
      })
      this.showLinkEdit[index] = false
      this.getEntitiesAndLinks()
    },
    async deleteEntity (index) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEntityById({id: index})
        this.$message({
          type: 'success',
          message: '删除成功！'
        })
        this.getEntitiesAndLinks()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async deleteLink (index) {
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteLinkById({id: index})
        this.$message({
          type: 'success',
          message: '删除成功！'
        })
        this.getEntitiesAndLinks()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 80%;
  margin: 0 auto;
}
</style>

import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// const Echarts = () => import('@components/Echarts')
// import Echarts from '@/components/Echarts'
// import graph from '@/components/graphExample'
import course from '@/components/course'
import chapter from '@/components/chapter'
import student from '@/components/student'
import teacher from '@/components/teacher'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'course',
      component: course
    },
    {
      path: '/chapter',
      name: 'chapter',
      component: chapter
    },
    {
      path: '/student',
      name: 'student',
      component: student
    },
    {
      path: '/teacher',
      name: 'teacher',
      component: teacher
    }
  ]
})

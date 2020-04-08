import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// const Echarts = () => import('@components/Echarts')
// import Echarts from '@/components/Echarts'
// import graph from '@/components/graphExample'
import course from '@/components/course'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'course',
      component: course
    }
  ]
})

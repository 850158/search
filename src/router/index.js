import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
// import Home from '@/components/Home'
import Admin from '@/components/Admin'
import Detail from '@/components/Detail'
import Personal from '@/components/Personal'
import RebackPassword from '@/components/RebackPassword'
// import Admintwo from '@/components/Admintwo'
import HomeThree from '@/components/HomeThree'
import Choice from '@/components/Choice'
import announce from '@/components/Announce'
import personalInfo from '@/components/personalInfo'
import header from '@/components/header'
import headerTwo from '@/components/headerTwo'
import PersonalUpdate from '@/components/PersonalUpdate'
import Findbackpws from '@/components/Findbackpws'
import Modal from '@/components/Modal'
import HomeFour from '@/components/HomeFour'
import HomeFive from '@/components/HomeFive'
import PersonalUpdateTwo from '@/components/PersonalUpdateTwo'
import personalInfoTwo from '@/components/personalInfoTwo'
import recommend from '@/components/Recommend'
Vue.use(Router)

export default new Router({
  
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      name:'admin',
      path: '/admin/',
      meta: {requireAuth: true,},
      component: Admin 
    },
    {
      path: '/detail/',
      component: Detail 
    },
    {
      name:'personal',
      path: '/personal',
      meta: {requireAuth: true,},
      component: Personal
    },
    {
      name:'rebackPassword',
      path:'/rebackPassword/',
      component: RebackPassword
    },
    //  {
    //   path:'/admintwo/',
    //   component: Admintwo
    // },
    {
      name:'homeThree',
      path:'/homeThree',
      meta: {requireAuth: true, },// 添加该字段，表示进入这个路由是需要登录的
      component:HomeThree
    },

    {
      name:'choice',
      path:'/choice',
      meta: {requireAuth: true,},
      component:Choice
    },

    {
      name:'announce',
      path:'/Announce',
      meta: {requireAuth: true,},
      component:announce
    },
    {
      name:'personalInfo',
      path:'/PersonalInfo',
      meta: {requireAuth: true,},
      component:personalInfo
    },
    {
      name:"personalUpdate",
      path: '/personalUpdate/',
      meta: {requireAuth: true,},
      component: PersonalUpdate
    },
    ,
    {
      name:"findbackpws",
      path: '/findbackpws/',
      meta: {requireAuth: true,},
      component: Findbackpws
    },
    {
      name:'header',
      path:'/header',
      component:header
    },
    {
      name:'modal',
      path:'/modal',
      component:Modal
    },
     {
      name:'homeFour',
      path:'/homeFour',
      component:HomeFour
    },
    {
      name:'homeFive',
      path:'/homeFive',
      component:HomeFive
    },
    {
      name:"PersonalUpdateTwo",
      path: '/PersonalUpdateTwo/',
      meta: {requireAuth: true,},
      component: PersonalUpdateTwo
    },
    {
      name:'personalInfoTwo',
      path:'/personalInfoTwo',
      meta: {requireAuth: true,},
      component:personalInfoTwo
    },
    {
      name:'headerTwo',
      path:'/headerTwo',
      component:headerTwo
    },
    {
      name:'recommend',
      path:'/recommend',
      component:recommend
    },
  ]
})



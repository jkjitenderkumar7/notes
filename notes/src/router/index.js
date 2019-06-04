import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Note from '@/components/Note'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/view/:id',
      name: 'view',
      component: Note
    },
    {
      path: '/add',
      name: 'add',
      component: Note
    }
  ]
})

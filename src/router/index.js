import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    
  },
  {
    path: '/storage',
    name: 'Storage',
    component: () => import('../views/Storage.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/fastqc',
    name: 'Fastqc',
    component: () => import('../views/Fastqc.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/bbduk',
    name: 'BBduk',
    component: () => import('../views/Bbduk.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/fastq-screen',
    name: 'FastqScreen',
    component: () => import('../views/Fastq-screen.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/unicycler',
    name: 'Unicycler',
    component: () => import('../views/Unicycler.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/masurca',
    name: 'Masurca',
    component: () => import('../views/Masurca.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/platanus',
    name: 'Platanus',
    component: () => import('../views/Platanus.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/quast',
    name: 'Quast',
    component: () => import('../views/Quast.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/busco',
    name: 'Busco',
    component: () => import('../views/Busco.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/blast',
    name: 'Blast',
    component: () => import('../views/Blast.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/dfast',
    name: 'Dfast',
    component: () => import('../views/Dfast.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/prokka',
    name: 'Prokka',
    component: () => import('../views/Prokka.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/augustus',
    name: 'Augustus',
    component: () => import('../views/Augustus.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/eggnog',
    name: 'eggNOG',
    component: () => import('../views/Eggnog.vue'),
    meta: {
      user: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  const rutasProtegida = to.matched.some(record => record.meta.user);
  
  if(rutasProtegida){
      //console.log(`rutas protegida: ${rutasProtegida}`)
    if(Store.state.user && Store.state.user.role === 'ADMIN'){
      next()
    }else{
      console.log("El usuario no ha iniciado session")
      next({ name:'Home' })
    } 
  }else{
    next()
  }
})

export default router

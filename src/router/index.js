import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/earn',
    name: 'Earn',
    component: () => import('../views/Earn'),
  },
  {
    path: '/supply/:address',
    name: 'Supply',
    component: () => import('../views/SupplyOrBorrow/SupplyOrWithdraw'),
  },
  {
    path: '/withdraw/:address',
    name: 'Withdraw',
    component: () => import('../views/SupplyOrBorrow/SupplyOrWithdraw'),
  },
  {
    path: '/open',
    name: 'OpenPositions',
    component: () => import('../views/Leverage/Open')
  },
  {
    path: '/add',
    name: 'AddPositions',
    component: () => import('../views/Leverage/Open')
  },
  {
    path: '/remove',
    name: 'RemovePositions',
    component: () => import('../views/Leverage/Remove')
  },
  {
    path: '/info',
    name: 'PersonInfo',
    component: () => import('../views/UserPositions')
  },
  {
    path: '/tvl',
    name: 'PoolTVL',
    component: () => import('../views/PoolTVL')
  },
  {
    path: '/positions',
    name: 'Positions',
    component: () => import('../views/Positions')
  },
  {
    path: '/liquidate/:lpaddress',
    name: 'Liquidate',
    component: ()=> import('../views/Liquidate/Liquidate')
  },
]

const router = new VueRouter({
  routes
})

export default router

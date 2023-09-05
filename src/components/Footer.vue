<template>
  <div>
    <v-footer fixed padless class="py-4 hidden-md-and-up" style="display: flex">
      <div :class="$route.path==='/'?'tabWrapperActive':'tabWrapper'" @click="$router.push('/')">
        <v-icon :color="$route.path==='/'?'#00E1BC':'#fff'">mdi-home</v-icon>
        <div>{{$t('footer.home')}}</div>
      </div>
      <div :class="$route.path==='/earn'?'tabWrapperActive':'tabWrapper'" @click="$router.push('/earn')">
        <v-icon :color="$route.path==='/earn'?'#00E1BC':'#fff'">mdi-pickaxe</v-icon>
        <div>{{$t('footer.earn')}}</div>
      </div>
      <div :class="$route.path==='/positions'?'tabWrapperActive':'tabWrapper'" @click="$router.push('/positions')">
        <v-icon :color="$route.path==='/positions'?'#00E1BC':'#fff'">mdi-wallet</v-icon>
        <div>{{$t('footer.allPositions')}}</div>
      </div>
      <div  :class="$route.path==='/info'?'tabWrapperActive':'tabWrapper'" @click="$router.push('/info')">
        <v-icon :color="$route.path==='/info'?'#00E1BC':'#fff'">mdi-waves</v-icon>
        <div>{{$t('footer.myPositions')}}</div>
      </div>
      <div  :class="$route.path==='/tvl'?'tabWrapperActive':'tabWrapper'" @click="$router.push('/tvl')">
        <v-icon :color="$route.path==='/tvl'?'#00E1BC':'#fff'">mdi-waves</v-icon>
        <div>{{$t('footer.poolTVL')}}</div>
      </div>
    </v-footer>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
name: "Footer",
  computed: {
    ...mapState(['selectedAddress'])
  }
}
</script>

<style scoped lang="scss">
::v-deep .theme--light.v-footer {
  background-color: #373A54;
}
  .tabWrapper {
    width: 20%;
    color: #fff;
    text-align: center;
    font-size: 0.75rem;
  }
.tabWrapperActive {
  width: 20%;
  color: #00E1BC;
  text-align: center;
  font-size: 0.75rem;
}
</style>
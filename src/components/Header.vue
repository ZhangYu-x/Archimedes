<template>
  <div>
    <v-app-bar
        app flat
        color="#2b2d44"
        dark height="70"
    >
<!--      <div v-if="$route.path!=='/'">-->
<!--        <v-icon color="#fff" @click="$router.push('/')">mdi-chevron-left</v-icon>-->
<!--      </div>-->
      <v-container class="d-flex align-center justify-space-between" style="max-width: 1200px">
        <img v-if="$vuetify.breakpoint.mdAndUp" src="../assets/Archimedes_logo.png" width="220" height="auto" alt="">
        <img v-if="$vuetify.breakpoint.smAndDown" src="../assets/logo.png" width="50" height="auto" alt="">

        <div v-if="$vuetify.breakpoint.mdAndUp" class="d-flex justify-center">
          <div class="text-no-wrap" @click="goTo('')" :class="$route.path==='/'?'tabsActive':'tabs'">{{$t('header.home')}}</div>
          <div class="text-no-wrap" @click="goTo('earn')" :class="$route.path==='/earn'||$route.path===`/supply/${selectedAddress}`||$route.path===`/withdraw/${selectedAddress}`?'tabsActive':'tabs'">{{$t('header.earn')}}</div>
          <div class="text-no-wrap" @click="goTo('positions')" :class="$route.path==='/positions'?'tabsActive':'tabs'">{{$t('header.allPositions')}}</div>
          <div class="text-no-wrap" @click="goTo('info')" :class="$route.path==='/info'?'tabsActive':'tabs'">{{$t('header.myPositions')}}</div>
          <div class="text-no-wrap" @click="goTo('tvl')" :class="$route.path==='/tvl'?'tabsActive':'tabs'">{{$t('header.poolTVL')}}</div>
        </div>
        <div>

          <Wallet></Wallet>
          <v-icon class="ml-5" @click="openDialog">mdi-cog</v-icon>
        </div>
      </v-container>
      <v-dialog
          v-model="slippageToleranceModel"
          width="300"
      >
        <div class="dialogContainer">
          <div class="d-flex justify-space-between align-center white--text px-4">
            <div style="width: 24px;height: 24px"></div>
            <span class="text-center">{{$t('header.setting')}}</span>
            <v-icon color="#fff" @click="slippageToleranceModel=false">mdi-close</v-icon>
          </div>
          <v-divider color="#53566c" class="mt-4"></v-divider>
          <div class="d-flex justify-space-between align-center white--text px-4 pt-4">
            <div>{{$t('header.slippageTolerance')}}</div>
            <div style="width: 30%">
              <v-text-field solo dense flat rounded hide-details color="#aaaaaa" class="my-2"
                            v-model="slippageToleranceText" :placeholder="slippageTolerance" @change="setSlippageTolerance($event)">
                <template v-slot:append>%</template>
              </v-text-field>
            </div>
          </div>
          <div class="d-flex justify-space-between align-center white--text px-4">
            <div>
              <v-icon color="#fff">mdi-translate</v-icon>
              <span>
                {{$t('header.changeLanguage')}}
              </span>
            </div>
            <div @click="setLanguage" class="d-flex language">
              <img :src="$i18n.locale==='en'?en:cn" class="mr-2" alt="">
              <span>{{$i18n.locale==='en'?'English':'简体中文'}}</span>
            </div>
          </div>
        </div>
      </v-dialog>
    </v-app-bar>
  </div>

</template>

<script>
import Wallet from "@/components/Wallet";
import {mapState} from 'vuex'
import BigNumber from "bignumber.js";

export default {
name: "Header",
  data(){
    return {
      slippageToleranceModel : false,
      slippageToleranceText : '',
      en: require('../assets/icn-english.svg'),
      cn: require('../assets/icn-chinese.svg')
    }
  },
  components: {Wallet},
  watch: {
    slippageToleranceModel () {
      this.slippageToleranceText = ''
    },
  },
  methods: {
    goTo(val){
      this.$router.push(`/${val}`)
    },
    openDialog() {
      this.slippageToleranceModel = true
    },
    setLanguage(){
      if(this.$i18n.locale==='en'){
        this.$i18n.locale='cn'
        localStorage.setItem('lang','cn')
      }else {
        this.$i18n.locale='en'
        localStorage.setItem('lang','en')
      }
    },
    setSlippageTolerance(val){
      this.slippageToleranceText = ''
      let res
      if (new BigNumber(val).isNaN()) {
        res = '1'
      } else if (new BigNumber(val).isGreaterThan(50)) {
        res = '5'
      } else if (new BigNumber(val).isLessThan(0)) {
        res = '0'
      } else {
        res = val
      }
      this.$store.commit('updateSlippageTolerance', new BigNumber(res).toFixed(2))
    },
  },
  computed: {
  //todo 限制在 0.?% ~ 50%
    slippageTolerance : {
      get(){
        return this.$store.state.slippageTolerance
      },
    },
    ...mapState(['selectedAddress'])
  }
}
</script>

<style scoped lang="scss">
  .tabs {
    padding: 7px 20px;
    cursor: pointer;
  }
  .tabsActive {
    padding: 7px 20px;
    background: linear-gradient(90deg, #00bcda, #00e1bc);
    border-radius: 30px;
  }
  .dialogContainer {
    background-color: #373a54;
    padding: 1rem 0;
    border-radius: 0.25rem;

  }
  .language {
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: #484b67;
    border-radius: 2rem;
  }
  //输入框颜色
  ::v-deep .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
    background-color: #484b67;
  }
  ::v-deep .v-icon.v-icon.v-icon--link,
  ::v-deep .theme--light.v-label,
  ::v-deep .theme--light.v-input input, .theme--light.v-input textarea,
  ::v-deep .v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot {
    color: #aaaaaa;
  }
  ::v-deep .v-input--dense > .v-input__control > .v-input__slot {
    margin-bottom: 0;
  }
  ::v-deep .theme--light.v-input {
    color: #aaaaaa;
    display: flex;
    align-items: center;
  }
  ::v-deep .v-text-field--rounded > .v-input__control > .v-input__slot {
    padding: 0 12px;
  }
  //icon active透明度
  ::v-deep .theme--light.v-icon:focus::after,
  ::v-deep .theme--dark.v-icon:focus::after {
    opacity: 0;
  }
</style>

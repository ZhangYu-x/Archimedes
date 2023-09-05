<template>
  <v-app>
    <first-screen-ad v-if="showAd" style="z-index: 1000"></first-screen-ad>
    <Header></Header>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer v-show="['/info','/','/earn','/positions','/tvl'].includes($route.path)"></Footer>
  </v-app>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Vue from 'vue'
import utils from "@/utils/common";
import {
  initContracts,
  initContractsSend
} from '@/utils/address';
import FirstScreenAd from "./views/firstScreenAd";

export default {
  name: 'App',
  components: {
    FirstScreenAd,
    Header,
    Footer,
  },
  mounted() {
    const updateStatus = utils.updateData
    updateStatus()

    setTimeout(() => {
      // this.getEthereumAddress();
      this.init()
    }, 1000)

    setTimeout(() => {
      // this.getEthereumAddress();
      this.showAd = false
    }, 9000)
  },
  data: () => ({
    showAd: true,
  }),
  methods: {
    init () {
      Vue.prototype.contract = initContracts();
      Vue.prototype.contractSend = initContractsSend();

      setInterval(() => {
        this.$store.commit('updateReload', Date.parse(new Date()))
      }, 6000)

      // this.getContractDetail();
    },
  },
};
</script>

<style scoped lang="scss">
.theme--light.v-application {
  background-color: #2b2d44;
}
</style>

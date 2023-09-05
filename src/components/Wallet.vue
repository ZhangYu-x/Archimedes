<template>
  <v-btn rounded color="#4b4c60" @click="connectWallet">
    <v-icon class="mr-2">mdi-wallet</v-icon>
    <span v-if="walletAddress">{{walletAddress?walletAddress.substr(0,4)+'...'+walletAddress.substr(38,42):''}}</span>
    <span v-else>{{$t('wallet.connectWallet')}}</span>
  </v-btn>
</template>

<script>
// import Web3 from 'web3'
import {mapState} from 'vuex'
import utils from "@/utils/common";
export default {
  name: "Wallet",
  methods: {
    connectWallet(){
      window.ethereum.request({method: 'eth_requestAccounts'}).then((res) => {
        utils.updateData()
      })
    }
  },
  computed: {
    ...mapState(['walletAddress'])
  }
}
</script>

<style scoped>

</style>

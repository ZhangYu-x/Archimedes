<template>
  <div>
    <!--  手机和Ipad版  -->
    <div class="liquidate hidden-md-and-up">
      <!--  手机和Ipad版 -> 清算  -->
      <div class="step">
        <div>
          <img class="ma-2" :src="currentPositionDetails.poolLogoSource" width="50" alt="">
        </div>
        <div class="white--text">{{currentPositionDetails.DEX}}</div>
        <div class="grey-font mt-1">{{currentPositionDetails.poolName.replace(/Mdex/,"")}}</div>
        <div class="mt-5">
          <div class="dotActive">
            <span>1</span>
          </div>
        </div>
        <div class="white--text text-caption text-no-wrap mt-2">
          清算
        </div>
      </div>

      <!--  手机和Ipad版 -> 清算具体内容  -->
      <div class="liquidateWrapper">
        <!--  current debt  -->
        <h5 class="font-italic px-4 mb-5">Current position debt </h5>
        <div class="currentDebt">
          <div class="d-flex">
            <div class="d-flex align-center mr-2 py-2 pl-4">
              <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
              <span>{{debtList[0]===0?0:debtList[0].toFixed(4)}} {{tokenASymbol||''}}</span>
            </div>
            <div class="d-flex align-center ml-2 py-2 pl-4">
              <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
              <span>{{debtList[1]===0?0:debtList[1].toFixed(4)}} {{tokenBSymbol||''}}</span>
            </div>
          </div>
        </div>

        <!--  选择币  -->
        <div class="chooseToken">
          <v-divider color="#53566c" class="my-5 mx-4"></v-divider>
          <h5 class="font-italic px-4 mb-5">Choose a token you want to repay</h5>
          <v-radio-group dark hide-details class="radio" v-model="radioGroup">
            <div class="d-flex">
              <div class="token" v-if="debtList[0]!==0">
                <v-radio></v-radio>
                <span>{{tokenASymbol||''}}</span>
              </div>
              <div class="token" v-if="debtList[1]!==0">
                <v-radio></v-radio>
                <span >{{tokenBSymbol||''}}</span>
              </div>
            </div>
          </v-radio-group>
        </div>

        <!--    输入币的数量清算    -->
        <div class="mx-4">
          <v-divider color="#53566c" class="mt-4 mb-5"></v-divider>
          <h5 class="font-italic mb-2">Input your repay amount</h5>
          <div>
            <div class="grey-font text-no-wrap text-right pb-2">Balance: {{ tokenBalance }}</div>
            <div class="d-flex justify-space-between">
              <div>
                <div class="d-flex justify-center align-center">
                  <img :src="radioGroup===0?tokenALogoSource:tokenBLogoSource" width="40" height="40" alt="">
                  <div class="ml-1">
                    <div>{{ radioGroup===0?tokenASymbol:tokenBSymbol }}</div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-center ml-4 white--text">
                <v-text-field solo dense flat rounded clearable
                              color="#aaaaaa" v-model="repayAmount" :rules=[validateTokenA]
                ></v-text-field>
                <v-btn rounded dark class="ml-1" @click="setMaxRepay">{{$t('open.maxBtn')}}</v-btn>
              </div>
            </div>
          </div>
        </div>

        <!--  Note  -->
        <div class="px-4">
          <v-divider color="#53566c" class="mb-5"></v-divider>
          <div class="grey-font">Note :</div>
          <div class="text-caption" style="color: rgba(255,255,255,0.7)">
            You will receive {{estimateLPToken[0]}} {{ currentPositionDetails?currentPositionDetails.poolName.replace(/Mdex/,""):'' }} (${{estimateLPToken[1].toFixed(4)}}) wrapped LP tokens (Estimated)
          </div>
        </div>

      </div>

      <div class="btnFooter d-flex align-center">
        <div class="backBtn text-center py-3 px-6 mr-2" style="width: 100%" @click="$router.back()">
          {{$t('open.back')}}
        </div>
        <div v-if="!tokenIsApprove" class="nextBtn text-center py-3 px-6 ml-2" style="width: 100%" @click="sendApprove(tokenAddress)">
          {{$t('open.approve',{x:tokenSymbol})}}
        </div>
        <div v-else class="nextBtn text-center py-3 px-6 ml-2" style="width: 100%" @click="executeLiquidating">
          清算
        </div>
      </div>
    </div>

    <!--  电脑版  -->
    <v-container class="liquidateContainer hidden-sm-and-down" style="max-width: 800px;display: flex">
      <!--   进度卡片   -->
      <div style="background-color: #53566c;border-radius: 0.5rem 0 0 0.5rem;">
        <div class="stepPC py-4">
          <div class="d-flex align-center">
            <img class="ma-4" :src="currentPositionDetails?currentPositionDetails.poolLogoSource:''"  width="50" alt="">
            <div>
              <div class="grey-font">{{ currentPositionDetails?currentPositionDetails.DEX:'' }}</div>
              <div class="white--text">{{ currentPositionDetails?currentPositionDetails.poolName.replace(/Mdex/,""):'' }}</div>
            </div>
          </div>
          <div class="px-8 pt-6">
            <div class="d-flex align-center">
              <div class="dotActive">
                <span >1</span>
              </div>
              <div class="white--text pl-2">清算</div>
            </div>

          </div>
        </div>
      </div>
      <div  class="liquidatePC pb-6">
        <!--  电脑版 -> Current position debt -->
        <div class="step" >
          <h4 class="font-italic pt-8 pb-5">Current position debt </h4>
          <div class="d-flex">
            <div class="d-flex mr-2">
              <div class="d-flex align-center ml-2 py-2 pl-4">
                <img class="mr-2" :src="tokenALogoSource" width="25" height="25" alt="">
                <span>{{debtList[0]===0?0:debtList[0].toFixed(4)}} {{ tokenASymbol }}</span>
              </div>
            </div>
            <div class="d-flex ml-2">
              <div class="d-flex align-center ml-2 py-2 pl-4">
                <img class="mr-2" :src="tokenBLogoSource" width="25" height="25" alt="">
                <span>{{debtList[1]===0?0:debtList[1].toFixed(4)}} {{ tokenBSymbol }}</span>
              </div>
            </div>
          </div>

          <v-divider color="#53566c" class="mt-8"></v-divider>
        </div>

        <div class=" px-8">
          <h4 class="font-italic  pt-8">choose a token you want to repay</h4>
          <div>
            <v-radio-group dark hide-details v-model="radioGroup">
              <div class="d-flex">
                <div style="width: 50%" class="d-flex" v-if="debtList[0]!==0">
                  <v-radio></v-radio>
                  <span>{{tokenASymbol}}</span>
                </div>
                <div style="width: 50%" class="d-flex" v-if="debtList[1]!==0">
                  <v-radio></v-radio>
                  <span >{{tokenBSymbol}}</span>
                </div>
              </div>
            </v-radio-group>
          </div>
          <v-divider color="#53566c" class="mt-6"></v-divider>
        </div>

        <!--  电脑版 -> Input your repay amount  -->
        <h4 class="font-italic px-8 pt-8">Input your repay amount</h4>
        <v-form ref="formTokenA" >
          <div class="px-8 py-2">
            <div class="grey-font text-no-wrap text-right pb-2">Balance: {{ tokenBalance }}</div>
            <div class="d-flex justify-space-between">
              <div>
                <div class="d-flex justify-center align-center">
                  <img :src="radioGroup===0?tokenALogoSource:tokenBLogoSource" width="40" height="40" alt="">
                  <div class="ml-1">
                    <div>{{ radioGroup===0?tokenASymbol:tokenBSymbol }}</div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-center ml-4 white--text">
                <v-text-field solo dense flat rounded clearable
                              color="#aaaaaa" v-model="repayAmount" :rules=[validateTokenA]
                ></v-text-field>
                <v-btn rounded dark class="ml-1" @click="setMaxRepay">{{$t('open.maxBtn')}}</v-btn>
              </div>
            </div>
          </div>
        </v-form>

        <v-divider color="#53566c" class="mb-6 mx-8"></v-divider>

        <!--  电脑版 -> Step1 -> Note  -->
        <div class="px-8" >
          <div class="grey-font py-2">Note:</div>
          <div class="text-caption text--lighten-3 d-flex">
           You will receive {{estimateLPToken[0]}} {{ currentPositionDetails?currentPositionDetails.poolName.replace(/Mdex/,""):'' }} (${{estimateLPToken[1].toFixed(4)}}) wrapped LP tokens (Estimated)
          </div>
        </div>

        <!--  电脑版 -> Step1 -> Buttons  -->
        <div class="btnFooterPC d-flex align-end">
          <div class="backBtn text-center py-3 px-6 mr-2" @click="$router.back()">BACK</div>
          <div v-if="!tokenIsApprove" class="text-center py-3 px-6 ml-2 nextBtn" @click="sendApprove(tokenAddress)">{{$t('open.approve',{x:tokenSymbol})}}</div>
          <div v-else class="text-center py-3 px-6 ml-2 nextBtn"  :class="validForm===true?'nextBtn':'nextBtnDisabled'">CONFIRM</div>
        </div>
      </div>
    </v-container>

  </div>
</template>

<script>
import {mapState} from "vuex";
import BigNumber from 'bignumber.js'
import { decimals, tokenSymbol, mdexLpTokenPoolIdUnderlying} from "@/utils/constants";
// import { address } from '@/utils/address'
import { eX } from "@/utils/helpers";
import {address} from "@/utils/address";
import erc_abi from "@/utils/json/ERC20.json";
// const WHTAddress = '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F'
const Web3 = require('web3')
// const gasLimit = "3500000";
let web3 = new Web3(window.ethereum)
export default {
  name: "Liquidate",
  data(){
    return{
      repayAmount:0,
      radioGroup:0,
      validForm:false,
      radioChange:false
    }
  },
  computed: {
    allPoolsMap() {
      return this.$store.getters.allPoolsMap
    },
    allMarketsMap() {
      return this.$store.getters.allMarketsMap
    },
    currentLPAddress() {
      const lpAddress = this.$store.state.selectedPoolAddress
      if(lpAddress){
        return lpAddress
      }else {
        const routerAddress = this.$route.params.lpaddress
        return routerAddress
      }
    },
    tokenAddress: function () {
      return this.allPoolsMap[this.currentLPAddress].poolTokens[this.radioGroup]
    },
    tokenSymbol: function () {
      return this.allMarketsMap[this.allPoolsMap[this.currentLPAddress].poolTokens[this.radioGroup]].symbol
    },
    tokenBalance: function () {
      return this.allMarketsMap[this.allPoolsMap[this.currentLPAddress].poolTokens[this.radioGroup]].walletBalance
    },
    tokenIsApprove: function() {
      // 不 Approve WHT 的话 Remove 会失败，所以不用忽略 WHT 授权
      return this.allMarketsMap[this.allPoolsMap[this.currentLPAddress].poolTokens[this.radioGroup]]?.isApproveIBank
    },
    currentPositionDetails(){
      return this.allUserPositionsDetails.filter(item=>item.id===this.selectedPositionId)[0]
    },
    debtList() {
      const debtList = this.currentPositionDetails.positionDebts
      let debt = []

      debt[0] = new BigNumber(debtList.debts[debtList.tokens.indexOf(this.tokenAAddress)]).div(Math.pow(10,this.allMarketsMap[this.tokenAAddress]?.decimals||1)).isNaN()?0:new BigNumber(debtList.debts[debtList.tokens.indexOf(this.tokenAAddress)]).div(Math.pow(10,this.allMarketsMap[this.tokenAAddress]?.decimals||1))
      debt[1] = new BigNumber(debtList.debts[debtList.tokens.indexOf(this.tokenBAddress)]).div(Math.pow(10,this.allMarketsMap[this.tokenBAddress]?.decimals||1)).isNaN()?0:new BigNumber(debtList.debts[debtList.tokens.indexOf(this.tokenBAddress)]).div(Math.pow(10,this.allMarketsMap[this.tokenBAddress]?.decimals||1))

      return debt
    },
    estimateLPToken(){
      const tokenDetail = this.allMarketsMap[this.tokenAddress]
      let lpAmount = []
      lpAmount[0] = new BigNumber(tokenDetail.underlyingPrice).times(this.repayAmount).div(this.allPoolsMap[this.selectedPoolAddress].lpPrice).times(1.08)
      lpAmount[1] = new BigNumber(tokenDetail.underlyingPrice).times(this.repayAmount).times(1.08)
      return lpAmount
    },
    tokenASymbol: function() {
      return tokenSymbol['heco-mainnet'][this.tokenAAddress]
    },
    tokenBSymbol: function() {
      return tokenSymbol['heco-mainnet'][this.tokenBAddress]
    },
    tokenAAddress: function() {
      return this.allPoolsMap[this.currentLPAddress].poolTokens[0]
    },
    tokenBAddress: function() {
      return this.allPoolsMap[this.currentLPAddress].poolTokens[1]
    },
    tokenALogoSource: function() {
      return require(`../../assets/coin/asset_${this.tokenASymbol}.svg`)
    },
    tokenBLogoSource: function() {
      return require(`../../assets/coin/asset_${this.tokenBSymbol}.svg`)
    },
    ...mapState([
      'selectedPoolType',
      'selectedPoolDEX',
      'selectedPoolTokens',
      'selectedPoolAddress',
      'selectedPositionId',
      'walletAddress',
      'gasPrice',
      'slippageTolerance',
      'allUserPositionsDetails',
      'allMarketsDetails',
      'allPoolsDetails',
    ])
  },
  watch:{
    radioGroup: function (){
      this.validForm =false
      let currentBalance = (this.radioGroup===0?this.allMarketsMap[this.tokenAAddress].walletBalance:
          this.allMarketsMap[this.tokenBAddress].walletBalance)
      if (this.repayAmount>currentBalance)
      {
        this.validForm = false
      }else {
        this.validForm = true
      }
    }
  },
  methods:{
    sendApprove(tokenAddress) {
      const tokenContract = new web3.eth.Contract(erc_abi.abi,tokenAddress,{})
      tokenContract.methods.approve(address.IBank,'0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff').send({
        from: this.walletAddress,
        gas: '80000',
        gasPrice: this.gasPrice.toString()
      }).then(result => {
        console.log(result)
      })
    },
    validateTokenA(value) {
      //todo 监听不到对象属性变化
      let currentRadio = this.radioGroup
      console.log('------------测试改变',currentRadio)
      this.validForm=false
      let numReg = /^([0]?)$|^([1-9][0-9]*)$|^([0]\.\d+)$|^([1-9][0-9]*\.\d+)$/

      if (value === '') {
        return '不能为空'
      }
      if ((value + '').split('.').length > 2) {
        return '输入错误'
      }
      if ((value + '').indexOf('.') > -1 && (value + '').split('.')[1] === '') {
        return '输入错误'
      }
      if (!numReg.test(value)) {
        return '输入错误'
      }
        if (this.repayAmount && parseInt(value) > parseInt(this.radioGroup===0?this.allMarketsMap[this.tokenAAddress].walletBalance
        :this.allMarketsMap[this.tokenBAddress].walletBalance)) {
          // this.tokenASupply = this.tokenABalance;
          return '余额不足';
        }
        if(this.repayAmount>(this.radioGroup===0?this.allMarketsMap[this.tokenAAddress].walletBalance
            :this.allMarketsMap[this.tokenBAddress].walletBalance))
        {
          return '余额不足';
        }
      if(new BigNumber(value).isZero()){
        if(this.repayAmount+'' === '0')
          return '请输入大于0'
        else
        {
          return true
        }
      }
      this.validForm=true
      return true;
    },
    setMaxRepay(){
      const walletBalance = this.allMarketsMap[this.tokenAddress].walletBalance
      if(new BigNumber(this.debtList[this.radioGroup]).isGreaterThanOrEqualTo(walletBalance)){
        this.repayAmount = walletBalance
      }else {
        this.repayAmount = this.debtList[this.radioGroup]
      }
    },
    executeLiquidating() {
      const positionId = this.selectedPositionId
      const selectAddress = this.tokenAddress
      const tokenAmount = this.repayAmount
      const decimal = this.allMarketsMap[selectAddress].decimals
      const options = {
        from: this.walletAddress,
        // gas: '3500000',
        // gasPrice: this.gasPrice.toString(),
      }
      this.contractSend['IBank'].methods.liquidate(positionId,selectAddress,eX(tokenAmount,decimal)).call(options).then(console.log)
    }
  }
}
</script>

<style scoped lang="scss">

.grey-font {
  color: #9b9daa;
  font-size: 0.75rem;
}

.liquidate {
  .step {
    background-color: #373a54;
    border-radius: 0.5rem;
    margin: 0 0.875rem;
    padding: 1.25rem 0 2rem;
    >div {
      display: flex;
      justify-content: center;
      align-items: center;
      .dotActive {
        width: 20px;
        height: 20px;
        border-radius: 10px;
        font-size: 0.75rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #00bcda;
        color: #fff;
      }
    }
  }
  .liquidateWrapper {
    background-color: #373a54;
    color: #fff;
    border-radius: 0.5rem;
    padding: 1.25rem 0;
    margin: 0.625rem 0.875rem 0;
    .currentDebt {
      padding: 0 1rem;
      >div {
        >div {
          background-color: #484b67;
          border-radius: 0.5rem;
          width: 100%;
          >span {
            font-size: 0.75rem;
            color: #e7e7eb;
          }
        }
      }

    }
    .chooseToken {
      color: white;
      .radio {
        padding: 0 1rem;
        .token {
          display: flex;
          color: #ffffff;
          width: 50%;
        }
      }
    }
  }
  .btnFooter {
    width: 100%;
    height: 100px;
    padding: 0 20px;
    margin-top: 1.25rem;
    background-color: #373a54;
    .backBtn {
      color: #41e1ad;
      border: 1px solid #41e1ad;
      border-radius: 50px;
      cursor: pointer;
    }
    .nextBtn {
      color: #fff;
      background: linear-gradient(90deg, #00bcda, #00e1bc);
      border-radius: 50px;
      cursor: pointer;
    }
    .nextBtnDisabled {
      color: #fff;
      background: #ACB2A6;
      border-radius: 50px;
      cursor: not-allowed;
      width: 100%;
    }
  }
}

.liquidateContainer {
  .stepPC {
    width: 200px;
    background-color: #53566c;
    border-radius: 0.5rem 0 0 0.5rem;
    .dotActive {
      width: 20px;
      height: 20px;
      border-radius: 10px;
      font-size: 0.75rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #00bcda;
      color: #fff;
    }
  }
  .liquidatePC {
    width: 100%;
    background-color: #373a54;
    color: #fff;
    border-radius: 0 0.5rem 0.5rem 0;
    .step {
      padding: 0 32px;
      >div {
        >div {
          background-color: #484b67;
          border-radius: 0.5rem;
          width: 100%;
          >span {
            font-size: 0.75rem;
            color: #e7e7eb;
          }
        }
      }
    }
  }
  .btnFooterPC {
    width: 100%;
    height: 100px;
    padding: 0 32px;

    .backBtn {
      color: #41e1ad;
      border: 1px solid #41e1ad;
      border-radius: 50px;
      cursor: pointer;
      width: 100%;
    }
    .nextBtn {
      color: #fff;
      background: linear-gradient(90deg, #00bcda, #00e1bc);
      border-radius: 50px;
      cursor: pointer;
      width: 100%;
    }
    .nextBtnDisabled {
      color: #fff;
      background: #ACB2A6;
      border-radius: 50px;
      cursor: not-allowed;
      width: 100%;
    }
  }
}

//输入框颜色
::v-deep .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background-color: #484b67;
}
::v-deep .v-text-field--rounded > .v-input__control > .v-input__slot {
  padding: 0 0.75rem;
}
::v-deep .v-icon.v-icon.v-icon--link,
::v-deep .theme--light.v-label,
::v-deep .theme--light.v-input input, .theme--light.v-input textarea,
::v-deep .v-text-field > .v-input__control > .v-input__slot > .v-text-field__slot {
  color: #aaaaaa;
}
//btn渐变
::v-deep .v-btn:not(.v-btn--disabled) {
  background: linear-gradient(7deg, #00bcda, #00e1bc);
}
//radio
::v-deep .v-input--selection-controls__ripple {
  width: 0;
  height: 0;
}
</style>

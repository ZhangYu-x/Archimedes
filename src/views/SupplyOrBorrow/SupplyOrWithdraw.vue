<template>
  <div>
    <!--  手机和Ipad版  -->
    <div class="supplyContainer hidden-md-and-up">
      <!--  手机和Ipad版 -> supply/withdraw  -->
      <div class="tokenCard">
        <div class="d-flex justify-space-between align-center">
          <img :src="allMarketsMap[currentAddress]?allMarketsMap[currentAddress].logoSource:''" width="40" alt="">
          <div class="text-h5" v-if="currentEarnStatus==='supply'">{{allMarketsMap[currentAddress]?allMarketsMap[currentAddress].walletBalance:''}} {{allMarketsMap[currentAddress]?allMarketsMap[currentAddress].symbol:''}}</div>
          <div class="text-h5" v-if="currentEarnStatus==='withdraw'">{{allMarketsMap[currentAddress]?(allMarketsMap[currentAddress].supplyBalanceInTokenUnit).toFixed(4):''}} {{allMarketsMap[currentAddress]?allMarketsMap[currentAddress].symbol:''}}</div>
        </div>
        <div class="d-flex justify-space-between align-center">
          <div class="text-h6">{{allMarketsMap[currentAddress]?allMarketsMap[currentAddress].tokenName:''}}</div>
          <div class="mt-1" style="color: #9b9daa" v-if="currentEarnStatus==='supply'">{{$t('supplyOrWithdraw.walletAvailable')}}</div>
          <div class="mt-1" style="color: #9b9daa" v-if="currentEarnStatus==='withdraw'">{{$t('supplyOrWithdraw.remainingDesirable')}}</div>
        </div>
      </div>

      <!--   手机和Ipad版 -> 兑换WHT/HT  -->
      <div class="swapWHT" v-if="allMarketsMap[currentAddress].symbol==='WHT'">
        <h5 class="font-italic px-4 mb-5">I'd like to swap</h5>
        <!--  手机和Ipad版 -> 兑换WHT/HT -> TokenA  -->
        <div class="grey-font text-no-wrap px-4 pb-2 d-flex justify-space-between">
          <div>From</div>
          <div>Balance: {{ isUnwrap ? allMarketsMap[currentAddress].walletBalance : htBalance }}
            {{ isUnwrap ? allMarketsMap[currentAddress].symbol : 'HT' }}</div>
        </div>
        <div class="d-flex justify-space-between align-start px-4">
          <div class="d-flex justify-center align-center">
            <img :src="isUnwrap?allMarketsMap[currentAddress].logoSource:htImage" width="40" height="40" alt="">
            <div class="ml-1">
              {{ isUnwrap ? allMarketsMap[currentAddress].symbol : 'HT' }}
            </div>
          </div>
          <div style="width: 70%" class="d-flex justify-center align-start ml-4">
            <v-text-field solo dense flat clearable rounded color="#aaaaaa" :rules=[validateTokenA] v-model="htAmount"></v-text-field>
            <v-btn rounded dark class="ml-1" @click="setMaxSwapAmount">MAX</v-btn>
          </div>
        </div>

        <v-icon class="px-6" color="#41e1ad" @click="isUnwrap=!isUnwrap">mdi-arrow-down</v-icon>

        <!--  手机和Ipad版 -> 兑换WHT/HT -> TokenB  -->
        <div class="grey-font text-no-wrap px-4 pb-2 d-flex justify-space-between">
          <div>To</div>
          <div>Balance: {{ isUnwrap ? htBalance : allMarketsMap[currentAddress].walletBalance }}
            {{ isUnwrap ? 'HT' : allMarketsMap[currentAddress].symbol }}</div>
        </div>
        <div class="d-flex justify-space-between align-start px-4">
          <div class="d-flex justify-center align-center">
            <img :src="isUnwrap?htImage:allMarketsMap[currentAddress].logoSource" width="40" height="40" alt="">
            <div class="ml-1">
              {{ isUnwrap ? 'HT' : allMarketsMap[currentAddress].symbol }}
            </div>
          </div>
          <div style="width: 70%" class="d-flex justify-center align-start ml-4">
            <v-text-field solo dense flat clearable rounded color="#aaaaaa" :rules=[validateTokenA] v-model="htAmount"></v-text-field>
            <v-btn rounded dark class="ml-1" @click="setMaxSwapAmount">MAX</v-btn>
          </div>
        </div>

        <div class="mx-5 text-center" :class="swapEnable===true?'swapBtn':'swapBtnDisabled'"
             @click="sendSwap">
          SWAP
        </div>

      </div>

      <!--  手机和Ipad版 -> 存取款  -->
      <div class="supply pb-6">
        <!--  手机和Ipad版 -> 存取款 -> 标签页  -->
        <div class="tabs">
          <div :class="currentEarnStatus==='supply'?'supplyTabActive':'supplyTab'" @click="setEarnStatus('supply')">{{$t('supplyOrWithdraw.supply')}}</div>
          <div :class="currentEarnStatus==='withdraw'?'withdrawTabActive':'withdrawTab'" @click="setEarnStatus('withdraw')">{{$t('supplyOrWithdraw.withdraw')}}</div>
        </div>
        <!--  手机和Ipad版 ->  存款信息  -->
        <div class="supplyInfo">
          <div>
            <div>{{$t('supplyOrWithdraw.totalSupply')}}</div>
            <div>{{allMarketsMap[currentAddress]?formatPrice(allMarketsMap[currentAddress].marketTotalSupply):''}}</div>
          </div>
          <div>
            <div>{{$t('supplyOrWithdraw.mySupply')}}</div>
            <div>{{allMarketsMap[currentAddress]?formatPrice(allMarketsMap[currentAddress].supplyBalance):''}}</div>
          </div>
        </div>
        <!--  手机和Ipad版 -> 输入框  -->
        <div class="px-5 py-2">
          <div class="grey-font">{{currentEarnStatus==='supply'?'存款金额':'取款金额'}}</div>
          <v-text-field solo dense flat hide-details color="#aaaaaa" v-model="tokenQuantity" class="my-2" @change="setSliderValue($event)"></v-text-field>
        </div>
        <!--  手机和Ipad版 -> 进度条  -->
        <div class="px-5 pt-2">
          <div class="d-flex justify-space-between">
            <div class="grey-font">{{currentEarnStatus==='supply'?'存款比例':'取款比例'}}</div>
            <div class="text-caption" v-if="currentEarnStatus==='supply'">{{$t('supplyOrWithdraw.walletAvailable')}} {{allMarketsMap[currentAddress]?getWalletBalanceUSD(allMarketsMap[currentAddress].walletBalance):''}}</div>
            <div class="text-caption" v-if="currentEarnStatus==='withdraw'">{{$t('supplyOrWithdraw.safeMaximum')}} {{allMarketsMap[currentAddress]?formatPrice(allMarketsMap[currentAddress].supplyBalance):''}}</div>
          </div>
          <v-slider color="#00e1bc" track-color="#484b67" min="0" max="100" thumb-color="#00e1bc" class="my-2"
                    thumb-label="always" hide-details v-model="sliderValue" @input="setAmount($event)">
            <template v-slot:thumb-label="{ value }">
              {{value}}%
            </template>
          </v-slider>
        </div>
        <!--  手机和Ipad版 -> 存款APY  -->
        <div class="pa-4" v-if="currentEarnStatus==='supply'">
          <div class="d-flex justify-space-between">
            <span>{{$t('supplyOrWithdraw.totalDepositIncome')}}</span>
            <span>{{ getBigNumberStr(allMarketsMap[currentAddress].supplyDistributionApy.plus(allMarketsMap[currentAddress].supplyApy),2,100) }}%</span>
          </div>
          <div class="d-flex justify-space-between grey-font py-1">
            <span class="px-4">{{$t('supplyOrWithdraw.depositRate')}}</span>
            <span>{{ getBigNumberStr(allMarketsMap[currentAddress].supplyApy,2,100) }}%</span>
          </div>
          <div class="d-flex justify-space-between grey-font py-1">
            <span class="px-4">+{{$t('supplyOrWithdraw.depositMiningIncome')}}</span>
            <span>{{ getBigNumberStr(allMarketsMap[currentAddress].supplyDistributionApy,2,100) }}%</span>
          </div>
        </div>
        <!--  手机和Ipad版 -> 取款APY  -->
<!--        <div class="pa-4" v-if="currentEarnStatus==='withdraw'">-->
<!--          <div class="d-flex justify-space-between">-->
<!--            <span>{{$t('supplyOrWithdraw.totalWithdrawalIncome')}}</span>-->
<!--            <span>5%</span>-->
<!--          </div>-->
<!--          <div class="d-flex justify-space-between grey-font py-1">-->
<!--            <span class="px-4">{{$t('supplyOrWithdraw.withdrawalInterestRate')}}</span>-->
<!--            <span>30%</span>-->
<!--          </div>-->
<!--          <div class="d-flex justify-space-between grey-font py-1">-->
<!--            <span class="px-4">—{{$t('supplyOrWithdraw.withdrawalAndMiningIncome')}}</span>-->
<!--            <span>25%</span>-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div class="py-4"></div>
      <!--  手机和Ipad版 -> Buttons  -->
      <div class="btnFooter d-flex align-center">
        <div class="backBtn text-center py-3 px-6 mr-2 flex-grow-1" @click="$router.push('/earn')">{{$t('supplyOrWithdraw.back')}}</div>
        <div class="text-center py-3 px-6 ml-2 nextBtn flex-grow-1" v-if="allMarketsMap[currentAddress] && !allMarketsMap[currentAddress].isEnabled && currentEarnStatus==='supply'" @click="enable">{{$t('supplyOrWithdraw.approve')}}</div>
        <div class="text-center py-3 px-6 ml-2 nextBtn flex-grow-1" v-if="allMarketsMap[currentAddress] && allMarketsMap[currentAddress].isEnabled && currentEarnStatus==='supply'" @click="supply">{{$t('supplyOrWithdraw.supply')}}</div>
        <div class="text-center py-3 px-6 ml-2 nextBtn flex-grow-1" v-if="currentEarnStatus==='withdraw'" @click="withdraw">{{$t('supplyOrWithdraw.withdraw')}}</div>
      </div>
    </div>

    <!--  电脑版  -->
    <v-container class="hidden-sm-and-down" style="max-width: 800px;display: flex">
      <!--  电脑版 -> token进度卡片  -->
      <div style="background-color: #53566c;border-radius: 0.5rem 0 0 0.5rem;">
        <div class="stepPC py-4">
          <div class="d-flex align-center">
            <img class="ma-4" :src="allMarketsMap[currentAddress]?allMarketsMap[currentAddress].logoSource:''" width="50" alt="">
            <div>
              <div class="grey-font">{{allMarketsMap[currentAddress]?allMarketsMap[currentAddress].tokenName:''}}</div>
              <div class="white--text">{{allMarketsMap[currentAddress]?allMarketsMap[currentAddress].symbol:''}}</div>
            </div>
          </div>
          <div class="px-8 pt-6">
            <div class="d-flex align-center">
              <div class="dotActive">
                <span>1</span>
              </div>
              <div class="ml-2 white--text text-caption text-no-wrap">{{currentEarnStatus==='supply'?$t('supplyOrWithdraw.supply'):$t('supplyOrWithdraw.withdraw')}}</div>
            </div>
          </div>
        </div>
      </div>

      <!--  电脑版 ->  -->
      <div class="supplyOrWithdrawPC pb-6">

        <div>
          <!--  电脑版 -> 存取款 -> 标签页  -->
          <div class="tabsPC pt-8 pb-2">
            <div :class="currentEarnStatus==='supply'?'supplyTabPCActive':'supplyTabPC'" @click="setEarnStatus('supply')">{{$t('supplyOrWithdraw.supply')}}</div>
            <div :class="currentEarnStatus==='withdraw'?'withdrawTabPCActive':'withdrawTabPC'" @click="setEarnStatus('withdraw')">{{$t('supplyOrWithdraw.withdraw')}}</div>
          </div>

          <!--  电脑版 -> 兑换WHT  -->
          <div v-if="allMarketsMap[currentAddress].symbol==='WHT'" class="swapPC mx-8 mt-6">
            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <h4 class="font-italic">I'd like to swap</h4>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="white--text">
                  <!--  电脑版 -> 存款 -> step1 -> HT  -->
                  <div class="grey-font text-no-wrap pb-2 d-flex justify-space-between">
                    <div>From</div>
                    <div>Balance: {{ isUnwrap ? allMarketsMap[currentAddress].walletBalance : htBalance }}
                      {{ isUnwrap ? allMarketsMap[currentAddress].symbol : 'HT' }}</div>
                  </div>
                  <div class="d-flex justify-space-between">
                    <div>
                      <div class="d-flex justify-center align-center">
                        <img :src="isUnwrap?allMarketsMap[currentAddress].logoSource:htImage" width="40" height="40" alt="">
                        <div class="ml-2">
                          <div>{{ isUnwrap ? allMarketsMap[currentAddress].symbol : 'HT' }}</div>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex justify-center ml-4">
                      <v-text-field solo dense flat rounded clearable
                                    color="#aaaaaa" v-model="htAmount"
                                    :rules=[validateTokenA]
                      ></v-text-field>
                      <v-btn rounded dark class="ml-1" @click="setMaxSwapAmount">MAX</v-btn>
                    </div>
                  </div>

                  <v-icon class="px-2 mb-5" color="#41e1ad" @click="isUnwrap=!isUnwrap">mdi-arrow-down</v-icon>

                  <!--  电脑版 -> 存款 -> step1 -> WHT  -->
                  <div class="grey-font text-no-wrap pb-2 d-flex justify-space-between">
                    <div>To</div>
                    <div>Balance: {{ isUnwrap ? htBalance : allMarketsMap[currentAddress].walletBalance }}
                      {{ isUnwrap ? 'HT' : allMarketsMap[currentAddress].symbol }}</div>
                  </div>
                  <div class="d-flex justify-space-between">
                    <div>
                      <div class="d-flex justify-center align-center">
                        <img :src="isUnwrap?htImage:allMarketsMap[currentAddress].logoSource" width="40" height="40" alt="">
                        <div class="ml-1">
                          <div>{{ isUnwrap ? 'HT' : allMarketsMap[currentAddress].symbol }}</div>
                        </div>
                      </div>
                    </div>

                    <div class="d-flex justify-center ml-4">
                      <v-text-field solo dense flat rounded clearable
                                    color="#aaaaaa" v-model="htAmount"
                      ></v-text-field>
                      <v-btn rounded dark class="ml-1" @click="setMaxSwapAmount">MAX</v-btn>
                    </div>
                  </div>

                  <div class="py-4 text-center" :class="swapEnable===true?'swapBtn':'swapBtnDisabled'"
                       @click="sendSwap">
                    SWAP
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>

          <!--  电脑版 -> 输入框  -->
          <div class="px-8 pt-6 pb-2">
            <div style="color: #9b9daa">{{currentEarnStatus==='supply'?'存款金额':'I‘d like to withdraw'}}</div>
            <v-text-field solo dense flat hide-details color="#aaaaaa" v-model="tokenQuantity"  class="my-2" @change="setSliderValue($event)"></v-text-field>
          </div>
          <!--  电脑版 -> 进度条  -->
          <div class="px-8 pt-6 pb-2">
            <div class="d-flex justify-space-between">
              <div style="color: #9b9daa">{{currentEarnStatus==='supply'?'存款比例':'取款比例'}}</div>
              <div v-if="currentEarnStatus==='supply'">{{$t('supplyOrWithdraw.walletAvailable')}} {{allMarketsMap[currentAddress]?getWalletBalanceUSD(allMarketsMap[currentAddress].walletBalance):''}}</div>
              <div v-if="currentEarnStatus==='withdraw'">{{$t('supplyOrWithdraw.safeMaximum')}} {{allMarketsMap[currentAddress]?getWalletBalanceUSD(allMarketsMap[currentAddress].supplyBalanceInTokenUnit):''}}</div>
            </div>
            <v-slider color="#00e1bc" track-color="#484b67" min="0" max="100" thumb-color="#00e1bc"
                      thumb-label="always" hide-details v-model="sliderValue" @input="setAmount($event)">
              <template v-slot:thumb-label="{ value }">
                {{value}}%
              </template>
            </v-slider>
          </div>
          <!--  电脑版 -> 存款APY  -->
          <div class="px-8" v-if="currentEarnStatus==='supply'">
            <div class="d-flex justify-space-between text-h6">
              <span>{{$t('supplyOrWithdraw.totalDepositIncome')}}</span>
              <span>{{ getBigNumberStr(allMarketsMap[currentAddress].supplyDistributionApy.plus(allMarketsMap[currentAddress].supplyApy),2,100) }}%</span>
            </div>
            <div class="d-flex justify-space-between py-1" style="color: #9b9daa">
              <span class="px-4">{{$t('supplyOrWithdraw.depositRate')}}</span>
              <span>{{ getBigNumberStr(allMarketsMap[currentAddress].supplyApy,2,100) }}%</span>
            </div>
            <div class="d-flex justify-space-between py-1" style="color: #9b9daa">
              <span class="px-4">＋{{$t('supplyOrWithdraw.depositMiningIncome')}}</span>
              <span>{{ getBigNumberStr(allMarketsMap[currentAddress].supplyDistributionApy,2,100) }}%</span>
            </div>
          </div>
          <!--  电脑版 -> 取款APY  -->
<!--          <div class="px-8" v-if="currentEarnStatus==='withdraw'">-->
<!--            <div class="d-flex justify-space-between text-h6">-->
<!--              <span>{{$t('supplyOrWithdraw.totalWithdrawalIncome')}}</span>-->
<!--              <span>5%</span>-->
<!--            </div>-->
<!--            <div class="d-flex justify-space-between py-1" style="color: #9b9daa">-->
<!--              <span class="px-4">{{$t('supplyOrWithdraw.withdrawalInterestRate')}}</span>-->
<!--              <span>30%</span>-->
<!--            </div>-->
<!--            <div class="d-flex justify-space-between py-1" style="color: #9b9daa">-->
<!--              <span class="px-4">—{{$t('supplyOrWithdraw.withdrawalAndMiningIncome')}}</span>-->
<!--              <span>25%</span>-->
<!--            </div>-->
<!--          </div>-->
        </div>



        <!--  电脑版 ->  Buttons  -->
        <div class="btnFooterPC d-flex align-end">
          <div class="backBtn text-center py-3 px-6 mr-2" @click="$router.push('/earn')">{{$t('supplyOrWithdraw.back')}}</div>
          <div class="text-center py-3 px-6 ml-2 nextBtn" v-if="allMarketsMap[currentAddress] && !allMarketsMap[currentAddress].isEnabled && currentEarnStatus==='supply'" @click="enable">{{$t('supplyOrWithdraw.approve')}}</div>
          <div class="text-center py-3 px-6 ml-2 nextBtn" v-if="allMarketsMap[currentAddress] && allMarketsMap[currentAddress].isEnabled && currentEarnStatus==='supply'" @click="supply">{{$t('supplyOrWithdraw.supply')}}</div>
          <div class="text-center py-3 px-6 ml-2 nextBtn" v-if="currentEarnStatus==='withdraw'" @click="withdraw">{{$t('supplyOrWithdraw.withdraw')}}</div>
        </div>

      </div>

    </v-container>
  </div>
</template>

<script>
import {mapState} from "vuex";
import BigNumber from 'bignumber.js'
import utils from '../../utils/common'
import {eX} from "@/utils/helpers";
import Compound from '@compound-finance/compound-js';
import {MaxUint256} from "@ethersproject/constants";
import numeral from "numeral";
import {formatDollars, getBigNumberStr} from "../../utils/helpers";

const compoundConstants = require("@compound-finance/compound-js/dist/nodejs/constants.js");
const gasLimitSupply = "1500000";
const gasLimitWithdrawDai = "850000";
const gasLimitWithdrawSnx = "850000";
const gasLimitWithdrawSusd = "850000";
const gasLimitWithdraw = "1500000";
const gasLimit = "500000";
const gasLimitEnable = "70000";
const gasLimitEnableDai = "66537";
const Web3 = require('web3')
let we3 = new Web3(window.ethereum)
export default {
  name: "SupplyOrWithdraw",
  data() {
    return {
      getBigNumberStr: getBigNumberStr,
      formatDollars: formatDollars,
      swapTokenQuantity:'',
      tokenQuantity: '',
      isFullWithdraw : false,
      sliderValue: 0,
      step: 1,
      whtAmount: 0,
      htAmount: 0,
      isUnwrap: false,
      htImage: require('../../assets/coin/asset_HT.svg'),
      swapEnable:false,
      sliderPreventInput: false,
    }
  },
  mounted() {
  },
  computed: {
    allMarketsMap: function () {
      return this.$store.getters.allMarketsMap
    },
    currentAddress: function (){
      const address = this.$store.state.selectedAddress
      if(address){
        return address
      }else {
        const routerAddress = this.$route.params.address
        return routerAddress
      }
    },
    currentEarnStatus: function () {
      const earnStatus = this.$store.state.earnStatus
      const routerEarnStatus = this.$route.path.substr(1,6)
      if(routerEarnStatus==='supply')
        return 'supply'
      else if(routerEarnStatus==='withdr')
        return 'withdraw'
      else
        return earnStatus
    },
    ...mapState([
      'earnStatus',
      'selectedAddress',
      'gasPrice',
      'walletAddress',
      'htBalance',
      'htBalanceBigNumber',
    ])
  },
  methods: {
    setEarnStatus(val){
      this.tokenQuantity = ''
      this.sliderValue = 0
      this.$store.commit('updateEarnStatus',val)
      this.$router.push(`/${val}/${this.currentAddress}`)
    },

    formatPrice(val){
      return numeral(val).format('$0,0.00')
    },

    formatTokenQuantity(val){
      return numeral(val).format('0,0.00')
    },

    getWalletBalanceUSD(val) {
      const balanceUSD = new BigNumber(this.allMarketsMap[this.currentAddress].underlyingPrice).times(val).toFixed(4)
      return numeral(balanceUSD).format('$0,0.0000')
    },

    getMaxAmount (symbol, walletBalanceBigNumber) {
      if (symbol === "HT") {
        // 乘以10是为了能留一些HT用作手续费
        return walletBalanceBigNumber?.minus(eX(this.gasPrice.times(gasLimit*10), -18))||0;
      } else {
        return walletBalanceBigNumber
      }
    },

    setSliderValue(tokenAmount) {
      const underlyingAddress = this.currentAddress
      const decimals = this.allMarketsMap[underlyingAddress].decimals
      const maxSupply = this.getMaxAmount(
          this.allMarketsMap[underlyingAddress].symbol,
          this.allMarketsMap[underlyingAddress].walletBalanceBigNumber
      ).toString()
      const maxWithdraw = this.allMarketsMap[underlyingAddress].supplyBalanceInTokenUnit.toFixed(decimals,1)
      const maxAmount = this.currentEarnStatus==='supply'?maxSupply:maxWithdraw

      if (new BigNumber(tokenAmount).isLessThan(0)) {
        this.tokenQuantity = '0'
        this.sliderValue = 0
      } else if (new BigNumber(tokenAmount).isGreaterThan(maxAmount)) {
        this.tokenQuantity = maxAmount
        this.sliderValue = 100
      } else {
        this.sliderPreventInput = true
        if (this.currentEarnStatus === 'supply') {
          this.sliderValue = new BigNumber(tokenAmount).div(this.allMarketsMap[this.currentAddress].walletBalanceBigNumber).times(100).toFixed(2)
        } else {
          this.sliderValue = new BigNumber(tokenAmount).div(this.allMarketsMap[this.currentAddress].supplyBalanceInTokenUnit).times(100).toFixed(2)
        }
      }
    },
    // 用户主动拖动滑块时（该函数内部过滤了更改vue.data时的触发）
    setAmount(val) {
      if (this.sliderPreventInput) {
        this.sliderPreventInput = false
        return
      }
      const underlyingAddress = this.currentAddress

      if(this.currentEarnStatus==='supply') {
        const maxSupply = this.getMaxAmount(
            this.allMarketsMap[underlyingAddress].symbol,
            this.allMarketsMap[underlyingAddress].walletBalanceBigNumber
        ).toString()
        if(val===100){
          this.tokenQuantity = maxSupply
        } else {
          this.tokenQuantity = new BigNumber(val).times(this.allMarketsMap[underlyingAddress].walletBalance).div(100).toString()
        }
      } else {
        if(val===100){
          this.isFullWithdraw = true
          this.tokenQuantity = this.allMarketsMap[underlyingAddress].supplyBalanceInTokenUnit.toFixed(6)
        } else {
          this.tokenQuantity = new BigNumber(val).times(this.allMarketsMap[underlyingAddress].supplyBalanceInTokenUnit).div(100).toString()
        }
      }
    },

    setMaxSwapAmount() {
      // WHT
      const underlyingAddress = this.currentAddress
      const htMaxAmount = this.getMaxAmount(
          'HT',
          this.htBalanceBigNumber
      ).toString()
      const whtMaxAmount = this.getMaxAmount(
          this.allMarketsMap[underlyingAddress].symbol,
          this.allMarketsMap[underlyingAddress].walletBalanceBigNumber
      ).toString()

      this.htAmount = this.isUnwrap ? whtMaxAmount : htMaxAmount
    },


    setMaxSupplyAmount() {
      const underlyingAddress = this.currentAddress

      this.tokenQuantity = this.getMaxAmount(
          this.allMarketsMap[underlyingAddress].symbol,
          this.allMarketsMap[underlyingAddress].walletBalanceBigNumber
      ).toString()
    },

    // setMaxWithdrawAmount() {
    //   const underlyingAddress = this.currentAddress
    //   // 如果isFullWithdraw 为true，withdraw全部cToken（不按withdrawAmount计）
    //   this.tokenQuantity = this.allMarketsMap[underlyingAddress].supplyBalanceInTokenUnit.toFixed(6)
    // },

    wrapHT() {
      const amount = eX(this.htAmount, 18).toFixed(0,1)
      const options = {
        from: this.walletAddress,
        gas: 80000,
        gasPrice: this.gasPrice,
        value: amount
      }
      this.contractSend['WHT'].methods.deposit().send(options).then(console.log)
    },
    unwrapWHT() {
      const amount = eX(this.htAmount, 18).toFixed(0,1)
      const options = {
        from: this.walletAddress,
        gas: 80000,
        gasPrice: this.gasPrice,
      }
      this.contractSend['WHT'].methods.withdraw(amount).send(options).then(console.log)
    },
    sendSwap() {
      if (this.swapEnable) {
        if (!this.isUnwrap) {
          this.wrapHT()
        } else {
          this.unwrapWHT()
        }
      }
    },

    enable(){
      const underlyingAddress = this.currentAddress
      const cTokenAddress = this.allMarketsMap[underlyingAddress].cTokenAddress
      const symbol = this.allMarketsMap[underlyingAddress].symbol
      this.supplyMarketsDialog = false
      this.borrowMarketsDialog = false
      this.confirmDialogShowScan = false
      this.confirmDialog = true
      this.confirmDialogTip = this.$t('pendingDialog.confirm')
      Compound.eth.trx(
          underlyingAddress,
          "approve",
          [cTokenAddress, MaxUint256], // [optional] parameters
          {
            network: utils.chainIdToName[this.chainId],
            provider: window.ethereum,
            gasLimit: symbol === "DAI" ? gasLimitEnableDai : gasLimitEnable,
            gasPrice: this.gasPrice.toString(),
            abi: compoundConstants.abi.cErc20,
          } // [optional] call options, provider, network, ethers.js "overrides"
      ).then((tx)=>{
        this.supplyMarketsDialog = false
        this.borrowMarketsDialog = false
        this.currentTxHash = tx.hash
        this.confirmDialogShowScan = true
        this.confirmDialog = true
        this.confirmDialogTip = this.$t('pendingDialog.broadcast')
        return tx.wait(1)
      }).then((txWait1)=> {
        utils.updateData()
        console.log('txWait1= ',txWait1)
        this.checkModel = true
        this.confirmDialogTip = this.$t('common.checkTips')
        setTimeout(() => {
          this.confirmDialog = false;
          this.checkModel = false
        }, 1200)
      }).catch((err) => {
        console.log(err)
        this.errorModel = true
        this.confirmDialogTip = this.$t('common.errorTips')
        setTimeout(() => {
          this.confirmDialog = false;
          this.errorModel = false
        }, 1200)
      })
    },
    validateTokenA(value) {
      //todo 监听不到对象属性变化
      this.swapEnable = false
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
      if (!this.isUnwrap){
        if (this.htAmount && parseInt(value) > parseInt(this.htBalance)) {
          // this.tokenASupply = this.tokenABalance;
          return '余额不足';
        }
        if(this.htAmount>this.htBalance)
        {
          return '余额不足'
        }
      }else {
        if (this.htAmount && parseInt(value) > parseInt(this.allMarketsMap[this.currentAddress].walletBalance)) {
          // this.tokenASupply = this.tokenABalance;
          return '余额不足';
        }
        if(this.htAmount>this.allMarketsMap[this.currentAddress].walletBalance)
        {
          return '余额不足';
        }
      }
      if(new BigNumber(value).isZero()){
        if(this.htAmount+'' === '0')
          return '请输入大于0'
        else
        {
          return true
        }
      }
      this.swapEnable =true
      return true;
    },

    supply() {
      const underlyingAddress = this.currentAddress
      const cTokenAddress = this.allMarketsMap[underlyingAddress].cTokenAddress
      const amount = this.tokenQuantity
      const decimals = this.allMarketsMap[underlyingAddress].decimals

      if (amount === '' || amount === null) return
      if (isNaN(amount)) return
      if (!new BigNumber(amount).isGreaterThan(0)) return
      if (new BigNumber(amount).isGreaterThan(this.allMarketsMap[underlyingAddress].walletBalanceBigNumber)) return;

      let parameters = [];
      let options = {
        network: utils.chainIdToName[this.chainId],
        provider: window.ethereum,
        gasLimit: gasLimitSupply,
        gasPrice: this.gasPrice.toString(),
      };

      if (underlyingAddress === utils.ethDummyAddress) {
        options.value = eX(amount, 18).toFixed(0,1);
        options.abi = compoundConstants.abi.cEther;
      } else {
        parameters.push(eX(amount, decimals).toFixed(0,1));
        options.abi = compoundConstants.abi.cErc20;
      }

      this.supplyMarketsDialog = false
      this.confirmDialogShowScan = false
      this.confirmDialog = true
      this.confirmDialogTip = this.$t('pendingDialog.confirm')
      Compound.eth.trx(
          cTokenAddress,
          "mint",
          parameters, // [optional] parameters
          options // [optional] call options, provider, network, ethers.js "overrides"
      ).then((tx)=>{
        this.supplyMarketsDialog = false
        this.currentTxHash = tx.hash
        this.confirmDialogShowScan = true
        this.confirmDialog = true
        this.confirmDialogTip = this.$t('pendingDialog.broadcast')
        return tx.wait(1)
      }).then((txWait1)=> {
        utils.updateData()
        console.log('txWait1= ',txWait1)
        this.checkModel = true
        this.confirmDialogTip = this.$t('common.checkTips')
        setTimeout(() => {
          // this.supplyMarketsDialog = false;
          this.confirmDialog = false;
          this.checkModel = false
        }, 1200)
      }).catch((err) => {
        console.log(err)
        this.errorModel = true
        this.confirmDialogTip = this.$t('common.errorTips')
        setTimeout(() => {
          this.supplyMarketsDialog = true;
          this.confirmDialog = false;
          this.errorModel = false
        }, 1200)
      })
    },

    withdraw() {
      const underlyingAddress = this.currentAddress
      const cTokenAddress = this.allMarketsMap[underlyingAddress].cTokenAddress
      const symbol = this.allMarketsMap[underlyingAddress].symbol
      let amount, decimals, func

      if (this.isFullWithdraw) {
        amount = this.allMarketsMap[underlyingAddress].pTokenBalance
        decimals = 8
        func = "redeem"
      } else {
        amount = this.tokenQuantity
        decimals = this.allMarketsMap[underlyingAddress].decimals
        func = "redeemUnderlying"
        if (amount === '' || amount === null) return
        if (isNaN(amount)) return
        if (!new BigNumber(amount).isGreaterThan(0)) return
        if (new BigNumber(amount).isGreaterThan(this.allMarketsMap[underlyingAddress].supplyBalanceInTokenUnit.toFixed(6))) return
        if (new BigNumber(amount).isGreaterThan(this.allMarketsMap[underlyingAddress].underlyingAmount)) return
      }

      const options = {
        network: utils.chainIdToName[this.chainId],
        provider: window.ethereum,
        gasLimit:
            symbol === "DAI"
                ? gasLimitWithdrawDai
                : symbol === "SNX"
                ? gasLimitWithdrawSnx
                : symbol === "sUSD"
                    ? gasLimitWithdrawSusd
                    : gasLimitWithdraw,
        gasPrice: this.gasPrice.toString(),
      };

      if (underlyingAddress === utils.ethDummyAddress) {
        options.abi = compoundConstants.abi.cEther;
      } else {
        options.abi = compoundConstants.abi.cErc20;
      }

      this.supplyMarketsDialog = false
      this.confirmDialogShowScan = false
      this.confirmDialog = true
      this.confirmDialogTip = this.$t('pendingDialog.confirm')
      Compound.eth.trx(
          cTokenAddress,
          func,
          [eX(amount, decimals).toFixed(0,0)], // [optional] parameters
          options // [optional] call options, provider, network, ethers.js "overrides"
      ).then((tx)=>{
        this.supplyMarketsDialog = false
        this.currentTxHash = tx.hash
        this.confirmDialogShowScan = true
        this.confirmDialog = true
        this.confirmDialogTip = this.$t('pendingDialog.broadcast')
        return tx.wait(1)
      }).then((txWait1)=> {
        utils.updateData()
        console.log('txWait1= ',txWait1)
        this.checkModel = true
        this.confirmDialogTip = this.$t('common.checkTips')
        setTimeout(() => {
          // this.supplyMarketsDialog = false;
          this.confirmDialog = false;
          this.checkModel = false
        }, 1200)
      }).catch((err) => {
        console.log(err)
        this.errorModel = true
        this.confirmDialogTip = this.$t('common.errorTips')
        setTimeout(() => {
          this.supplyMarketsDialog = true;
          this.confirmDialog = false;
          this.errorModel = false
        }, 1200)
      })
    },
  }
}
</script>

<style scoped lang="scss">
.grey-font {
  color: #9b9daa;
  font-size: 0.75rem;
}

.supplyContainer {
  .tokenCard {
    color: #fff;
    height: fit-content;
    background-image: url("../../assets/earn_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: #373a54;
    border-radius: 0.5rem;
    margin: 0 0.875rem;
    padding: 1.25rem;
  }
  .swapWHT {
    background-color: #373a54;
    min-height: 200px;
    color: #fff;
    border-radius: 0.5rem;
    padding: 1.25rem 0;
    margin: 0.625rem 0.875rem 0;
    .swapBtn {
      padding: 0.5rem 2rem;
      background:  linear-gradient(90deg, #00bcda, #00e1bc);
      border-radius: 50px;
      cursor: pointer;
    }
    .swapBtnDisabled {
      padding: 0.5rem 2rem;
      background: #ACB2A6;
      border-radius: 50px;
      cursor: not-allowed;
    }
  }
  .supply{
    background-color: #373a54;
    min-height: 200px;
    color: #fff;
    border-radius: 0.5rem;
    padding: 1.25rem 0;
    margin: 0.625rem 0.875rem 0;
    .tabs {
      display: flex;
      align-items: center;
      padding: 0 0.625rem;
      .supplyTab {
        width: 50%;
        color: rgba(255,255,255,0.5);
        text-align: center;
        padding: 0.5rem 0;
        border: 1px solid #53566C;
        border-radius: 1.5rem 0 0 1.5rem;
      }
      .supplyTabActive {
        width: 50%;
        text-align: center;
        padding: 0.5rem 0;
        border-radius: 1.5rem 0 0 1.5rem;
        background: linear-gradient(12deg, #00bcda, #00e1bc);
      }
      .withdrawTab {
        width: 50%;
        color: rgba(255,255,255,0.5);
        text-align: center;
        padding: 0.5rem 0;
        border: 1px solid #53566C;
        border-radius: 0 1.5rem 1.5rem 0;
      }
      .withdrawTabActive {
        width: 50%;
        text-align: center;
        padding: 0.5rem 0;
        border-radius: 0 1.5rem 1.5rem 0;
        background: linear-gradient(12deg, #00bcda, #00e1bc);
      }
    }
    .supplyInfo {
      display: flex;
      margin: 0.625rem 0;
      >div {
        width: 100%;
        >div:first-child {
          position: relative;
          width: 100%;
          color: #9b9daa;
          font-size: 0.75rem;
          padding: 0.75rem 1.25rem 0 1rem;
        }
        >div:first-child::before {
          content: "";
          width: 4px;
          height: 16px;
          background: linear-gradient( #00bcda, #00e1bc);
          position: absolute;
          left: 0;
        }
        >div:last-child {
          font-size: 1.25rem;
          font-weight: 400;
          padding: 0 1rem;
        }
      }
    }
    .withdraw {
      padding: 0 16px;
      .right {
        background-color: #484b67;
        border-radius: 0.5rem;
        >span {
          font-size: 0.75rem;
          color: #e7e7eb;
        }
      }

    }
  }

  .btnFooter {
    width: 100%;
    height: 100px;
    padding: 0 20px;
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

.stepPC {
  width: 200px;
  background-color: #53566c;
  border-radius: 0.5rem 0 0 0.5rem;
  .dot {
    width: 18px;
    height: 18px;
    margin: 0 1px;
    border-radius: 10px;
    font-size: 0.75rem;
    text-align: center;
    background-color: #9b9daa;
    color: #fff;
  }
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
  .progressLinePC {
    height: 100px;
    border-left: 1px dashed #9b9daa;
    margin-left: 10px;
  }
  .progressLinePCActive {
    height: 100px;
    border-left: 1px dashed #00d3c7;
    margin-left: 10px;
  }

}

.supplyOrWithdrawPC {
  width: 100%;
  min-height: 500px;
  background-color: #373a54;
  color: #fff;
  border-radius: 0 0.5rem 0.5rem 0;
  .step {
    padding: 2rem 2rem 0;
    >p {
      color: #9b9daa;
    }
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
  .swapPC {
    .swapBtn{
      border: #00e1bc solid 1px;
      border-radius: 50px;
      height:50px;
      color:#00e1bc;
      cursor: pointer;
    }
    .swapBtnDisabled{
      //border: #00e1bc solid 1px;
      border-radius: 50px;
      height:50px;
      color:#fff!important;
      background: #ACB2A6;
      cursor: not-allowed!important;
    }
  }
  .tabsPC {
    display: flex;
    align-items: center;
    padding: 0 2rem;
    .supplyTabPC {
      width: 50%;
      color: rgba(255,255,255,0.5);
      text-align: center;
      padding: 0.5rem 0;
      border: 1px solid #53566C;
      border-radius: 1.5rem 0 0 1.5rem;
    }
    .supplyTabPCActive {
      width: 50%;
      text-align: center;
      padding: 0.5rem 0;
      border-radius: 1.5rem 0 0 1.5rem;
      background: linear-gradient(12deg, #00bcda, #00e1bc);
    }
    .supplyTabPC:hover {
      cursor: pointer;
    }
    .withdrawTabPC {
      width: 50%;
      color: rgba(255,255,255,0.5);
      text-align: center;
      padding: 0.5rem 0;
      border: 1px solid #53566C;
      border-radius: 0 1.5rem 1.5rem 0;
    }
    .withdrawTabPC:hover {
      cursor: pointer;
    }
    .withdrawTabPCActive {
      width: 50%;
      text-align: center;
      padding: 0.5rem 0;
      border-radius: 0 1.5rem 1.5rem 0;
      background: linear-gradient(12deg, #00bcda, #00e1bc);
    }
  }
  .supplyInfoPC {
    display: flex;
    padding: 0 2rem;
    margin: 0.625rem 0;
    >div {
      width: 100%;
      >div:first-child {
        position: relative;
        width: 100%;
        color: #9b9daa;
        font-size: 1rem;
        padding: 0.75rem 1.25rem 0 1rem;
      }
      >div:first-child::before {
        content: "";
        width: 4px;
        height: 16px;
        background: linear-gradient( #00bcda, #00e1bc);
        position: absolute;
        left: 0;
      }
      >div:last-child {
        font-size: 1.5rem;
        font-weight: 400;
        padding: 0 1rem;
      }
    }
  }
  .withdrawPC {
    padding: 0;
    .right {
      background-color: #484b67;
      border-radius: 0.5rem;
      >span {
        font-size: 0.75rem;
        color: #e7e7eb;
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
//btn渐变
::v-deep .v-btn:not(.v-btn--disabled) {
  background: linear-gradient(7deg, #00bcda, #00e1bc);
}
//滑块
::v-deep .v-slider--horizontal .v-slider__track-container {
  height: 8px;
}
::v-deep .v-slider__track-fill{
  background: repeating-linear-gradient(60deg,rgba(255,255,255,.25),rgba(255,255,255,.25)5px,transparent 0,transparent 10px),linear-gradient(90deg, #11FFB7 0%, #3943CE 120%) !important;
}
::v-deep .v-slider__thumb {
  width: 16px;
  height: 16px;
  left: -8px;
  background: linear-gradient(150deg, #11FFB7 0%, #3943CE 100%);
}
::v-deep .v-slider__thumb::before {
  display: none;
}
::v-deep .v-slider__track-background,
::v-deep .v-slider__track-fill {
  border-radius: 8px;
}
::v-deep .v-slider__thumb-label {
  border-radius: 50%;
  background: linear-gradient(150deg, #11FFB7 0%, #3943CE 100%);
}
::v-deep .v-slider--horizontal .v-slider__thumb-label {
  transform: translateY(-20%) translateY(22px) translateX(-50%) rotate(45deg) !important;
}
//icon
::v-deep .theme--light.v-icon:focus::after {
  opacity: 0;
}
//折叠面板
::v-deep .theme--light.v-expansion-panels .v-expansion-panel {
  background-color: #373a54;
}
::v-deep .theme--light.v-expansion-panels .v-expansion-panel-header .v-expansion-panel-header__icon .v-icon {
  color: rgba(255,255,255,0.54);
}
::v-deep .v-expansion-panel-header {
  padding: 0.5rem;
  color: #9b9daa;
}
::v-deep .v-expansion-panel-content__wrap {
  padding: 0 0 0.5rem;
}
</style>

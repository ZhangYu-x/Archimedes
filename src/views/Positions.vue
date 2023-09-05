<template>
  <div>
    <!--  手机版  -->
    <div class="hidden-md-and-up">
      <div class="positionList">
        <h5 class="font-italic pt-5">All Positions</h5>
        <div v-for="(item,i) in wholeAllUserPositionsDetails" :key="i"  class="pool py-4">
          <div class="d-flex justify-space-between">
            <div class="d-flex align-center">
              <img :src="item.poolLogoSource" width="50" class="mr-2" alt="">
              <div>
                <div class="grey-font">Yield Farming</div>
                <div class="text-caption">{{item.poolName}}</div>
              </div>
            </div>
            <div>
              <div class="white--text text-h5">#{{item.id}}</div>
            </div>
          </div>
          <div class="py-3 text-body-2">
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">Collateral Value</span>
              <span>${{item.collateralValue}}</span>
            </div>
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">Borrow Credit</span>
              <span>{{item.borrowCredit}}</span>
            </div>
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">Collateral Credit</span>
              <span>{{item.collateralCredit}}</span>
            </div>
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">Debt Ratio</span>
              <div class="d-flex align-center" style="width: 45%">
                <v-progress-linear
                    :color="item.debtRatioTimes100>95 ?'#e10040':'#00e1bc'" class="mr-2"
                    background-color="#484b67"
                    rounded
                    :value="item.debtRatioTimes100"
                    height="8"
                ></v-progress-linear>
                <span>{{item.debtRatioTimes100}}%</span>
              </div>

            </div>
          </div>
          <div class="liquidityBtn" :disabled="parseFloat(item.debtRatioTimes100)<100" @click="goLiquidate(item)">
            LIQUIDATE
          </div>
        </div>
      </div>
      <div class="py-12"></div>
    </div>

    <!--  电脑版  -->
    <v-container class="hidden-sm-and-down" style="max-width: 1200px">
      <div class="positionListPC">
        <!--  电脑版 -> 标题  -->
        <div class="d-flex align-center pt-8 px-4 white--text">
          <v-icon color="#fff">mdi-lock</v-icon>
          <span class="ml-2">{{$t('positions.allPositions')}}</span>
        </div>

        <!--  电脑版 -> 表头  -->
        <div class="positionListPCHeader grey-font py-4">
          <div class="positionListPCHeader-left">{{$t('positions.symbol')}}</div>
          <div class="positionListPCHeader-pool">{{$t('positions.pool')}}</div>
          <div class="positionListPCHeader-center">{{$t('positions.collateralValue')}}</div>
          <div class="positionListPCHeader-center">{{$t('positions.borrowCredit')}}</div>
          <div class="positionListPCHeader-center">{{$t('positions.collateralCredit')}}</div>
          <div class="positionListPCHeader-center">{{$t('positions.debtRatio')}}</div>
          <div class="positionListPCHeader-right">{{$t('positions.action')}}</div>
        </div>

        <!--  电脑版 -> 内容  -->
        <div v-for="(item,index)  in wholeAllUserPositionsDetails" :key="index" class="positionListPCContent">
          <div class="positionListPCContent-left">#{{item.id}}</div>
          <div class="positionListPCContent-pool d-flex align-center justify-center">
            <img :src="item.poolLogoSource" class="mx-4" width="40" height="40" alt="">
            <span>{{item.poolName}}</span>
          </div>
          <div class="positionListPCContent-center">${{item.collateralValue}}</div>
          <div class="positionListPCContent-center">{{item.borrowCredit}}</div>
          <div class="positionListPCContent-center">{{item.collateralCredit}}</div>
          <div class="positionListPCContent-center">{{item.debtRatioTimes100}}%</div>
          <div class="positionListPCContent-right">
            <v-btn outlined color="#41e1ad" :disabled="parseFloat(item.debtRatioTimes100)<100" @click="goLiquidate(item)">
              {{$t('positions.liquidate')}}
            </v-btn>
          </div>
        </div>
      </div>
    </v-container>
  </div>

</template>

<script>
import {mapState} from "vuex";
import {getPoolName, lpLogoSource} from "../utils";
import utils from "@/utils/common";
import {eX} from "../utils/helpers";
export default {
  name: "Positions",
  data() {
    return {
      allowance:0,
      liquidate:false,
    }
  },
  mounted() {
    if (this.allMarketsDetails.length > 0 || this.allPoolsDetails.length > 0) {
      this.update()
    } else {
      setTimeout(()=>{
        if (this.allMarketsDetails.length > 0 || this.allPoolsDetails.length > 0) {
          this.update()
        }
      },3000)
    }
  },
  computed: {
    wholeAllUserPositionsDetails: {
      get(){
        return this.$store.state.wholeAllUserPositionsDetails
      },
      set(value){
        this.$store.commit('updateWholeAllUserPositionsDetails',value)
      }
    },
    allPoolsMap() {
      return this.$store.getters.allPoolsMap
    },
    allMarketsMap() {
      return this.$store.getters.allMarketsMap
    },
    ...mapState([
      'selectedPoolType',
      'selectedPoolDEX',
      'selectedPoolTokens',
      'selectedPoolAddress',
      'selectedPositionId',
      'walletAddress',
      'htBalance',
      'htBalanceBigNumber',
      'gasPrice',
      'slippageTolerance',
      'allUserPositionsDetails',
      'allMarketsDetails',
      'allPoolsDetails',
    ])
  },
  methods:{
    goLiquidate(pool){
      this.$store.commit('updateSelectedPositionId', pool.id)
      this.$store.commit('updateSelectedPoolAddress', pool.lpTokenAddress)
      this.$router.push(`/liquidate/${pool.lpTokenAddress}`)
    },
    getPoolName(pool) {
      return pool.poolDEX + ' ' + getPoolName(pool.poolTokens)
    },
    getPoolLogoSource(pool) {
      return lpLogoSource(pool.poolTokens)
    },
    update() {
      utils.updateAllUserPositionsDetails().then(() => {
        this.wholeAllUserPositionsDetails = this.allUserPositionsDetails.concat().map((detail) => {
          const poolDetail = this.allPoolsMap[detail.lpTokenAddress]
          const poolName = this.getPoolName(poolDetail)
          const poolLogoSource = this.getPoolLogoSource(poolDetail)
          const tokenAAddress = poolDetail.poolTokens[0]
          const tokenBAddress = poolDetail.poolTokens[1]
          const tokenADecimals = this.allMarketsMap[tokenAAddress].decimals
          const tokenBDecimals = this.allMarketsMap[tokenBAddress].decimals
          const tokenAPrice = this.allMarketsMap[tokenAAddress].underlyingPrice
          const tokenBPrice = this.allMarketsMap[tokenBAddress].underlyingPrice
          const tokenAFactorBorr = this.allMarketsMap[tokenAAddress].priceFactorBorr
          const tokenBFactorBorr = this.allMarketsMap[tokenBAddress].priceFactorBorr
          const tokenADebt = eX(detail.positionDebts.debts[detail.positionDebts.tokens.indexOf(tokenAAddress)] || 0
              ,-1*tokenADecimals)
          const tokenBDebt = eX(detail.positionDebts.debts[detail.positionDebts.tokens.indexOf(tokenBAddress)] || 0
              ,-1*tokenBDecimals)
          const collateralValue = eX(detail.collateralSize,-18).times(poolDetail.lpPrice)
          const collateralCredit = collateralValue.times(poolDetail.priceFactorColl)
          const debtACredit = tokenADebt.times(tokenAPrice).times(tokenAFactorBorr)
          const debtBCredit = tokenBDebt.times(tokenBPrice).times(tokenBFactorBorr)
          const borrowCredit = debtACredit.plus(debtBCredit)
          const debtRatio = borrowCredit.div(collateralCredit)

          const res = detail
          res.poolName = poolName
          res.poolLogoSource = poolLogoSource
          res.collateralValue = collateralValue.toFixed(2)
          res.collateralCredit = collateralCredit.toFixed(2)
          res.borrowCredit = borrowCredit.toFixed(2)
          res.debtRatioTimes100 = debtRatio.times(100).toFixed(2)
          return res
        }).sort((a, b) => {
          return Number(b.debtRatioTimes100) - Number(a.debtRatioTimes100)
        })
      })
    },

    // percent:function (item) {
    //
    //     console.log(parseFloat(item)-100)
    // }
  }
}
</script>

<style scoped lang="scss">
.grey-font {
  color: #9b9daa;
  font-size: 0.75rem;
}
.positionList {
  background-color: #373a54;
  color: #fff;
  border-radius: 0.5rem;
  padding: 0 1rem;
  margin: 0 0.875rem;
  .pool {
    border-bottom: 1px solid #53566c;
    .liquidityBtn {
      border-radius: 50px;
      border: 1px solid #41E1AD;
      padding: 0.75rem;
      text-align: center;
    }
  }
  .pool:last-child {
    border-bottom: none;
  }
}
.positionListPC {
  background-color: #373a54;
  border-radius: 0.5rem;
  padding: 0 1rem;
  .positionListPCHeader {
    display: flex;
    border-bottom: 1px solid #53566c;
    &-left {
      width: 8%;
      text-align: right;
    }
    &-pool {
      width: 22%;
      text-align: center;
    }
    &-center {
      width: 14%;
      text-align: center;
    }
    &-right {
      width: 14%;
      text-align: center;
    }
  }
  .positionListPCContent {
    color: #fff;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #53566c;
    padding: 1rem 0;
    &-left {
      width: 8%;
      text-align: right;
    }
    &-pool {
      width: 22%;
      text-align: center;
    }
    &-center {
      width: 14%;
      text-align: center;
    }
    &-right {
      width: 14%;
      text-align: center;
    }
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>

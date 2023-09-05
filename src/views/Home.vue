<template>
  <div>
    <!--  手机和Ipad版  -->
    <div class="home hidden-md-and-up">
      <div class="userInfo">
        <h5 class="font-italic px-4 pt-4">{{$t('home.YourInfo')}}</h5>
        <div class="total">
          <div>
            <div>{{$t('home.TotalCollateral')}}</div>
            <div>{{ formatDollars(getBigNumberStr(userTotalCollateralValue, 2)) }}</div>
          </div>
          <div>
            <div>{{$t('home.TotalBorrow')}}</div>
            <div>{{ formatDollars(getBigNumberStr(userTotalDebtValue, 2)) }}</div>
          </div>
        </div>
        <div class="position">
          <div>{{$t('home.myPositions')}}</div>
          <span v-if="userPositionsDetails.length===0" class="text-center py-2">
            {{$t('home.prompt')}}
          </span>
          <span v-else>{{$t('home.learnMore')}}</span>
          <v-expansion-panels
              accordion flat
              multiple
          >
            <v-expansion-panel
                v-for="(item,i) in userPositionsDetails"
                :key="i"
            >
              <v-expansion-panel-header>
                <div class="d-flex align-center white--text">
                  <span>#{{item.id}}</span>
                  <img :src="getPoolLogoSource(allPoolsMap[item.lpTokenAddress])" width="30" class="mx-2" alt="">
                  <span>{{getPoolName(allPoolsMap[item.lpTokenAddress])}}</span>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="white--text">
                <div class="d-flex justify-space-between align-center">
                  <div class="grey-font">Collateral Value</div>
                  <div class="">${{getBigNumberStr(item.collateralValue,2)}}</div>
                </div>
                <div class="d-flex justify-space-between align-center">
                  <div class="grey-font">Borrow Value</div>
                  <div>{{getBigNumberStr(item.borrowValue,2)}}</div>
                </div>
                <div class="d-flex justify-space-between align-center">
                  <div class="grey-font">APR</div>
                  <div>{{getBigNumberStr(item.Apy,2,100)}}%</div>
                </div>
                <div class="d-flex justify-space-between align-center">
                  <div class="grey-font">Debt Ratio</div>
                  <div>{{getBigNumberStr(item.debtRatioTimes100,2)}}%</div>
                </div>
                <div class="d-flex justify-space-between align-center">
                  <div class="grey-font">{{item.pool.tokenA.symbol||''}} Amount</div>
                  <div>{{getBigNumberStr(item.tokenAPositionBalance,2)}}</div>
                </div>
                <div class="d-flex justify-space-between align-center">
                  <div class="grey-font">{{item.pool.tokenB.symbol||''}} Amount</div>
                  <div>{{getBigNumberStr(item.tokenBPositionBalance,2)}}</div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
      <div class="global">
        <h5 class="font-italic px-4 pt-4">{{$t('home.global')}}</h5>
        <div class="totalValue">
          <div>{{$t('home.TotalValue')}}</div>
          <div>{{ formatDollars(getBigNumberStr(totalValueLocked,2)) }}</div>
        </div>
        <div style="width: 100%;overflow-x: auto">
          <div class="cardContainer" style="width:27rem">
            <div class="cardTotal pa-3">
              <img src="../assets/collateral.png" width="20" height="20" alt="">
              <div class="grey-font">{{$t('home.TotalCollateral')}}</div>
              <div class="text-body-2 mt-1">{{ formatDollars(getBigNumberStr(totalPoolTvl,2)) }}</div>
            </div>
            <div class="cardTotal pa-3">
              <img src="../assets/borrow.png" width="20" height="20" alt="">
              <div class="grey-font">{{$t('home.TotalBorrow')}}</div>
              <div class="text-body-2 mt-1">{{ formatDollars(getBigNumberStr(IBankTotalDebtValue,2)) }}</div>
            </div>
            <div class="cardTotal pa-3">
              <img src="../assets/action.png" width="20" height="20" alt="">
              <div class="grey-font">{{$t('home.ActivePositions')}}</div>
              <div class="text-body-2 mt-1">{{ positionsAmount||'0' }} {{$t('home.Positions')}}</div>
            </div>
          </div>
        </div>

      </div>
      <div class="farmPool">
        <h5 class="font-italic pt-4">{{$t('home.FarmPools')}}</h5>
        <v-text-field
            label="Search" v-model="searchPool"
            solo dense flat color="#aaaaaa" class="mt-5"
        >
          <template v-slot:prepend-inner>
            <v-icon color="#aaaaaa">mdi-magnify</v-icon>
          </template>
        </v-text-field>
<!--        <div class="tabs grey-font d-flex align-center">-->
<!--          <div class="tabItemActive d-flex align-center justify-center">{{$t('home.all')}}</div>-->
<!--          <div class="tabItem d-flex align-center justify-center">{{$t('home.yield')}}<br/>{{$t('home.farming')}}</div>-->
<!--          <div class="tabItem d-flex align-center justify-center">{{$t('home.liquidity')}}<br/>{{$t('home.providing')}}</div>-->
<!--        </div>-->
        <div v-for="(pool,i) in allPool" :key="i"  class="pool py-4">
          <div class="d-flex justify-space-between">
            <div class="d-flex align-center">
              <img :src="getPoolLogoSource(pool)" width="50" class="mr-2" alt="">
              <div>
                <div class="grey-font">{{ pool.poolType }}</div>
                <div class="text-caption">{{ getPoolName(pool) }}</div>
              </div>
            </div>
            <div>
              <div class="white--text text-h5">{{ getBigNumberStr(pool.leverageApy,2,100) }}%</div>
              <div class="grey-font text-right text-decoration-line-through">{{ getBigNumberStr(pool.rewardTokenApy,2,100) }}%</div>
            </div>
          </div>
          <div class="py-3 text-body-2">
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">{{$t('home.yieldFarming')}}</span>
              <span>{{ getBigNumberStr(pool.leverageMdxApy,1,100) }}%</span>
            </div>
<!--            <div class="d-flex py-1 justify-space-between">-->
<!--              <span style="color: #9b9daa">{{$t('home.tradingFee')}}</span>-->
<!--              <span>15.3%</span>-->
<!--            </div>-->
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">{{$t('home.halphaAPY')}}</span>
              <span>{{ getBigNumberStr(pool.averageACMDApy,1,100) }}%</span>
            </div>
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">{{$t('home.borrowAPY')}}</span>
              <span>{{ getBigNumberStr(pool.averageBorrowApy,1,100) }}%</span>
            </div>
          </div>
          <div class="farmBtn" @click="goFarm(pool)">
            {{$t('home.farm')}} {{ pool.maxLeverage }}X
          </div>
        </div>
      </div>
      <div class="media">
        <div v-for="(item,i) in media" :key="i">
          <img :src="item.src" width="25" height="25" alt="">
        </div>
      </div>
      <div class="py-10"></div>
    </div>

    <!--  电脑版  -->
    <v-container class="homePC hidden-sm-and-down" style="max-width: 1200px">

      <!--  电脑版 -> 主体部分  -->
      <div class="leftSide">

        <!--  电脑版 -> 主体部分 -> TVL/Global  -->
        <div class="d-flex justify-space-between">
          <div class="totalValueLocked pa-4">
            <div class="d-flex align-center">
              <v-icon color="#fff">mdi-lock</v-icon>
              <span class="ml-2">{{$t('home.TotalValue')}}</span>
            </div>
            <div class="text-h4 py-4">
              {{ formatDollars(getBigNumberStr(totalValueLocked,2)) }}
            </div>
          </div>
          <div class="globalValue pa-4">
            <div class="d-flex align-center">
              <v-icon color="#fff">mdi-web</v-icon>
              <span class="ml-2">{{$t('home.global')}}</span>
            </div>
            <div class="pt-4">
              <div class="d-flex justify-space-between py-1">
                <span>{{$t('home.TotalCollateral')}}</span>
                <span class="">{{ formatDollars(getBigNumberStr(totalPoolTvl,2)) }}</span>
              </div>
              <div class="d-flex justify-space-between py-1">
                <span>{{$t('home.TotalBorrow')}}</span>
                <span>{{ formatDollars(getBigNumberStr(IBankTotalDebtValue,2)) }}</span>
              </div>
              <div class="d-flex justify-space-between py-1">
                <span>{{$t('home.ActivePositions')}}</span>
                <span>{{ positionsAmount||'0' }} {{$t('home.Positions')}}</span>
              </div>
            </div>
          </div>
        </div>

        <!--  电脑版 -> 主体部分 -> FarmPools  -->
        <div class="farmPoolPC">
          <h4 class="font-italic pt-4">{{$t('home.FarmPools')}}</h4>

          <!--  电脑版 -> 主体部分 -> FarmPools -> 搜索框  -->
          <v-text-field label="Search" solo dense hide-details flat color="#aaaaaa" class="mt-5" v-model="searchPool">
            <template v-slot:prepend-inner>
              <v-icon color="#aaaaaa">mdi-magnify</v-icon>
            </template>
          </v-text-field>
          <!--  电脑版 -> 主体部分 -> FarmPools -> 标签页  -->
<!--          <div class="tabs grey-font d-flex align-center">-->
<!--            <div class="tabItemActive d-flex align-center justify-center">{{$t('home.all')}}</div>-->
<!--            <div class="tabItem d-flex align-center justify-center">{{$t('home.yield')}}<br/>{{$t('home.farming')}}</div>-->
<!--            <div class="tabItem d-flex align-center justify-center">{{$t('home.liquidity')}}<br/>{{$t('home.providing')}}</div>-->
<!--          </div>-->

          <!--  电脑版 -> 主体部分 -> FarmPools -> 池子  -->
          <div v-for="(pool,i) in allPool" :key="i" class="pool py-4">
            <div class="d-flex justify-space-between align-center">
              <div class="d-flex align-center">
                <img :src="getPoolLogoSource(pool)" width="50" class="mr-2" alt="">
                <div>
                  <div class="grey-font">{{ pool.poolType }}</div>
                  <div class="text-caption">{{ getPoolName(pool) }}</div>
                </div>
              </div>
              <div class="text-right" style="flex-basis: 18%">
                <div class="white--text text-h5">{{ getBigNumberStr(pool.leverageApy,2,100) }}%</div>
                <div class="grey-font text-decoration-line-through">{{ getBigNumberStr(pool.rewardTokenApy,2,100) }}%</div>
              </div>
              <div class="text-caption" style="width: 18%">
                <div class="d-flex justify-space-between">
                  <span style="color: #9b9daa">{{$t('home.yieldFarming')}}</span>
                  <span>{{ getBigNumberStr(pool.leverageMdxApy,1,100) }}%</span>
                </div>
                <div class="d-flex justify-space-between">
                  <span style="color: #9b9daa">{{$t('home.halphaAPY')}}</span>
                  <span>{{ getBigNumberStr(pool.averageACMDApy,1,100) }}%</span>
                </div>
                <div class="d-flex justify-space-between">
                  <span style="color: #9b9daa">{{$t('home.borrowAPY')}}</span>
                  <span>{{ getBigNumberStr(pool.averageBorrowApy,1,100) }}%</span>
                </div>
              </div>
              <div style="width: 15%" class="px-2">
                <v-btn outlined class="my-1" color="#41e1ad" small dark block
                       @click="goFarm(pool)">
                 {{$t('home.farm')}} {{ pool.maxLeverage }}X
                </v-btn>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!--  电脑版 -> 右侧边栏  -->
      <div class="rightSide">
        <h4 class="font-italic px-4 pt-4">{{$t('home.YourInfo')}}</h4>
        <div class="total">
          <div>
            <div>{{$t('home.TotalCollateral')}}</div>
            <div>{{ formatDollars(getBigNumberStr(userTotalCollateralValue, 2)) }}</div>
          </div>
          <div>
            <div>{{$t('home.TotalBorrow')}}</div>
            <div>{{ formatDollars(getBigNumberStr(userTotalDebtValue, 2)) }}</div>
          </div>
        </div>
        <v-divider color="#53566c" class="my-2 mx-4"></v-divider>
        <div class="px-4 pt-2 pb-4">
          <div class="text-caption">{{$t('home.myPositions')}}</div>
          <div v-if="userPositionsDetails.length===0" class="py-2">
            {{$t('home.prompt')}}
          </div>
          <span v-else class="grey-font">{{$t('home.learnMore')}}</span>
          <v-expansion-panels
              accordion flat
              multiple
          >
            <v-expansion-panel
                v-for="(item,i) in userPositionsDetails"
                :key="i"
            >
              <v-expansion-panel-header>
                <div class="d-flex align-center white--text">
                  <span>#{{item.id}}</span>
                  <img :src="getPoolLogoSource(allPoolsMap[item.lpTokenAddress])" width="30" class="mx-2" alt="">
                  <span>{{getPoolName(allPoolsMap[item.lpTokenAddress])}}</span>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="white--text">
                <div class="d-flex justify-space-between align-center">
                  <div class="grey-font">Collateral Value</div>
                  <div class="">{{formatDollars(getBigNumberStr(item.collateralValue,2))}}</div>
                </div>
                <div class="d-flex justify-space-between align-center">
                  <div class="grey-font">Borrow Value</div>
                  <div>{{formatDollars(getBigNumberStr(item.borrowValue,2))}}</div>
                </div>
                <div class="d-flex justify-space-between align-center">
                  <div class="grey-font">APR</div>
                  <div>{{getBigNumberStr(item.Apy,2,100)}}%</div>
                </div>
                <div class="d-flex justify-space-between align-center">
                  <div class="grey-font">Debt Ratio</div>
                  <div>{{getBigNumberStr(item.debtRatioTimes100,2)}}%</div>
                </div>
                <div class="d-flex justify-space-between align-center">
                  <div class="grey-font">{{item.pool.tokenA.symbol||''}} Amount</div>
                  <div>{{getBigNumberStr(item.tokenAPositionBalance,2)}}</div>
                </div>
                <div class="d-flex justify-space-between align-center">
                  <div class="grey-font">{{item.pool.tokenB.symbol||''}} Amount</div>
                  <div>{{getBigNumberStr(item.tokenBPositionBalance,2)}}</div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import {getPoolName, lpLogoSource} from "../utils";
import { mapState } from 'vuex'
import BigNumber from 'bignumber.js'
import {eX, formatDollars, getBigNumberStr} from "../utils/helpers";
import {allFarmPools} from "../utils/constants";

export default {
  name: 'Home',
  mounted() {
  },
  methods: {
    getPoolName(pool) {
      return pool.poolDEX + ' ' + getPoolName(pool.poolTokens)
    },
    getPoolLogoSource(pool) {
      return lpLogoSource(pool.poolTokens)
    },
    goFarm(pool) {
      this.$store.commit('updateSelectedPoolType', pool.poolType)
      this.$store.commit('updateSelectedPoolDEX', pool.poolDEX)
      this.$store.commit('updateSelectedPoolTokens', pool.poolTokens)
      this.$store.commit('updateSelectedPoolAddress', pool.poolAddress)
      this.$store.commit('updateSelectedPositionId', 0)
      this.$router.push('/open')
    },
    getTokenASymbol(pool) {
      const lpTokenAddress = pool.lpTokenAddress
      const tokenAAddress = this.allPoolsMap[lpTokenAddress].poolTokens[0]
      return this.allMarketsMap[tokenAAddress]?.symbol
    },
    getTokenBSymbol(pool) {
      const lpTokenAddress = pool.lpTokenAddress
      const tokenBAddress = this.allPoolsMap[lpTokenAddress].poolTokens[1]
      return this.allMarketsMap[tokenBAddress]?.symbol
    },
    tokenAAmount(pool) {
      const lpTokenAddress = pool.lpTokenAddress
      const tokenAAddress = this.allPoolsMap[lpTokenAddress].poolTokens[0]
      return new BigNumber(pool.collateralSize)
          .div(this.allPoolsMap[lpTokenAddress].lpTotalSupply)
          .times(this.allPoolsMap[lpTokenAddress].lpReserves[0])
          .div(Math.pow(10,this.allMarketsMap[tokenAAddress]?.decimals||1)).toFixed(4,1)
    },
    tokenBAmount(pool) {
      const lpTokenAddress = pool.lpTokenAddress
      const tokenBAddress = this.allPoolsMap[lpTokenAddress].poolTokens[1]
      return new BigNumber(pool.collateralSize)
          .div(this.allPoolsMap[lpTokenAddress].lpTotalSupply)
          .times(this.allPoolsMap[lpTokenAddress].lpReserves[1])
          .div(Math.pow(10,this.allMarketsMap[tokenBAddress]?.decimals||1)).toFixed(4,1)
    },
    debtRatioTimes100(pool) {
      const lpTokenAddress = pool.lpTokenAddress
      const tokenAAddress = this.allPoolsMap[lpTokenAddress].poolTokens[0]
      const tokenADebtAmount = new BigNumber(pool.positionDebts.debts[pool.positionDebts.tokens.indexOf(tokenAAddress)]).div(Math.pow(10,this.allMarketsMap[tokenAAddress]?.decimals||1))
      const tokenBAddress = this.allPoolsMap[lpTokenAddress].poolTokens[1]
      const tokenBDebtAmount = new BigNumber(pool.positionDebts.debts[pool.positionDebts.tokens.indexOf(tokenBAddress)]).div(Math.pow(10,this.allMarketsMap[tokenBAddress]?.decimals||1))
      const debtRatio = new BigNumber(this.allMarketsMap[tokenAAddress]?.priceFactorBorr).times(tokenADebtAmount).times(this.allMarketsMap[tokenAAddress]?.underlyingPrice)
        .plus(new BigNumber(this.allMarketsMap[tokenBAddress]?.priceFactorBorr).times(tokenBDebtAmount).times(this.allMarketsMap[tokenBAddress]?.underlyingPrice))
        .div(new BigNumber(this.collateralValue(pool)).times(this.allPoolsMap[lpTokenAddress].priceFactorColl)).times(100).toFixed(2)
      return  debtRatio
    },
    collateralValue(pool) {
      const lpTokenAddress = pool.lpTokenAddress
      return eX(pool.collateralSize,-18).times(this.allPoolsMap[lpTokenAddress].lpPrice).toFixed(4)
    },
    borrowValue(pool) {
      const lpTokenAddress = pool.lpTokenAddress
      const tokenAAddress = this.allPoolsMap[lpTokenAddress].poolTokens[0]
      const tokenADebtAmount = new BigNumber(pool.positionDebts.debts[pool.positionDebts.tokens.indexOf(tokenAAddress)]).div(Math.pow(10,this.allMarketsMap[tokenAAddress]?.decimals||1))
      const tokenBAddress = this.allPoolsMap[lpTokenAddress].poolTokens[1]
      const tokenBDebtAmount = new BigNumber(pool.positionDebts.debts[pool.positionDebts.tokens.indexOf(tokenBAddress)]).div(Math.pow(10,this.allMarketsMap[tokenBAddress]?.decimals||1))
      const borrowValue = new BigNumber(tokenADebtAmount).times(this.allMarketsMap[tokenAAddress]?.underlyingPrice)
          .plus(new BigNumber(tokenBDebtAmount).times(this.allMarketsMap[tokenBAddress]?.underlyingPrice)).toFixed(4,0)
      return borrowValue
    }
  },
  data() {
    return {
      getBigNumberStr: getBigNumberStr,
      formatDollars: formatDollars,
      media: [
        {
          url: '',
          src: require('../assets/media/wechat.svg')
        },
        {
          url: '',
          src: require('../assets/media/sina-weibo.svg')
        },
        {
          url: '',
          src: require('../assets/media/telegram.svg')
        },
        {
          url: '',
          src: require('../assets/media/twitter.svg')
        },
        {
          url: '',
          src: require('../assets/media/github.svg')
        }
      ],
      searchPool: '', //输入框的搜索
    }
  },
  computed: {
    allPool: function (){
      if (this.allPoolsDetails.length === 0) {
        return allFarmPools['heco-mainnet']
      }
      if(!this.searchPool)
        return this.allPoolsDetails
      else
        return this.allPoolsDetails.filter(item=>this.getPoolName(item).toLowerCase().indexOf(this.searchPool.toLowerCase())>-1)
    },
    allPoolsMap() {
      return this.$store.getters.allPoolsMap
    },
    allMarketsMap() {
      return this.$store.getters.allMarketsMap
    },
    totalValueLocked: function (){
      return this.totalPoolTvl.plus(this.allMarketsTotalSupplyBalance)
    },
    ...mapState([
      'userPositionsDetails',
      'allMarketsDetails',
      'allPoolsDetails',
      'totalPoolTvl',
      'allMarketsTotalSupplyBalance',
      'IBankTotalDebtValue',
      'positionsAmount',
      'userTotalCollateralValue',
      'userTotalDebtValue',
    ])
  }
}
</script>

<style scoped lang="scss">
  .grey-font {
    color: #9b9daa;
    font-size: 0.75rem;
  }
  .home {
    background-color: #2b2d44;
    color: #fff;
    padding: 0 0.875rem;
    .userInfo {
      width: 100%;
      height: fit-content;
      background-image: url("../assets/info_bg.png");
      background-repeat: no-repeat;
      background-size: cover;
      background-color: #373a54;
      border-radius: 0.5rem;
      .total {
        display: flex;
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
      .position {
        font-size: 0.75rem;
        padding: 0.75rem 1rem;
        div {
          color: #9b9daa;
          margin-bottom: 0.25rem;
        }
      }
    }
    .global {
      width: 100%;
      background-color: #373a54;
      border-radius: 0.5rem;
      margin-top: 0.625rem;
      .totalValue {
        width: 100%;
        >div:first-child {
          width: 100%;
          color: #9b9daa;
          font-size: 0.75rem;
          padding: 1.25rem 1.25rem 0 1rem;
        }
        >div:last-child {
          font-size: 1.25rem;
          font-weight: 400;
          padding: 0 1rem;
        }
      }
      .cardContainer {
        display: flex;
        flex-wrap: nowrap;
        white-space: nowrap;
        margin: 1rem;
        .cardTotal {
          min-width: 8.5rem;
          width: fit-content;
          height: 5.3rem;
          border-radius: 0.5rem;
          background-color: #484b67;
          margin-right: 0.3125rem;
        }
      }
      ::-webkit-scrollbar {
        display: none;
      }
    }
    .farmPool {
      background-color: #373a54;
      border-radius: 0.5rem;
      padding: 0 1rem;
      margin-top: 0.625rem;
      .tabs {
        width: 100%;
        .tabItem {
          width: 33.33%;
          text-align: center;
        }
        .tabItemActive {
          width: 33.33%;
          height: 2.5rem;
          text-align: center;
          background: linear-gradient(12deg, #00bcda, #00e1bc);
          color: #fff;
          border-radius: 50px;
        }
      }
      .pool {
        border-bottom: 1px solid #53566c;
        .farmBtn {
          border-radius: 50px;
          background: linear-gradient(7deg, #00bcda, #00e1bc);
          padding: 0.75rem;
          text-align: center;
        }
      }
      .pool:last-child {
        border-bottom: none;
      }
    }
    .media {
      display: flex;
      justify-content: center;
      padding: 2rem 0;
      div {
        border-radius: 50px;
        background-color: #373a54;
        padding: 0.75rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 8px;
      }
    }
  }
  .homePC {
    background-color: #2b2d44;
    color: #fff;
    display: flex;
    justify-content: space-between;
    .leftSide {
      max-width: 820px;
      width: 100%;
      margin-right: 30px;
      .totalValueLocked {
        max-width: 400px;
        width: 100%;
        background-color: #373a54;
        border-radius: 0.5rem;
        margin-right: 20px;
      }
      .globalValue {
        max-width: 400px;
        width: 100%;
        background-color: #373a54;
        border-radius: 0.5rem;
        >div>div>span:first-child {
          color: #9b9daa;
        }
      }
      .farmPoolPC {
        background-color: #373a54;
        border-radius: 0.5rem;
        padding: 0 1rem;
        margin-top: 1rem;
        .tabs {
          width: 100%;
          .tabItem {
            width: 33.33%;
            text-align: center;
            cursor: pointer;
          }
          .tabItemActive {
            width: 33.33%;
            height: 2.5rem;
            text-align: center;
            background: linear-gradient(12deg, #00bcda, #00e1bc);
            color: #fff;
            border-radius: 50px;
          }
        }
        .pool {
          border-bottom: 1px solid #53566c;
          .farmBtn {
            border-radius: 50px;
            background: linear-gradient(7deg, #00bcda, #00e1bc);
            padding: 0.75rem;
            text-align: center;
          }
          .farmBtn:hover {
            cursor: pointer;
          }
        }
        .pool:last-child {
          border-bottom: none;
        }
      }
    }
    .rightSide {
      max-width: 350px;
      width: 100%;
      height: fit-content;
      background-image: url("../assets/info_bg.png");
      background-repeat: no-repeat;
      background-size: contain;
      background-color: #373a54;
      border-radius: 0.5rem;
      .total {
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
            height: 20px;
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
    }
  }
  //输入框颜色
  ::v-deep .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
    background-color: #484b67;
  }
  ::v-deep .theme--light.v-label,
  ::v-deep .theme--light.v-input input, .theme--light.v-input textarea{
    color: #aaaaaa;
  }
  //折叠面板
  ::v-deep .theme--light.v-expansion-panels .v-expansion-panel {
    background-color: #373a54;
  }
  ::v-deep .theme--light.v-expansion-panels .v-expansion-panel-header .v-expansion-panel-header__icon .v-icon {
    color: rgba(255,255,255,0.54);
  }
  ::v-deep .v-expansion-panel-header, {
    padding: 0.5rem 0;
  }
  ::v-deep .v-expansion-panel-content__wrap {
    padding: 0 0 0.5rem;
  }
</style>

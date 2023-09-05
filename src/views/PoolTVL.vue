<template>
  <div>
    <!--  手机跟iPad版  -->
    <div class="TVLMobile hidden-md-and-up">
      <div class="protocolTVL">
        <h5 class="font-italic px-4 pt-4">Protocol TVL</h5>
        <div class="tvl">
          <div>
            <div>Protocol pools TVL</div>
            <div>{{ formatDollars(getBigNumberStr(totalValueLocked,2)) }}</div>
          </div>
          <div>
            <div>Protocol positions</div>
            <div>{{ formatAmount(positionsAmount) }}</div>
          </div>
        </div>
      </div>
      <div class="poolTVL">
        <h5 class="font-italic pt-4">Pool TVL</h5>
        <v-text-field label="Search" solo dense hide-details flat color="#aaaaaa" class="mt-5" v-model="searchPool">
          <template v-slot:prepend-inner>
            <v-icon color="#aaaaaa">mdi-magnify</v-icon>
          </template>
        </v-text-field>
        <!--  手机跟iPad版 -> FarmPools -> 池子 ->  -->
        <div class="pt-5 farmPool" v-for="(item,i) of allPool" :key="i">
          <div class="d-flex align-center">
            <img :src="getPoolLogoSource(item)" width="80" height="60" class="mr-2" alt>
            <div style="white-space: nowrap">
              <div class="grey-font ">{{ item.poolType }}</div>
              <div class="text-caption">{{ getPoolName(item) }}</div>
            </div>
          </div>
          <div class="d-flex">
            <div style="width: 50%">
              <span class="grey-font">TVL</span>
              <p class="text-h6">{{ formatDollars(getBigNumberStr(item.tvl,2)) }}</p>
            </div>
            <div>
              <span class="grey-font">Price</span>
              <p class="text-h6">{{ formatDollars(getBigNumberStr(item.lpPrice,2)) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bankTVL">
        <h5 class="font-italic pt-4">Bank TVL</h5>
        <v-text-field label="Search" solo dense hide-details flat color="#aaaaaa" class="mt-5" v-model="searchBank">
          <template v-slot:prepend-inner>
            <v-icon color="#aaaaaa">mdi-magnify</v-icon>
          </template>
        </v-text-field>
        <!--  手机跟iPad版 -> FarmPools -> 池子 ->  -->
        <div class="pt-5 bankPool" v-for="(item,i) of allMarket" :key="i">
          <div class="d-flex align-center">
            <img :src="item.logoSource" width="40" height="40" class="mr-2" alt>
            <div style="white-space: nowrap">
              <div class="grey-font ">{{ item.tokenName }}</div>
              <div class="text-caption">{{ item.symbol }}</div>
            </div>
          </div>
          <div class="d-flex">
            <div style="width: 50%">
              <span class="grey-font">TVL</span>
              <p class="text-h6">{{  formatDollars(getBigNumberStr(item.marketTotalSupply,2)) }}</p>
            </div>
            <div>
              <span class="grey-font">Price</span>
              <p class="text-h6">{{ formatDollars(getBigNumberStr(item.underlyingPrice,2)) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="py-12"></div>
    </div>
    <!--  电脑版  -->
    <v-container class="TVLContainer hidden-sm-and-down" style="max-width: 1200px">

      <!--  电脑版 -> TVL总览  -->
      <div class="protocolTVL">
        <div class="d-flex align-center">
          <v-icon color="#fff">mdi-lock</v-icon>
          <h4 class="pl-2 font-italic">Protocol TVL</h4>
        </div>
        <div class="d-flex py-4">
          <div style="width: 50%">
            <div class="text-center">
              <span>Protocol pools TVL</span>
              <div class="text-h4">{{ formatDollars(getBigNumberStr(totalValueLocked,2)) }}</div>
            </div>
          </div>
          <div style="width: 50%">
            <div class="text-center">
              <span>Protocol positions</span>
              <div class="text-h4">{{ formatAmount(positionsAmount) }}</div>
            </div>
          </div>
        </div>
      </div>

      <!--  电脑版 -> Pool  -->
      <div class="poolTVL">
        <!--  电脑版 -> Pool -> 标题  -->
        <div class="d-flex justify-space-between  px-4">
          <div class="d-flex align-center">
            <v-icon color="#fff">mdi-lock</v-icon>
            <span class="ml-2">Pool TVL</span>
          </div>
          <v-text-field
              label="Search" v-model="searchPool" hide-details
              solo dense flat color="#aaaaaa" style="max-width: 400px"
          >
            <template v-slot:prepend-inner>
              <v-icon color="#aaaaaa">mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </div>

        <!--  电脑版 -> FarmPools -> 池子  -->
        <div class="d-flex flex-wrap px-1">
          <!--  电脑版 -> FarmPools -> 池子 ->  -->
          <div class="col-md-3 pt-5 pb-0" v-for="(item,i) of allPool" :key="i">
            <div class="farmPool px-5">
              <div class="d-flex align-center">
                <img :src="getPoolLogoSource(item)" width="60" height="60" class="px-2" alt>
                <div style="white-space: nowrap">
                  <div class="grey-font ">{{ item.poolType }}</div>
                  <div class="text-caption white--text">{{ getPoolName(item) }}</div>
                </div>
              </div>

              <div class="white--text">
                <span style="color: #9b9daa">TVL</span>
                <p class="text-h5">{{ formatDollars(getBigNumberStr(item.tvl,2)) }}</p>
                <span style="color: #9b9daa">Price</span>
                <p class="text-h5">{{ formatDollars(getBigNumberStr(item.lpPrice,2)) }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <!--  电脑版 -> Bank  -->
      <div class="bankTVL">

        <!--  电脑版 -> Bank -> 标题  -->
        <div class="d-flex justify-space-between  px-4">
          <div class="d-flex align-center">
            <v-icon color="#fff">mdi-account-circle</v-icon>
            <span class="ml-2">Bank TVL</span>
          </div>
          <v-text-field
              label="Search" v-model="searchBank" hide-details
              solo dense flat color="#aaaaaa" style="max-width: 400px"
          >
            <template v-slot:prepend-inner>
              <v-icon color="#aaaaaa">mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </div>


        <!--  电脑版 -> Bank -> 池子  -->
        <div class="d-flex flex-wrap px-1">
          <!--  电脑版 -> Bank -> 池子 ->  -->
          <div class="col-md-3 pt-5 pb-0" v-for="(item,i) of allMarket" :key="i">
            <div class="marketPool px-5">
              <div class="d-flex align-center">
                <img :src="item.logoSource" width="60" height="60" class="pa-2" alt>
                <div style="white-space: nowrap">
                  <div class="grey-font">{{ item.tokenName }}</div>
                  <div class="text-caption white--text">{{ item.symbol }}</div>
                </div>
              </div>

              <div class="white--text">
                <span style="color: #9b9daa">TVL</span>
                <p class="text-h5">{{ formatDollars(getBigNumberStr(item.marketTotalSupply,2)) }}</p>
                <span style="color: #9b9daa">Price</span>
                <p class="text-h5">{{ formatDollars(getBigNumberStr(item.underlyingPrice,2)) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import numeral from 'numeral'
import {getPoolName, lpLogoSource} from "@/utils";
import {allFarmPools} from "@/utils/constants";
import {formatDollars, getBigNumberStr} from "../utils/helpers";
import {mapState} from "vuex";
import {allMarketsArray} from "../utils/constants";
export default {
  name: "PersonInfo",
  data (){
    return{
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
      searchBank: '', //Bank输入框搜索
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
    allMarket: function (){
      if (this.allMarketsDetails.length === 0) {
        return allMarketsArray['heco-mainnet']
      }
      if(!this.searchBank)
        return this.allMarketsDetails
      else
        return this.allMarketsDetails.filter(item=>String(item.symbol).toLowerCase().indexOf(this.searchBank.toLowerCase())>-1)
    },
    totalValueLocked: function (){
      return this.totalPoolTvl.plus(this.allMarketsTotalSupplyBalance)
    },
    ...mapState([
      'userPositionsDetails',
      'allMarketsDetails',
      'allPoolsDetails',
      'positionsAmount',
      'totalPoolTvl',
      'allMarketsTotalSupplyBalance',
    ])
  },
  methods:{
    getPoolName(pool) {
      return pool.poolDEX + ' ' + getPoolName(pool.poolTokens)
    },
    getPoolLogoSource(pool) {
      return lpLogoSource(pool.poolTokens)
    },
    formatAmount(val){
      return numeral(val).format('0,0')
    },
  }
}
</script>

<style scoped lang="scss">

.grey-font {
  color: #9b9daa;
  font-size: 0.75rem;
}

.TVLMobile {
  color: #fff;
  padding: 0 0.875rem;
  .protocolTVL {
    height: fit-content;
    background-image: url("../assets/info_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #373a54;
    border-radius: 0.5rem;
    .tvl {
      display: flex;
      padding: 1rem 0;
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
  }
  .poolTVL {
    background-color: #373a54;
    border-radius: 0.5rem;
    padding: 0 1rem;
    margin-top: 0.625rem;
    .farmPool {
      border-bottom: 1px solid rgba(255,255,255,0.14);
    }
    .farmPool:last-child {
      border-bottom: none;
    }
  }
  .bankTVL {
    background-color: #373a54;
    border-radius: 0.5rem;
    padding: 0 1rem;
    margin-top: 0.625rem;
    .bankPool {
      border-bottom: 1px solid rgba(255,255,255,0.14);
    }
    .bankPool:last-child {
      border-bottom: none;
    }
  }
}

.TVLContainer {
  color: #fff;
  .protocolTVL {
    background-color: #373a54;
    border-radius: 0.5rem;
    padding: 1rem;
  }
  .poolTVL{
    background-color: #373a54;
    color: #ffffff;
    border-radius: 0.5rem;
    padding: 1rem 0;
    margin-top: 1rem;
    .farmPool {
      border: 1px solid #484b67;
      border-radius: 0.5rem;
    }
  }
  .bankTVL{
    background-color: #373a54;
    border-radius: 0.5rem;
    padding: 1rem 0;
    margin-top: 1rem;
    .marketPool {
      border: 1px solid #484b67;
      border-radius: 0.5rem;
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
</style>

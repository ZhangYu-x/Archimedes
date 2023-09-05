<template>
  <div>
    <div class="earn hidden-md-and-up">
      <div class="earnInfo">
        <h5 class="font-italic px-4 pt-4">{{$t('earn.mySupply')}}</h5>
        <div class="details">
          <div>
            <div>{{$t('earn.balance')}}</div>
            <div>{{ formatDollars(getBigNumberStr(totalSupplyBalance,2)) }}</div>
          </div>
          <div>
            <div>{{$t('earn.netApy')}}</div>
            <div>{{netRateStr}}%</div>
          </div>
          <div>
            <div>借款余额</div>
            <div>{{ formatDollars(getBigNumberStr(totalBorrowBalance,2)) }}</div>
          </div>
        </div>
      </div>
      <div class="farmPool">
        <h5 class="font-italic pt-4">{{$t('earn.lending')}}</h5>
        <v-text-field
            label="Search" v-model="searchValue" hide-details
            solo dense flat color="#aaaaaa" class="mt-5" style="max-width: 400px"
        >
          <template v-slot:prepend-inner>
            <v-icon color="#aaaaaa">mdi-magnify</v-icon>
          </template>
        </v-text-field>

        <div class="pool py-4" v-for="pool in allMarket" :key="pool.underlyingAddress">
          <div class="d-flex align-center">
            <img :src="pool.logoSource" width="32" class="mr-2" alt="">
            <div>
              {{pool.symbol}}
            </div>
          </div>
          <div class="py-3 text-body-2">
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">{{$t('earn.Apy')}}</span>
              <span>{{$t('earn.Apy')}} %</span>
            </div>
            <div class="d-flex py-1 justify-space-between align-center">
              <span style="color: #9b9daa">{{$t('earn.totalSupply')}}</span>
              <div class="d-flex flex-column text-right">
                <span>{{getBigNumberStr(pool.marketTotalSupplyInTokenUnit, 4)}} {{pool.symbol}}</span>
                <span class="grey-font">({{formatDollars(pool.marketTotalSupply)}})</span>
              </div>
            </div>
            <div class="d-flex py-1 justify-space-between align-center">
              <span style="color: #9b9daa">{{$t('earn.TotalBorrow')}}</span>
              <div class="d-flex flex-column text-right">
                <span>{{getBigNumberStr(pool.marketTotalBorrowInTokenUnit, 4)}} {{pool.symbol}}</span>
                <span class="grey-font">({{formatDollars(pool.marketTotalBorrow)}})</span>
              </div>
            </div>
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">{{$t('earn.utilization')}}</span>
              <span>{{getUtilization(pool.marketTotalBorrowInTokenUnit,pool.marketTotalSupplyInTokenUnit)}}</span>
            </div>
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">{{$t('earn.balance')}}</span>
              <span>{{pool.walletBalance}} {{pool.symbol}}</span>
            </div>
          </div>
          <div class="d-flex justify-space-between">
            <div class="farmBtn" @click="toSupply(pool)">
              {{$t('earn.supply')}}
            </div>
            <div class="farmBtn" @click="toWithdraw(pool)">
              {{$t('earn.withdraw')}}
            </div>
          </div>

        </div>
      </div>
      <div class="py-12"></div>
    </div>

    <v-container class="earnPC hidden-sm-and-down" style="max-width: 1200px">

      <div class="earnInfoPC">
        <div class="d-flex align-center pa-4">
          <v-icon color="#fff">mdi-account-circle</v-icon>
          <span class="ml-2">{{$t('earn.mySupply')}}</span>
        </div>
        <div class="detailsPC">
          <div>
            <div>{{$t('earn.balance')}}</div>
            <div>{{ formatDollars(getBigNumberStr(totalSupplyBalance,2)) }}</div>
          </div>
          <div>
            <div>{{$t('earn.netApy')}}</div>
            <div>{{netRateStr}}%</div>
          </div>
          <div>
            <div>借款余额</div>
            <div>{{ formatDollars(getBigNumberStr(totalBorrowBalance,2)) }}</div>
          </div>
        </div>
      </div>

      <!--   我的存款   -->
      <div class="farmPoolPC" v-if="supplyMarket.length!==0">
        <div class="d-flex align-center py-4">
          <v-icon color="#fff">mdi-account-circle</v-icon>
          <span class="ml-2">{{$t('earn.mySupply')}}</span>
        </div>

        <div class="farmPoolPCHeader grey-font py-4">
          <div class="farmPoolPCHeader-left px-4">资产</div>
          <div class="farmPoolPCHeader-center">存款利率</div>
          <div class="farmPoolPCHeader-center">ACMD 收益</div>
          <div class="farmPoolPCHeader-center">存款金额</div>
          <div class="farmPoolPCHeader-center">钱包余额</div>
          <div class="farmPoolPCHeader-center d-flex align-center justify-center">开启抵押<ToolTip>v2版本将开启抵押借贷</ToolTip></div>
          <div class="farmPoolPCHeader-right">操作</div>
        </div>
        <div v-for="(item,index)  in supplyMarket" :key="index" class="farmPoolPCContent">
          <div class="farmPoolPCContent-left d-flex align-center">
            <img :src="item.logoSource" width="30" height="30" class="mx-4" alt="">
            <span>{{item.symbol}}</span>
          </div>
          <div class="farmPoolPCContent-center">{{ getBigNumberStr(item.supplyApy, 2, 100) }}%</div>
          <div class="farmPoolPCContent-center d-flex flex-column">
            {{getBigNumberStr(item.supplyDistributionApy,2,100) }}%
          </div>
          <div class="farmPoolPCContent-center d-flex flex-column">
            <span>{{getBigNumberStr(item.supplyBalanceInTokenUnit, 4)}} {{item.symbol}}</span>
            <span class="grey-font">({{formatDollars(item.supplyBalance)}})</span>
          </div>
          <div class="farmPoolPCContent-center">
            <span>{{getBigNumberStr(item.walletBalance, 4)}} {{item.symbol}}</span>
          </div>
          <div class="farmPoolPCContent-center">
            <!--      disabled不能阻止点击冒泡    @click.stop="isEnterMarket(item)"   -->
            <v-switch hide-details color="#41e1ad" readonly v-model="item.isEnterMarket"></v-switch>
          </div>
          <div class="farmPoolPCContent-right">
            <v-btn outlined class="btn mx-auto my-1" color="#41e1ad" small dark block
                   @click="toWithdraw(item)">
              {{$t('earn.withdraw')}}
            </v-btn>
          </div>
        </div>
      </div>

      <div class="farmPoolPC">
        <div class="d-flex justify-space-between">
          <div class="d-flex align-center py-4">
            <v-icon color="#fff">mdi-account-circle</v-icon>
            <span class="ml-2">{{$t('earn.lending')}}</span>
          </div>
          <v-text-field
              label="Search" v-model="searchValue"
              solo dense flat color="#aaaaaa" class="mt-5" style="max-width: 400px"
          >
            <template v-slot:prepend-inner>
              <v-icon color="#aaaaaa">mdi-magnify</v-icon>
            </template>
          </v-text-field>
        </div>

        <div class="farmPoolPCHeader grey-font py-4">
          <div class="farmPoolPCHeader-left"></div>
          <div class="farmPoolPCHeader-center">{{$t('earn.Apy')}}</div>
          <div class="farmPoolPCHeader-center">{{$t('earn.totalSupply')}}</div>
          <div class="farmPoolPCHeader-center">{{$t('earn.TotalBorrow')}}</div>
          <div class="farmPoolPCHeader-center">{{$t('earn.Apy')}}</div>
          <div class="farmPoolPCHeader-center">{{$t('earn.balance')}}</div>
          <div class="farmPoolPCHeader-right"></div>
        </div>
        <div v-for="(item,index)  in allMarket" :key="index" class="farmPoolPCContent">
          <div class="farmPoolPCContent-left d-flex align-center">
            <img :src="item.logoSource" width="30" height="30" class="mx-4" alt="">
            <span>{{item.symbol}}</span>
          </div>
          <div class="farmPoolPCContent-center">{{ getBigNumberStr(item.supplyApy, 2, 100) }}%</div>
          <div class="farmPoolPCContent-center d-flex flex-column">
            <span>{{getBigNumberStr(item.marketTotalSupplyInTokenUnit, 4)}} {{item.symbol}}</span>
            <span class="grey-font">({{formatDollars(item.marketTotalSupply)}})</span>
          </div>
          <div class="farmPoolPCContent-center d-flex flex-column">
            <span>{{getBigNumberStr(item.marketTotalBorrowInTokenUnit, 4)}} {{item.symbol}}</span>
            <span class="grey-font">({{formatDollars(item.marketTotalBorrow)}})</span>
          </div>
<!--          <div class="farmPoolPCContent-center">{{getUtilization(item.marketTotalSupplyInTokenUnit,item.marketTotalBorrowInTokenUnit)}}</div>-->
          <div class="farmPoolPCContent-center">{{ getBigNumberStr(item.borrowApy, 2, 100) }}%</div>
          <div class="farmPoolPCContent-center">{{item.walletBalance}} {{item.symbol}}</div>
          <div class="farmPoolPCContent-right">
            <v-btn outlined class="btn mx-auto my-1" color="#41e1ad" small dark block
                   @click="toSupply(item)">
              {{$t('earn.supply')}}
            </v-btn>
            <v-btn outlined class="btn mx-auto my-1" color="#41e1ad" small dark block
                   @click="toWithdraw(item)">
              {{$t('earn.withdraw')}}
            </v-btn>
          </div>
        </div>
      </div>

    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BigNumber from 'bignumber.js'
import {allMarketsArray} from "@/utils/constants";
import {formatDollars, getBigNumberStr} from "@/utils/helpers";
import Compound from '@compound-finance/compound-js';
import utils from '@/utils/common'
import ToolTip from "@/components/ToolTip";

const gasLimitEnterMarket = "1500000";
const compoundConstants = require("@compound-finance/compound-js/dist/nodejs/constants.js");

export default {
  name: "Earn",
  components: {ToolTip},
  data() {
    return {
      searchValue : '',
      getBigNumberStr: getBigNumberStr,
      formatDollars: formatDollars,
    }
  },
  methods: {
    toSupply(val) {
      this.$store.commit('updateSelectedAddress',val.underlyingAddress)
      this.$store.commit('updateEarnStatus','supply')
      this.$router.push(`/supply/${val.underlyingAddress}`)
    },
    toWithdraw(val) {
      this.$store.commit('updateSelectedAddress',val.underlyingAddress)
      this.$store.commit('updateEarnStatus','withdraw')
      this.$router.push(`/withdraw/${val.underlyingAddress}`)
    },
    getUtilization(a,b){
      if(new BigNumber(b).isZero())
        return '0%'
      else
        return `${this.getBigNumberStr(new BigNumber(a).div(b),2,100)}%`
    },
    isEnterMarket(market){
      // switch开启抵押
      console.log('111111',market.isEnterMarket)
      if(market.isEnterMarket){
        this.exitMarket(market)
      }else {
        this.enterMarket(market)
      }
    },
    enterMarket(market) {
      const cTokenAddress = market.cTokenAddress
      Compound.eth.trx(
          this.comptrollerAddress,
          "enterMarkets",
          [[cTokenAddress]], // [optional] parameters
          {
            network: utils.chainIdToName[this.chainId],
            provider: window.ethereum,
            gasLimitEnterMarket,
            gasPrice: this.gasPrice.toString(),
            abi: compoundConstants.abi.Comptroller,
          } // [optional] call options, provider, network, ethers.js "overrides"
      ).then((tx)=>{
        return tx.wait(1)
      }).then((txWait1)=> {
        utils.updateData()
        console.log('txWait1= ',txWait1)

      }).catch((err) => {
        console.log(err)
      })
    },
    exitMarket(market) {
      const cTokenAddress = market.cTokenAddress
      Compound.eth.trx(
          this.comptrollerAddress,
          "exitMarket",
          [cTokenAddress], // [optional] parameters
          {
            network: utils.chainIdToName[this.chainId],
            provider: window.ethereum,
            gasLimitEnterMarket,
            gasPrice: this.gasPrice.toString(),
            abi: compoundConstants.abi.Comptroller,
          } // [optional] call options, provider, network, ethers.js "overrides"
      ).then((tx)=>{

        return tx.wait(1)
      }).then((txWait1)=> {
        utils.updateData()
        console.log('txWait1= ',txWait1)

      }).catch((err) => {
        console.log(err)

      })
    },
  },
  computed: {
    allMarket: function () {
      if (this.allMarketsDetails.length === 0) {
        return allMarketsArray['heco-mainnet']
      }
      if (!this.searchValue)
        return this.allMarketsDetails
      else
        return this.allMarketsDetails.filter(item => String(item.symbol).toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1)
    },
    supplyMarket() {
      return  this.allMarketsDetails.filter(item => item.supplyBalanceInTokenUnit?.isGreaterThan(0))
          .sort((a, b) => {
            return b.supplyBalance - a.supplyBalance
          })
    },
    netRateStr: function () {
      return this.netRate ? Number(this.netRate * 100)?.toFixed(2) || 0 : '--'
    },
    ...mapState([
      'allMarketsDetails',
      'netRate',
      'chainId',
      'totalSupplyBalance',
      'totalBorrowBalance',
      'gasPrice',
      'comptrollerAddress'
    ])
  }
}
</script>

<style scoped lang="scss">
.grey-font {
  color: #9b9daa;
  font-size: 0.75rem;
}
.earn {
  padding: 0 0.875rem;
  color: #fff;
  .earnInfo {
    width: 100%;
    height: fit-content;
    background-image: url("../assets/earn_bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #373a54;
    border-radius: 0.5rem;
    .details {
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
          padding: 0 1rem 1rem;
        }
      }
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
        width: 50%;
        border-radius: 50px;
        background: linear-gradient(7deg, #00bcda, #00e1bc);
        padding: 0.75rem;
        text-align: center;
        margin: 0 10px;
      }
    }
    .pool:last-child {
      border-bottom: none;
    }
  }
}
.earnPC {
  color: #fff;
  .earnInfoPC {
    width: 100%;
    background-color: #373a54;
    border-radius: 0.5rem;
    .detailsPC {
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
          font-size: 1.5rem;
          font-weight: 400;
          padding: 0 1rem 1rem;
        }
      }
    }
  }
  .farmPoolPC {
    background-color: #373a54;
    border-radius: 0.5rem;
    padding: 0 1rem;
    margin-top: 1rem;
    .farmPoolPCHeader {
      display: flex;
      border-bottom: 1px solid #53566c;
      &-left {
        width: 15%;
        text-align: left;
      }
      &-center {
        width: 13%;
        text-align: center;
      }
      &-right {
        width: 20%;
        text-align: center;
      }
    }
    .farmPoolPCContent {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #53566c;
      padding: 1rem 0;
      &-left {
        width: 15%;

      }
      &-center {
        width: 13%;
        text-align: center;
        //switch
        ::v-deep .v-input--switch .v-input--selection-controls__input {
          margin-right: 0 !important;
        }
        ::v-deep .v-input--switch .v-input__slot {
          justify-content: center;
        }
      }
      &-right {
        width: 20%;
        padding: 0 3rem;
      }
      &:last-child {
        border-bottom: none;
      }
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
//switch
::v-deep .v-input--switch .v-input--selection-controls__ripple {
  left: -12px !important;
}
::v-deep .v-input--switch .v-input--selection-controls__ripple {
  top: calc(50% - 19px);
}
::v-deep .v-input--selection-controls__ripple {
  height: 24px;
  width: 24px;
}
::v-deep .v-input--switch__track {
  opacity: 0.5;
  border-radius: 4px;
  width: 31px;
  height: 6px;
  top: calc(50% - 3px);
}
::v-deep .v-input--switch__thumb {
  top: calc(50% - 7px);
  height: 14px;
  width: 14px;
}
::v-deep .v-input--selection-controls {
  margin-top: 0;
}
//switch 隐藏hover跟focus背景
::v-deep .v-input--selection-controls__ripple:before {
  opacity: 0;
}
::v-deep .v-ripple__container{
  display: none;
}
</style>

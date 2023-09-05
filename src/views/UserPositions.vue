<template>
  <div>
    <!--  手机和Ipad版  -->
    <div class="personInfo hidden-md-and-up">

      <!--  手机和Ipad版 -> YourInfo  -->
      <div class="myPosition">
        <h5 class="font-italic px-4 pt-4">{{$t('personInfo.yourInfo')}}</h5>
        <div class="myTotal">
          <div>
            <div>{{$t('personInfo.totalCollateral')}}</div>
            <div>{{formatDollars(userTotalCollateralValue)}}</div>
          </div>
          <div>
            <div>{{$t('personInfo.totalDebtValue')}}</div>
            <div>{{ formatDollars(userTotalDebtValue) }}</div>
          </div>
        </div>
        <div class="myTotal">
          <div>
            <div>{{$t('personInfo.rewards')}}</div>
            <div>{{ getBigNumberStr(ACMDMiningReward,4) }} {{$t('personInfo.alpha')}}</div>
          </div>
        </div>
      </div>

      <!--  手机和Ipad版 -> YourPositions  -->
      <div class="positionInfo">
        <h5 class="font-italic pt-4">Your Positions</h5>
        <div style="height: 300px">
          <div ref="pieMobile" style="width: 100%;height:100%;"></div>
        </div>
        <!--   手机和Ipad版 -> YourPositions -> 仓位   -->
        <div v-for="(item,i) in userPositionsDetails" :key="i"  class="positionList py-4">
          <div class="d-flex justify-space-between align-center">
            <div class="d-flex align-center">
              <img :src="getPoolLogoSource(allPoolsMap[item.lpTokenAddress])" width="50" class="mr-2" alt="">
              <div>{{ getPoolName(allPoolsMap[item.lpTokenAddress]) }}</div>
            </div>
            <div>
              <div class="white--text text-h5">#{{ item.id }}</div>
            </div>
          </div>
          <div class="py-3 text-body-2">
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">Borrow Value</span>
              <span>${{item.borrowValue.toFixed(2,0)}}</span>
            </div>
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">Collateral Value</span>
              <span>${{ item.collateralValue.toFixed(2,1) }}</span>
            </div>
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">Debt Ratio</span>
              <div class="d-flex align-center" style="width: 45%">
                <v-progress-linear
                    :color="44>95 ?'#e10040':'#00e1bc'" class="mr-2"
                    background-color="#484b67"
                    rounded
                    :value="item.debtRatioTimes100.toNumber()"
                    height="8"
                ></v-progress-linear>
                <span>{{ item.debtRatioTimes100.toFixed(2,0) }}%</span>
              </div>
            </div>
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">APR</span>
              <span>{{item.Apy.times(100).toFixed(2)}}%</span>
            </div>
            <div class="d-flex py-1 justify-space-between">
              <span style="color: #9b9daa">Current Rewards</span>
              <span>{{item.currentRewards.toFixed(2)}} {{item.pool.rewardToken||''}}</span>
            </div>
          </div>
          <div class="btnContainer">
            <div class="btn" @click="goFarm(allPoolsMap[item.lpTokenAddress],item.id)">ADD</div>
            <div class="btn" @click="goRemove(allPoolsMap[item.lpTokenAddress],item.id)">REMOVE</div>
            <div class="btn" @click="sendClosePosition(allPoolsMap[item.lpTokenAddress],item.id)">CLOSE</div>
            <div class="coloredBtn" @click="sendHarvest(item.id)">HARVEST</div>
          </div>
        </div>
      </div>
      <div class="py-12"></div>
    </div>

    <!--  电脑版  -->
    <v-container class="infoContainer hidden-sm-and-down" style="max-width: 1200px">

      <!--  电脑版 -> YourInfo  -->
      <div class="totalValueLocked pa-4">
        <div class="d-flex align-center">
          <v-icon color="#fff">mdi-account-circle</v-icon>
          <span class="ml-2">{{$t('personInfo.yourInfo')}}</span>
        </div>
        <div class="d-flex themes pt-4">
          <div>
            <div>{{$t('personInfo.totalCollateral')}}</div>
            <div>{{formatDollars(userTotalCollateralValue)}}</div>
          </div>
          <div>
            <div>{{$t('personInfo.totalDebtValue')}}</div>
            <div>{{ formatDollars(userTotalDebtValue) }}</div>
          </div>
          <div>
            <div>{{$t('personInfo.rewards')}}</div>
            <div>{{ getBigNumberStr(ACMDMiningReward,4) }} {{$t('personInfo.alpha')}}</div>
          </div>
        </div>
      </div>

      <!--  电脑版 -> YourPositions  -->
      <div class="positionListPC">
        <h4 class="font-italic pt-4">Your Positions</h4>

        <!--   电脑版 -> YourPositions -> 饼图   -->
        <div style="height: 400px">
          <div ref="pie" style="width: 100%;height:100%;"></div>
        </div>

        <!--   电脑版 -> YourPositions -> 表头   -->
        <div class="positionListPCHeader grey-font py-4">
          <div class="positionListPCHeader-left">Pool</div>
          <div class="positionListPCHeader-center">Borrow Value</div>
          <div class="positionListPCHeader-center">Collateral Value</div>
          <div class="positionListPCHeader-center">Debt Ratio</div>
          <div class="positionListPCHeader-center">APR</div>
          <div class="positionListPCHeader-center">Current Rewards</div>
          <div class="positionListPCHeader-right">Action</div>
        </div>
        <!--   电脑版 -> YourPositions -> 内容   -->
        <div v-for="(item,index)  in userPositionsDetails" :key="index" class="positionListPCContent">
          <div class="positionListPCContent-left d-flex align-center justify-end">
            <span>#{{ item.id }}</span>
            <img :src="getPoolLogoSource(allPoolsMap[item.lpTokenAddress])" width="30" height="30" class="mx-4" alt="">
            <span>{{ getPoolName(allPoolsMap[item.lpTokenAddress]) }}</span>
          </div>
          <div class="positionListPCContent-center">${{item.borrowValue.toFixed(2,0)}}</div>
          <div class="positionListPCContent-center">${{ item.collateralValue.toFixed(2,1) }}</div>
          <div class="positionListPCContent-center">{{ item.debtRatioTimes100.toFixed(2,0) }}%</div>
          <div class="positionListPCContent-center">{{item.Apy.times(100).toFixed(2)}}%</div>
          <div class="positionListPCContent-center">{{item.currentRewards.toFixed(2)}} {{item.pool.rewardToken||''}}</div>
          <div class="positionListPCContent-right">
            <div>
              <v-btn outlined class="btn mx-2 my-1" color="#41e1ad" small dark
                     @click="goFarm(allPoolsMap[item.lpTokenAddress],item.id)"
              >
                ADD
              </v-btn>
              <v-btn outlined class="btn mx-2 my-1" color="#41e1ad" small dark
                     @click="goRemove(allPoolsMap[item.lpTokenAddress],item.id)"
              >
                REMOVE
              </v-btn>
            </div>
            <div>
              <v-btn outlined class="btn mx-2 my-1" color="#41e1ad" small dark
                     @click="sendClosePosition(allPoolsMap[item.lpTokenAddress],item.id)"
              >
                CLOSE
              </v-btn>
              <v-btn outlined class="btn mx-2 my-1" color="#41e1ad" small dark
                     @click="sendHarvest(item.id)"
              >
                HARVEST
              </v-btn>
            </div>

          </div>
        </div>
        <div v-if="userPositionsDetails.length===0" class="positionListPCContent">
          你还没有任何仓位
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {mapState} from "vuex";
import {getPoolName, lpLogoSource,getLPName} from "../utils";
import {eX, formatDollars, getBigNumberStr} from "../utils/helpers";
import BigNumber from "bignumber.js";
import {address} from "../utils/address";

export default {
  name: "UserPositions",
  echarts:echarts,
  data(){
    return {
      getBigNumberStr: getBigNumberStr,
      formatDollars: formatDollars,
      //饼图
      myChart: {},
      myChartMobile: {},
    }
  },
  mounted() {
    this.myChart = this.$echarts.init(this.$refs.pie,null,{renderer:'svg'});
    this.myChartMobile = this.$echarts.init(this.$refs.pieMobile,null,{renderer:'svg'});
    if (!(this.userPositionsDetails.length===0)) {
      this.drawChart()
    }
    //图表自适应
    const that = this
    window.onresize = function () {
      if(window.innerWidth<960){
        that.myChartMobile.resize()
      }else {
        that.myChart.resize()
      }
    }
  },
  computed: {
    ...mapState([
      'userPositionsDetails',
      'userTotalCollateralValue',
      'userTotalDebtValue',
      'ACMDMiningReward',
      'walletAddress',
      'gasPrice',
    ]),
    allPoolsMap() {
      return this.$store.getters.allPoolsMap
    },
    userPositionsMap () {
      return this.$store.getters.userPositionsMap
    },
    pieOption () {
      //取lpToken价值 排序
      const arr = this.userPositionsDetails?.map((item)=>{
        let obj = {}
        obj.value = item.collateralValue
        obj.name = getLPName(item.poolTokens)
        return obj
      }).sort((a, b) => {
            return b.collateralValue - a.collateralValue
          })

      // 指定图表的配置项和数据
      let option = {
        animation: false,
        legend: {
          bottom: 0,
          left: 'center',
          data: arr,
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            type: 'pie',
            data: arr,
            radius: '50%',
          }
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{b} :{d}%'
        },
        color: ['#00A4FF','#E8B72D','#2BC936','#949494','#FFBB00','#FF411A','#fff000']
      };
      return option
    },
  },
  methods: {
    getPoolName(pool) {
      return pool.poolDEX + ' ' + getPoolName(pool.poolTokens)
    },
    getPoolLogoSource(pool) {
      return lpLogoSource(pool.poolTokens)
    },
    goFarm(pool, positionId) {
      this.$store.commit('updateSelectedPoolType', pool.poolType)
      this.$store.commit('updateSelectedPoolDEX', pool.poolDEX)
      this.$store.commit('updateSelectedPoolTokens', pool.poolTokens)
      this.$store.commit('updateSelectedPoolAddress', pool.poolAddress)
      this.$store.commit('updateSelectedPositionId', positionId)
      this.$router.push('/add')
    },
    goRemove(pool, positionId) {
      this.$store.commit('updateSelectedPoolType', pool.poolType)
      this.$store.commit('updateSelectedPoolDEX', pool.poolDEX)
      this.$store.commit('updateSelectedPoolTokens', pool.poolTokens)
      this.$store.commit('updateSelectedPoolAddress', pool.poolAddress)
      this.$store.commit('updateSelectedPositionId', positionId)
      this.$router.push('/remove')
    },
    sendClosePosition(pool, positionId) {
      const tokenAAddress = pool.poolTokens[0]
      const tokenBAddress = pool.poolTokens[1]
      // const lpTake = this.userPositionsMap[positionId]?.collateralSize
      const lpTake = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      const ARepay = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      const BRepay = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
      const amount = {
        amtLPTake: lpTake,
        amtLPWithdraw: 0,
        amtARepay:ARepay,
        amtBRepay:BRepay,
        amtLPRepay: 0,
        amtAMin: 0,
        amtBMin: 0
      }
      const bytesMemoryData = this.contract['mdexSpell'].methods.removeLiquidityWMasterChef(tokenAAddress,tokenBAddress,amount).encodeABI()
      const options = {
        from: this.walletAddress,
        gas: '3500000',
        gasPrice: this.gasPrice.toString(),
      }
      this.contractSend['IBank'].methods.execute(positionId,address.mdexSpell,bytesMemoryData).call(options).then(console.log)
      this.contractSend['IBank'].methods.execute(positionId,address.mdexSpell,bytesMemoryData).send(options).then(console.log)

    },
    sendHarvest(positionId) {
      const bytesMemoryData = this.contract['mdexSpell'].methods.harvestWMasterChef().encodeABI()
      const options = {
        from: this.walletAddress,
        gas: '1000000',
        gasPrice: this.gasPrice.toString(),
      }
      this.contractSend['IBank'].methods.execute(positionId,address.mdexSpell,bytesMemoryData).call(options).then(console.log)
      this.contractSend['IBank'].methods.execute(positionId,address.mdexSpell,bytesMemoryData).send(options).then(console.log)
    },
    drawChart() {
      this.myChart.setOption(this.pieOption);
      this.myChartMobile.setOption(this.pieOption);
    },
  },

}
</script>

<style scoped lang="scss">
#demo {
  width: 500px;
  height: 300px;
}

.grey-font {
  color: #9b9daa;
  font-size: 0.75rem;
}

.personInfo {
  color: #fff;
  padding: 0 0.875rem;
  .myPosition {
    height: fit-content;
    background-image: url("../assets/info_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-color: #373a54;
    border-radius: 0.5rem;
    .myTotal {
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
  }
  .positionInfo {
    background-color: #373a54;
    border-radius: 0.5rem;
    padding: 0 1rem;
    margin-top: 0.625rem;
    .positionList {
      border-bottom: 1px solid #53566c;
      .btnContainer {
        display: flex;
        .btn {
          width: 25%;
          border-radius: 50px;
          border: 1px solid #41E1AD;
          padding: 0.625rem 0;
          margin: 0 0.25rem;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .coloredBtn {
          width: 25%;
          border-radius: 50px;
          background: linear-gradient(90deg,#11FFB7,#3943CE);
          padding: 0.625rem 0;
          margin: 0 0.25rem;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .positionList:last-child {
      border-bottom: none;
    }
  }
}

.infoContainer {
  background-color: #2b2d44;
  color: #fff;
  .totalValueLocked {
    width: 100%;
    background-color: #373a54;
    border-radius: 0.5rem;
    margin-right: 20px;
    .themes{
      > div {
        width: 33.33%;
        > div:first-child {
          color: #9b9daa;
          font-size: 0.75rem;
        }
        > div:last-child {
          font-size: 1.5rem;
          font-weight: 400;
        }
      }
    }
  }

  .positionListPC {
    background-color: #373a54;
    border-radius: 0.5rem;
    padding: 0 1rem;
    margin-top: 1rem;
    .positionListPCHeader {
      display: flex;
      border-bottom: 1px solid #53566c;
      &-left {
        width: 18%;
        text-align: right;
      }
      &-center {
        width: 12%;
        text-align: center;
      }
      &-right {
        width: 22%;
        text-align: center;
      }
    }
    .positionListPCContent {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #53566c;
      padding: 1rem 0;
      &-left {
        width: 18%;
        text-align: right;
      }
      &-center {
        width: 12%;
        text-align: center;
      }
      &-right {
        width: 22%;
        text-align: center;
        >div {
          width: 100%;
          .btn {
            width: 40%;
          }
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}

</style>

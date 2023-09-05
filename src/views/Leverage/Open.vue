<template>
  <div>
    <!--  手机和Ipad版  -->
    <div class="hidden-md-and-up">
      <!--  手机和Ipad版 -> token进度卡片  -->
      <Step :step="step" :token-logo-source="lpLogoSource" :dex-name="selectedPoolDEX" :token-symbol="poolName"></Step>

      <!--  手机和Ipad版 -> Step1  -->
      <div v-if="step===1" class="supply">
        <div class="supplyWrapper pb-6">

          <!--  手机和Ipad版 -> Step1 -> MyPosition  -->
          <div v-if="Number(selectedPositionId)!==0" class="step">
            <h5 class="font-italic py-4">{{$t('open.myPosition')}}</h5>
            <div class="d-flex">
              <div class="d-flex align-center mr-2 py-2 pl-4">
                <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                <span>{{ tokenAPositionBalance.toFixed(4,1) }} {{tokenASymbol||''}}</span>
              </div>
              <div class="d-flex align-center ml-2 py-2 pl-4">
                <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                <span>{{ tokenBPositionBalance.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
              </div>
            </div>
            <v-divider color="#53566c" class="mt-5"></v-divider>
          </div>

          <!--  手机和Ipad版 -> Step1 -> Supply  -->
          <h5 class="font-italic px-4 pt-4">{{$t('open.topTitle')}}</h5>
          <!--  手机和Ipad版 -> Step1 -> Supply -> TokenA  -->
          <div class="grey-font text-no-wrap text-right px-4">{{$t('open.balance',{x:tokenABalance?Number(tokenABalance).toFixed(4):'0.0000'})}}</div>
          <div class="d-flex justify-space-between px-4 pb-4">
            <div class="d-flex justify-center align-center">
              <img :src="tokenALogoSource?tokenALogoSource:''" width="40" height="40" alt="">
              <div class="ml-1">
                {{tokenASymbol}}
              </div>
            </div>
            <div>
              <div class="d-flex justify-center align-center ml-4">
                <v-text-field solo dense flat rounded hide-details color="#aaaaaa" v-model="tokenASupply"></v-text-field>
                <v-btn rounded dark class="ml-1" @click="setTokenASupplyMax(tokenASymbol,tokenABalance)">{{$t('open.maxBtn')}}</v-btn>
              </div>
            </div>
          </div>
          <!--  手机和Ipad版 -> Step1 -> Supply -> TokenB  -->
          <div class="grey-font text-no-wrap text-right px-4">{{$t('open.balance',{x:tokenBBalance?Number(tokenBBalance).toFixed(4):'0.0000'})}}</div>
          <div class="d-flex justify-space-between px-4 pb-4">
            <div class="d-flex justify-center align-center">
              <img :src="tokenBLogoSource?tokenBLogoSource:''" width="40" height="40" alt="">
              <div class="ml-1">
               {{tokenBSymbol}}
              </div>
            </div>
            <div class="d-flex justify-center align-center ml-4">
              <v-text-field solo dense flat rounded hide-details color="#aaaaaa" v-model="tokenBSupply"></v-text-field>
              <v-btn rounded dark class="ml-1" @click="setTokenBSupplyMax(tokenBSymbol,tokenBBalance)">{{$t('open.maxBtn')}}</v-btn>
            </div>
          </div>

          <!--  手机和Ipad版 -> Step1 -> Note  -->
          <div v-if="Number(selectedPositionId)===0" class="px-4">
            <div class="grey-font py-2">{{$t('open.note')}}</div>
            <div class="text-caption text--lighten-3">
              {{$t('open.noteWord')}}
            </div>
          </div>
        </div>

        <!--  手机和Ipad版 -> Step1 -> Buttons  -->
        <div class="btnFooter d-flex align-center">
          <div class="backBtn text-center py-3 px-6 mr-2 flex-grow-1" @click="$router.back()">{{$t('open.back')}}</div>
          <div class="text-center py-3 px-6 ml-2 flex-grow-1" :class="validForm===true?'nextBtn':'nextBtnDisabled'" @click="clickNextBtn">{{$t('open.next')}}</div>
        </div>
      </div>

      <!--  手机和Ipad版 -> Step2  -->
      <div v-if="step===2" class="borrow">

        <div class="supplyWrapper">
          <h5 class="font-italic px-4 pt-4 mb-5">{{$t('open.topTitle2')}}</h5>
          <div class="step">
            <div class="d-flex">
              <div class="d-flex align-center mr-2 py-2 pl-4">
                <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                <span>{{ tokenASupplyBigNumber.toFixed(4) }} {{tokenASymbol||''}}</span>
              </div>
              <div class="d-flex align-center ml-2 py-2 pl-4">
                <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                <span>{{ tokenBSupplyBigNumber.toFixed(4) }} {{tokenBSymbol||''}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="leverage">
          <div class="d-flex justify-space-between align-center">
            <h5 class="font-italic">{{$t('open.leverage')}}</h5>
            <div class="d-flex">
              <div class="mx-1" style="background-color: #484B67;border-radius: 0.25rem">
                <v-icon color="#fff" @click="minusLeverage">mdi-minus</v-icon>
              </div>
              <div class="mx-1" style="background-color: #484B67;border-radius: 0.25rem">
                <v-icon color="#fff" @click="addLeverage">mdi-plus</v-icon>
              </div>
            </div>
          </div>
          <v-slider value="1" color="#00e1bc" track-color="#484b67" hide-details
                    step="0.01" min="1" :max="selectedLpMaxLeverage" v-model="leverage"
          ></v-slider>
          <div style="display: flex;flex-wrap: nowrap;justify-content: space-between;margin-right: 4px">
            <div v-for="i in selectedLpLeverScale" :key="i">{{ i }}x</div>
          </div>
        </div>

        <div class="borrowWrapper">
          <h5 class="font-italic mb-4">{{$t('open.borrows')}}</h5>
          <div class="debtRatio">
            <div>
              <div style="white-space: nowrap;margin-bottom: 20px">{{$t('open.debtRatio')}}</div>
              <div>{{ debtRatioTimes100.toFixed(2,0) }}%</div>
            </div>
<!--            <div>-->
<!--              <div>价格影响：</div>-->
<!--              <div>{{ priceImpact.times(100).toFixed(2) }}%</div>-->
<!--            </div>-->
            <div>
              <div style="text-align: center"><span>Price Slippage</span><span style="white-space: nowrap"> & Trading Fee</span></div>
              <div>{{ priceSlippageAndTradingFeeRate.times(100).toFixed(2) }}%</div>
            </div>
            <div class="mr-2">
              <div style="text-align: center">Optimal Proportion</div>
              <v-switch hide-details color="#41e1ad" v-model="useOptimalK"></v-switch>
            </div>
          </div>
          <!--     tokenA     -->
          <div>
            <div class="d-flex justify-space-between pt-4">
              <div class="d-flex align-center">
                <img :src="tokenALogoSource?tokenALogoSource:''" width="25" class="mr-2" alt="">
                <span>{{tokenASymbol}}</span>
              </div>
              <div style="width: 60%">
                <v-text-field solo dense flat rounded hide-details color="#aaaaaa" v-model="tokenABorrow" @change="tokenABorrowChange($event)">
                  <template v-slot:append>{{tokenASymbol||''}}</template>
                </v-text-field>
              </div>
            </div>
            <v-slider class="my-2" color="#00e1bc" track-color="#484b67"  thumb-color="#00e1bc" thumb-label="always" min="0" max="100" hide-details v-model="tokenABorrowRate" @input="sliderTokenAChange($event)">
              <template v-slot:thumb-label="{ value }">
                {{value}}%
              </template>
            </v-slider>
          </div>
          <!--     tokenB     -->
          <div>
            <div class="d-flex justify-space-between pt-4">
              <div class="d-flex align-center">
                <img :src="tokenBLogoSource?tokenBLogoSource:''" width="25" class="mr-2" alt="">
                <span>{{tokenBSymbol}}</span>
              </div>
              <div style="width: 60%">
                <v-text-field solo dense flat rounded hide-details color="#aaaaaa" v-model="tokenBBorrow" @change="tokenBBorrowChange($event)">
                  <template v-slot:append>{{tokenBSymbol||''}}</template>
                </v-text-field>
              </div>
            </div>
            <v-slider class="my-2" color="#00e1bc" track-color="#484b67" thumb-color="#00e1bc" thumb-label="always" min="0" max="100" hide-details v-model="tokenBBorrowRate" @input="sliderTokenBChange($event)">
              <template v-slot:thumb-label="{ value }">
                {{value}}%
              </template>
            </v-slider>
          </div>
        </div>
        <div v-if="insufficientCredit" class="px-4 red--text text-caption pb-2">协议剩余额度不足，请尝试降低杠杆</div>
        <div v-if="insufficientTokenALiquidity" class="px-4 red--text text-caption pb-2">{{tokenASymbol||''}}流动性不足，请尝试降低借款</div>
        <div v-if="insufficientTokenBLiquidity" class="px-4 red--text text-caption pb-2">{{tokenBSymbol||''}}流动性不足，请尝试降低借款</div>

        <div class="btnFooter d-flex align-center">
          <div class="backBtn text-center py-3 px-6 mr-2" @click="step=1">{{$t('open.back')}}</div>
          <div class="nextBtn text-center py-3 px-6 ml-2" @click="clickNextBtn">{{$t('open.next')}}</div>
        </div>
      </div>

      <!--  手机和Ipad版 -> Step3  -->
      <div v-if="step===3" class="strategy">
        <!--  actions  -->
        <div class="actions">
          <h5 class="font-italic px-4 pt-4 mb-5">{{$t('open.topTitle3')}}</h5>

          <!--  手机和Ipad版 -> Step3 -> Happen -> 开仓  -->
          <div v-if="Number(selectedPositionId)===0">
            <div class="step">
              <p class="text-caption grey--text">{{$t('open.stepThreeSupply',{x:tokenASupplyBigNumber.toFixed(4),y:tokenASymbol||'',z: tokenBSupplyBigNumber.toFixed(4),w:tokenBSymbol||''})}}</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_1.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_1.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">{{$t('open.stepThreeBorrow',{x:tokenABorrowBigNumber.toFixed(3,0),y:tokenASymbol||'',z:tokenBBorrowBigNumber.toFixed(3,0),w:tokenBSymbol||''})}}</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 pn
                y-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_2.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_2.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">
                {{$t('open.stepThreeSwap',{x:swapAmountIn.toFixed(3),y:(swapIsReserved?tokenBSymbol:tokenASymbol)||'',z:swapAmountOut.toFixed(3),w:(swapIsReserved?tokenASymbol:tokenBSymbol)||''})}}
              </p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_3.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_3.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">
                {{$t('open.stepThreeAdd',{x:tokenAAdd.toFixed(3,1),y:tokenASymbol||'',z:tokenBAdd.toFixed(3,1),w:tokenBSymbol||''})}}
              </p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_3.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_3.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
          </div>

          <!--  iPad跟手机版 -> Step3 -> Happen -> 增加仓位  -->
          <div v-if="Number(selectedPositionId)!==0">
            <div class="step">
              <p class="text-caption grey--text">
                {{$t('open.stepThreePosition',{x:tokenAPositionBalance.toFixed(4,1),y:tokenASymbol||'',z:tokenBPositionBalance.toFixed(4,1),w:tokenBSymbol||''})}}
              </p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenAPositionBalance.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBPositionBalance.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">
                {{$t('open.stepThreeSupplyMore',{x:tokenASupplyBigNumber.toFixed(4,1),y:tokenASymbol||'',z: tokenBSupplyBigNumber.toFixed(4,1),w:tokenBSymbol||''})}}
              </p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_1.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_1.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">
                {{$t('open.stepThreeBorrowMore',{x:tokenABorrowBigNumber.toFixed(3,0),y:tokenASymbol||'',z:tokenBBorrowBigNumber.toFixed(3,0),w:tokenBSymbol||''})}}
              </p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_2.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_2.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">
                {{$t('open.stepThreeSwapMore',{x:swapAmountIn.toFixed(3),y:(swapIsReserved?tokenBSymbol:tokenASymbol)||'',z:swapAmountOut.toFixed(3),w:(swapIsReserved?tokenASymbol:tokenBSymbol)||''})}}
              </p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_3.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_3.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">
                 {{$t('open.stepThreeAddMore',{x:tokenAAdd.toFixed(3,1),y:tokenASymbol||'',z:tokenBAdd.toFixed(3,1),w:tokenBSymbol||''})}}
              </p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_3.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_3.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
          </div>

          <!--  iPad跟手机版 -> Step3 -> 第一块数据（滑点容忍度等）  -->
          <div style="padding: 0 0.5rem 1.25rem">
            <v-divider color="#53566c" class="mb-5 mx-2"></v-divider>
            <div class="d-flex justify-space-between px-2 py-1">
              <span class="grey-font">{{$t('open.slippageTolerance')}}</span>
              <span class="text-caption">{{ slippageTolerance }}%</span>
            </div>
            <div class="d-flex justify-space-between px-2 py-1">
              <span class="grey-font">{{$t('open.slippageAndFee')}}</span>
              <span class="text-caption">{{ priceSlippageAndTradingFeeRate.times(100).toFixed(2) }}%</span>
            </div>
            <div class="d-flex justify-space-between px-2 py-1">
              <span class="grey-font">{{$t('open.debtRatio')}}</span>
              <span class="text-caption">{{ debtRatioTimes100.toFixed(2,0) }}%</span>
            </div>
          </div>
        </div>
        <!--  APY  -->
        <div class="apy pb-4">
          <h5 class="font-italic pt-4 mb-5">{{$t('open.apy')}}</h5>
          <div class="table d-flex flex-wrap flex-row">
            <div class="d-flex flex-column">
              <span class="grey-font mb-1">{{$t('open.yieldFarm')}}</span>
              <span class="text-caption">{{ newRewardApy.times(100).toFixed(2) }}%</span>
            </div>
<!--            <div class="d-flex flex-column">-->
<!--              <span class="grey-font mb-1">{{$t('open.tradingFee')}}</span>-->
<!--              <span class="text-caption">1%</span>-->
<!--            </div>-->
            <div class="d-flex flex-column">
              <span class="grey-font mb-1">{{$t('open.alphaReward')}}</span>
              <span class="text-caption">{{ newACMDApy.times(100).toFixed(2) }}%</span>
            </div>
            <div class="d-flex flex-column">
              <span class="grey-font mb-1">{{$t('open.borrowApy')}}</span>
              <span class="text-caption">{{ newBorrowApy.times(100).toFixed(2) }}%</span>
            </div>
            <div class="d-flex flex-column">
              <span class="grey-font mb-1">{{$t('open.total')}}</span>
              <span class="text-caption">{{ newTotalApy.times(100).toFixed(2) }}%</span>
            </div>
          </div>
          <div v-if="Number(selectedPositionId)===0" class="pt-4">
            <v-divider color="#53566c" class="mb-4"></v-divider>
            <div class="d-flex justify-space-between py-1">
              <span class="grey-font">{{$t('open.totalDebt')}}</span>
              <span class="text-caption">{{ tokenABorrowBigNumber.toFixed(4) }} {{tokenASymbol||''}} + {{ tokenBBorrowBigNumber.toFixed(4) }} {{tokenBSymbol||''}}</span>
            </div>
            <div class="d-flex justify-space-between py-1">
              <span class="grey-font">{{$t('open.positionBreakdown')}}</span>
              <span class="text-caption">{{ tokenAAdd.toFixed(3) }} {{tokenASymbol||''}} + {{ tokenBAdd.toFixed(3) }} {{tokenBSymbol||''}}</span>
            </div>
          </div>
        </div>
        <div class="btnFooter d-flex align-center">
          <div class="backBtn text-center py-3 px-6 mr-2" @click="step=2">{{$t('open.back')}}</div>

          <div v-if="!tokenAIsApprove || !tokenBIsApprove" class="d-flex" style="width: 100%">
            <div v-if="!tokenAIsApprove" class="nextBtn text-center py-3 px-3 ml-2 text-caption" @click="sendApprove(tokenAAddress)">{{$t('open.approve',{x:this.tokenASymbol})}}</div>
            <div v-if="!tokenBIsApprove" class="nextBtn text-center py-3 px-3 ml-2 text-caption" @click="sendApprove(tokenBAddress)">{{$t('open.approve',{x:this.tokenBSymbol})}}</div>
          </div>


          <div v-else style="width: 100%" class="nextBtn text-center py-3 px-6 ml-2" @click="sendAddLiquidity">
            {{$t('open.confirm')}}
          </div>

        </div>
      </div>

    </div>

    <!--  电脑版  -->
    <v-container class="hidden-sm-and-down" style="max-width: 800px;display: flex">
      <!--  电脑版 -> token进度卡片  -->
      <div style="background-color: #53566c;border-radius: 0.5rem 0 0 0.5rem;">
        <Step :step="step" :token-logo-source="lpLogoSource" :dex-name="selectedPoolDEX" :token-symbol="poolName"></Step>
      </div>

      <!--  电脑版 -> Step1  -->
      <div v-if="step===1" class="supplyPC pb-6">
        <!--  电脑版 -> Step1 -> MyPosition  -->
        <div class="step" v-if="Number(selectedPositionId)!==0">
          <h4 class="font-italic pt-8 pb-5">{{$t('open.myPosition')}}</h4>
          <div class="d-flex">
            <div class="d-flex align-center mr-2 py-2 pl-4">
              <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
              <span>{{ tokenAPositionBalance.toFixed(4,1) }} {{tokenASymbol||''}}</span>
            </div>
            <div class="d-flex align-center ml-2 py-2 pl-4">
              <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
              <span>{{ tokenBPositionBalance.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
            </div>
          </div>
          <v-divider color="#53566c" class="mt-9"></v-divider>
        </div>

        <!--  电脑版 -> Step1 -> Supply  -->
        <h4 class="font-italic px-8 pt-8">{{$t('open.topTitle')}}</h4>
        <v-form ref="formTokenA" v-model="validForm">

          <!--  电脑版 -> Step1 -> Supply -> TokenA  -->
          <div class="px-8 py-4">
            <div class="grey-font text-no-wrap text-right pb-2">{{$t('open.balance',{x:tokenABalance?Number(tokenABalance).toFixed(4):'0.0000'})}}</div>
            <div class="d-flex justify-space-between">
              <div>
                <div class="d-flex justify-center align-center">
                  <img :src="tokenALogoSource?tokenALogoSource:''" width="40" height="40" alt="">
                  <div class="ml-1">
                    <div>{{tokenASymbol||''}}</div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-center ml-4">
                <!--              <v-form ref="formTokenA" v-model="validForm">-->
                <v-text-field solo dense flat rounded clearable
                              color="#aaaaaa" v-model="tokenASupply"
                              :rules=[validateTokenA]
                ></v-text-field>
                <!--              </v-form>-->
                <v-btn rounded dark class="ml-1" @click="setTokenASupplyMax(tokenASymbol,tokenABalance)">{{$t('open.maxBtn')}}</v-btn>
              </div>
            </div>
          </div>

          <!--  电脑版 -> Step1 -> Supply -> TokenB  -->
          <div class="px-8 py-4">
            <div class="grey-font text-no-wrap text-right pb-2">{{$t('open.balance',{x:tokenBBalance?Number(tokenBBalance).toFixed(4):'0.0000'})}}</div>
            <div class="d-flex justify-space-between">
              <div>
                <div class="d-flex justify-center align-center">
                  <img :src="tokenBLogoSource?tokenBLogoSource:''" width="40" height="40" alt="">
                  <div class="ml-1">
                    <div>{{tokenBSymbol||''}}</div>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-center ml-4">
<!--                <v-form ref="formTokenB" v-model="validForm">-->
                  <v-text-field solo dense flat rounded clearable
                                color="#aaaaaa" v-model="tokenBSupply"
                                :rules=[validateTokenB]
                  ></v-text-field>
<!--                </v-form>-->
                <v-btn rounded dark class="ml-1" @click="setTokenBSupplyMax(tokenBSymbol,tokenBBalance)">{{$t('open.maxBtn')}}</v-btn>
              </div>
            </div>
          </div>
        </v-form>

        <v-divider color="#53566c" class="my-5 mx-8"></v-divider>

        <!--  电脑版 -> Step1 -> Note  -->
        <div class="px-8" v-if="Number(selectedPositionId)===0">
          <div class="grey-font py-2">{{$t('open.note')}}</div>
          <div class="text-caption text--lighten-3">
            {{$t('open.noteWord')}}
          </div>
        </div>

        <!--  电脑版 -> Step1 -> Buttons  -->
        <div class="btnFooterPC d-flex align-end">
          <div class="backBtn text-center py-3 px-6 mr-2" @click="$router.back()">{{$t('open.back')}}</div>
          <div class="text-center py-3 px-6 ml-2" :class="validForm===true?'nextBtn':'nextBtnDisabled'" @click="clickNextBtn">{{$t('open.next')}}</div>
        </div>
      </div>

      <!--  电脑版 -> Step2  -->
      <div v-if="step===2" class="borrowPC pb-6">

        <!--  电脑版 -> Step2 -> Supplying  -->
        <h4 class="font-italic px-8 pt-8">{{$t('open.topTitle2')}}</h4>
        <div class="d-flex step py-4 px-8">
          <div class="d-flex align-center mr-2 py-2 pl-4">
            <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
            <span>{{ tokenASupplyBigNumber.toFixed(4) }} {{tokenASymbol||''}}</span>
          </div>
          <div class="d-flex align-center ml-2 py-2 pl-4">
            <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
            <span>{{ tokenBSupplyBigNumber.toFixed(4) }} {{tokenBSymbol||''}}</span>
          </div>
        </div>

        <v-divider color="#53566c" class="mb-5 mx-8"></v-divider>

        <!--  电脑版 -> Step2 -> Leverage  -->
        <div class="d-flex justify-space-between px-8">
          <h4 class="font-italic">{{$t('open.leverage')}}</h4>
          <div class="d-flex">
            <div class="mx-1" style="background-color: #484B67;border-radius: 0.25rem">
              <v-icon color="#fff" @click="minusLeverage">mdi-minus</v-icon>
            </div>
            <div class="mx-1" style="background-color: #484B67;border-radius: 0.25rem">
              <v-icon color="#fff" @click="addLeverage">mdi-plus</v-icon>
            </div>
          </div>
        </div>

        <div class="d-flex justify-space-between align-center px-8">
          <div style="width: 100%">
            <v-slider value="1" color="#00e1bc" track-color="#484b67" hide-details
                      step="0.01" min="1" :max="selectedLpMaxLeverage" v-model="leverage"
            ></v-slider>
            <div style="display: flex;flex-wrap: nowrap;justify-content: space-between;margin-right: 4px">
              <div v-for="i in selectedLpLeverScale" :key="i">{{ i }}x</div>
            </div>
          </div>

<!--          <div style="width: 120px;margin-left: 10px">-->
<!--            <v-text-field solo dense flat rounded hide-details color="#aaaaaa" suffix="x" v-model="leverage"></v-text-field>-->
<!--          </div>-->
        </div>

        <v-divider color="#53566c" class="mb-5 mt-8 mx-8"></v-divider>

        <!--  电脑版 -> Step2 -> Borrows  -->
        <div class="d-flex align-center justify-space-between px-8">
          <h4 class="font-italic">{{$t('open.borrows')}}</h4>
          <div class="text-right">
            <div>{{$t('open.debtRatio')}} {{ debtRatioTimes100.toFixed(2,0) }}%</div>
<!--            <div>{{$t('open.borrowPower')}} NaN%</div>-->
            <v-checkbox v-model="useOptimalK"
                        label="推荐比例"
            ></v-checkbox>
<!--            <div>价格影响：{{ priceImpact.times(100).toFixed(2) }}%</div>-->
            <div>滑点 & 手续费：{{ priceSlippageAndTradingFeeRate.times(100).toFixed(2) }}%</div>
          </div>
        </div>

        <!--  电脑版 -> Step2 -> Borrows -> TokenA  -->
        <div class="d-flex justify-space-between align-center px-8 pt-4 pb-8">
          <img :src="tokenALogoSource?tokenALogoSource:''" width="30" alt="" class="mr-2">
          <div style="width: 100%">
            <v-slider class="my-2" color="#00e1bc" track-color="#484b67"  thumb-color="#00e1bc" thumb-label="always" min="0" max="100" hide-details v-model="tokenABorrowRate" @input="sliderTokenAChange($event)">
              <template v-slot:thumb-label="{ value }">
                {{value}}%
              </template>
            </v-slider>
          </div>
          <div style="width: 300px;margin-left: 10px">
            <v-text-field solo dense flat rounded hide-details color="#aaaaaa" v-model="tokenABorrow" @change="tokenABorrowChange($event)">
              <template v-slot:append>{{tokenASymbol||''}}</template>
            </v-text-field>
          </div>
        </div>

        <!--  电脑版 -> Step2 -> Borrows -> TokenB  -->
        <div class="d-flex justify-space-between align-center px-8 pt-4 pb-8">
          <img :src="tokenBLogoSource?tokenBLogoSource:''" width="30" alt="" class="mr-2">
          <div style="width: 100%">
            <v-slider class="my-2" color="#00e1bc" track-color="#484b67"  thumb-color="#00e1bc" thumb-label="always" min="0" max="100" hide-details v-model="tokenBBorrowRate" @input="sliderTokenBChange($event)">
              <template v-slot:thumb-label="{ value }">
                {{value}}%
              </template>
            </v-slider>
          </div>
          <div style="width: 300px;margin-left: 10px">
            <v-text-field solo dense flat rounded hide-details color="#aaaaaa" v-model="tokenBBorrow" @change="tokenBBorrowChange($event)">
              <template v-slot:append>{{tokenBSymbol||''}}</template>
            </v-text-field>
          </div>
        </div>
        <div v-if="insufficientCredit" class="px-8 red--text text-caption pb-2">协议剩余额度不足，请尝试降低杠杆</div>
        <div v-if="insufficientTokenALiquidity" class="px-8 red--text text-caption pb-2">{{tokenASymbol||''}}流动性不足，请尝试降低借款</div>
        <div v-if="insufficientTokenBLiquidity" class="px-8 red--text text-caption pb-2">{{tokenBSymbol||''}}流动性不足，请尝试降低借款</div>

        <!--  电脑版 -> Step3 -> 第二块数据（收益率）  -->
        <div style="padding: 0 2rem 1.25rem">
          <v-divider color="#53566c" class="mb-5"></v-divider>
          <div class="d-flex justify-space-between py-1">
            <span class="grey-font">{{$t('open.yieldFarm')}}</span>
            <span class="text-caption">{{ newRewardApy.times(100).toFixed(2) }}%</span>
          </div>
          <div class="d-flex justify-space-between py-1">
            <span class="grey-font">{{$t('open.alphaReward')}}</span>
            <span class="text-caption">{{ newACMDApy.times(100).toFixed(2) }}%</span>
          </div>
          <div class="d-flex justify-space-between py-1">
            <span class="grey-font">{{$t('open.borrowApy')}}</span>
            <span class="text-caption">{{ newBorrowApy.times(100).toFixed(2) }}%</span>
          </div>
          <div class="d-flex justify-space-between py-1">
            <span class="grey-font">{{$t('open.total')}}</span>
            <span class="text-caption">{{ newTotalApy.times(100).toFixed(2) }}%</span>
          </div>
        </div>

        <v-divider color="#53566c" class="mb-5 mx-8"></v-divider>

        <!--  电脑版 -> Step2 -> Buttons  -->
        <div class="btnFooterPC d-flex align-end">
          <div class="backBtn text-center py-3 px-6 mr-2" @click="step=1">{{$t('open.back')}}</div>
          <div class="nextBtn text-center py-3 px-6 ml-2" @click="clickNextBtn">{{$t('open.next')}}</div>
        </div>
      </div>

      <!--  电脑版 -> Step3  -->
      <div v-if="step===3" class="strategyPC">
        <div class="actions">

          <!--  电脑版 -> Step3 -> Happen  -->
          <h4 class="font-italic px-8 pt-8 mb-5">{{$t('open.topTitle3')}}</h4>

          <!--  电脑版 -> Step3 -> Happen -> 开仓  -->
          <div v-if="Number(selectedPositionId)===0">
            <div class="step">
              <p class="text-caption grey--text">
               {{$t('open.stepThreeSupply',{x:tokenASupplyBigNumber.toFixed(4),y:tokenASymbol||'',z: tokenBSupplyBigNumber.toFixed(4),w:tokenBSymbol||''})}}
              </p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_1.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_1.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">{{$t('open.stepThreeBorrow',{x:tokenABorrowBigNumber.toFixed(3,0),y:tokenASymbol||'',z:tokenBBorrowBigNumber.toFixed(3,0),w:tokenBSymbol||''})}}</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_2.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_2.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">{{$t('open.stepThreeSwap',{x:swapAmountIn.toFixed(3),y:(swapIsReserved?tokenBSymbol:tokenASymbol)||'',z:swapAmountOut.toFixed(3),w:(swapIsReserved?tokenASymbol:tokenBSymbol)||''})}}</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_3.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_3.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">{{$t('open.stepThreeAdd',{x:tokenAAdd.toFixed(3,1),y:tokenASymbol||'',z:tokenBAdd.toFixed(3,1),w:tokenBSymbol||''})}}</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_3.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_3.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
          </div>

          <!--  电脑版 -> Step3 -> Happen -> 增加仓位  -->
          <div v-if="Number(selectedPositionId)!==0">
            <div class="step">
              <p class="text-caption grey--text">{{$t('open.stepThreePosition',{x:tokenAPositionBalance.toFixed(4,1),y:tokenASymbol||'',z:tokenBPositionBalance.toFixed(4,1),w:tokenBSymbol||''})}}</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenAPositionBalance.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBPositionBalance.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">{{$t('open.stepThreeSupplyMore',{x:tokenASupplyBigNumber.toFixed(4,1),y:tokenASymbol||'',z: tokenBSupplyBigNumber.toFixed(4,1),w:tokenBSymbol||''})}}</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_1.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_1.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">{{$t('open.stepThreeBorrowMore',{x:tokenABorrowBigNumber.toFixed(3,0),y:tokenASymbol||'',z:tokenBBorrowBigNumber.toFixed(3,0),w:tokenBSymbol||''})}}</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_2.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_2.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">{{$t('open.stepThreeSwapMore',{x:swapAmountIn.toFixed(3),y:(swapIsReserved?tokenBSymbol:tokenASymbol)||'',z:swapAmountOut.toFixed(3),w:(swapIsReserved?tokenASymbol:tokenBSymbol)||''})}}</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_3.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_3.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">{{$t('open.stepThreeAddMore',{x:tokenAAdd.toFixed(3,1),y:tokenASymbol||'',z:tokenBAdd.toFixed(3,1),w:tokenBSymbol||''})}}</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest_3.toFixed(4,1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest_3.toFixed(4,1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
          </div>

          <!--  电脑版 -> Step3 -> 第一块数据（滑点容忍度等）  -->
          <div style="padding: 0 2rem 1.25rem">
            <v-divider color="#53566c" class="mb-5"></v-divider>
            <div class="d-flex justify-space-between py-1">
              <span class="grey-font">{{$t('open.slippageTolerance')}}</span>
              <span class="text-caption">{{ slippageTolerance }}%</span>
            </div>
            <div class="d-flex justify-space-between py-1">
              <span class="grey-font">{{$t('open.slippageAndFee')}}</span>
              <span class="text-caption">{{ priceSlippageAndTradingFeeRate.times(100).toFixed(2) }}%</span>
            </div>
            <div class="d-flex justify-space-between py-1">
              <span class="grey-font">{{$t('open.debtRatio')}}</span>
              <span class="text-caption">{{ debtRatioTimes100.toFixed(2,0) }}%</span>
            </div>
          </div>

          <!--  电脑版 -> Step3 -> 第二块数据（收益率）  -->
          <div style="padding: 0 2rem 1.25rem">
            <v-divider color="#53566c" class="mb-5"></v-divider>
            <div class="d-flex justify-space-between py-1">
              <span class="grey-font">{{$t('open.yieldFarm')}}</span>
              <span class="text-caption">{{ newRewardApy.times(100).toFixed(2) }}%</span>
            </div>
            <div class="d-flex justify-space-between py-1">
              <span class="grey-font">{{$t('open.alphaReward')}}</span>
              <span class="text-caption">{{ newACMDApy.times(100).toFixed(2) }}%</span>
            </div>
            <div class="d-flex justify-space-between py-1">
              <span class="grey-font">{{$t('open.borrowApy')}}</span>
              <span class="text-caption">{{ newBorrowApy.times(100).toFixed(2) }}%</span>
            </div>
            <div class="d-flex justify-space-between py-1">
              <span class="grey-font">{{$t('open.total')}}</span>
              <span class="text-caption">{{ newTotalApy.times(100).toFixed(2) }}%</span>
            </div>
          </div>

          <!--  电脑版 -> Step3 -> 第三块数据（仓位总览）  -->
          <div v-if="Number(selectedPositionId)===0" style="padding: 0 2rem 1.25rem">
            <v-divider color="#53566c" class="mb-5"></v-divider>
            <div class="d-flex justify-space-between py-1">
              <span class="grey-font">{{$t('open.totalDebt')}}</span>
              <span class="text-caption">{{ tokenABorrowBigNumber.toFixed(4) }} {{tokenASymbol||''}} + {{ tokenBBorrowBigNumber.toFixed(4) }} {{tokenBSymbol||''}}</span>
            </div>
            <div class="d-flex justify-space-between py-1">
              <span class="grey-font">{{$t('open.positionBreakdown')}}</span>
              <span class="text-caption">{{ tokenAAdd.toFixed(3) }} {{tokenASymbol||''}} + {{ tokenBAdd.toFixed(3) }} {{tokenBSymbol||''}}</span>
            </div>
          </div>
        </div>

        <!--  电脑版 -> Step3 -> Buttons  -->
        <div class="btnFooterPC d-flex align-center">
          <div class="backBtn text-center py-3 px-6 mr-2" @click="step=2">{{$t('open.back')}}</div>

          <div v-if="!tokenAIsApprove || !tokenBIsApprove" class="d-flex" style="width: 100%">
            <div v-if="!tokenAIsApprove" class="nextBtn text-center py-3 px-3 ml-2 text-caption" @click="sendApprove(tokenAAddress)">{{$t('open.approve',{x:this.tokenASymbol})}}</div>
            <div v-if="!tokenBIsApprove" class="nextBtn text-center py-3 px-3 ml-2 text-caption" @click="sendApprove(tokenBAddress)">{{$t('open.approve',{x:this.tokenBSymbol})}}</div>
          </div>

          <div v-else style="width: 100%">
            <div class="nextBtn text-center py-3 px-6 ml-2" @click="sendAddLiquidity">
              {{ Number(selectedPositionId)===0?'CONFIRM':'ADD CONFIRM' }}
            </div>
          </div>

        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import Step from "@/components/Step";
import BigNumber from 'bignumber.js'
import {mapState} from "vuex";
import { decimals, tokenSymbol, mdexLpTokenPoolIdUnderlying} from "@/utils/constants";
import { address } from '@/utils/address'
import { eX } from "@/utils/helpers";
import erc_abi from "../../utils/json/ERC20.json";
import {getAmountOut, getPoolName, lpLogoSource, optimalDeposit, getPriceImpact, getLpMint} from "../../utils";
const WHTAddress = '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F'
const Web3 = require('web3')
const gasLimit = "3500000";
let web3 = new Web3(window.ethereum)
export default {
  name: "Open",
  components: {Step},
  data(){
    return {
      step: 1,
      validForm: true, //验证表单
      useOptimalK: true,
      tokenASupply: '',
      tokenBSupply: '',
      leverage: 1, //默认1x 不加杠杆
      tokenABorrow: 0,
      tokenBBorrow: 0,
      tokenABorrowRate: 0,
      tokenBBorrowRate: 0,
      sliderTokenAPreventInput: false,
      sliderTokenBPreventInput: false,

    }
  },
  computed: {
    insufficientCredit: function() {
      return this.borrowValue?.isGreaterThan(this.IBankTotalCreditLimits.minus(this.IBankTotalDebtValue))
    },
    insufficientTokenALiquidity: function() {
      return this.tokenABorrowBigNumber?.isGreaterThan(this.allMarketsMap[this.tokenAAddress].underlyingAmount)
    },
    insufficientTokenBLiquidity: function() {
      return this.tokenBBorrowBigNumber?.isGreaterThan(this.allMarketsMap[this.tokenBAddress].underlyingAmount)
    },
    selectedCollateralSize: function() {
      return new BigNumber(this.userPositionsMap[this.selectedPositionId]?.collateralSize || 0) || new BigNumber(0)
    },
    selectedPositionDebts: function() {
      return this.userPositionsMap[this.selectedPositionId]?.positionDebts
    },
    // lp预言机价格
    selectedLpPrice: function() {
      return this.allPoolsMap[this.selectedPoolAddress]?.lpPrice || new BigNumber(0)
    },
    selectedLpReserve: function() {
      return this.allPoolsMap[this.selectedPoolAddress]?.lpReserves || new BigNumber(0)
    },
    selectedLpTotalSupply: function() {
      return this.allPoolsMap[this.selectedPoolAddress]?.lpTotalSupply || new BigNumber(0)
    },
    selectedLpMaxLeverage: function() {
      return this.allPoolsMap[this.selectedPoolAddress]?.maxLeverage || 3
    },
    selectedLpLeverScale: function() {
      if (String(this.selectedLpMaxLeverage).includes('.')) {
        return [1,this.selectedLpMaxLeverage]
      }
      return this.selectedLpMaxLeverage
    },
    // token预言机价格
    tokenAPrice: function() {
      return this.allMarketsMap[this.tokenAAddress]?.underlyingPrice || new BigNumber(0)
    },
    tokenBPrice: function() {
      return this.allMarketsMap[this.tokenBAddress]?.underlyingPrice || new BigNumber(0)
    },
    tokenAAddress: function() {
      return this.selectedPoolTokens[0]
    },
    tokenBAddress: function() {
      return this.selectedPoolTokens[1]
    },
    tokenAIsApprove: function() {
      // 不 Approve WHT 的话 Remove 会失败，所以不用忽略 WHT 授权
      return this.allMarketsMap[this.tokenAAddress]?.isApproveIBank
    },
    tokenBIsApprove: function() {
      return this.allMarketsMap[this.tokenBAddress]?.isApproveIBank
    },
    tokenABalance: function() {
      const balance = this.tokenAAddress===WHTAddress
          ? this.htBalance
          : this.allMarketsMap[this.tokenAAddress]?.walletBalance
      return balance==='0.0000'
          ? '0'
          : balance
    },
    tokenBBalance: function() {
      const balance = this.tokenBAddress===WHTAddress
          ? this.htBalance
          : this.allMarketsMap[this.tokenBAddress]?.walletBalance
      return balance==='0.0000'
          ? '0'
          : balance
    },
    tokenASymbol: function() {
      return tokenSymbol['heco-mainnet'][this.tokenAAddress].replace(/^WHT$/,"HT")
    },
    tokenBSymbol: function() {
      return tokenSymbol['heco-mainnet'][this.tokenBAddress].replace(/^WHT$/,"HT")
    },
    tokenALogoSource: function() {
      return require(`../../assets/coin/asset_${this.tokenASymbol}.svg`)
    },
    tokenBLogoSource: function() {
      return require(`../../assets/coin/asset_${this.tokenBSymbol}.svg`)
    },
    tokenAPositionBalance: function() {
      return eX(this.selectedCollateralSize.div(this.selectedLpTotalSupply).times(this.selectedLpReserve[0])
          ,-1*this.tokenDecimal(this.tokenAAddress))
    },
    tokenBPositionBalance: function() {
      return eX(this.selectedCollateralSize.div(this.selectedLpTotalSupply).times(this.selectedLpReserve[1])
          ,-1*this.tokenDecimal(this.tokenBAddress))
    },
    tokenADebt: function() {
      return eX(this.selectedPositionDebts?.debts[this.selectedPositionDebts?.tokens.indexOf(this.tokenAAddress)] || 0
          ,-1*this.tokenDecimal(this.tokenAAddress))
    },
    tokenBDebt: function() {
      return eX(this.selectedPositionDebts?.debts[this.selectedPositionDebts?.tokens.indexOf(this.tokenBAddress)] || 0
          ,-1*this.tokenDecimal(this.tokenBAddress))
    },
    lpPriceFactorColl: function() {
      return this.allPoolsMap[this.selectedPoolAddress]?.priceFactorColl
    },
    tokenAPriceFactorBorr: function() {
      return this.allMarketsMap[this.tokenAAddress]?.priceFactorBorr
    },
    tokenBPriceFactorBorr: function() {
      return this.allMarketsMap[this.tokenBAddress]?.priceFactorBorr
    },
    debtRatioTimes100: function() {
      const res = this.tokenABorrowBigNumber.plus(this.tokenADebt).times(this.tokenAPrice).times(this.tokenAPriceFactorBorr)
          .plus(this.tokenBBorrowBigNumber.plus(this.tokenBDebt).times(this.tokenBPrice).times(this.tokenBPriceFactorBorr))
          .div(eX(this.selectedCollateralSize,-18).plus(this.lpWillMintAmount))
          .div(this.selectedLpPrice.times(this.lpPriceFactorColl)).times(100)
      return res.isNaN() ? new BigNumber(0) : res
    },
    tokenASupplyBigNumber: function() {
      return new BigNumber(this.tokenASupply).isNaN()?new BigNumber(0):new BigNumber(this.tokenASupply)
    },
    tokenBSupplyBigNumber: function() {
      return new BigNumber(this.tokenBSupply).isNaN()?new BigNumber(0):new BigNumber(this.tokenBSupply)
    },
    tokenABorrowBigNumber: function() {
      return new BigNumber(this.tokenABorrow).isNaN()?new BigNumber(0):new BigNumber(this.tokenABorrow)
    },
    tokenBBorrowBigNumber: function() {
      return new BigNumber(this.tokenBBorrow).isNaN()?new BigNumber(0):new BigNumber(this.tokenBBorrow)
    },
    // 仓位余额，加供应
    tokenARest_1: function() {
      return this.tokenAPositionBalance.plus(this.tokenASupplyBigNumber)
    },
    tokenBRest_1: function() {
      return this.tokenBPositionBalance.plus(this.tokenBSupplyBigNumber)
    },
    // 再加借来的币
    tokenARest_2: function() {
      return this.tokenARest_1.plus(this.tokenABorrowBigNumber)
    },
    tokenBRest_2: function() {
      return this.tokenBRest_1.plus(this.tokenBBorrowBigNumber)
    },
    // 兑换后剩余的币
    tokenARest_3: function() {
      return this.swapIsReserved
          ? this.tokenARest_2.plus(this.swapAmountOut)
          : this.tokenARest_2.minus(this.swapAmountIn)
    },
    tokenBRest_3: function() {
      return this.swapIsReserved
          ? this.tokenBRest_2.minus(this.swapAmountIn)
          : this.tokenBRest_2.plus(this.swapAmountOut)
    },
    // 添加流动性的币
    tokenAAdd: function() {
      const res = this.tokenARest_3.minus(this.tokenAPositionBalance)
      if (res.isLessThan(0)) return new BigNumber(0)
      return res
    },
    tokenBAdd: function() {
      const res = this.tokenBRest_3.minus(this.tokenBPositionBalance)
      if (res.isLessThan(0)) return new BigNumber(0)
      return res
    },
    lpWillMintAmount: function () {
      const lpAmountRaw = getLpMint(
          eX(this.tokenAAdd,this.tokenDecimal(this.tokenAAddress)),
          eX(this.tokenBAdd,this.tokenDecimal(this.tokenBAddress)),
          this.selectedLpReserve[0],
          this.selectedLpReserve[1],
          this.selectedLpTotalSupply
      )
      return eX(lpAmountRaw,-18)
    },
    // false: swap 'swapAmountIn' AToken for 'swapAmountOut' BToken
    // true: swap 'swapAmountIn' BToken for 'swapAmountOut' AToken
    swapIsReserved: function() {
      const res = optimalDeposit(
          eX(this.tokenASupplyBigNumber.plus(this.tokenABorrowBigNumber),this.tokenDecimal(this.tokenAAddress)),
          eX(this.tokenBSupplyBigNumber.plus(this.tokenBBorrowBigNumber),this.tokenDecimal(this.tokenBAddress)),
          this.selectedLpReserve[0],
          this.selectedLpReserve[1],
      )
      return res.isReversed
    },
    swapAmountIn: function() {
      const res = optimalDeposit(
          eX(this.tokenASupplyBigNumber.plus(this.tokenABorrowBigNumber),this.tokenDecimal(this.tokenAAddress)),
          eX(this.tokenBSupplyBigNumber.plus(this.tokenBBorrowBigNumber),this.tokenDecimal(this.tokenBAddress)),
          this.selectedLpReserve[0],
          this.selectedLpReserve[1],
      )
      const amountInRaw = res.swapAmt
      if (amountInRaw.isLessThan(0)) return new BigNumber(0)
      return this.swapIsReserved
          ? eX(amountInRaw,-1 * this.tokenDecimal(this.tokenBAddress))
          : eX(amountInRaw,-1 * this.tokenDecimal(this.tokenAAddress))
    },
    swapAmountOut: function() {
      const res0 = optimalDeposit(
          eX(this.tokenASupplyBigNumber.plus(this.tokenABorrowBigNumber),this.tokenDecimal(this.tokenAAddress)),
          eX(this.tokenBSupplyBigNumber.plus(this.tokenBBorrowBigNumber),this.tokenDecimal(this.tokenBAddress)),
          this.selectedLpReserve[0],
          this.selectedLpReserve[1],
      )
      const amountOutRaw = getAmountOut(
          res0.swapAmt,
          this.swapIsReserved ? this.selectedLpReserve[1] : this.selectedLpReserve[0],
          this.swapIsReserved ? this.selectedLpReserve[0] : this.selectedLpReserve[1],
      )
      if (amountOutRaw.isLessThan(0)) return new BigNumber(0)
      return this.swapIsReserved
          ? eX(amountOutRaw,-1 * this.tokenDecimal(this.tokenAAddress))
          : eX(amountOutRaw,-1 * this.tokenDecimal(this.tokenBAddress))
    },
    priceImpact: function () {
      const amountInRaw = this.swapIsReserved
          ? eX(this.swapAmountIn,this.tokenDecimal(this.tokenBAddress))
          : eX(this.swapAmountIn,this.tokenDecimal(this.tokenAAddress))
      const reserveInRaw = this.swapIsReserved
          ? this.selectedLpReserve[1]
          : this.selectedLpReserve[0]
      const res = getPriceImpact(amountInRaw,reserveInRaw)
      return res.isLessThan(0) ? new BigNumber(0) : res
    },
    borrowValue: function () {
      return this.tokenABorrowBigNumber.times(this.tokenAPrice)
          .plus(this.tokenBBorrowBigNumber.times(this.tokenBPrice))
    },
    priceSlippageAndTradingFeeRate: function () {
      const VSupply = this.tokenASupplyBigNumber.times(this.tokenAPrice)
          .plus(this.tokenBSupplyBigNumber.times(this.tokenBPrice))
      const VBorrow = this.borrowValue
      const VAdd = this.tokenAAdd.times(this.tokenAPrice)
          .plus(this.tokenBAdd.times(this.tokenBPrice))
      const VPosition = eX(this.selectedCollateralSize,-18).times(this.selectedLpPrice)
      const VDebt = this.tokenADebt.times(this.tokenAPrice)
          .plus(this.tokenBDebt.times(this.tokenBPrice))
      const numerator = VSupply.plus(VBorrow).minus(VAdd)
      const denominator = VPosition.minus(VDebt).plus(VSupply)
      const res = numerator.div(denominator)
      return res.plus(0.0001).isGreaterThan(0) && res.isLessThan(0)
          ? new BigNumber(0)
          : new BigNumber(0).minus(res)
    },
    // 杠杆率 - 1 （注：ADD的那部分）
    n: function () {
      return new BigNumber(this.leverage).minus(1)
    },
    // 杠杆率 - 1 （注：ADD后的整个仓位，未考虑滑点）
    N: function () {
      const newVADebt = this.tokenADebt.plus(this.tokenABorrowBigNumber).times(this.tokenAPrice)
      const newVBDebt = this.tokenBDebt.plus(this.tokenBBorrowBigNumber).times(this.tokenBPrice)
      const newVDebt = newVADebt.plus(newVBDebt)
      const newVASupply = this.tokenASupplyBigNumber.plus(this.tokenAPositionBalance).minus(this.tokenADebt).times(this.tokenAPrice)
      const newVBSupply = this.tokenBSupplyBigNumber.plus(this.tokenBPositionBalance).minus(this.tokenBDebt).times(this.tokenBPrice)
      const newVSupply = newVASupply.plus(newVBSupply)
      return newVDebt.div(newVSupply)
    },
    // 杠杆率 - 1 （注：ADD后的整个仓位，考虑滑点）
    Ns: function () {
      const VSupply = this.tokenASupplyBigNumber.times(this.tokenAPrice)
          .plus(this.tokenBSupplyBigNumber.times(this.tokenBPrice))
      const VAdd = this.tokenAAdd.times(this.tokenAPrice)
          .plus(this.tokenBAdd.times(this.tokenBPrice))
      const VPosition = eX(this.selectedCollateralSize,-18).times(this.selectedLpPrice)
      const VDebt = this.tokenADebt.times(this.tokenAPrice)
          .plus(this.tokenBDebt.times(this.tokenBPrice))
      const numerator = VPosition.plus(VAdd)
      const denominator = VPosition.minus(VDebt).plus(VSupply)
      return numerator.div(denominator).minus(1)
    },
    // A的债务价值 / 总的债务价值 （注：ADD后的整个仓位）
    K: function () {
      const newVADebt = this.tokenADebt.plus(this.tokenABorrowBigNumber).times(this.tokenAPrice)
      const newVBDebt = this.tokenBDebt.plus(this.tokenBBorrowBigNumber).times(this.tokenBPrice)
      const newVDebt = newVADebt.plus(newVBDebt)
      const res = newVADebt.div(newVDebt)
      return res.isNaN() ? new BigNumber(0) : res
    },
    //
    newRewardApy: function () {
      const poolRewardApy = this.allPoolsMap[this.selectedPoolAddress]?.rewardTokenApy?.times(
          this.Ns.plus(1)
      )
      return poolRewardApy || new BigNumber(0)
    },
    newACMDApy: function () {
      const tokenAACMDApy = this.allPoolsMap[this.selectedPoolAddress]?.borrowTokenAACMDApy || new BigNumber(0)
      const tokenBACMDApy = this.allPoolsMap[this.selectedPoolAddress]?.borrowTokenBACMDApy || new BigNumber(0)
      const ACMDApy = tokenAACMDApy.times(this.K)
          .plus(tokenBACMDApy.times(new BigNumber(1).minus(this.K)))
          .times(this.N)
      return ACMDApy || new BigNumber(0)
    },
    newBorrowApy: function () {
      const tokenABorrowApy = this.allPoolsMap[this.selectedPoolAddress]?.borrowTokenAApy || new BigNumber(0)
      const tokenBBorrowApy = this.allPoolsMap[this.selectedPoolAddress]?.borrowTokenBApy || new BigNumber(0)
      const borrowApy = tokenABorrowApy.times(this.K)
          .plus(tokenBBorrowApy.times(new BigNumber(1).minus(this.K)))
          .times(this.N)
      return borrowApy || new BigNumber(0)
    },
    newTotalApy: function () {
      return this.newRewardApy.plus(this.newACMDApy).plus(this.newBorrowApy).plus(this.priceSlippageAndTradingFeeRate)
    },
    // 用池子大小换算的B/A价格比
    BPriceDivAPrice: function () {
      return eX(new BigNumber(this.selectedLpReserve[0]).div(this.selectedLpReserve[1])
          ,this.tokenDecimal(this.tokenBAddress) - this.tokenDecimal(this.tokenAAddress))
    },
    // 该杠杆下A的最大可借
    tokenABorrowMax: function () {
      return this.tokenASupplyBigNumber
          .plus(this.tokenBSupplyBigNumber.times(this.BPriceDivAPrice))
          .times(this.n)
    },
    // 该杠杆下B的最大可借
    tokenBBorrowMax: function () {
      return this.tokenBSupplyBigNumber
          .plus(this.tokenASupplyBigNumber.div(this.BPriceDivAPrice))
          .times(this.n)
    },
    // 使滑点最小的ABorrow
    optimalABorrow: function() {
      const tokenABorrow = new BigNumber(this.n).plus(1).div(2).times(this.tokenBSupplyBigNumber).times(this.BPriceDivAPrice)
          .plus(new BigNumber(this.n).minus(1).div(2).times(this.tokenASupplyBigNumber))
      if (tokenABorrow.isLessThan(0)) return new BigNumber(0)
      if (tokenABorrow.isGreaterThan(this.tokenABorrowMax)) return this.tokenABorrowMax
      return tokenABorrow
    },
    poolName: function() {
      return getPoolName(this.selectedPoolTokens)
    },
    lpLogoSource: function() {
      return lpLogoSource(this.selectedPoolTokens)
    },
    allMarketsMap () {
      return this.$store.getters.allMarketsMap
    },
    allPoolsMap () {
      return this.$store.getters.allPoolsMap
    },
    userPositionsMap () {
      return this.$store.getters.userPositionsMap
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
      'IBankTotalCreditLimits',
      'IBankTotalDebtValue',
    ])
  },
  watch: {
    leverage () {
      if (this.useOptimalK) {
        this.tokenABorrow = this.optimalABorrow.toString()
        this.changeBorrowAmountByABorrow(this.optimalABorrow)
      } else {
        this.changeBorrowAmountByK(this.tokenABorrowRate/100)
      }
    },
    tokenASupply () {
      if (this.useOptimalK) {
        this.tokenABorrow = this.optimalABorrow.toString()
        this.changeBorrowAmountByABorrow(this.optimalABorrow)
      } else {
        this.changeBorrowAmountByK(this.tokenABorrowRate/100)
      }
    },
    tokenBSupply () {
      if (this.useOptimalK) {
        this.tokenABorrow = this.optimalABorrow.toString()
        this.changeBorrowAmountByABorrow(this.optimalABorrow)
      } else {
        this.changeBorrowAmountByK(this.tokenABorrowRate/100)
      }
    },
    // 用户点勾“推荐比例”时
    useOptimalK: function (val, oldVal) {
      if (val && !oldVal) {
        this.tokenABorrow = this.optimalABorrow.toString()
        this.changeBorrowAmountByABorrow(this.optimalABorrow)
      }
    },

  },
  mounted() {
  },
  methods: {
    clickNextBtn() {
      // todo
      this.step++
      return
      if(this.validForm){
        this.step++
      }
    },
    addLeverage(){
      if(this.leverage>=this.selectedLpMaxLeverage){
        this.leverage=this.selectedLpMaxLeverage
      }else {
        this.leverage++
      }
    },
    minusLeverage(){
      if(this.leverage<=1){
        this.leverage=1
      }else {
        this.leverage--
      }
    },
    tokenDecimal(tokenAddress) {
      return decimals['heco-mainnet'][tokenAddress]
    },
    // 用户主动拖动滑块时（该函数内部过滤了更改vue.data时的触发）
    sliderTokenAChange(tokenABorrowRate) {
      if (this.sliderTokenAPreventInput) {
        this.sliderTokenAPreventInput = false
      } else {
        if (!new BigNumber(this.leverage).isEqualTo(1)) {
          this.useOptimalK = false
        }
        this.tokenBBorrowRate = 100 - this.tokenABorrowRate
        this.changeBorrowAmountByK(tokenABorrowRate / 100)
      }
    },
    sliderTokenBChange(tokenBBorrowRate) {
      if (this.sliderTokenBPreventInput) {
        this.sliderTokenBPreventInput = false
      } else {
        if (!new BigNumber(this.leverage).isEqualTo(1)) {
          this.useOptimalK = false
        }
        this.tokenABorrowRate = 100 - tokenBBorrowRate
        this.changeBorrowAmountByK(this.tokenABorrowRate / 100)
      }
    },
    // 用户更改输入框的值后
    tokenABorrowChange(tokenABorrow) {
      this.useOptimalK = false
      this.tokenABorrow = tokenABorrow
      this.changeBorrowAmountByABorrow(tokenABorrow)
    },
    tokenBBorrowChange(tokenBBorrow) {
      this.useOptimalK = false
      this.tokenBBorrow = tokenBBorrow
      this.changeBorrowAmountByBBorrow(tokenBBorrow)
    },
    // 由A的借款价值份额（k）更新其它相关数据
    changeBorrowAmountByK(k) {
      if (this.n.isEqualTo(0)) {
        this.tokenABorrow = 0
        this.tokenBBorrow = 0
        return
      }
      this.tokenABorrow = this.tokenASupplyBigNumber
          .plus(this.tokenBSupplyBigNumber.times(this.BPriceDivAPrice))
          .times(k).times(this.n).toString()
      this.tokenBBorrow = this.tokenBSupplyBigNumber
          .plus(this.tokenASupplyBigNumber.div(this.BPriceDivAPrice))
          .times(1 - k).times(this.n).toString()
    },
    // 由A的借款数量更新其它相关数据
    changeBorrowAmountByABorrow(newTokenABorrow) {
      if (this.n.isEqualTo(0)) {
        this.tokenABorrow = 0
        this.tokenBBorrow = 0
        return
      }
      if (new BigNumber(newTokenABorrow).isLessThan(0)) {
        this.tokenABorrowRate = 0
        this.tokenBBorrowRate = 100
        this.changeBorrowAmountByK(0)
      } else if (new BigNumber(newTokenABorrow).isGreaterThan(this.tokenABorrowMax)) {
        this.tokenABorrowRate = 100
        this.tokenBBorrowRate = 0
        this.changeBorrowAmountByK(1)
      } else {
        this.sliderTokenAPreventInput = true
        this.tokenABorrowRate = new BigNumber(newTokenABorrow).div(this.tokenASupplyBigNumber
            .plus(this.tokenBSupplyBigNumber.times(this.BPriceDivAPrice))
            .times(this.n)).times(100).toFixed(0)
        this.tokenBBorrowRate = 100 - this.tokenABorrowRate
        const tokenBBorrow = this.tokenASupplyBigNumber.div(this.BPriceDivAPrice)
            .plus(this.tokenBSupplyBigNumber).times(this.n)
            .minus(new BigNumber(newTokenABorrow).div(this.BPriceDivAPrice))

        this.tokenBBorrow = tokenBBorrow.isLessThanOrEqualTo(('0.0000000001'))
            ? '0'
            : tokenBBorrow.toString()
      }
    },
    // 由B的借款数量更新其它相关数据
    changeBorrowAmountByBBorrow(newTokenBBorrow) {
      if (this.n.isEqualTo(0)) {
        this.tokenABorrow = 0
        this.tokenBBorrow = 0
        return
      }
      if (new BigNumber(newTokenBBorrow).isLessThan(0)) {
        this.tokenABorrowRate = 100
        this.tokenBBorrowRate = 0
        this.changeBorrowAmountByK(1)
      } else if (new BigNumber(newTokenBBorrow).isGreaterThan(this.tokenBBorrowMax)) {
        this.tokenABorrowRate = 0
        this.tokenBBorrowRate = 100
        this.changeBorrowAmountByK(0)
      } else {
        this.sliderTokenBPreventInput = true
        this.tokenBBorrowRate = new BigNumber(newTokenBBorrow).div(this.tokenBSupplyBigNumber
            .plus(this.tokenASupplyBigNumber.div(this.BPriceDivAPrice))
            .times(this.n)).times(100).toFixed(0)
        this.tokenABorrowRate = 100 - this.tokenBBorrowRate
        const tokenABorrow = this.tokenBSupplyBigNumber.times(this.BPriceDivAPrice)
            .plus(this.tokenASupplyBigNumber).times(this.n)
            .minus(new BigNumber(newTokenBBorrow).times(this.BPriceDivAPrice))
        this.tokenABorrow = tokenABorrow.isLessThanOrEqualTo('0.0000000001')
            ? '0'
            : tokenABorrow.toString()
      }
    },
    getTokenSupplyMax(symbol,tokenBalanceBigNumber){
      if (symbol === "HT") {
        // 乘以10是为了能留一些HT用作手续费
        return tokenBalanceBigNumber.minus(eX(this.gasPrice.times(gasLimit*10), -18));
      } else {
        return tokenBalanceBigNumber
      }
    },
    setTokenASupplyMax(symbol,tokenBalance){
      let tokenBalanceBigNumber = new BigNumber(tokenBalance)
      const maxSupply = this.getTokenSupplyMax(symbol,tokenBalanceBigNumber)
      this.tokenASupply = maxSupply
    },
    setTokenBSupplyMax(symbol,tokenBalance){
      let tokenBalanceBigNumber = new BigNumber(tokenBalance)
      const maxSupply = this.getTokenSupplyMax(symbol,tokenBalanceBigNumber)
      this.tokenBSupply = maxSupply
    },
    // todo 不用表单
    validateTokenA(value) {
      //todo 监听不到对象属性变化

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
      if (this.tokenASupply && parseInt(value) > parseInt(this.tokenABalance)) {
        // this.tokenASupply = this.tokenABalance;
        return '余额不足';
      }
      if(new BigNumber(value).isZero()){
        if(this.tokenBSupply+'' === '0')
          return '请输入大于0'
        else
          return true
      }

      return true;
    },
    validateTokenB(value) {
      let numReg = /^([0]?)$|^([1-9][0-9]*)$|^([0]\.\d+)$|^([1-9][0-9]*\.\d+)$/

      if (value === '') {
        return '不能为空'
      }
      if ((value + '').split('.').length > 2) {
        return '输入错误222'
      }
      if ((value + '').indexOf('.') > -1 && (value + '').split('.')[1] === '') {
        return '输入错误333'
      }
      if (!numReg.test(value)) {
        return '输入错误7777'
      }
      if (this.tokenBSupply && parseInt(value) > parseInt(this.tokenBBalance)) {
        // this.tokenBSupply = this.tokenBBalance;
        return '余额不足';
      }
      if(new BigNumber(value).isZero()){
        if(this.tokenASupply+'' === '0')
          return '请输入大于0'
        else
          return true
      }
      return true;
    },

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

    sendAddLiquidity() {
      const positionId = Number(this.selectedPositionId)
      const tokenAAddress = this.tokenAAddress
      const tokenBAddress = this.tokenBAddress
      const AUser = eX(new BigNumber(this.tokenASupply).toString(),this.tokenDecimal(this.tokenAAddress)).toFixed(0,1)
      const BUser = eX(new BigNumber(this.tokenBSupply).toString(),this.tokenDecimal(this.tokenBAddress)).toFixed(0,1)
      const ABorrow = eX(new BigNumber(this.tokenABorrow).toString(),this.tokenDecimal(this.tokenAAddress)).toFixed(0,1)
      const BBorrow = eX(new BigNumber(this.tokenBBorrow).toString(),this.tokenDecimal(this.tokenBAddress)).toFixed(0,1)
      const amtAMin = eX(new BigNumber(this.tokenAAdd).toString(),this.tokenDecimal(this.tokenAAddress))
          .times(new BigNumber(100).minus(this.slippageTolerance).div(100)).toFixed(0,1)
      const amtBMin = eX(new BigNumber(this.tokenBAdd).toString(),this.tokenDecimal(this.tokenBAddress))
          .times(new BigNumber(100).minus(this.slippageTolerance).div(100)).toFixed(0,1)
      const poolId = mdexLpTokenPoolIdUnderlying['heco-mainnet'][this.selectedPoolAddress]
      const amount = {
        amtAUser:this.tokenAAddress===WHTAddress?'0':AUser,
        amtBUser:this.tokenBAddress===WHTAddress?'0':BUser,
        amtLPUser:0,
        amtABorrow:ABorrow,
        amtBBorrow:BBorrow,
        amtLPBorrow:0,
        amtAMin,
        amtBMin,
      }
      console.log('amounts= ',amount)
      const bytesMemoryData = this.contract['mdexSpell'].methods.addLiquidityWMasterChef(tokenAAddress,tokenBAddress,amount,poolId).encodeABI()
      let value
      if ([tokenAAddress, tokenBAddress].includes(WHTAddress)) {
        value = tokenAAddress === WHTAddress ? AUser : BUser
      } else {
        value = '0'
      }
      const options = {
        from: this.walletAddress,
        gas: '3500000',
        gasPrice: this.gasPrice.toString(),
        value,
      }
      this.contractSend['IBank'].methods.execute(positionId,address.mdexSpell,bytesMemoryData).call(options).then(console.log)
      this.contractSend['IBank'].methods.execute(positionId,address.mdexSpell,bytesMemoryData).send(options).then(console.log)

    },

  }
}
</script>

<style scoped lang="scss">
.grey-font {
  color: #9b9daa;
  font-size: 0.75rem;
}
.pointer {
  cursor: pointer;
}
.forbidden {
  cursor: not-allowed;
}
.supply {
  .supplyWrapper{
    background-color: #373a54;
    color: #fff;
    border-radius: 0.5rem;
    margin: 0.625rem 0.875rem 0;
    .step {
      padding: 0 16px;
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
  .btnFooter {
    width: 100%;
    height: 100px;
    padding: 0 20px;
    background-color: #373a54;
    margin-top: 1.25rem;
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
    }
    .nextBtnDisabled {
      color: #fff;
      background: #ACB2A6;
      border-radius: 50px;
      cursor: not-allowed;
    }
  }
}
.borrow {
  .supplyWrapper {
    background-color: #373a54;
    color: #fff;
    border-radius: 0.5rem;
    margin: 0.625rem 0.875rem 0;
    padding: 0 0 1rem;
    .step {
      padding: 0 16px;
      > div {
        > div {
          background-color: #484b67;
          border-radius: 0.5rem;
          width: 100%;
          > span {
            font-size: 0.75rem;
            color: #e7e7eb;
          }
        }
      }
    }
  }
  .leverage {
    background-color: #373a54;
    color: #fff;
    border-radius: 0.5rem;
    margin: 0.625rem 0.875rem 0;
    padding: 1rem;
  }
  .borrowWrapper {
    background-color: #373a54;
    color: #fff;
    border-radius: 0.5rem;
    margin: 0.625rem 0.875rem 0;
    padding: 1rem;
    .debtRatio {
      display: flex;
      justify-content: space-between;
      >div {
        >div:first-child {
          color: #9b9daa;
          font-size: 0.75rem;
        }
        >div:last-child {
          font-size: 1.25rem;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
  // v-switch 居中
  ::v-deep .v-input--switch .v-input--selection-controls__input {
    margin-right: 0 !important;
  }
  ::v-deep .v-input--switch .v-input__slot {
    justify-content: center;
  }
  .btnFooter {
    width: 100%;
    height: 100px;
    padding: 0 20px;
    background-color: #373a54;
    margin-top: 1.25rem;
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
    }
  }
}
.strategy {
  .actions {
    background-color: #373a54;
    color: #fff;
    border-radius: 0.5rem;
    margin: 0.625rem 0.875rem 0;
    .step {
      padding: 0 16px 20px;
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
  .apy {
    background-color: #373a54;
    color: #fff;
    border-radius: 0.5rem;
    margin: 0.625rem 0.875rem 0;
    padding: 0 1rem;
    .table {
      >div {
        width: 33.33%;
        padding: 0.5rem 0;
      }
    }
  }
  .btnFooter {
    width: 100%;
    height: 100px;
    padding: 0 20px;
    background-color: #373a54;
    margin-top: 1.25rem;
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
    }
  }
}
.supplyPC {
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
.borrowPC {
  width: 100%;
  background-color: #373a54;
  color: #fff;
  border-radius: 0 0.5rem 0.5rem 0;
  .step {
    //padding: 0 16px 20px;
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
.strategyPC {
  background-color: #373a54;
  color: #fff;
  width: 100%;
  border-radius: 0 0.5rem 0.5rem 0;
  .actions {
    .step {
      padding: 0 32px 20px;
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
  .apy {
    background-color: #373a54;
    color: #fff;
    border-radius: 0.5rem;
    margin: 1.25rem;
    padding: 0 1rem;
    .table {
      >div {
        width: 33.33%;
        padding: 0.5rem 0;
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
    }
    .nextBtnDisabled {
      color: #fff;
      background: #ACB2A6;
      border-radius: 50px;
      cursor: not-allowed;
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
}
::v-deep .v-slider--horizontal .v-slider__thumb-label {
  background: linear-gradient(150deg, #11FFB7 0%, #3943CE 100%);
  transform: translateY(-20%) translateY(22px) translateX(-50%) rotate(45deg) !important;
}
//icon active透明度
::v-deep .theme--light.v-icon:focus::after {
  opacity: 0;
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
</style>

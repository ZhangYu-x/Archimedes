<template>
  <div>
    <!--  手机和Ipad版  -->
    <div class="hidden-md-and-up">
      <!--  手机和Ipad版 -> token进度卡片  -->
      <StepRemove :step="step" :token-logo-source="lpLogoSource" dex-name="Huobi Token" :token-symbol="poolName"></StepRemove>

      <!--  手机和Ipad版 -> Step1(移除流动性)  -->
      <div v-if="step===1" class="removeContainer">
        <div class="positionBalance pb-6">
          <div class="step">
            <h5 class="font-italic py-4">{{$t('remove.positionBalance')}}</h5>
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
        </div>

        <div class="remove pa-4">
          <div class="d-flex justify-space-between align-center">
            <h5 class="font-italic py-4">{{$t('remove.remove')}}</h5>
            <div style="width: 40%">
              <v-text-field solo dense flat rounded hide-details color="#aaaaaa" v-model="removeLiquidityPercentInput" @change="removeLiquidityPercentChange($event)">
                <template v-slot:append>%</template>
              </v-text-field>
            </div>
          </div>
          <v-slider color="#00e1bc" track-color="#484b67"  thumb-color="#00e1bc" thumb-label="always" min="0" max="100" hide-details v-model="removeLiquidityPercent" @input="sliderRemoveLiquidityPercentChange($event)">
            <template v-slot:thumb-label="{ value }">
              {{value}}%
            </template>
          </v-slider>
        </div>

        <div class="receive pb-4">
          <div class="step">
            <h5 class="font-italic py-4">{{$t('remove.toReceive')}}</h5>
            <div class="d-flex">
              <div class="d-flex align-center mr-2 py-2 pl-4">
                <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                <span>{{tokenAReceiving ? tokenAReceiving.toFixed(4,1) : '0.0000'}} {{tokenASymbol||''}}</span>
              </div>
              <div class="d-flex align-center ml-2 py-2 pl-4">
                <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                <span>{{tokenBReceiving ? tokenBReceiving.toFixed(4,1) : '0.0000'}} {{tokenBSymbol||''}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="btnFooter d-flex align-center">
          <div class="backBtn text-center py-3 px-6 mr-2 flex-grow-1" @click="$router.back()">{{$t('remove.back')}}</div>
          <div class="nextBtn text-center py-3 px-6 ml-2 flex-grow-1" @click="next">{{$t('remove.next')}}</div>
        </div>
      </div>

      <!--  手机和Ipad版 -> Step2(还钱)  -->
      <div v-if="step===2" class="paybackContainer">

        <div class="receive pb-4">
          <h5 class="font-italic px-4 pt-4 mb-5">{{$t('remove.receiving')}}</h5>
          <div class="step">
            <div class="d-flex">
              <div class="d-flex align-center mr-2 py-2 pl-4">
                <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                <span>{{tokenAReceiving ? tokenAReceiving.toFixed(4,1) : '0.0000'}} {{tokenASymbol||''}}</span>
              </div>
              <div class="d-flex align-center ml-2 py-2 pl-4">
                <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                <span>{{tokenBReceiving ? tokenBReceiving.toFixed(4,1) : '0.0000'}} {{tokenBSymbol||''}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="positionDebt pb-4">
          <h5 class="font-italic px-4 pt-4 mb-5">{{$t('remove.positionDebt')}}</h5>
          <div class="step">
            <div class="d-flex">
              <div class="d-flex align-center mr-2 py-2 pl-4">
                <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                <span>{{tokenADebt ? tokenADebt.toFixed(4,1) : '0.0000'}} {{tokenASymbol||''}}</span>
              </div>
              <div class="d-flex align-center ml-2 py-2 pl-4">
                <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                <span>{{tokenBDebt ? tokenBDebt.toFixed(4,1) : '0.0000'}} {{tokenBSymbol||''}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="payback">
          <div class="d-flex justify-space-between align-center mb-4">
            <h5 class="font-italic">{{$t('remove.payback')}}</h5>
            <div class="text-caption" :class="insufficientCollateral||debtRatioTimes100.isLessThan(0)?'red--text':''">{{$t('remove.debtRatio',{x:debtRatioTimes100.toFixed(2,0)})}}</div>
          </div>

          <!--     tokenA     -->
          <div>
            <div class="d-flex justify-space-between pt-4">
              <div class="d-flex align-center">
                <img :src="tokenALogoSource?tokenALogoSource:''" width="25" class="mr-2" alt="">
                <span>{{tokenASymbol}}</span>
              </div>
              <div style="width: 40%">
                <v-text-field solo dense flat rounded hide-details color="#aaaaaa" v-model="ARepay" @change="ARepayChange($event)">
                  <template v-slot:append>{{tokenASymbol||''}}</template>
                </v-text-field>
              </div>
            </div>
            <v-slider class="my-2" color="#00e1bc" track-color="#484b67"  thumb-color="#00e1bc" thumb-label="always" min="0" max="100" hide-details v-model="sliderValueTokenA" @input="sliderARepayChange($event)">
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
              <div style="width: 40%">
                <v-text-field solo dense flat rounded hide-details color="#aaaaaa" v-model="BRepay" @change="BRepayChange($event)">
                  <template v-slot:append>{{tokenBSymbol||''}}</template>
                </v-text-field>
              </div>
            </div>
            <v-slider class="my-2" color="#00e1bc" track-color="#484b67"  thumb-color="#00e1bc" thumb-label="always" min="0" max="100" hide-details v-model="sliderValueTokenB" @input="sliderBRepayChange($event)">
              <template v-slot:thumb-label="{ value }">
                {{value}}%
              </template>
            </v-slider>
          </div>
          <div v-if="repayTooMany" class="px-4 red--text text-caption pb-2">{{$t('remove.textOne')}}</div>
          <div v-if="insufficientCollateral" class="px-4 red--text text-caption pb-2">>{{$t('remove.textTwo')}}</div>
        </div>

        <div class="btnFooter d-flex align-center">
          <div class="backBtn text-center py-3 px-6 mr-2 flex-grow-1" @click="step=1">{{$t('remove.back')}}</div>
          <div class="nextBtn text-center py-3 px-6 ml-2 flex-grow-1" :class="{'nextBtnDisabled':!nextButtonEnable}" @click="next">{{$t('remove.next')}}</div>
        </div>
      </div>

      <!--  手机和Ipad版 -> Step3(确认策略)  -->
      <div v-if="step===3" class="strategy">
        <!--  actions  -->
        <div class="actions">
          <h5 class="font-italic px-4 pt-4 mb-5">{{$t('remove.happen')}}</h5>
          <div>
            <div class="step">
              <p class="text-caption grey--text">{{$t('remove.removeLiquidity')}}</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{tokenAReceiving ? tokenAReceiving.toFixed(4,1) : '0.0000'}} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{tokenBReceiving ? tokenBReceiving.toFixed(4,1) : '0.0000'}} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">
                {{$t('remove.swapAndPayback',{x:tokenARepay.toFixed(4, 1),y:tokenASymbol||'',z:tokenBRepay.toFixed(4, 1),w:tokenBSymbol||''})}}
              </p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARepay.toFixed(4, 1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRepay.toFixed(4, 1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">{{$t('remove.harvest')}}</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest.toFixed(4, 1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest.toFixed(4, 1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
          </div>
          <div style="padding: 0 0.5rem 1.25rem">
            <v-divider color="#53566c" class="mb-5 mx-2"></v-divider>
            <div class="d-flex justify-space-between px-2 py-1">
              <span class="grey-font">{{$t('remove.debtRatioText')}}</span>
              <span class="text-caption" :class="{'red--text':debtRatioTimes100.isGreaterThanOrEqualTo(100)}">{{ debtRatioTimes100.toFixed(2,0) }}%</span>
            </div>
            <div class="d-flex justify-space-between px-2 py-1">
              <span class="grey-font">滑点 & 手续费：</span>
              <span class="text-caption">{{ priceSlippageAndTradingFeeRate.times(100).toFixed(2) }}%</span>
            </div>
          </div>
        </div>

        <div class="btnFooter d-flex align-center">
          <div class="backBtn text-center py-3 px-6 mr-2" @click="step=2">{{$t('remove.back')}}</div>
          <div class="nextBtn text-center py-3 px-6 ml-2">{{$t('remove.confirm')}}</div>
        </div>
      </div>
    </div>

    <!--  电脑版  -->
    <v-container class="hidden-sm-and-down" style="max-width: 800px;display: flex">

      <!--  电脑版 -> token进度卡片  -->
      <div style="background-color: #53566c;border-radius: 0.5rem 0 0 0.5rem;">
        <StepRemove :step="step" :token-logo-source="lpLogoSource" :dex-name="selectedPoolDEX" :token-symbol="poolName"></StepRemove>
      </div>

      <!--  电脑版 -> Step1(移除流动性)  -->
      <div v-if="step===1" class="supplyPC pb-6">
        <div class="step">
          <h4 class="font-italic pt-8 pb-5">{{$t('remove.positionBalance')}}</h4>
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
        <h4 class="font-italic px-8 pt-8">{{$t('remove.remove')}}</h4>
        <div class="d-flex justify-space-between align-center px-8 pt-4 pb-8">
          <div style="width: 100%">
            <v-slider color="#00e1bc" track-color="#484b67"  thumb-color="#00e1bc" thumb-label="always" min="0" max="100" hide-details v-model="removeLiquidityPercent" @input="sliderRemoveLiquidityPercentChange($event)">
              <template v-slot:thumb-label="{ value }">
                {{value}}%
              </template>
            </v-slider>
          </div>
          <div style="width: 200px;margin-left: 10px">
            <v-text-field solo dense flat rounded hide-details color="#aaaaaa" v-model="removeLiquidityPercentInput" @change="removeLiquidityPercentChange($event)">
              <template v-slot:append>%</template>
            </v-text-field>
          </div>
        </div>

        <v-divider color="#53566c" class="my-5 mx-8"></v-divider>

        <div class="step">
          <h4 class="font-italic pb-5">{{$t('remove.toReceive')}}</h4>
          <div class="d-flex">
            <div class="d-flex align-center mr-2 py-2 pl-4">
              <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
              <span>{{tokenAReceiving ? tokenAReceiving.toFixed(4,1) : '0.0000'}} {{tokenASymbol||''}}</span>
            </div>
            <div class="d-flex align-center ml-2 py-2 pl-4">
              <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
              <span>{{tokenBReceiving ? tokenBReceiving.toFixed(4,1) : '0.0000'}} {{tokenBSymbol||''}}</span>
            </div>
          </div>
        </div>

        <v-divider color="#53566c" class="my-5 mx-8"></v-divider>

        <div class="btnFooterPC d-flex align-end">
          <div class="backBtn text-center py-3 px-6 mr-2" @click="$router.back()">{{$t('remove.back')}}</div>
          <div class="text-center py-3 px-6 ml-2 nextBtn" @click="next">{{$t('remove.next')}}</div>
        </div>
      </div>

      <!--  电脑版 -> Step2(还钱)  -->
      <div v-if="step===2" class="borrowPC pb-6">
        <h4 class="font-italic px-8 pt-8">{{$t('remove.receiving')}}</h4>
        <div class="d-flex step py-4 px-8">
          <div class="d-flex align-center mr-2 py-2 pl-4">
            <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
            <span>{{tokenAReceiving ? tokenAReceiving.toFixed(4,1) : '0.0000'}} {{tokenASymbol||''}}</span>
          </div>
          <div class="d-flex align-center ml-2 py-2 pl-4">
            <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
            <span>{{tokenBReceiving ? tokenBReceiving.toFixed(4,1) : '0.0000'}} {{tokenBSymbol||''}}</span>
          </div>
        </div>
        <v-divider color="#53566c" class="mb-5 mx-8"></v-divider>
        <h4 class="font-italic px-8">{{$t('remove.positionDebt')}}</h4>
        <div class="d-flex step py-4 px-8">
          <div class="d-flex align-center mr-2 py-2 pl-4">
            <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
            <span>{{tokenADebt ? tokenADebt.toFixed(4,1) : '0.0000'}} {{tokenASymbol||''}}</span>
          </div>
          <div class="d-flex align-center ml-2 py-2 pl-4">
            <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
            <span>{{tokenBDebt ? tokenBDebt.toFixed(4,1) : '0.0000'}} {{tokenBSymbol||''}}</span>
          </div>
        </div>
        <v-divider color="#53566c" class="mb-5 mt-8 mx-8"></v-divider>
        <div class="d-flex align-center justify-space-between px-8">
          <h4 class="font-italic">{{$t('remove.payback')}}</h4>
          <div class="text-right">
            <div :class="insufficientCollateral||debtRatioTimes100.isLessThan(0)?'red--text':''">{{$t('remove.debtRatio',{x:debtRatioTimes100.toFixed(2,0)})}}</div>
          </div>
        </div>

        <div class="d-flex justify-space-between align-center px-8 pt-4 pb-8">
          <img :src="tokenALogoSource?tokenALogoSource:''" width="30" alt="" class="mr-2">
          <div style="width: 100%">
            <v-slider class="my-2" color="#00e1bc" track-color="#484b67"  thumb-color="#00e1bc" thumb-label="always" min="0" max="100" hide-details v-model="sliderValueTokenA" @input="sliderARepayChange($event)">
              <template v-slot:thumb-label="{ value }">
                {{value}}%
              </template>
            </v-slider>
          </div>
          <div style="width: 300px;margin-left: 10px">
            <v-text-field solo dense flat rounded hide-details color="#aaaaaa" v-model="ARepay" @change="ARepayChange($event)">
              <template v-slot:append>{{tokenASymbol||''}}</template>
            </v-text-field>
          </div>
        </div>
        <div class="d-flex justify-space-between align-center px-8 pt-4 pb-8">
          <img :src="tokenBLogoSource?tokenBLogoSource:''" width="30" alt="" class="mr-2">
          <div style="width: 100%">
            <v-slider class="my-2" color="#00e1bc" track-color="#484b67"  thumb-color="#00e1bc" thumb-label="always" min="0" max="100" hide-details v-model="sliderValueTokenB" @input="sliderBRepayChange($event)">
              <template v-slot:thumb-label="{ value }">
                {{value}}%
              </template>
            </v-slider>
          </div>
          <div style="width: 300px;margin-left: 10px">
            <v-text-field solo dense flat rounded hide-details color="#aaaaaa" v-model="BRepay" @change="BRepayChange($event)">
              <template v-slot:append>{{tokenBSymbol||''}}</template>
            </v-text-field>
          </div>
        </div>
        <div v-if="repayTooMany" class="px-8 red--text text-caption pb-2">{{$t('remove.textOne')}}</div>
        <div v-if="insufficientCollateral" class="px-8 red--text text-caption pb-2">{{$t('remove.textTwo')}}</div>
        <v-divider color="#53566c" class="mb-5 mx-8"></v-divider>
        <div class="btnFooterPC d-flex align-end">
          <div class="backBtn text-center py-3 px-6 mr-2" @click="step=1">{{$t('remove.back')}}</div>
          <div class="nextBtn text-center py-3 px-6 ml-2" :class="{'nextBtnDisabled':!nextButtonEnable}" @click="next">{{$t('remove.next')}}</div>
        </div>
      </div>

      <!--  电脑版 -> Step3(确认策略)  -->
      <div v-if="step===3" class="strategyPC">
        <!--  actions  -->
        <div class="actions">
          <h4 class="font-italic px-8 pt-8 mb-5">{{$t('remove.happen')}}</h4>

          <div>
            <div class="step">
              <p class="text-caption grey--text">{{$t('remove.removeLiquidity')}}</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{tokenAReceiving ? tokenAReceiving.toFixed(4,1) : '0.0000'}} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{tokenBReceiving ? tokenBReceiving.toFixed(4,1) : '0.0000'}} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">
                {{$t('remove.swapAndPayback',{x:tokenARepay.toFixed(4, 1),y:tokenASymbol||'',z:tokenBRepay.toFixed(4, 1),w:tokenBSymbol||''})}}
              </p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARepay.toFixed(4, 1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRepay.toFixed(4, 1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
            <div class="step">
              <p class="text-caption grey--text">{{$t('remove.harvest')}}</p>
              <div class="d-flex">
                <div class="d-flex align-center mr-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenALogoSource?tokenALogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenARest.toFixed(4, 1) }} {{tokenASymbol||''}}</span>
                </div>
                <div class="d-flex align-center ml-2 py-2 pl-4">
                  <img class="mr-2" :src="tokenBLogoSource?tokenBLogoSource:''" width="25" height="25" alt="">
                  <span>{{ tokenBRest.toFixed(4, 1) }} {{tokenBSymbol||''}}</span>
                </div>
              </div>
            </div>
          </div>

          <div style="padding: 0 2rem 1.25rem">
            <v-divider color="#53566c" class="mb-5"></v-divider>
            <div class="d-flex justify-space-between py-1">
              <span class="grey-font">{{$t('remove.debtRatioText')}}</span>
              <span class="text-caption">{{ debtRatioTimes100.toFixed(2,0) }}%</span>
            </div>
            <div class="d-flex justify-space-between py-1">
              <span class="grey-font">滑点 & 手续费：</span>
              <span class="text-caption">{{ priceSlippageAndTradingFeeRate.times(100).toFixed(2) }}%</span>
            </div>
          </div>
        </div>
        <div class="btnFooterPC d-flex align-center">
          <div class="backBtn text-center py-3 px-6 mr-2" @click="step=2">{{$t('remove.back')}}</div>

          <div style="width: 100%">
            <div class="nextBtn text-center py-3 px-6 ml-2" @click="sendRemoveLiquidity">{{$t('remove.confirm')}}</div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import StepRemove from "@/components/StepRemove";
import BigNumber from "bignumber.js";
import {mapState} from "vuex";
import {getAmountIn, getPoolName, lpLogoSource} from "../../utils";
import {decimals, tokenSymbol} from "../../utils/constants";
import {eX} from "../../utils/helpers";
import {address} from "../../utils/address";
const WHTAddress = '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F'
export default {
name: "Remove",
  components: {StepRemove},
  data(){
    return {
      step: 1,
      removeLiquidityPercent: '0',
      removeLiquidityPercentInput: '0',
      ARepay: '',
      BRepay: '',
      sliderValueTokenA: 0,
      sliderValueTokenB: 0,
      ASlider100: false,
      BSlider100: false,
      sliderRemovePreventInput: false,
      sliderARepayPreventInput: false,
      sliderBRepayPreventInput: false,
    }
  },
  computed: {
    nextButtonEnable: function () {
      // todo 更详细规则，判断数字合法性等
      if (this.step === 2) {
        // 移除的流动性不足以偿还此债务
        if (this.repayTooMany) {
          return false
        }
        // 资不抵债
        if (this.insufficientCollateral) {
          return false
        }
      }
      return true
    },
    repayTooMany: function () {
      return this.tokenARest.isLessThan(0) || this.tokenBRest.isLessThan(0)
    },
    insufficientCollateral: function () {
      return this.debtRatioTimes100.isGreaterThan(100)
    },
    //todo 如何处理还款过多
    selectedCollateralSize: function() {
      return new BigNumber(this.userPositionsMap[this.selectedPositionId]?.collateralSize || 0) || new BigNumber(0)
    },
    selectedPositionDebts: function() {
      return this.userPositionsMap[this.selectedPositionId]?.positionDebts
    },
    selectedLpPrice: function() {
      return this.allPoolsMap[this.selectedPoolAddress]?.lpPrice || new BigNumber(0)
    },
    selectedLpReserve: function() {
      return this.allPoolsMap[this.selectedPoolAddress]?.lpReserves || new BigNumber(0)
    },
    selectedLpTotalSupply: function() {
      return this.allPoolsMap[this.selectedPoolAddress]?.lpTotalSupply || new BigNumber(0)
    },
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
      return this.selectedCollateralSize
          .div(this.selectedLpTotalSupply)
          .times(this.selectedLpReserve[0])
          .div(eX(1,this.tokenDecimal(this.tokenAAddress)))
    },
    tokenBPositionBalance: function() {
      return this.selectedCollateralSize
          .div(this.selectedLpTotalSupply)
          .times(this.selectedLpReserve[1])
          .div(eX(1,this.tokenDecimal(this.tokenBAddress)))
    },
    tokenAReceiving: function() {
      return this.tokenAPositionBalance.times(this.removeLiquidityPercentInput||0).div(100) || new BigNumber(0)
    },
    tokenBReceiving: function() {
      return this.tokenBPositionBalance.times(this.removeLiquidityPercentInput||0).div(100) || new BigNumber(0)
    },
    tokenARepay: function() {
      return new BigNumber(this.ARepay)
    },
    tokenBRepay: function() {
      return new BigNumber(this.BRepay)
    },
    tokenARest: function() {
      if (this.tokenBReceiving.isLessThan(this.tokenBRepay)) {
        const amountAIn = getAmountIn(eX(this.tokenBRepay.minus(this.tokenBReceiving),this.tokenDecimal(this.tokenBAddress)),this.selectedLpReserve[0],this.selectedLpReserve[1])
        return this.tokenAReceiving.minus(this.tokenARepay).minus(eX(amountAIn,-1*this.tokenDecimal(this.tokenAAddress)))
      } else if (this.tokenAReceiving.isLessThan(this.tokenARepay)) {
        // const amountBIn = getAmountIn(eX(this.tokenARepay.minus(this.tokenAReceiving),this.tokenDecimal(this.tokenAAddress)),this.selectedLpReserve[1],this.selectedLpReserve[0])
        return new BigNumber(0)
      }
      return this.tokenAReceiving.minus(this.ARepay)
    },
    tokenBRest: function() {
      if (this.tokenBReceiving.isLessThan(this.tokenBRepay)) {
        // const amountAIn = getAmountIn(eX(this.tokenBRepay.minus(this.tokenBReceiving),this.tokenDecimal(this.tokenBAddress)),this.selectedLpReserve[0],this.selectedLpReserve[1])
        return new BigNumber(0)
      } else if (this.tokenAReceiving.isLessThan(this.tokenARepay)) {
        const amountBIn = getAmountIn(eX(this.tokenARepay.minus(this.tokenAReceiving),this.tokenDecimal(this.tokenAAddress)),this.selectedLpReserve[1],this.selectedLpReserve[0])
        return this.tokenBReceiving.minus(this.tokenBRepay).minus(eX(amountBIn,-1*this.tokenDecimal(this.tokenBAddress)))
      }
      return this.tokenBReceiving.minus(this.BRepay)
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
      const res = this.tokenADebt.minus(Number(this.ARepay)).times(this.tokenAPrice).times(this.tokenAPriceFactorBorr)
          .plus(this.tokenBDebt.minus(Number(this.BRepay)).times(this.tokenBPrice).times(this.tokenBPriceFactorBorr))
          .div(eX(this.selectedCollateralSize,-18).times(new BigNumber(100).minus(this.removeLiquidityPercentInput).div(100)))
          .div(this.selectedLpPrice.times(this.lpPriceFactorColl)).times(100)
      return res.isNaN() ? new BigNumber(0) : res
    },
    priceSlippageAndTradingFeeRate: function () {
      const VReceiving = this.tokenAReceiving.times(this.tokenAPrice)
          .plus(this.tokenBReceiving.times(this.tokenBPrice))
      const VRepay = this.tokenARepay.times(this.tokenAPrice)
          .plus(this.tokenBRepay.times(this.tokenBPrice))
      const VRest = this.tokenARest.times(this.tokenAPrice)
          .plus(this.tokenBRest.times(this.tokenBPrice))
      const VPosition = eX(this.selectedCollateralSize,-18).times(this.selectedLpPrice)
      const VDebt = this.tokenADebt.times(this.tokenAPrice)
          .plus(this.tokenBDebt.times(this.tokenBPrice))
      const numerator = VReceiving.minus(VRepay).minus(VRest)
      const denominator = VPosition.minus(VDebt)
      const res = numerator.div(denominator)
      return res.isLessThan(0)
          ? new BigNumber(0)
          : new BigNumber(0).minus(res)
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
    ])
  },
  methods: {
    next() {
      // todo
      this.step++
      return
      if (this.nextButtonEnable) this.step++
    },
    tokenDecimal(tokenAddress) {
      return decimals['heco-mainnet'][tokenAddress]
    },
    sliderRemoveLiquidityPercentChange(val) {
      if (this.sliderRemovePreventInput) {
        this.sliderRemovePreventInput = false
      } else {
        this.removeLiquidityPercentInput = Number(val).toFixed(4)
      }
    },
    removeLiquidityPercentChange(val) {
      if (new BigNumber(val).isLessThan(0)) {
        this.removeLiquidityPercentInput = '0'
        this.removeLiquidityPercent = 0
      } else if (new BigNumber(val).isGreaterThan(100)) {
        this.removeLiquidityPercentInput = '100'
        this.removeLiquidityPercent = 100
      } else {
        this.sliderRemovePreventInput = true
        this.removeLiquidityPercent = Number(val).toFixed(2)
      }
    },
    sliderARepayChange(val){
      if (this.sliderARepayPreventInput) {
        this.sliderARepayPreventInput = false
      }

      if(val<100){
        this.ASlider100 = false
        this.ARepay = this.tokenADebt.times(val).div(100).toString()
      }else {
        this.ASlider100 = true
        this.ARepay = this.tokenADebt.toString()
      }
    },
    sliderBRepayChange(val){
      if (this.sliderBRepayPreventInput) {
        this.sliderBRepayPreventInput = false
      }

      if(val<100){
        this.BSlider100 = false
        this.BRepay = this.tokenBDebt.times(val).div(100).toString()
      }else {
        this.BSlider100 = true
        this.BRepay = this.tokenBDebt.toString()
      }
    },
    ARepayChange(val) {
      if (new BigNumber(val).isLessThan(0)) {
        this.ARepay = '0'
        this.sliderValueTokenA = 0
      } else if (new BigNumber(val).isGreaterThan(this.tokenADebt)) {
        this.ARepay = this.tokenADebt.toString()
        this.sliderValueTokenA = 100
      } else {
        this.sliderARepayPreventInput = true
        this.sliderValueTokenA = new BigNumber(val).div(this.tokenADebt).times(100).toFixed(2)
      }
    },
    BRepayChange(val) {
      if (new BigNumber(val).isLessThan(0)) {
        this.BRepay = '0'
        this.sliderValueTokenB = 0
      } else if (new BigNumber(val).isGreaterThan(this.tokenBDebt)) {
        this.BRepay = this.tokenBDebt.toString()
        this.sliderValueTokenB = 100
      } else {
        this.sliderBRepayPreventInput = true
        this.sliderValueTokenB = new BigNumber(val).div(this.tokenBDebt).times(100).toFixed(2)
      }
    },
    sendRemoveLiquidityCall() {
      const positionId = Number(this.selectedPositionId)
      const tokenAAddress = this.tokenAAddress
      const tokenBAddress = this.tokenBAddress
      const lpTake = this.selectedCollateralSize.times(this.removeLiquidityPercentInput).div(100).toFixed(0,1)
      const ARepay = this.ASlider100 ? '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' : eX(new BigNumber(this.ARepay).toString(),this.tokenDecimal(this.tokenAAddress)).toFixed(0,1)
      const BRepay = this.BSlider100 ? '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' : eX(new BigNumber(this.BRepay).toString(),this.tokenDecimal(this.tokenBAddress)).toFixed(0,1)
      const amtAMin = eX(new BigNumber(this.tokenARest).toString(),this.tokenDecimal(this.tokenAAddress))
          .times(new BigNumber(100).minus(this.slippageTolerance).div(100)).toFixed(0,1)
      const amtBMin = eX(new BigNumber(this.tokenBRest).toString(),this.tokenDecimal(this.tokenBAddress))
          .times(new BigNumber(100).minus(this.slippageTolerance).div(100)).toFixed(0,1)
      const amount = {
        amtLPTake: lpTake,
        amtLPWithdraw: 0,
        amtARepay:ARepay,
        amtBRepay:BRepay,
        amtLPRepay: 0,
        amtAMin,
        amtBMin,
      }
      const bytesMemoryData = this.contract['mdexSpell'].methods.removeLiquidityWMasterChef(tokenAAddress,tokenBAddress,amount).encodeABI()
      const options = {
        from: this.walletAddress,
        gas: '3500000',
        gasPrice: this.gasPrice.toString(),
      }
      console.log('RepayAmounts= ',amount)
      this.contractSend['IBank'].methods.execute(positionId,address.mdexSpell,bytesMemoryData).call(options).then(console.log)

    },
    sendRemoveLiquidity() {
      const positionId = Number(this.selectedPositionId)
      const tokenAAddress = this.tokenAAddress
      const tokenBAddress = this.tokenBAddress
      const lpTake = this.selectedCollateralSize.times(this.removeLiquidityPercentInput).div(100).toFixed(0,1)
      const ARepay = this.ASlider100 ? '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' : eX(new BigNumber(this.ARepay).toString(),this.tokenDecimal(this.tokenAAddress)).toFixed(0,1)
      const BRepay = this.BSlider100 ? '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff' : eX(new BigNumber(this.BRepay).toString(),this.tokenDecimal(this.tokenBAddress)).toFixed(0,1)
      const amtAMin = eX(new BigNumber(this.tokenARest).toString(),this.tokenDecimal(this.tokenAAddress))
          .times(new BigNumber(100).minus(this.slippageTolerance).div(100)).toFixed(0,1)
      const amtBMin = eX(new BigNumber(this.tokenBRest).toString(),this.tokenDecimal(this.tokenBAddress))
          .times(new BigNumber(100).minus(this.slippageTolerance).div(100)).toFixed(0,1)
      const amount = {
        amtLPTake: lpTake,
        amtLPWithdraw: 0,
        amtARepay:ARepay,
        amtBRepay:BRepay,
        amtLPRepay: 0,
        amtAMin,
        amtBMin,
      }
      const bytesMemoryData = this.contract['mdexSpell'].methods.removeLiquidityWMasterChef(tokenAAddress,tokenBAddress,amount).encodeABI()
      const options = {
        from: this.walletAddress,
        gas: '3500000',
        gasPrice: this.gasPrice.toString(),
      }
      console.log('RepayAmounts= ',amount)
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
.removeContainer {
  .positionBalance{
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
  .remove {
    background-color: #373a54;
    color: #fff;
    border-radius: 0.5rem;
    margin: 0.625rem 0.875rem 0;
  }
  .receive {
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
      background: #ACB2A6;
      cursor: not-allowed;
    }
  }
}
.paybackContainer {
  .receive {
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
  .positionDebt {
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
  .payback {
    background-color: #373a54;
    color: #fff;
    border-radius: 0.5rem;
    margin: 0.625rem 0.875rem 0;
    padding: 1rem;
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
      background: #ACB2A6;
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
    background: #ACB2A6;
    cursor: not-allowed;
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
  background: linear-gradient(150deg, #11FFB7 0%, #3943CE 100%);
  border-radius: 50%;
}
::v-deep .v-slider--horizontal .v-slider__thumb-label {
  transform: translateY(-20%) translateY(22px) translateX(-50%) rotate(45deg) !important;
}
</style>

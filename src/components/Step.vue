<template>
  <!--  token进度卡片  -->
  <div>
    <div class="step hidden-md-and-up">
      <div>
        <img class="ma-2" :src="tokenLogoSource" width="50" alt="">
      </div>
      <div class="white--text">{{DexName}}</div>
      <div class="grey-font mt-1">{{tokenSymbol}}</div>
      <div class="mt-5">
        <div class="dotActive">
          <v-icon v-if="step>1" color="#fff" small>mdi-check</v-icon>
          <span v-else>1</span>
        </div>
        <div :class="step>1?'progressLineActive':'progressLine'"></div>
        <div :class="step>1?'dotActive':'dot'">
          <v-icon v-if="step>2" color="#fff" small>mdi-check</v-icon>
          <span v-else>2</span>
        </div>
        <div :class="step>2?'progressLineActive':'progressLine'"></div>
        <div :class="step>2?'dotActive':'dot'">
          <v-icon v-if="step>3" color="#fff" small>mdi-check</v-icon>
          <span v-else>3</span>
        </div>
      </div>
      <div class="d-flex mx-auto mt-2" style="max-width: 347px">
        <div style="width: 33.33%;text-align: center" class="white--text text-caption text-no-wrap">{{$t('step.supplyTokens')}}</div>
        <div style="width: 33.33%;text-align: center" class="text-caption text-no-wrap" :class="step>1?'white--text':'grey-font'">{{$t('step.borrowTokens')}}</div>
        <div style="width: 33.33%;text-align: center" class="text-caption text-no-wrap" :class="step>2?'white--text':'grey-font'">{{$t('step.confirmStrategy')}}</div>
      </div>
    </div>
    <div class="stepPC hidden-sm-and-down py-4">
      <div class="d-flex align-center">
        <img class="ma-4" :src="tokenLogoSource" width="50" alt="">
        <div>
          <div class="grey-font">{{DexName}}</div>
          <div class="white--text">{{tokenSymbol}}</div>
        </div>
      </div>
      <div class="px-8 pt-6">
        <div class="d-flex align-center">
          <div class="dotActive">
            <v-icon v-if="step>1" color="#fff" small>mdi-check</v-icon>
            <span v-else>1</span>
          </div>
          <div class="ml-2 white--text text-caption text-no-wrap">{{$t('step.supplyTokens')}}</div>
        </div>
        <div :class="step>1?'progressLinePCActive':'progressLinePC'"></div>
        <div class="d-flex align-center">
          <div :class="step>1?'dotActive':'dot'">
            <v-icon v-if="step>2" color="#fff" small>mdi-check</v-icon>
            <span v-else>2</span>
          </div>
          <div :class="step>1?'text-caption white--text ml-2 text-no-wrap':'grey-font ml-2 text-no-wrap'">{{$t('step.borrowTokens')}}</div>
        </div>
        <div :class="step>2?'progressLinePCActive':'progressLinePC'"></div>
        <div class="d-flex align-center">
          <div :class="step>2?'dotActive':'dot'">
            <v-icon v-if="step>3" color="#fff" small>mdi-check</v-icon>
            <span v-else>3</span>
          </div>
          <div :class="step>2?'text-caption white--text ml-2 text-no-wrap':'grey-font ml-2 text-no-wrap'">{{$t('step.confirmStrategy')}}</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Step",
  props: ['step','DexName','tokenSymbol','tokenLogoSource']
}
</script>

<style scoped lang="scss">
.grey-font {
  color: #9b9daa;
  font-size: 0.75rem;
}
.step {
  //width: 100%;
  background-color: #373a54;
  border-radius: 0.5rem;
  margin: 0 0.875rem;
  padding: 1.25rem 0 2rem;
  >div {
    display: flex;
    justify-content: center;
    align-items: center;
    .dot {
      width: 18px;
      height: 18px;
      border-radius: 10px;
      font-size: 0.75rem;
      text-align: center;
      background-color: #9b9daa;
      color: #fff;
      //position: relative;
      //>div {
      //  position: absolute;
      //  top: 30px;
      //  left: 50%;
      //  margin-left: -46px;
      //  color: #9b9daa;
      //}
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
      //position: relative;
      //>div {
      //  position: absolute;
      //  top: 30px;
      //  left: 50%;
      //  margin-left: -46px;
      //  color: #fff;
      //}
    }
    .progressLine {
      width: 100px;
      border-bottom: 1px dashed #9b9daa;
    }
    .progressLineActive {
      width: 100px;
      border-bottom: 1px dashed #00d3c7;
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
</style>

import Vue from 'vue'
import Vuex from 'vuex'
import BigNumber from "bignumber.js";
const Web3 = require('web3');
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedPoolType: '',
    selectedPoolDEX: '',
    selectedPoolTokens: [],
    selectedPoolAddress: '',
    selectedPositionId: 0,
    earnStatus: 'supply',// supply / withdraw earn页面存钱或提现
    selectedAddress: '', // earn二级页面 存钱或提现的币种
    slippageTolerance: '1.00', // 滑点
    positionsAmount: '0', // 总仓位数
    totalPoolTvl: new BigNumber(0), // LP池总锁仓量
    IBankTotalCreditLimits: new BigNumber(0), // LP池总额度
    IBankTotalDebtValue: new BigNumber(0), // LP池总债务
    ACMDMiningReward: new BigNumber(0), // 用户所有仓位的ACMD reward
    userTotalCollateralValue: new BigNumber(0),
    userTotalDebtValue: new BigNumber(0),

    appTab: 'Home',
    chainId: '128',
    htBalance: '0.0000',
    htBalanceBigNumber: new BigNumber(0),
    isDataCorrect:true,
    isUpdating: false,
    isUpdatingOver: false,//数据是否更新结束
    walletAddress: null,
    rpcNode: {},
    allMarketsDetails: [],
    allPoolsDetails: [],
    userPositionsDetails: [],
    allUserPositionsDetails: [],
    wholeAllUserPositionsDetails: [],
    coinList: [],
    gasPrice: new BigNumber(3300000000),
    comptrollerAddress: '',
    maximillionAddress: '',
    compAddress: '',
    compBalance: new BigNumber(0),
    compAccrued: 0,
    canCirculation: new BigNumber(0),
    showWalletDialog: false,
    buttonRefreshLoading: false,
    totalSupplyBalance: 0,
    totalBorrowBalance: new BigNumber(0),
    allMarketsTotalSupplyBalance: new BigNumber(0),
    allMarketsTotalBorrowBalance: new BigNumber(0),
    totalBorrowLimit: new BigNumber(0),
    totalBorrowLimitUsedPercent: 0,
    yearSupplyInterest: 0,
    yearBorrowInterest: 0,
    netApy: 0,
    miningApy: 0,
    mdexLpMiningApy: 0,
    netRate: 0,
    canPrice: new BigNumber(0),
    totalLiquidity: new BigNumber(0),
    confirmDialog: false,
    confirmDialogTip: '',
    confirmDialogShowScan: false,
    currentTxHash: '',
    checkModel: false,//打勾
    errorModel: false,//打叉
    checkSnackbar: false,//成功消息条
    errorSnackbar: false,//失败消息条
    marketIdUnderlyingAddress: '',//marketId代币详情的代币地址
    currentTokenList: 0,//0代表全部token 1代表lp 2代表非lp
    // mask
    address: '',
    xCoin: 'can',
    reloadTime: '',
    proposalId: '',
    wholeAllMarketsDetails:[],
  },
  getters: {
    allMarketsMap: state => {
      return Object.fromEntries(state.wholeAllMarketsDetails
          .map((details) => {
            return [details.underlyingAddress, details]
          }))
    },
    allPoolsMap: state => {
      return Object.fromEntries(state.allPoolsDetails
          .map((pool) => {
            return [pool.poolAddress, pool]
          }))
    },
    userPositionsMap: state => {
      return Object.fromEntries(state.userPositionsDetails
          .map((details) => {
            return [details.id, details]
          }))
    },

  },
  mutations: {
    updateSelectedPoolType(state,value){
      state.selectedPoolType = value
    },
    updateSelectedPoolDEX(state,value){
      state.selectedPoolDEX = value
    },
    updateSelectedPoolTokens(state, value) {
      state.selectedPoolTokens = value
    },
    updateSelectedPoolAddress(state, value) {
      state.selectedPoolAddress = value
    },
    updateSelectedPositionId(state, value) {
      state.selectedPositionId = value
    },
    updateEarnStatus(state, value) {
      state.earnStatus = value
    },
    updateSelectedAddress(state, value) {
      state.selectedAddress = value
    },
    updateSlippageTolerance(state, value) {
      state.slippageTolerance = value
    },
    updatePositionsAmount(state, value) {
      state.positionsAmount = value
    },
    updateTotalPoolTvl(state, value) {
      state.totalPoolTvl = value
    },
    updateIBankTotalCreditLimits(state, value) {
      state.IBankTotalCreditLimits = value
    },
    updateIBankTotalDebtValue(state, value) {
      state.IBankTotalDebtValue = value
    },
    updateACMDMiningReward(state, value) {
      state.ACMDMiningReward = value
    },
    updateUserTotalCollateralValue(state, value) {
      state.userTotalCollateralValue = value
    },
    updateUserTotalDebtValue(state, value) {
      state.userTotalDebtValue = value
    },

    updateIsDataCorrect(state,value){
      state.isDataCorrect = value
    },
    updateWholeAllMarketsDetails(state, value){
      state.wholeAllMarketsDetails = value
    },
    updateAppTab(state,value){
      state.appTab = value
    },
    updateChainId(state,value){
      state.chainId = value
    },
    updateHtBalance(state,value){
      state.htBalance = value
    },
    updateHtBalanceBigNumber(state,value){
      state.htBalanceBigNumber = value
    },
    updateIsUpdating(state,value){
      state.isUpdating = value
    },
    updateIsUpdatingOver(state,value){
      state.isUpdatingOver = value
    },
    updateWalletAddress(state,value){
      state.walletAddress = value
      state.address = value
    },
    updateRpcNode(state,value){
      state.rpcNode = value
    },
    updateAllMarketsDetails(state, value) {
      state.allMarketsDetails = value
    },
    updateAllPoolsDetails(state, value) {
      state.allPoolsDetails = value
    },
    updateUserPositionsDetails(state, value) {
      state.userPositionsDetails = value
    },
    updateAllUserPositionsDetails(state, value) {
      state.allUserPositionsDetails = value
    },
    updateWholeAllUserPositionsDetails(state, value) {
      state.wholeAllUserPositionsDetails = value
    },
    updateGasPrice(state, value) {
      state.gasPrice = value
    },
    updateComptrollerAddress(state, value) {
      state.comptrollerAddress = value
    },
    updateMaximillionAddress(state, value) {
      state.maximillionAddress = value
    },
    updateCompAddress(state, value) {
      state.compAddress = value
    },
    updateCompBalance(state, value) {
      state.compBalance = value
    },
    updateCompAccrued(state, value) {
      state.compAccrued = value
    },
    updateCanCirculation(state, value) {
      state.canCirculation = value
    },
    updateShowWalletDialog(state, value) {
      state.showWalletDialog = value
    },
    updateButtonRefreshLoading(state, value) {
      state.buttonRefreshLoading = value
    },
    updateTotalSupplyBalance(state, value) {
      state.totalSupplyBalance = value
    },
    updateTotalBorrowBalance(state, value) {
      state.totalBorrowBalance = value
    },
    updateAllMarketsTotalSupplyBalance(state, value) {
      state.allMarketsTotalSupplyBalance = value
    },
    updateAllMarketsTotalBorrowBalance(state, value) {
      state.allMarketsTotalBorrowBalance = value
    },
    updateTotalBorrowLimit(state, value) {
      state.totalBorrowLimit = value
    },
    updateTotalBorrowLimitUsedPercent(state, value) {
      state.totalBorrowLimitUsedPercent = value
    },
    updateYearSupplyInterest(state, value) {
      state.yearSupplyInterest = value
    },
    updateYearBorrowInterest(state, value) {
      state.yearBorrowInterest = value
    },
    updateNetApy(state, value) {
      state.netApy = value
    },
    updateMiningApy(state, value) {
      state.miningApy = value
    },
    updateMdexLpMiningApy(state, value) {
      state.mdexLpMiningApy = value
    },
    updateNetRate(state, value) {
      state.netRate = value
    },
    updateCanPrice(state, value) {
      state.canPrice = value
    },
    updateTotalLiquidity(state, value) {
      state.totalLiquidity = value
    },
    updateConfirmDialog(state,value){
      state.confirmDialog = value
    },
    updateConfirmDialogTip(state,value){
      state.confirmDialogTip = value
    },
    updateConfirmDialogShowScan(state,value){
      state.confirmDialogShowScan = value
    },
    updateCurrentTxHash(state,value){
      state.currentTxHash = value
    },
    updateCheckModel(state, value) {
      state.checkModel = value
    },
    updateErrorModel(state, value) {
      state.errorModel = value
    },
    updateCheckSnackbar(state, value) {
      state.checkSnackbar = value
    },
    updateErrorSnackbar(state, value) {
      state.errorSnackbar = value
    },
    updateProposalId(state, value) {
      state.proposalId = value
    },
    updateMarketIdUnderlyingAddress(state, value) {
      state.marketIdUnderlyingAddress = value
    },
    updateCurrentTokenList(state,value) {
      state.currentTokenList = value
    },

    //mask
    updateAccountsChanged(state, value) {
      state.address = value;
      state.walletAddress = value;
      // sessionStorage.setItem('address', value)
    },
    updateCoinList(state, value) {
      state.coinList = value;
      // sessionStorage.setItem('coinList', value)
    },
    updateSelectCoin(state, value) {
      state.xCoin = value;
      // sessionStorage.setItem('xCoin', value)
    },
    updateReload(state, value) {
      state.reloadTime = value;
      // sessionStorage.setItem('reloadTime', value)
    },
  },
  actions: {
    postAssetsInfo({commit, state}, params) {
      return commit('updateCoinList', params);
    },
    getEthereumAddress({commit, state}) {
      if (!window.ethereum) {
        return;
      }
      let account
      let web3 = new Web3(window.ethereum)
      web3.eth.getAccounts().then(accounts=>{
        account=accounts[0];
        console.log('accounts',accounts);
        commit('updateAccountsChanged', account)
      }).catch((err) => {
        console.log(err);
      })

      // window.ethereum.enable().then((accounts) => {
      //   console.log('accounts', accounts)
      //   commit('updateAccountsChanged', accounts[0])
      // }).catch((err) => {
      //   console.log(err);
      // })
    }
  },
  modules: {
  }
})

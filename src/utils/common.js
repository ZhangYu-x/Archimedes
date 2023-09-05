import store from '../store'
import axios from 'axios'
import {
    allMarketsArray,
    mdexLpTokenArray,
    mdexLpTokenPoolId,
    tokenName,
    tokenSymbol,
    underlyingAddress,
    collateralFactor,
    decimals,
    allFarmPools,
    priceFactorColl,
    priceFactorBorr,
    mdexLpTokenPoolIdUnderlying,
    SpellAddressToDEX,
    lpAddressToPoolId
} from './constants'
import Compound from '@compound-finance/compound-js';
import {MaxUint256} from "@ethersproject/constants";
// import { Contract, Provider } from 'ethcall';
// import {JsonRpcProvider} from "@ethersproject/providers";
import {eX} from "./helpers";
import numeral from 'numeral'
import { address } from './address'
import MdexRouterABI from './json/MdexRouterABI.json';
import PriceFeeder_ABI from './json/PriceFeeder_ABI.json';
import cMlpTokenAbi from './json/cMlpTokenAbi.json';
import mdexHecoPoolAbi from './json/mdexHecoPoolAbi.json'
import HecoPoolAbi from './json/HecoPool_abi.json'
import HomoraBank_abi from './json/HomoraBank_abi.json'
import ACMDMining_abi from './json/ACMDMining_abi.json'
import i18n from "@/i18n";
import PairContractAbi from './json/PairContractAbi.json'
import {getLpAddressByCollId, getSushiPerShareByCollId} from "./index";

let isFistUpdateData = true
const compoundConstants = require("@compound-finance/compound-js/dist/nodejs/constants.js")
const Web3 = require('web3')
let Web3Http
let web3 = new Web3(window.ethereum)
// todo 换默认节点
// const nodeAddress = "https://http-mainnet-node.huobichain.com"
// const nodeAddress = "https://http-mainnet-node.defibox.com"
const nodeAddress = "https://http-mainnet.hecochain.com"
// const nodeAddress = "https://heconode.ifoobar.com"
// const nodeAddress = "https://heco.bingooglobal.com"
let web3_customNode = new Web3(new Web3.providers.HttpProvider(nodeAddress))

const BigNumber = require("bignumber.js");
BigNumber.config({EXPONENTIAL_AT: 1e9});
const chainIdToBlockTime = {
    1: 15,
    3: 15,
    4: 15,
    5: 15,
    42: 15,
    128: 3,
    256: 3,
}; // seconds
const chainIdToEtherscanPreUrl = {
    1: "https://etherscan.io/tx/",
    3: "https://ropsten.etherscan.io/tx/",
    4: "https://rinkeby.etherscan.io/tx/",
    5: "https://goerli.etherscan.io/tx/",
    42: "https://kovan.etherscan.io/tx/",
    // 128: "https://scan.hecochain.com/tx/",
    128: "https://hecoinfo.com/tx/",
    256: "https://scan-testnet.hecochain.com/tx/",
}
const chainIdToName = {
    1: "mainnet",
    3: "ropsten",
    4: "rinkeby",
    5: "goerli",
    42: "kovan",
    128: "heco-mainnet",
    256: "heco-testnet",
};
const nodeValToUrl = {
    "htcn": "https://http-mainnet-node.huobichain.com",
    "defibox": "https://http-mainnet-node.defibox.com",
    "htglobal": "https://http-mainnet.hecochain.com",
    "tp": "https://heco.mytokenpocket.vip",
    "ifoobar": "https://heconode.ifoobar.com",
    "bingoo": "https://heco.bingooglobal.com",
};
console.log(chainIdToName[window.ethereum?.networkVersion])

// const a = new BigNumber(11.11)
// const b = new BigNumber(14.88)
// const o1 = {key1: a}
// const o2 = {key1: b}
// const arr1 = [o1,o1]
// const arr2 = [o2]
// const o = mergeRight(arr1,arr2)
// console.log('o= ',o)

let canAddress
let comptrollerAddress
// let maximillionAddress
let compoundLensAddress
const ethDummyAddress = "0xETH";

const getUserPositions = async (walletAddress) => {
    const params = `{
  "query": "{\\n  positions(\\n    where: {owner: \\"${walletAddress}\\"collateralSize_not: \\"0\\"}\\n  )  {\\n    id\\n    owner\\n    speller\\n    collateralToken:collateralToken{\\n      id\\n      token\\n      tokenId\\n      totalCollateral\\n      amount\\n    }\\n    collateralSize\\n    openTxHash\\n    \\n  }\\n}\\n",
  "variables": null,
  "operationName": null
}`
    const res = await axios.post('/heco', params)
    if (res.status === 200) {
        return res.data.data.positions
    }
    return []
}
const getAllUserPositions = async () => {
    const params = `{
  "query": "{\\n  positions(\\n    where: {collateralSize_not: \\"0\\"}\\n  )  {\\n    id\\n    owner\\n    speller\\n    collateralToken:collateralToken{\\n      id\\n      token\\n      tokenId\\n      totalCollateral\\n      amount\\n    }\\n    collateralSize\\n    openTxHash\\n    \\n  }\\n}\\n",
  "variables": null,
  "operationName": null
}`
    const res = await axios.post('/heco', params)
    if (res.status === 200) {
        return res.data.data.positions
    }
    return []
}

const getPositionsAmount = async () => {
    const params = `{"query":"{\\n  bankSummaries  {\\n    activePosition\\n  }\\n}\\n","variables":null,"operationName":null}`
    const res = await axios.post('/heco', params)
    if (res.status === 200) {
        return res.data.data.bankSummaries[0].activePosition
    }
    return 0
}

const getPositionDetails = async (position) => {
    const collId = position.collateralToken.id.replace(/0x.+-/,'')
    const IBankContract = new web3_customNode.eth.Contract(HomoraBank_abi,address.IBank,{})
    const step0 = await Promise.all([
        IBankContract.methods.getPositionDebts(position.id).call(),
    ])
    const DEX = SpellAddressToDEX['heco-mainnet'][position.speller]
    const lpTokenAddress = getLpAddressByCollId(collId,DEX)
    const sushiPerShare = getSushiPerShareByCollId(collId)
    const positionDebts = step0[0]

    return {
        id: position.id,
        owner: position.owner,
        DEX,
        lpTokenAddress,
        sushiPerShare,
        positionDebts,
        collateralSize: position.collateralSize,
    }
}

const getPoolDetails = async (pool, mdxPerBlock, bxhPerBlock, totalAllocPoint, networkChainId) => {
    const step0 = await Promise.all([
        getUSDPrice(pool.poolAddress, 18, networkChainId),
        getLpReserves(pool.poolAddress),
        getLpTotalSupply(pool.poolAddress, networkChainId),
        getPriceFactorColl(pool.poolAddress),
        getPoolInfoByLpUnderlying(pool.poolAddress),
        getTotalLpAmount(pool),
    ])
    const lpPrice = step0[0]
    const poolInfo = step0[4]
    let rewardPerBlock,accRewardPerShare = 0
    switch (pool.poolDEX) {
        case 'Mdex':
            rewardPerBlock = mdxPerBlock
            accRewardPerShare = poolInfo.accMdxPerShare
            break
        case 'BXH':
            rewardPerBlock = bxhPerBlock
            accRewardPerShare = poolInfo.accBXHPerShare
            break
    }
    const lpApyDivRewardTokenPrice = getLpApyDivRewardTokenPrice(rewardPerBlock, totalAllocPoint, poolInfo, lpPrice)
        .times(28800).times(365)

    const resPool = pool
    resPool.lpPrice = lpPrice
    resPool.lpReserves = step0[1]
    resPool.lpTotalSupply = step0[2]
    resPool.priceFactorColl = step0[3]
    resPool.totalLpAmount = step0[5]
    resPool.lpApyDivRewardTokenPrice = lpApyDivRewardTokenPrice
    resPool.accRewardPerShare = accRewardPerShare
    return resPool
}

const updateAllUserPositionsDetails = async () => {

    const userPositionsRaw = await getAllUserPositions();
    const allUserPositionsDetails = await Promise.all(userPositionsRaw.map(async (position) => {
        try {
            return getPositionDetails(position);
        } catch (ex) {
            console.log(`Error getting Position, id= ${position.id}: ${ex.message}`);
            console.log(ex.error);
            return {}
        }
    }))
    store.commit('updateAllUserPositionsDetails',allUserPositionsDetails)
}

const getAllMarkets = async (networkChainId) => {
    return allMarketsArray[chainIdToName[networkChainId]]
}

const getUnderlyingTokenAddress = async (cTokenAddress) => {
    return underlyingAddress['heco-mainnet'][cTokenAddress]
};

const getTokenSymbol = async (address) => {
    return tokenSymbol['heco-mainnet'][address]
};

const getTokenName = async (address) => {
    return tokenName['heco-mainnet'][address]

};

const getDecimals = async (tokenAddress) => {
    return decimals['heco-mainnet'][tokenAddress]
};

const getPriceFactorColl = async (tokenAddress) => {
    return priceFactorColl['heco-mainnet'][tokenAddress]
};

const getPriceFactorBorr = async (tokenAddress) => {
    return priceFactorBorr['heco-mainnet'][tokenAddress]
};

const getUnderlyingPrice = async (tokenAddress, decimals, networkChainId) => {
    if (window.ethereum) {

        const priceFeedAddress = Compound.util.getAddress(Compound.PriceFeed, chainIdToName[networkChainId]);
        const priceFeedContract = new web3_customNode.eth.Contract(PriceFeeder_ABI.abi, priceFeedAddress, {})
        const underlyingPrice = await priceFeedContract.methods.getUnderlyingPrice(tokenAddress).call()

        // const underlyingPrice = await Compound.eth.read(
        //     priceFeedAddress,
        //     "function getUnderlyingPrice(address) returns (uint)",
        //     [tokenAddress], // [optional] parameters
        //     {
        //         network: chainIdToName[networkChainId],
        //         provider: window.ethereum,
        //     } // [optional] call options, provider, network, ethers.js "overrides"
        // );

        return eX(underlyingPrice?.toString(), decimals - 36);
    }
};

// 取预言机LP价格
const getUSDPrice = async (tokenAddress, decimals, networkChainId) => {
    if (window.ethereum) {

        const priceFeedAddress = Compound.util.getAddress(Compound.PriceFeed, chainIdToName[networkChainId]);
        const priceFeedContract = new web3_customNode.eth.Contract(PriceFeeder_ABI.abi, priceFeedAddress, {})
        const underlyingPrice = await priceFeedContract.methods.getUSDPx(tokenAddress).call()

        // const underlyingPrice = await Compound.eth.read(
        //     priceFeedAddress,
        //     "function getUnderlyingPrice(address) returns (uint)",
        //     [tokenAddress], // [optional] parameters
        //     {
        //         network: chainIdToName[networkChainId],
        //         provider: window.ethereum,
        //     } // [optional] call options, provider, network, ethers.js "overrides"
        // );

        return eX(underlyingPrice?.toString(), decimals - 36);
    }
};

const getSupplyAndBorrowBalance = async (
    cTokenAddress,
    decimals,
    underlyingPrice,
    walletAddress,
    networkChainId
) => {
    if (window.ethereum) {

        const cTokenContract = new web3_customNode.eth.Contract(compoundConstants.abi.cErc20, cTokenAddress, {})
        const accountSnapshot = await cTokenContract.methods.getAccountSnapshot(walletAddress).call()

        // const accountSnapshot = await Compound.eth.read(
        //     cTokenAddress,
        //     "function getAccountSnapshot(address) returns (uint, uint, uint, uint)",
        //     [walletAddress], // [optional] parameters
        //     {
        //         network: chainIdToName[networkChainId],
        //         provider: window.ethereum,
        //     } // [optional] call options, provider, network, ethers.js "overrides"
        // );

        // const supplyBalanceInTokenUnit = eX(
        //     accountSnapshot[1].mul(accountSnapshot[3])?.toString(),
        //     -1 * decimals - 18
        // );
        const supplyBalanceInTokenUnit = eX(
            new BigNumber(accountSnapshot[1]).times(accountSnapshot[3])?.toString(),
            -1 * decimals - 18
        );
        const supplyBalanceInUsd = supplyBalanceInTokenUnit.times(
            underlyingPrice
        );
        const borrowBalanceInTokenUnit = eX(
            accountSnapshot[2]?.toString(),
            -1 * decimals
        );
        const borrowBalanceInUsd = borrowBalanceInTokenUnit.times(
            underlyingPrice
        );

        return {
            supplyBalanceInTokenUnit,
            supplyBalance: supplyBalanceInUsd,
            borrowBalanceInTokenUnit,
            borrowBalance: borrowBalanceInUsd,
        };
    }
};

// 取IBank 总借款额度
const getCreditLimits = async (networkChainId) => {
    if (window.ethereum) {

        const cantrollerContract = new web3_customNode.eth.Contract(compoundConstants.abi.Cantroller, comptrollerAddress, {})
        const creditLimits = await cantrollerContract.methods.creditLimits(address.IBank).call()

        return eX(creditLimits?.toString(), -18);
    }
};


const getIBankTotalDebtInUsd = async (
    cTokenAddress,
    decimals,
    underlyingPrice,
    networkChainId
) => {
    if (window.ethereum) {

        const cTokenContract = new web3_customNode.eth.Contract(compoundConstants.abi.cErc20, cTokenAddress, {})
        const accountSnapshot = await cTokenContract.methods.getAccountSnapshot(address.IBank).call()

        const borrowBalanceInTokenUnit = eX(
            accountSnapshot[2]?.toString(),
            -1 * decimals
        );
        const borrowBalanceInUsd = borrowBalanceInTokenUnit.times(
            underlyingPrice
        );

        return borrowBalanceInUsd
    }
};
// 这个 rewardSpeed 【只能】用于计算用户杠杆仓位的 ACMD APY
// 借贷部分的 ACMD APY 需要通过 canSpeed 计算
const getACMDMiningSpeed = async ( tokenAddress ) => {
    if (window.ethereum) {

        const ACMDMiningContract = new web3_customNode.eth.Contract(ACMDMining_abi, address.ACMDMining, {})
        const TokenInfos = await ACMDMiningContract.methods.TokenInfos(tokenAddress).call()

        return TokenInfos.rewardSpeed
    }
};
// 取用户所有仓位的可领取ACMD奖励
const getACMDMiningReward = async ( positions ) => {
    if (positions.length === 0) return new BigNumber(0)
    if (window.ethereum) {

        const ACMDMiningContract = new web3_customNode.eth.Contract(ACMDMining_abi, address.ACMDMining, {})
        const reward = await ACMDMiningContract.methods.rewardUserPositions(positions).call()

        return eX(reward, -18)
    }
};

const getCTokenTotalSupply = async (cTokenAddress, networkChainId) => {

    if (window.ethereum) {
        const cTokenContract = new web3_customNode.eth.Contract(compoundConstants.abi.cErc20, cTokenAddress, {})
        return await cTokenContract.methods.totalSupply().call()

        // return  await Compound.eth.read(
        //     cTokenAddress,
        //     "function totalSupply() returns (uint)",
        //     [], // [optional] parameters
        //     {
        //         network: chainIdToName[networkChainId],
        //         provider: window.ethereum,
        //     } // [optional] call options, provider, network, ethers.js "overrides"
        // );
    }
};

const getExchangeRateStored = async (cTokenAddress, networkChainId) => {

    if (window.ethereum) {
        const cTokenContract = new web3_customNode.eth.Contract(compoundConstants.abi.cErc20, cTokenAddress, {})
        return await cTokenContract.methods.exchangeRateStored().call()

        // return  await Compound.eth.read(
        //     cTokenAddress,
        //     "function exchangeRateStored() returns (uint)",
        //     [], // [optional] parameters
        //     {
        //         network: chainIdToName[networkChainId],
        //         provider: window.ethereum,
        //     } // [optional] call options, provider, network, ethers.js "overrides"
        // );
    }
};

const getCTokenTotalBorrow = async (cTokenAddress, networkChainId) => {

    if (window.ethereum) {
        const cTokenContract = new web3_customNode.eth.Contract(compoundConstants.abi.cErc20, cTokenAddress, {})
        return await cTokenContract.methods.totalBorrows().call()

        // return  await Compound.eth.read(
        //     cTokenAddress,
        //     "function totalBorrows() returns (uint)",
        //     [], // [optional] parameters
        //     {
        //         network: chainIdToName[networkChainId],
        //         provider: window.ethereum,
        //     } // [optional] call options, provider, network, ethers.js "overrides"
        // );
    }
};

// 抵押因子
const getCollateralFactor = async (comptrollerAddress, tokenAddress, networkChainId) => {
    return new BigNumber(collateralFactor['heco-mainnet'][tokenAddress])
};

// 存款年化
const getSupplyApy = async (cTokenAddress, networkChainId) => {
    if (window.ethereum) {
        const mantissa = 1e18; // mantissa is the same even the underlying asset has different decimals
        const blocksPerYear = (365 * 24 * 60 * 60) / chainIdToBlockTime[networkChainId];

        let supplyRatePerBlock;
        try {
            const cTokenContract = new web3_customNode.eth.Contract(compoundConstants.abi.cErc20, cTokenAddress, {})
            supplyRatePerBlock = await cTokenContract.methods.supplyRatePerBlock().call()

            // supplyRatePerBlock = await Compound.eth.read(
            //     cTokenAddress,
            //     "function supplyRatePerBlock() returns (uint256)",
            //     [], // [optional] parameters
            //     {
            //         network: chainIdToName[networkChainId],
            //         provider: window.ethereum,
            //     } // [optional] call options, provider, network, ethers.js "overrides"
            // );
        } catch (e) {
            console.log(cTokenAddress, 'message:', e.message, 'error:', e.error);
            supplyRatePerBlock = new BigNumber(0);
        }

        const supplyApy = new BigNumber(
            Math.pow(
                (supplyRatePerBlock / mantissa) + 1,
                blocksPerYear - 1
            ) - 1
        );
        return supplyApy;
    }
};

// 借款年化
const getBorrowApy = async (cTokenAddress, networkChainId) => {
    if (window.ethereum) {
        const mantissa = 1e18; // mantissa is the same even the underlying asset has different decimals
        const blocksPerYear = (365 * 24 * 60 * 60) / chainIdToBlockTime[networkChainId];

        let borrowRatePerBlock;
        try {
            const cTokenContract = new web3_customNode.eth.Contract(compoundConstants.abi.cErc20, cTokenAddress, {})
            borrowRatePerBlock = await cTokenContract.methods.borrowRatePerBlock().call()

            // borrowRatePerBlock = await Compound.eth.read(
            //     cTokenAddress,
            //     "function borrowRatePerBlock() returns (uint256)",
            //     [], // [optional] parameters
            //     {
            //         network: chainIdToName[networkChainId],
            //         provider: window.ethereum,
            //     } // [optional] call options, provider, network, ethers.js "overrides"
            // );
        } catch (e) {
            console.log(cTokenAddress, 'message:', e.message, 'error:', e.error);
            borrowRatePerBlock = new BigNumber(0);
        }

        const borrowApy = new BigNumber(
            Math.pow(
                (borrowRatePerBlock / mantissa) + 1,
                blocksPerYear - 1
            ) - 1
        );
        return borrowApy;
    }
};

// 取cToken合约Underlying余额
const getUnderlyingAmount = async (cTokenAddress, decimals, networkChainId) => {
    if (window.ethereum) {
        const cTokenContract = new web3_customNode.eth.Contract(compoundConstants.abi.cErc20, cTokenAddress, {})
        const underlyingAmount = await cTokenContract.methods.getCash().call()

        // const underlyingAmount = await Compound.eth.read(
        //     cTokenAddress,
        //     "function getCash() returns (uint)",
        //     [], // [optional] parameters
        //     {
        //         network: chainIdToName[networkChainId],
        //         provider: window.ethereum,
        //     } // [optional] call options, provider, network, ethers.js "overrides"
        // );

        return eX(underlyingAmount?.toString(), -1 * decimals);
    }
};

// 取Approve数额
const getAllowance = async (
    tokenAddress,
    decimals,
    walletAddress,
    spenderAddress,
    networkChainId
) => {
    if (window.ethereum) {
        let allowance;
        if (tokenAddress === ethDummyAddress) {
            allowance = MaxUint256;
        } else {
            const cTokenContract = new web3_customNode.eth.Contract(compoundConstants.abi.Erc20, tokenAddress, {})
            allowance = await cTokenContract.methods.allowance(walletAddress, spenderAddress).call()

            // allowance = await Compound.eth.read(
            //     tokenAddress,
            //     "function allowance(address, address) returns (uint)",
            //     [walletAddress, spenderAddress], // [optional] parameters
            //     {
            //         network: chainIdToName[networkChainId],
            //         provider: window.ethereum,
            //     } // [optional] call options, provider, network, ethers.js "overrides"
            // );
        }

        return eX(allowance?.toString(), -1 * decimals);
    }
};

const getBalanceOf = async (tokenAddress, decimals, walletAddress, networkChainId) => {

    if (window.ethereum) {
        let balance;
        if (tokenAddress === ethDummyAddress) {
            // balance = eval(await window.ethereum.request({
            //     "method": "eth_getBalance",
            //     "params": [walletAddress, "latest"],
            //     "id": networkChainId
            // }));
            balance = Number(await web3.eth.getBalance(walletAddress))
        } else {
            const cTokenContract = new web3_customNode.eth.Contract(compoundConstants.abi.Erc20, tokenAddress, {})
            balance = await cTokenContract.methods.balanceOf(walletAddress).call()

            // balance = await Compound.eth.read(
            //     tokenAddress,
            //     "function balanceOf(address) returns (uint)",
            //     [walletAddress], // [optional] parameters
            //     {
            //         network: chainIdToName[networkChainId],
            //         provider: window.ethereum,
            //     } // [optional] call options, provider, network, ethers.js "overrides"
            // );
        }

        return eX(new BigNumber(balance?.toString()).toString(), -1 * decimals);
    }
};

const getcTokenBalanceOf = async (cTokenAddress, walletAddress, networkChainId) => {
    if (window.ethereum) {
        const cTokenContract = new web3_customNode.eth.Contract(compoundConstants.abi.cErc20, cTokenAddress, {})
        const balance = await cTokenContract.methods.balanceOf(walletAddress).call()

        // const balance = await Compound.eth.read(
        //     cTokenAddress,
        //     "function balanceOf(address) returns (uint)",
        //     [walletAddress], // [optional] parameters
        //     {
        //         network: chainIdToName[networkChainId],
        //         provider: window.ethereum,
        //     } // [optional] call options, provider, network, ethers.js "overrides"
        // );

        // cToken Decimals: 8
        return eX(balance?.toString(), -1 * 8);
    }
};

// 取借贷产生的未领取CAN奖励数额
const getCompAccrued = async (walletAddress, networkChainId) => {
    const CompoundLensContract = new Web3Http.eth.Contract(compoundConstants.abi.CompoundLens, compoundLensAddress, {
        from: walletAddress,
    })

    const res = await CompoundLensContract.methods.getCompBalanceMetadataExt(
        canAddress,
        comptrollerAddress,
        walletAddress
    ).call()

    return eX(res.allocated?.toString(), -1 * 18);
};

const getLpPrice = async (lpTokenAddress, token0Price, token1Price, token0Decimals, token1Decimals, lpDecimals) =>{
    const lpTotalSupply = await getLpTotalSupply(lpTokenAddress, '128')
    let tokenTotalList = await getLpReserves(lpTokenAddress)
    const token0TotalSupply = tokenTotalList[0]
    const token1TotalSupply = tokenTotalList[1]
    const lpTokenPrice = eX(token0TotalSupply,-1*token0Decimals).times(token0Price).plus(eX(token1TotalSupply,-1*token1Decimals).times(token1Price)).div(eX(lpTotalSupply,-1*lpDecimals))
    return lpTokenPrice.toNumber()
}
const getLpReserves = async (lpTokenAddress)=>{
    let tokenTotalList = []
    const lpTokenContract = new web3_customNode.eth.Contract(PairContractAbi.abi,lpTokenAddress)
    const reserversList = await lpTokenContract.methods.getReserves().call()
    tokenTotalList.push(reserversList.reserve0)
    tokenTotalList.push(reserversList.reserve1)
    return tokenTotalList
}
const getLpTotalSupply = async (lpTokenAddress, networkChainId)=>{
    const lpTokenContract = new web3_customNode.eth.Contract(PairContractAbi.abi,lpTokenAddress,{})
    const totalSupply = await lpTokenContract.methods.totalSupply().call()
    return totalSupply;
}

// 取 MLP Token 的未领取 MDX 奖励数额
const getMdxReward = async (cTokenAddress, walletAddress, networkChainId) => {
    if (!getIsCMlpToken(cTokenAddress)) return new BigNumber(0)
    const cMlpTokenContract = new web3_customNode.eth.Contract(cMlpTokenAbi, cTokenAddress, {
        from: walletAddress,
    })

    let res
    try{
        res = await cMlpTokenContract.methods.claimMdx(walletAddress).call()
    } catch (e) {
        console.log(cTokenAddress,e)
        return new BigNumber(0)
    }
    return eX(res, -1 * 18)
};

const getIsCMlpToken = (cTokenAddress) => {
    return mdexLpTokenArray["heco-mainnet"].includes(cTokenAddress)
}

const getPoolInfo = async (cTokenAddress, networkChainId) =>{
    if (!getIsCMlpToken(cTokenAddress)) return {}
    if(window.ethereum) {
        const poolId = mdexLpTokenPoolId["heco-mainnet"][cTokenAddress]
        const hecoPoolContract = new web3_customNode.eth.Contract(mdexHecoPoolAbi,address.mdexHecoPool,{})
        const cTokenPoolInfo = await hecoPoolContract.methods.poolInfo(poolId).call()
        return cTokenPoolInfo;
    }
    return {}
}

const getMlpApy = (cTokenAddress, mdxPrice, cTokenPoolInfo, lpTokenPrice) =>{
    if (!getIsCMlpToken(cTokenAddress)) return new BigNumber(0)

    const mdxPerBlock = new BigNumber('26500000000000000000')
    const totalAllocPoint = new BigNumber('10000')
    const allocPoint = cTokenPoolInfo.allocPoint
    const totalAmount = cTokenPoolInfo.totalAmount

    return mdxPerBlock.times(mdxPrice).times(allocPoint).div(totalAllocPoint).div(totalAmount).div(lpTokenPrice)
}

// ACMD 新增 求 rewardApy
const getMdxPerBlock = async () =>{
    if(window.ethereum) {
        const hecoPoolContract = new web3_customNode.eth.Contract(HecoPoolAbi.Mdex,address.Mdex.HecoPool,{})
        const mdxPerBlock = await hecoPoolContract.methods.mdxPerBlock().call()
        return mdxPerBlock;
    }
    return '26500000000000000000'
}
const getBxhPerBlock = async () =>{
    if(window.ethereum) {
        const hecoPoolContract = new web3_customNode.eth.Contract(HecoPoolAbi.BXH,address.BXH.HecoPool,{})
        const bxhPerBlock = await hecoPoolContract.methods.bxhPerBlock().call()
        return bxhPerBlock;
    }
    return '42000000000000000000'
}
const getTotalAllocPoint = async () =>{
    if(window.ethereum) {
        const hecoPoolContract = new web3_customNode.eth.Contract(mdexHecoPoolAbi,address.mdexHecoPool,{})
        const totalAllocPoint = await hecoPoolContract.methods.totalAllocPoint().call()
        return totalAllocPoint;
    }
    return '10000'
}
const getPoolInfoByLpUnderlying = async (lpAddress) =>{
    if(window.ethereum) {
        const poolId = mdexLpTokenPoolIdUnderlying["heco-mainnet"][lpAddress]
        const hecoPoolContract = new web3_customNode.eth.Contract(HecoPoolAbi.Mdex,address.Mdex.HecoPool,{})
        const cTokenPoolInfo = await hecoPoolContract.methods.poolInfo(poolId).call()
        return cTokenPoolInfo;
    }
    return {}
}
const getLpApyDivRewardTokenPrice = (rewardPerBlock, totalAllocPoint, poolInfo, lpTokenPrice) =>{
    const allocPoint = poolInfo.allocPoint
    const totalAmount = poolInfo.totalAmount
    return new BigNumber(rewardPerBlock).times(allocPoint).div(totalAllocPoint).div(totalAmount).div(lpTokenPrice)
}

// 求lp总质押
const getTotalLpAmount = async (pool) =>{
    const pid = lpAddressToPoolId["heco-mainnet"][pool.poolDEX][pool.poolAddress]
    const DEX = pool.poolDEX
    const hecoPoolContract = new web3_customNode.eth.Contract(HecoPoolAbi.Mdex,address.Mdex.HecoPool,{})
    const userInfo = await hecoPoolContract.methods.userInfo(pid,address[DEX].WMasterChef).call()
    return userInfo.amount || 0
}

// 取是否开启抵押
const getIsMembership = async (walletAddress, cTokenAddress, networkChainId) => {

    const cantrollerContract = new web3_customNode.eth.Contract(compoundConstants.abi.Comptroller, comptrollerAddress, {})
    const res = await cantrollerContract.methods.checkMembership(walletAddress, cTokenAddress).call()

    // const res = await Compound.eth.read(
    //     comptrollerAddress,
    //     'function checkMembership(address, address) returns (bool)',
    //     [walletAddress, cTokenAddress], // [optional] parameters
    //     {
    //         network: chainIdToName[networkChainId],
    //         provider: window.ethereum,
    //     } // [optional] call options, provider, network, ethers.js "overrides"
    // );

    return res
};

// /**
//  * getReserves 获取储备值
//  * cToken，abi调用cErc20
//  * **/
// //参数一：币的地址，参数二链ID，128；
// const getReserves = async (cTokenAddress, networkChainId) => {
//     if(window.ethereum)
//     {
//
//         const cantrollerContract = new web3_customNode.eth.Contract(compoundConstants.abi.cErc20,cTokenAddress,{})
//         const reserves= await cantrollerContract.methods.totalReserves().call()
//         // console.log('return reserves')
//         return eX(reserves , -18);
//     }
//
// };

// /**
//  * getReservesFactor 获取储备值系数
//  * cToken，abi调用cErc20
//  * **/
// const getReservesFactor = async (cTokenAddress, networkChainId) =>{
//     if (window.ethereum)
//     {
//         const cantrollerContract = new web3_customNode.eth.Contract(compoundConstants.abi.cErc20,cTokenAddress,{})
//         const getReservesfactor = await cantrollerContract.methods.reserveFactorMantissa().call()
//         return eX(getReservesfactor,-18);
//     }
// };

/**
 * getCTokenMinted 获取cToken铸币
 * cToken，abi调用cErc20
 * **/
const getCTokenMinted = async (cTokenAddress, networkChainId) => {
    if(window.ethereum)
    {
        const cantrollerContract = new web3_customNode.eth.Contract(compoundConstants.abi.cErc20,cTokenAddress,{})
        const getCTokenMinted = await cantrollerContract.methods.totalSupply().call()
        return eX(getCTokenMinted,-8);
    }
}

const getCanSpeed = async (cTokenAddress, networkChainId) => {
    //检查是否有钱包或者DAPP浏览器
    if (window.ethereum) {

        const cantrollerContract = new web3_customNode.eth.Contract(compoundConstants.abi.Cantroller, comptrollerAddress, {})
        const canSpeed = await cantrollerContract.methods.acmdSpeeds(cTokenAddress).call()

        // let func
        // if (chainIdToName[networkChainId] === 'heco-mainnet') {
        //     func = 'canSpeeds'
        // } else {
        //     func = 'compSpeeds'
        // }
        // const canSpeed = await Compound.eth.read(
        //     comptrollerAddress,
        //     `function ${func}(address) returns (uint)`,
        //     [cTokenAddress], // [optional] parameters
        //     {
        //         network: chainIdToName[networkChainId],
        //         provider: window.ethereum,
        //     } // [optional] call options, provider, network, ethers.js "overrides"
        // );
        return eX(canSpeed?.toString(), -18);
    }
};

const updateGasPrice = async (networkChainId) => {
    // 获取gasPrice
    const result = await Web3Http.eth.getGasPrice()

    if (result) {
        const gasPrice = new BigNumber(new BigNumber(result).times(2.6).toFixed(0))
        store.commit('updateGasPrice', gasPrice)
        return
    }

    if (networkChainId === '128' || networkChainId === '256') {
        store.commit('updateGasPrice', eX(1, 9))
        return
    }

    const response = await fetch(
        "https://ethgasstation.info/api/ethgasAPI.json"
    );
    const data = await response.json();
    store.commit('updateGasPrice', eX(data.fast, 8))
};

const getCanPrice = async (networkChainId) => {
    // todo
    return new BigNumber(30.15)

    // mdex 获取 CAN 价格，取CAN/HUSD交易对
    const MdexRouterContractAddress = '0xED7d5F38C79115ca12fe6C0041abb22F0A06C300'
    const MdexRouterContract = new Web3Http.eth.Contract(MdexRouterABI.abi, MdexRouterContractAddress, {})
    const res = await MdexRouterContract.methods.getAmountsOut("100000000", ["0x0298c2b32eaE4da002a15f36fdf7615BEa3DA047", canAddress]).call()

    if (res && res[1] > 0) {
        return new BigNumber(1).div(eX(res[1], -18))
    } else {
        return new BigNumber(50.19)
    }

};

// const getMdxPrice = async (networkChainId) => {
//
//     // mdex 获取 MDX 价格，取MDX/USDT交易对
//     const MdexRouterContractAddress = '0xED7d5F38C79115ca12fe6C0041abb22F0A06C300'
//     const MdexRouterContract = new Web3Http.eth.Contract(MdexRouterABI.abi, MdexRouterContractAddress, {})
//     const res = await MdexRouterContract.methods.getAmountsOut("100000000", ["0xa71edc38d189767582c38a3145b5873052c3e47a", "0x25d2e80cb6b86881fd7e07dd263fb79f4abe033c"]).call()
//
//     if (res && res[1] > 0) {
//         return new BigNumber(1).div(eX(res[1], -8))
//     } else {
//         return new BigNumber(3.95)
//     }
//
// };


// 把underlyingAmount转换为流动性的文本格式
const getLiquidityString = (underlyingAmount, underlyingPrice) => {
    let lowerUnitString
    const numeralString = numeral(underlyingAmount.times(underlyingPrice)?.toString()).format('$0,0.[0]a')
    if (/NaN/.test(numeralString)) {
        if (underlyingAmount.times(underlyingPrice).isLessThan(0.005)) {
            lowerUnitString = '$0'
        } else {
            lowerUnitString = '$' + Number(underlyingAmount.times(underlyingPrice)?.toString()).toPrecision(2)
        }
    } else {
        lowerUnitString = numeral(underlyingAmount.times(underlyingPrice)?.toString()).format('$0,0.[0]a')
    }
    return lowerUnitString.replace(/[mbt]$/, str => str.toUpperCase())
};

// 获取代币详情页面的数据（未获取的）
const getMarketsIdData = async ()=> {
    // console.log('getMarketsIdData执行')
    if (store.state.isUpdating) return

    let MarketDetail
    if(store.state.wholeAllMarketsDetails.length===0)
    {
        MarketDetail = store.state.allMarketsDetails

    }else {
        MarketDetail = store.state.wholeAllMarketsDetails
    }
    // const networkChainId = eval(await window.ethereum.request({method: 'eth_chainId'})).toString()
    // const networkChainId = Number(await web3.eth.getChainId()).toString()//强转类型
    const networkChainId = '128'
    let allMarketAddress = await getAllMarkets(networkChainId)
    //用map将allMarketAddress数组中的币值地址拿出，分别调用getReserves方法，获得reserves值
    // let assist1 = Promise.all(allMarketAddress.map(async (cTokenAddress) => {
    //     console.log("getReserves正在执行")
    //     return getReserves(cTokenAddress, networkChainId)}))
    let cTokenMinted = Promise.all(allMarketAddress.map(async (cTokenAddress) => {
        return getCTokenMinted(cTokenAddress, networkChainId)
    }))
    // const MarketsReserves = await assist1
    const MarketsCTokenMinted = await cTokenMinted
    /*
     * 优化异步操作，
     * 先let p1,p2 = Promise.all,让Promise先执行起来
     * 然后再const MarketsReserves，MarketsCTokenMinted = await p1,p2
     * 等程序执行到 const的时候，两个promise已经都在走了，这样运行时间决定于最长的那个Promise
      */

    let invalidDetail = false
        MarketDetail = MarketDetail.map((detail, index ) =>{
        let detail_result = detail
        if(!detail_result)
        {
            invalidDetail = true
        }
        //index下标从MarketDetail[0]走到最后，每个MarketDetail也是一个对象,在该对象属性中新增赋值
        // detail_result.reserves = MarketsReserves[index]
        detail_result.cTokenMinted = MarketsCTokenMinted[index]
        // detail_result.exchangeRate =newMarksExchangeRate[index]
        // detail_result.reserveFactor =newMarketsReserveFactor[index]
        return detail_result
    })
    if(invalidDetail) return;

    store.commit('updateWholeAllMarketsDetails', MarketDetail)
};

// 获取挖矿页面数据
const getAllCanSpeed = async () => {
    // console.log('getAllCanSpeed()')
    //store容器可理解为无法直接改变的全局变量，需要提交才能改变值（改变是响应式的）
    if (store.state.isUpdating) return
    let allMarketDetail
    if(store.state.wholeAllMarketsDetails.length===0)
    {
        allMarketDetail = store.state.allMarketsDetails
    }else {
        allMarketDetail = store.state.wholeAllMarketsDetails
    }
    // const networkChainId = eval(await window.ethereum.request({method: 'eth_chainId'})).toString()
    const networkChainId = Number(await web3.eth.getChainId()).toString()//强转类型
    //await 阻塞后面的代码等Promise.all执行完成（.all将多个Promise实例并发包装成一个新的Promise实例）
    const newCanSpeed = await Promise.all(
        allMarketsArray[chainIdToName[networkChainId]].map(async (cTokenAddress) => {
            return getCanSpeed(cTokenAddress, networkChainId)
        })
    )
    let invalidDetail = false

    allMarketDetail = allMarketDetail.map((detail, index) => {
        let detail_result = detail
        if (!detail_result) {
            console.log('getAllCanSpeed() !detail_result, will soon return')
            invalidDetail = true
        }

        detail_result.canSpeed = newCanSpeed[index]
        return detail_result
    })
    if (invalidDetail) return
    store.commit('updateWholeAllMarketsDetails', allMarketDetail)

}

// 取CAN流通量
const getCanCirculation = async () => {
    // console.log('getCanCirculation()')
    // if (store.state.isUpdating) return
    //
    // let invalidData = false
    //
    // const lockTokenAddress = "0xf4d84d61122b17dbff54895c9e347336de88832e"
    // const lockTokenAddress2 = "0xa5253394fc316de983beda7d53a4b50060fcaea8"
    // const lockTokenAddress3 = comptrollerAddress
    // const lockTokenAddress4 = address.can_husd.pool
    //
    // const res = await Promise.all(
    //     [lockTokenAddress, lockTokenAddress2, lockTokenAddress3, lockTokenAddress4].map(async (ownerAddress) => {
    //         try {
    //             return getBalanceOf(canAddress, 18, ownerAddress, '128');
    //         } catch (ex) {
    //             console.log(ex.error);
    //             invalidData = true
    //             return {}
    //         }
    //     })
    // )
    //
    // if (invalidData) return
    // store.commit('updateCanCirculation', new BigNumber('5000000').minus(res[0]).minus(res[1]).minus(res[2]).minus(new BigNumber(res[3]).times(3)))
}

// 更新数据主入口
async function updateData() {
    if (!window.ethereum) {
        // 当钱包未及时注入window.ethereum时，1秒内持续检测
        for (let i = 0; i < 10; i++) {
            await new Promise(resolve => setTimeout(() => resolve(), 100))
            if (!!window.ethereum) {
                web3 = new Web3(window.ethereum)
                break
            }
        }
        if (!window.ethereum) {
            store.commit('updateChainId', '0')
            return
        }
    }

    // const networkChainId = eval(await window.ethereum.request({method: 'eth_chainId'})).toString()
    const networkChainId = Number(await web3.eth.getChainId()).toString()
    store.commit('updateChainId', networkChainId)
    comptrollerAddress = Compound.util.getAddress(Compound.Comptroller, chainIdToName[networkChainId]);
    // maximillionAddress = Compound.util.getAddress(Compound.Maximillion, chainIdToName[networkChainId]);
    compoundLensAddress = Compound.util.getAddress(Compound.CompoundLens, chainIdToName[networkChainId]);

    //原来测试网也会更新数据 修改后测试网不能更新数据
    // if (!(networkChainId === '128' || networkChainId === '256')) return
    if (!(networkChainId === '128')) return
    console.log('========  updateData Begin  ========')
    const updateData_t0 = new Date()

    // await window.ethereum.request({method: 'eth_requestAccounts'})
    // const account = (await window.ethereum?.request({method: 'eth_accounts'}))[0]
    const account = (await web3.eth.getAccounts())[0]
    if (!account) {
        if (isFistUpdateData) store.commit('updateShowWalletDialog', true)
        isFistUpdateData = false
        store.commit('updateIsUpdating', false)
        store.commit('updateIsUpdatingOver', true)
        return
    }
    store.commit('updateWalletAddress', account)
    // console.log("account= ", account)
    if (networkChainId === "128") {
        // Web3Http = web3
        const val = localStorage.getItem('rpcnode')
        let web3store
        if (val) {
            if (val === 'weth') {
                web3store = web3
            } else {
                web3store = new Web3(new Web3.providers.HttpProvider(nodeValToUrl[val]))
            }
            store.commit('updateRpcNode',web3store)
        } else if (i18n.locale === 'en') {
            web3store = new Web3(new Web3.providers.HttpProvider(nodeValToUrl['htglobal']))
            store.commit('updateRpcNode', web3store)
        } else {
            let web3store = new Web3(new Web3.providers.HttpProvider(nodeAddress))
            store.commit('updateRpcNode', web3store)
        }
        web3_customNode = store.state.rpcNode
        Web3Http = web3_customNode
    } else if (networkChainId === "256") {
        Web3Http = new Web3(new Web3.providers.HttpProvider("https://http-testnet.hecochain.com"))
    }

    isFistUpdateData = false
    if (store.state.isUpdating) return
    store.commit('updateIsUpdating', true)
    try {

        //获得所有币的地址
        let allMarkets = await getAllMarkets(networkChainId);
        // console.log('allMarkets= ', allMarkets)
        canAddress = Compound.util.getAddress(Compound.COMP, chainIdToName[Number(networkChainId)])
        // console.log('canAddress= ', canAddress)

        if (!account) {
            await updateGasPrice(networkChainId);
            return
        }
        //初始化并准备赋值
        let totalSupplyBalance = new BigNumber(0);
        let totalBorrowBalance = new BigNumber(0);
        let allMarketsTotalSupplyBalance = new BigNumber(0);
        let allMarketsTotalBorrowBalance = new BigNumber(0);
        let totalBorrowLimit = new BigNumber(0);
        let yearSupplyInterest = new BigNumber(0);
        let yearBorrowInterest = new BigNumber(0);
        let totalLiquidity = new BigNumber(0);
        const IBankAddress = address.IBank

        // 取一个lending币种的详情
        async function getMarketDetails(cTokenAddress, networkChainId) {
            // 并行化promise ************
            async function step3(underlyingAddress, decimals) {
                const underlyingPrice = await getUnderlyingPrice(cTokenAddress, decimals, networkChainId)
                return [underlyingPrice].concat(await Promise.all([
                    getSupplyAndBorrowBalance(cTokenAddress, decimals, underlyingPrice, account, networkChainId),
                    getIBankTotalDebtInUsd(cTokenAddress, decimals, underlyingPrice, networkChainId),
                ]))
            }

            async function step2(underlyingAddress) {
                const decimals = await getDecimals(underlyingAddress);
                //合并数组
                return [decimals].concat(await Promise.all([
                    step3(underlyingAddress, decimals),
                    getAllowance(underlyingAddress, decimals, account, cTokenAddress, networkChainId),
                    getUnderlyingAmount(cTokenAddress, decimals, networkChainId),
                    getBalanceOf(underlyingAddress, decimals, account, networkChainId),
                    getAllowance(underlyingAddress, decimals, account, IBankAddress, networkChainId),
                ]))
            }

            async function step1() {
                const underlyingAddress = await getUnderlyingTokenAddress(cTokenAddress);
                return [underlyingAddress].concat(await Promise.all([
                    step2(underlyingAddress),
                    getTokenSymbol(underlyingAddress),
                    getTokenName(underlyingAddress),
                    getPriceFactorBorr(underlyingAddress),
                    getACMDMiningSpeed(underlyingAddress),
                ]))
            }
            let step0
            try {
                step0 = await Promise.all([
                    step1(),
                    getCollateralFactor(comptrollerAddress, cTokenAddress, networkChainId),
                    getSupplyApy(cTokenAddress, networkChainId),
                    getBorrowApy(cTokenAddress, networkChainId),
                    getcTokenBalanceOf(cTokenAddress, account, networkChainId),
                    getCanSpeed(cTokenAddress),
                    getCTokenTotalSupply(cTokenAddress, networkChainId),
                    getExchangeRateStored(cTokenAddress, networkChainId),
                    getCTokenTotalBorrow(cTokenAddress, networkChainId),
                    getMdxReward(cTokenAddress, account, networkChainId),
                    getIsCMlpToken(cTokenAddress),
                    getPoolInfo(cTokenAddress),
                ])

            } catch (e) {
                console.log('step0 Error= ', e)
                throw e
            }

            const collateralFactor = step0[1]
            const supplyApy = step0[2]
            const borrowApy = step0[3]
            const pTokenBalance = step0[4]
            const canSpeed = step0[5]
            const cTokenTotalSupply = step0[6]
            const exchangeRateStored = step0[7]
            const cTokenTotalBorrow = step0[8]
            const mdxReward = step0[9]
            const isCMlpToken = step0[10]
            const poolInfo = step0[11]
            const underlyingAddress = step0[0][0]
            const symbol = step0[0][2]
            const tokenName = step0[0][3]
            const priceFactorBorr = step0[0][4]
            const ACMDMiningSpeed = step0[0][5]
            const decimals = step0[0][1][0]
            const underlyingAllowance = step0[0][1][2]
            const underlyingAmount = step0[0][1][3]
            const walletBalanceBigNumber = step0[0][1][4]
            const underlyingIBankAllowance = step0[0][1][5]
            const underlyingPrice = step0[0][1][1][0]
            const supplyAndBorrowBalance = step0[0][1][1][1]
            const totalDebtInUsd = step0[0][1][1][2]

            // End并行化promise *********

            // console.log(symbol, underlyingAddress);

            let logoSource
            try {
                logoSource = require(`../assets/coin/asset_${symbol}.svg`);
            } catch (e) {
                logoSource = require(`../assets/coin/token.svg`);
            }

            totalSupplyBalance = totalSupplyBalance.plus(
                supplyAndBorrowBalance?.supplyBalance
            );
            totalBorrowBalance = totalBorrowBalance.plus(
                supplyAndBorrowBalance?.borrowBalance
            );

            // const marketTotalSupplyInTokenUnit = cTokenTotalSupply.isZero() ? new BigNumber(0) : eX(
            //     cTokenTotalSupply.mul(exchangeRateStored)?.toString(),
            //     -1 * decimals - 18
            // )
            const marketTotalSupplyInTokenUnit = new BigNumber(cTokenTotalSupply).isZero() ? new BigNumber(0) : eX(
                new BigNumber(cTokenTotalSupply).times(exchangeRateStored)?.toString(),
                -1 * decimals - 18
            )
            const marketTotalBorrowInTokenUnit = eX(cTokenTotalBorrow?.toString(), -1 * decimals)
            const marketTotalSupply = marketTotalSupplyInTokenUnit?.times(underlyingPrice);
            const marketTotalBorrow = marketTotalBorrowInTokenUnit?.times(underlyingPrice);

            if (marketTotalSupply?.isGreaterThan(0)) {
                allMarketsTotalSupplyBalance = allMarketsTotalSupplyBalance.plus(
                    marketTotalSupply
                );
            }

            if (marketTotalBorrow?.isGreaterThan(0)) {
                allMarketsTotalBorrowBalance = allMarketsTotalBorrowBalance.plus(
                    marketTotalBorrow
                );
            }

            const isEnterMarket = await getIsMembership(account, cTokenAddress, networkChainId);

            totalBorrowLimit = totalBorrowLimit.plus(
                isEnterMarket
                    ? supplyAndBorrowBalance?.supplyBalance.times(collateralFactor)
                    : 0
            );

            yearSupplyInterest = yearSupplyInterest.plus(
                supplyAndBorrowBalance?.supplyBalance.times(supplyApy)
            );
            yearBorrowInterest = yearBorrowInterest.plus(
                supplyAndBorrowBalance?.borrowBalance.times(borrowApy)
            );

            const liquidity = +underlyingAmount * +underlyingPrice;

            if (liquidity > 0) {
                totalLiquidity = totalLiquidity.plus(liquidity);
            }

            if (String(underlyingAddress).toLowerCase() === String(canAddress).toLowerCase()) {
                compBalance = walletBalanceBigNumber
            }
            return {
                cTokenAddress,
                pTokenBalance,
                underlyingAddress,
                symbol,
                logoSource,
                supplyApy: supplyApy.toFixed(4),
                borrowApy: borrowApy.toFixed(4),
                underlyingAllowance,
                walletBalance: walletBalanceBigNumber.toFixed(4,1),
                walletBalanceBigNumber,
                supplyBalanceInTokenUnit: supplyAndBorrowBalance?.supplyBalanceInTokenUnit,
                supplyBalance: supplyAndBorrowBalance?.supplyBalance.toFixed(2),
                marketTotalSupplyInTokenUnit,
                marketTotalSupply,
                borrowBalanceInTokenUnit: supplyAndBorrowBalance?.borrowBalanceInTokenUnit,
                borrowBalance: supplyAndBorrowBalance?.borrowBalance.toFixed(2),
                marketTotalBorrowInTokenUnit,
                marketTotalBorrow: marketTotalBorrowInTokenUnit?.times(underlyingPrice),
                isEnterMarket,
                underlyingAmount,
                underlyingPrice,
                liquidity: getLiquidityString(underlyingAmount, underlyingPrice),
                collateralFactor: collateralFactor.toFixed(2),
                canSpeed,
                decimals,
                isEnabled: underlyingAllowance.isGreaterThan(eX(1, 30)),
                isApproveIBank: underlyingIBankAllowance.isGreaterThan(eX(1, 30)),
                tokenName: tokenName,
                exchangeRateStored,
                mdxReward,
                isCMlpToken,
                poolInfo,
                priceFactorBorr,
                totalDebtInUsd,
                ACMDMiningSpeed,

                //todo
                // earned: 666,
                // accrued: 777,
            };
        }

        let compBalance = null

        async function getAllPositionDetails(userPositionsRaw) {
            return await Promise.all(userPositionsRaw.map(async (position) => {
                try {
                    return getPositionDetails(position);
                } catch (ex) {
                    console.log(`Error getting Position, id= ${position.id}: ${ex.message}`);
                    console.log(ex.error);
                    return {}
                }
            }))
        }
        async function step1() {
            //todo

            const userPositionsRaw = await getUserPositions(account);
            const positions = userPositionsRaw.map((position)=>{return position.id})

            return await Promise.all([
                getACMDMiningReward(positions),
                getAllPositionDetails(userPositionsRaw),
            ])
        }
        async function stepGetAllPools() {
            const res = await Promise.all([
                getMdxPerBlock(),
                getBxhPerBlock(),
                getTotalAllocPoint(),
            ])
            return await Promise.all(
                allFarmPools['heco-mainnet'].map(async (pool) => {
                    return getPoolDetails(pool, res[0], res[1], res[2], networkChainId);
                })
            )
        }
        const step0 = await Promise.all([
            step1(),
            getCanPrice(networkChainId),
            Promise.all(
                allMarkets.map(async (cTokenAddress) => {
                    try {
                        return getMarketDetails(cTokenAddress, networkChainId);
                    } catch (ex) {
                        console.log(`Error getting ${cTokenAddress}: ${ex.message}`);
                        console.log(ex.error);
                        return {}
                    }
                })
            ),
            stepGetAllPools(),
            getBalanceOf(ethDummyAddress, 18, account, networkChainId),
            getPositionsAmount(),
            getCreditLimits(),
        ])
        const ACMDMiningReward = step0[0][0]
        let userPositions = step0[0][1]
        const canPrice = step0[1]
        let details = step0[2]
        let allPoolDetails = step0[3]
        const htBalance = step0[4]
        const positionsAmount = step0[5]
        const IBankTotalCreditLimits = step0[6]
        store.commit('updatePositionsAmount', positionsAmount)
        store.commit('updateACMDMiningReward', ACMDMiningReward)
        store.commit('updateIBankTotalCreditLimits', IBankTotalCreditLimits)

        const mdxPrice = details.concat().filter(item => /^MDX$/.test(item.symbol))[0].underlyingPrice
        // todo
        const ACMDPrice = new BigNumber(0.00001)

        let IBankTotalDebtValue = new BigNumber(0)
        // 加入存款挖矿APY和借款挖矿APY，MLP APY
        details = details.map((item)=>{
            const market = item
            // 这个币的总借款除以这个币的总存款
            const utilizationRateRaw = market.marketTotalBorrowInTokenUnit.div(market.marketTotalSupplyInTokenUnit.isZero()?1:market.marketTotalSupplyInTokenUnit)
            const utilizationRate = utilizationRateRaw.isGreaterThan(1) ? new BigNumber(1) : utilizationRateRaw
            let k
            if (utilizationRate.isLessThan(0.8)) {
                k = utilizationRate.times(5).div(8)
            } else {
                k = utilizationRate.times(5).div(2).minus('1.5')
            }

            // 存款挖矿APR
            market.supplyDistributionApy = k.times(market.canSpeed).times(28800).times(365).times(ACMDPrice).div(market.marketTotalSupply.isZero()?1:market.marketTotalSupply)
            // 借款挖矿APR
            market.borrowDistributionApy = new BigNumber(1).minus(k).times(market.canSpeed).times(28800).times(365).times(ACMDPrice).div(market.marketTotalBorrow.isZero()?1:market.marketTotalBorrow)

            // 计算MLP Apy
            if (item.isCMlpToken) {
                market.mlpApy = getMlpApy(item.cTokenAddress, mdxPrice, item.poolInfo, item.underlyingPrice).times(28800).times(365).times(1.01)
            } else {
                market.mlpApy = new BigNumber(0)
            }

            IBankTotalDebtValue = IBankTotalDebtValue.plus(market.totalDebtInUsd)
            return market
        })
        console.log('details= ', details)
        store.commit('updateAllMarketsDetails', details)
        store.commit('updateIBankTotalDebtValue', IBankTotalDebtValue)

        let totalPoolTvl = new BigNumber(0)
        // 计算杠杆池 APY 并注入对象
        allPoolDetails = allPoolDetails.map((item)=>{
            //todo 面向对象
            const pool = item
            const rewardTokenApy = pool.lpApyDivRewardTokenPrice.times(mdxPrice)
            pool.rewardTokenApy = rewardTokenApy
            pool.leverageMdxApy = rewardTokenApy.times(pool.maxLeverage)

            const tokenAAddress = pool.poolTokens[0]
            const tokenBAddress = pool.poolTokens[1]
            const tokenADetail = details.concat().filter(item => item.underlyingAddress === tokenAAddress)[0]
            const tokenBDetail = details.concat().filter(item => item.underlyingAddress === tokenBAddress)[0]

            const ACMDMiningSpeed0 = tokenADetail.ACMDMiningSpeed
            const ACMDMiningSpeed1 = tokenBDetail.ACMDMiningSpeed
            const totalDebtInUsd0 = tokenADetail.totalDebtInUsd
            const totalDebtInUsd1 = tokenBDetail.totalDebtInUsd
            // 借款的挖矿收益
            const res_ACMDApy0 = eX(ACMDMiningSpeed0,-18).times(ACMDPrice).div(totalDebtInUsd0).times(28800).times(365)
            const res_ACMDApy1 = eX(ACMDMiningSpeed1,-18).times(ACMDPrice).div(totalDebtInUsd1).times(28800).times(365)
            const ACMDApy0 = res_ACMDApy0.isNaN() || !res_ACMDApy0.isFinite() ? new BigNumber(0) : res_ACMDApy0
            const ACMDApy1 = res_ACMDApy1.isNaN() || !res_ACMDApy1.isFinite() ? new BigNumber(0) : res_ACMDApy1
            // 按照最高杠杆，价值按 1:1 借款的 ACMD APY
            const averageACMDApy = ACMDApy0.plus(ACMDApy1).div(2).times(pool.maxLeverage - 1)

            const borrowTokenAApy = new BigNumber(0).minus(tokenADetail.borrowApy)
            const borrowTokenBApy = new BigNumber(0).minus(tokenBDetail.borrowApy)
            // 按照最高杠杆，价值按 1:1 借款的 APY（平均利率的相反数）
            const averageBorrowApy = borrowTokenAApy.plus(borrowTokenBApy).div(2).times(pool.maxLeverage - 1)

            pool.tokenA = tokenADetail
            pool.tokenB = tokenBDetail
            pool.borrowTokenAACMDApy = ACMDApy0
            pool.borrowTokenBACMDApy = ACMDApy1
            pool.averageACMDApy = averageACMDApy
            pool.borrowTokenAApy = borrowTokenAApy
            pool.borrowTokenBApy = borrowTokenBApy
            pool.averageBorrowApy = averageBorrowApy
            pool.leverageApy = pool.leverageMdxApy.plus(averageACMDApy).plus(averageBorrowApy)
            pool.tvl = eX(pool.totalLpAmount,-18).times(pool.lpPrice)
            totalPoolTvl = totalPoolTvl.plus(pool.tvl)
            return pool
        })
        console.log('allPoolDetails= ',allPoolDetails)
        store.commit('updateAllPoolsDetails', allPoolDetails)
        store.commit('updateTotalPoolTvl', totalPoolTvl)

        let userTotalCollateralValue = new BigNumber(0)
        let userTotalDebtValue = new BigNumber(0)
        // 计算用户仓位一些数据并注入对象
        userPositions = userPositions.map((item)=>{
            //todo 面向对象
            const position = item
            const pool = allPoolDetails.concat().filter(item => item.poolAddress === position.lpTokenAddress)[0]
            position.pool = pool

            const collateralSize = eX(position.collateralSize,-18)
            const collateralValue = collateralSize.times(pool.lpPrice)
            const tokenAAddress = pool.poolTokens[0]
            const tokenBAddress = pool.poolTokens[1]
            const tokenADebtAmount = eX(position.positionDebts?.debts[position.positionDebts.tokens.indexOf(tokenAAddress)]||0,-1*pool.tokenA.decimals)
            const tokenBDebtAmount = eX(position.positionDebts?.debts[position.positionDebts.tokens.indexOf(tokenBAddress)]||0,-1*pool.tokenB.decimals)
            const tokenABorrowValue = tokenADebtAmount.times(pool.tokenA?.underlyingPrice)
            const tokenBBorrowValue = tokenBDebtAmount.times(pool.tokenB?.underlyingPrice)
            const borrowValue = tokenABorrowValue.plus(tokenBBorrowValue)
            const debtRatioTimes100 = tokenADebtAmount.times(pool.tokenA?.underlyingPrice).times(pool.tokenA?.priceFactorBorr)
                .plus(tokenBDebtAmount.times(pool.tokenB?.underlyingPrice).times(pool.tokenB?.priceFactorBorr))
                .div(collateralValue.times(pool.priceFactorColl)).times(100)
            const tokenAPositionBalance = eX(new BigNumber(position.collateralSize).div(pool.lpTotalSupply).times(pool.lpReserves[0])
                ,-1 * pool.tokenA.decimals)
            const tokenBPositionBalance = eX(new BigNumber(position.collateralSize).div(pool.lpTotalSupply).times(pool.lpReserves[1])
                ,-1 * pool.tokenB.decimals)
            const tokenASupplyValue = tokenAPositionBalance.minus(tokenADebtAmount)
                .times(pool.tokenA?.underlyingPrice)
            const tokenBSupplyValue = tokenBPositionBalance.minus(tokenBDebtAmount)
                .times(pool.tokenB?.underlyingPrice)
            const supplyValue = tokenASupplyValue.plus(tokenBSupplyValue)
            const positionLeverageMinusOne = borrowValue.div(supplyValue)
            const k = tokenABorrowValue.div(borrowValue)
            const rewardApy = pool.rewardTokenApy.times(
                positionLeverageMinusOne.plus(1)
            )
            const ACMDApy = pool.borrowTokenAACMDApy.times(k)
                .plus(pool.borrowTokenBACMDApy.times(new BigNumber(1).minus(k)))
                .times(positionLeverageMinusOne)
            const borrowApy = pool.borrowTokenAApy.times(k)
                    .plus(pool.borrowTokenBApy.times(new BigNumber(1).minus(k)))
                    .times(positionLeverageMinusOne)

            const Apy = rewardApy.plus(ACMDApy).plus(borrowApy)
            const currentRewards = eX(
                new BigNumber(pool.accRewardPerShare).minus(position.sushiPerShare).times(collateralSize)
                ,-12
            )

            position.collateralValue = collateralValue
            position.borrowValue = borrowValue
            position.debtRatioTimes100 = debtRatioTimes100
            position.tokenAPositionBalance = tokenAPositionBalance
            position.tokenBPositionBalance = tokenBPositionBalance
            position.Apy = Apy
            position.currentRewards = currentRewards
            userTotalCollateralValue = userTotalCollateralValue.plus(position.collateralValue)
            userTotalDebtValue = userTotalDebtValue.plus(position.borrowValue)
            return position
        })
        console.log('userPositions= ',userPositions)
        store.commit('updateUserPositionsDetails', userPositions)
        store.commit('updateUserTotalCollateralValue', userTotalCollateralValue)
        store.commit('updateUserTotalDebtValue', userTotalDebtValue)

        // 计算净利率
        const netApy = !totalSupplyBalance.isZero()
            ? yearSupplyInterest
                .minus(yearBorrowInterest)
                .div(totalSupplyBalance)
                .toFixed(4)
            : 0

        // 计算存借款挖矿年收益
        let yearMiningInterest = new BigNumber(0)
        details.forEach((item)=>{
            yearMiningInterest = yearMiningInterest.plus(
                item.supplyBalanceInTokenUnit.times(item.underlyingPrice).times(item.supplyDistributionApy)
            ).plus(
                item.borrowBalanceInTokenUnit.times(item.underlyingPrice).times(item.borrowDistributionApy)
            )
        })

        // 计算存借款挖矿APY
        let miningApy = !totalSupplyBalance.isZero()
            ? yearMiningInterest
                .div(totalSupplyBalance)
                .toFixed(4)
            : 0

        // 计算MDEX LP挖矿年总收益
        let yearMdexLpMiningInterest = new BigNumber(0)
        details.forEach((item)=>{
            yearMdexLpMiningInterest = yearMdexLpMiningInterest.plus(
                item.supplyBalanceInTokenUnit.times(item.underlyingPrice).times(item.mlpApy)
            )
        })

        // 计算存MDEX LP挖矿总APY
        const mdexLpMiningApy = !totalSupplyBalance.isZero()
            ? yearMdexLpMiningInterest
                .div(totalSupplyBalance)
                .toFixed(4)
            : 0

        // 暂时把lp 挖矿收益合并进挖矿收益
        miningApy = Number(miningApy) + Number(mdexLpMiningApy)

        const netRate = Number(netApy) + Number(miningApy)

        console.log({
            cantrollerAddress: comptrollerAddress?.toString(),
            // maximillionAddress: maximillionAddress?.toString(),
            totalSupplyBalance: totalSupplyBalance?.toString(),
            totalBorrowBalance: totalBorrowBalance?.toString(),
            allMarketsTotalSupplyBalance: allMarketsTotalSupplyBalance?.toString(),
            allMarketsTotalBorrowBalance: allMarketsTotalBorrowBalance?.toString(),
            totalBorrowLimit: totalBorrowLimit?.toString(),
            totalBorrowLimitUsedPercent: totalBorrowBalance
                .div(totalBorrowLimit)
                .times(100)?.toString(),
            yearSupplyInterest: yearSupplyInterest?.toString(),
            yearBorrowInterest: yearBorrowInterest?.toString(),
            netApy,
            miningApy,
            netRate,
            canPrice: canPrice?.toString(),
            // totalLiquidity: totalLiquidity?.toString(),
        })

        store.commit('updateHtBalance', htBalance.toFixed(4,1))
        store.commit('updateHtBalanceBigNumber', htBalance)
        store.commit('updateComptrollerAddress', comptrollerAddress)
        // store.commit('updateMaximillionAddress', maximillionAddress)
        store.commit('updateCompAddress', Compound.util.getAddress(Compound.COMP, chainIdToName[networkChainId]))
        store.commit('updateTotalSupplyBalance', totalSupplyBalance)
        store.commit('updateTotalBorrowBalance', totalBorrowBalance)
        store.commit('updateAllMarketsTotalSupplyBalance', allMarketsTotalSupplyBalance)
        store.commit('updateAllMarketsTotalBorrowBalance', allMarketsTotalBorrowBalance)
        store.commit('updateTotalBorrowLimit', totalBorrowLimit)
        store.commit('updateTotalBorrowLimitUsedPercent',
            totalBorrowBalance
                .div(totalBorrowLimit)
                .times(100)
                ?.toString())
        store.commit('updateYearSupplyInterest', yearSupplyInterest.toFixed(2))
        store.commit('updateYearBorrowInterest', yearBorrowInterest.toFixed(2))
        store.commit('updateNetApy',netApy)
        store.commit('updateMiningApy',miningApy)
        store.commit('updateMdexLpMiningApy',mdexLpMiningApy)
        store.commit('updateNetRate',netRate)
        store.commit('updateCanPrice', canPrice)
        store.commit('updateTotalLiquidity', totalLiquidity)

        console.log('updateData_cost= ', new Date() - updateData_t0)
        if (compBalance === null || compBalance === undefined) {
            compBalance = await getBalanceOf(
                canAddress,
                18,
                account,
                networkChainId
            )
        }
        //todo

        // const compAccrued = await getCompAccrued(account, networkChainId)
        store.commit('updateCompBalance', compBalance)
        // store.commit('updateCompAccrued', compAccrued)
        await updateGasPrice(networkChainId);
        store.commit('updateIsDataCorrect',true)
    } catch (e) {
        store.commit('updateIsDataCorrect',false)
        // store.commit('updateIsUpdatingOver',true)
        // store.commit('updateIsUpdating',false)
        console.log('updateData Error: ', e)
    } finally {
        store.commit('updateIsUpdatingOver', true)
        store.commit('updateIsUpdating', false)
        console.log('========  updateData End  ========')
        if (store.state.wholeAllMarketsDetails.length !== 0) {
            let res1 = store.state.wholeAllMarketsDetails
            let res2 = store.state.allMarketsDetails
            await mergeLeftArray(res2, res1)
            store.commit("updateWholeAllMarketsDetails", res2)
        }
        //todo

        // await updateCanInfo()
        // await getCanCirculation()
        // await getAllCanSpeed()
        await getMarketsIdData()
    }
}
const mergeLeftArray = (array1 , array2)=>{
    let index
    let getCanSpeed =[]
    let getCTokenMinted = []
    for (index in array2)
    {
        getCanSpeed[index]=array2[index].canSpeed
        getCTokenMinted[index] =array2[index].cTokenMinted
    }
    let invalidDetail = false

    array1 = array1.map((detail, index) => {
        let detail_result = detail
        if (!detail_result) {
            console.log('getAllCanSpeed() !detail_result, will soon return')
            invalidDetail = true
        }

        detail_result.canSpeed = getCanSpeed[index]
        detail_result.cTokenMinted = getCTokenMinted[index]
        return detail_result
    })
    if (invalidDetail) return
    return array1
}

// 获取"CAN总额"对话框数据
const updateCanInfo = async () => {
    // await window.ethereum.request({method: 'eth_requestAccounts'})
    // const account = (await window.ethereum?.request({method: 'eth_accounts'}))[0]
    const account = (await web3.eth.getAccounts())[0]
    const compBalance = await getBalanceOf(
        canAddress,
        18,
        account,
        '128'
    )
    const compAccrued = await getCompAccrued(account, '128')
    store.commit('updateCompBalance', compBalance)
    // console.log('updateCompBalance: ', compBalance?.toString())
    store.commit('updateCompAccrued', compAccrued)
    // console.log('updateCompAccrued: ', compAccrued?.toString())
    await updateGasPrice('128');
}

// 更新canSpeed在合约中的缓存
const refreshCanSpeeds = async () => {
    // await window.ethereum.request({method: 'eth_requestAccounts'})

    Compound.eth.trx(
        comptrollerAddress,
        "refreshCanSpeeds",
        [], // [optional] parameters
        {
            network: chainIdToName['128'],
            provider: window.ethereum,
            gasLimit: '1000000',
            gasPrice: store.state.gasPrice.toString(),
            abi: compoundConstants.abi.Cantroller,
        } // [optional] call options, provider, network, ethers.js "overrides"
    ).then((tx)=>{
        store.commit('updateButtonRefreshLoading', true)
        return tx.wait(1)
    }).then((txWait1)=> {
        updateData()
        // todo 提示成功
        console.log('txWait1= ',txWait1)
        store.commit('updateButtonRefreshLoading', false)
        store.commit('updateCurrentTxHash', txWait1.transactionHash)
        store.commit('updateCheckSnackbar', true)

    }).catch((err) => {
        // todo 提示错误

        console.log(err)
        store.commit('updateButtonRefreshLoading', false)
        // todo 过滤用户取消了交易
        store.commit('updateErrorSnackbar', true)
    })
}


export default {
    chainIdToBlockTime,
    chainIdToEtherscanPreUrl,
    ethDummyAddress,
    chainIdToName,
    updateData,
    updateAllUserPositionsDetails,
    getcTokenBalanceOf,
    getUnderlyingPrice,
    getAllCanSpeed,
    refreshCanSpeeds,
    getCanPrice,
    nodeValToUrl,
    getLpPrice,
}

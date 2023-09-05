"use strict";
exports.__esModule = true;
exports.errorCodes = exports.decimals = exports.opfAssets = exports.underlyings = exports.cTokens = exports.abi = exports.address = exports.constants = void 0;
// Publicly revealed on the parent class
exports.constants = {
    'PriceFeed': 'PriceFeed',
    'Maximillion': 'Maximillion',
    'CompoundLens': 'CompoundLens',
    'GovernorAlpha': 'GovernorAlpha',
    'Comptroller': 'Comptroller',
    'Cantroller': 'Cantroller',
    'Reservoir': 'Reservoir',
    'KNC': 'KNC',
    'LINK': 'LINK',
    'BTC': 'BTC',
    'cBAT': 'cBAT',
    'cCOMP': 'cCOMP',
    'cDAI': 'cDAI',
    'cETH': 'cETH',
    'cREP': 'cREP',
    'cSAI': 'cSAI',
    'cUNI': 'cUNI',
    'cUSDC': 'cUSDC',
    'cUSDT': 'cUSDT',
    'cWBTC': 'cWBTC',
    'cZRX': 'cZRX',
    'BAT': 'BAT',
    'COMP': 'COMP',
    'DAI': 'DAI',
    'ETH': 'ETH',
    'REP': 'REP',
    'SAI': 'SAI',
    'UNI': 'UNI',
    'USDC': 'USDC',
    'USDT': 'USDT',
    'WBTC': 'WBTC',
    'ZRX': 'ZRX'
};
exports.address = {
    "heco-mainnet": {
        "PriceFeed": "0x6a544EF4fC501dDE543C39eFF79f4dBD20550392",
        // "Maximillion": "0xeF1A2905330F484714843bf29280967D52603a15",
        "CompoundLens": "0x8E0369464B8303cf6A37F66D3300C8B7bECD63cC",
        // "GovernorAlpha": "0xc0dA01a04C3f3E0be433606045bB7017A7323E38",
        "Comptroller": "0x7f2b8d5651b327d1EaB6dB064032D41184760A3A",
        // "Reservoir": "0x2775b1c75658Be0F640272CCb8c72ac986009e38",
        // "COMP": "0x3152d34484C9d2B6160A2494E89F1f6D0C9Bd927",
        "COMP": "0xD8a76e09c6284A81d622D140AD4301FD085a7CE1",
        // "cBAT": "0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E",
        // "cCOMP": "0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4",
        // "cDAI": "0x914f9bF39CAD09d1CCe22Ccb7c09ad13a3E9C2EB",
        // "cETH": "0xB63B1D4582f9b26B743e451087B348CB7942d548",
        // "cREP": "0x158079Ee67Fce2f58472A96584A73C7Ab9AC95c1",
        // "cSAI": "0xF5DCe57282A584D2746FaF1593d3121Fcac444dC",
        // "cUNI": "0x35a18000230da775cac24873d00ff85bccded550",
        // "cUSDC": "0xB8AC90eC200CE43B7d6011047BAA6A719087eb00",
        // "cUSDT": "0x28F17aEC158dc79cc4fe5A662A36dDDB17Da5048",
        // "cWBTC": "0xC11b1268C1A384e55C48c2391d8d480264A3A7F4",
        // "cZRX": "0xB3319f5D18Bc0D84dD1b4825Dcde5d5f7266d407",
        // "BAT": "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
        // "DAI": "0x60d64ef311a4f0e288120543a14e7f90e76304c6",
        // "REP": "0x1985365e9f78359a9B6AD760e32412f4a445E862",
        // "SAI": "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
        // "UNI": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        // "USDC": "0xd459dad367788893c17c09e17cfbf0bf25c62833",
        // "USDT": "0x04f535663110a392a6504839beed34e019fdb4e0"
    },
    "mainnet": {
        "PriceFeed": "0x6a544EF4fC501dDE543C39eFF79f4dBD20550392",
        // "Maximillion": "0xeF1A2905330F484714843bf29280967D52603a15",
        "CompoundLens": "0x8E0369464B8303cf6A37F66D3300C8B7bECD63cC",
        // "GovernorAlpha": "0xc0dA01a04C3f3E0be433606045bB7017A7323E38",
        "Comptroller": "0x7f2b8d5651b327d1EaB6dB064032D41184760A3A",
        // "Reservoir": "0x2775b1c75658Be0F640272CCb8c72ac986009e38",
        // "COMP": "0x3152d34484C9d2B6160A2494E89F1f6D0C9Bd927",
        "COMP": "0xD8a76e09c6284A81d622D140AD4301FD085a7CE1",
        // "cBAT": "0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E",
        // "cCOMP": "0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4",
        // "cDAI": "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
        // "cETH": "0xB63B1D4582f9b26B743e451087B348CB7942d548",
        // "cREP": "0x158079Ee67Fce2f58472A96584A73C7Ab9AC95c1",
        // "cSAI": "0xF5DCe57282A584D2746FaF1593d3121Fcac444dC",
        // "cUNI": "0x35a18000230da775cac24873d00ff85bccded550",
        // "cUSDC": "0x39AA39c021dfbaE8faC545936693aC917d5E7563",
        // "cUSDT": "0xf650C3d88D12dB855b8bf7D11Be6C55A4e07dCC9",
        // "cWBTC": "0xC11b1268C1A384e55C48c2391d8d480264A3A7F4",
        // "cZRX": "0xB3319f5D18Bc0D84dD1b4825Dcde5d5f7266d407",
        // "BAT": "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
        // "DAI": "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        // "REP": "0x1985365e9f78359a9B6AD760e32412f4a445E862",
        // "SAI": "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
        // "UNI": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        // "USDC": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        // "USDT": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        // "WBTC": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
        // "ZRX": "0xE41d2489571d322189246DaFA5ebDe1F4699F498"
    },

    "heco-test-mainnet": {
        "PriceFeed": "0x8bcBAfce86C20FA9442E7e4b0c8e995A7A7E78eA",
        // "Maximillion": "0xf859A1AD94BcF445A406B892eF0d3082f4174088",
        // "CompoundLens": "0xd513d22422a3062Bd342Ae374b4b9c20E0a9a074",
        // "GovernorAlpha": "0xc0dA01a04C3f3E0be433606045bB7017A7323E38",
        "Comptroller": "0xd8ABd4d625Efc17ca8Ba82Ad4804Df2fEBCbAbA8",
        // "Reservoir": "0x2775b1c75658Be0F640272CCb8c72ac986009e38",
        "COMP": "0xd1014345e6b5701286c090B28b69bB20d654Ffe4",
        // "cBAT": "0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E",
        // "cCOMP": "0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4",
        // "cDAI": "0x914f9bF39CAD09d1CCe22Ccb7c09ad13a3E9C2EB",
        "cETH": "0x2D34d9A6CfbA91327046e06A6877F60F666736eE",
        // "cREP": "0x158079Ee67Fce2f58472A96584A73C7Ab9AC95c1",
        // "cSAI": "0xF5DCe57282A584D2746FaF1593d3121Fcac444dC",
        // "cUNI": "0x35a18000230da775cac24873d00ff85bccded550",
        // "cUSDC": "0xB8AC90eC200CE43B7d6011047BAA6A719087eb00",
        // "cUSDT": "0x28F17aEC158dc79cc4fe5A662A36dDDB17Da5048",
        // "cWBTC": "0xC11b1268C1A384e55C48c2391d8d480264A3A7F4",
        // "cZRX": "0xB3319f5D18Bc0D84dD1b4825Dcde5d5f7266d407",
        // "BAT": "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
        // "DAI": "0x60d64ef311a4f0e288120543a14e7f90e76304c6",
        // "REP": "0x1985365e9f78359a9B6AD760e32412f4a445E862",
        // "SAI": "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
        // "UNI": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        // "USDC": "0xd459dad367788893c17c09e17cfbf0bf25c62833",
        // "USDT": "0x04f535663110a392a6504839beed34e019fdb4e0"
    },
    "heco-testnet": {
        "PriceFeed": "0x486b967E91027Dc56993ff3998B56A4AEc1822b8",
        // "Maximillion": "0xf859A1AD94BcF445A406B892eF0d3082f4174088",
        // "CompoundLens": "0xd513d22422a3062Bd342Ae374b4b9c20E0a9a074",
        // "GovernorAlpha": "0xc0dA01a04C3f3E0be433606045bB7017A7323E38",
        "Comptroller": "0xd6F1bD1AA60BD33cA0667617791C0fB85bE44A0b",
        // "Reservoir": "0x2775b1c75658Be0F640272CCb8c72ac986009e38",
        "COMP": "0xb716CBCB5a8c964a7eaA01998f7DD2959dB11619",
        // "cBAT": "0x6C8c6b02E7b2BE14d4fA6022Dfd6d75921D90E4E",
        // "cCOMP": "0x70e36f6bf80a52b3b46b3af8e106cc0ed743e8e4",
        "cDAI": "0x914f9bF39CAD09d1CCe22Ccb7c09ad13a3E9C2EB",
        "cETH": "0x2aA63304013Ca28BFC763CB00BB0D9528949635C",
        // "cREP": "0x158079Ee67Fce2f58472A96584A73C7Ab9AC95c1",
        // "cSAI": "0xF5DCe57282A584D2746FaF1593d3121Fcac444dC",
        // "cUNI": "0x35a18000230da775cac24873d00ff85bccded550",
        "cUSDC": "0xB8AC90eC200CE43B7d6011047BAA6A719087eb00",
        "cUSDT": "0x28F17aEC158dc79cc4fe5A662A36dDDB17Da5048",
        // "cWBTC": "0xC11b1268C1A384e55C48c2391d8d480264A3A7F4",
        // "cZRX": "0xB3319f5D18Bc0D84dD1b4825Dcde5d5f7266d407",
        // "BAT": "0x0D8775F648430679A709E98d2b0Cb6250d2887EF",
        "DAI": "0x60d64ef311a4f0e288120543a14e7f90e76304c6",
        // "REP": "0x1985365e9f78359a9B6AD760e32412f4a445E862",
        // "SAI": "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
        // "UNI": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        "USDC": "0xd459dad367788893c17c09e17cfbf0bf25c62833",
        "USDT": "0x04f535663110a392a6504839beed34e019fdb4e0"
    },
    "rinkeby": {
        "PriceFeed": "0x5722A3F60fa4F0EC5120DCD6C386289A4758D1b2",
        "Maximillion": "0xFBBDBa59516adA2eADf50f96cE0151edC9e0A674",
        "CompoundLens": "0x2B833E2D24ac3c246664b986554A7485fDf75D8b",
        "GovernorAlpha": "",
        "Comptroller": "0x2EAa9D77AE4D8f9cdD9FAAcd44016E746485bddb",
        "Reservoir": "",
        "COMP": "",
        "cBAT": "0xEBf1A11532b93a529b5bC942B4bAA98647913002",
        "cDAI": "0x6D7F0754FFeb405d23C51CE938289d4835bE3b14",
        "cETH": "0xd6801a1DfFCd0a410336Ef88DeF4320D6DF1883e",
        "cREP": "0xEBe09eB3411D18F4FF8D859e096C533CAC5c6B60",
        "cSAI": "",
        "cUSDC": "0x5B281A6DdA0B271e91ae35DE655Ad301C976edb1",
        "cUSDT": "0x2fB298BDbeF468638AD6653FF8376575ea41e768",
        "cWBTC": "0x0014F450B8Ae7708593F4A46F8fa6E5D50620F96",
        "cZRX": "0x52201ff1720134bBbBB2f6BC97Bf3715490EC19B",
        "BAT": "0xbF7A7169562078c96f0eC1A8aFD6aE50f12e5A99",
        "DAI": "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
        "REP": "0x6e894660985207feb7cf89Faf048998c71E8EE89",
        "SAI": "",
        "USDC": "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b",
        "USDT": "0xD9BA894E0097f8cC2BBc9D24D308b98e36dc6D02",
        "WBTC": "0x577D296678535e4903D59A4C929B718e1D575e0A",
        "ZRX": "0xddea378A6dDC8AfeC82C36E9b0078826bf9e68B6"
    },
    "goerli": {
        "PriceFeed": "0xd0c84453b3945cd7e84BF7fc53BfFd6718913B71",
        "Maximillion": "0x73d3F01b8aC5063f4601C7C45DA5Fdf1b5240C92",
        "CompoundLens": "0xE6F46170535FAE86BDbF0Cb033595e060cD99333",
        "GovernorAlpha": "",
        "Comptroller": "0x627EA49279FD0dE89186A58b8758aD02B6Be2867",
        "Reservoir": "",
        "COMP": "0xe16C7165C8FeA64069802aE4c4c9C320783f2b6e",
        "cBAT": "0xCCaF265E7492c0d9b7C2f0018bf6382Ba7f0148D",
        "cDAI": "0x822397d9a55d0fefd20F5c4bCaB33C5F65bd28Eb",
        "cETH": "0x20572e4c090f15667cF7378e16FaD2eA0e2f3EfF",
        "cREP": "0x1d70B01A2C3e3B2e56FcdcEfe50d5c5d70109a5D",
        "cSAI": "0x5D4373F8C1AF21C391aD7eC755762D8dD3CCA809",
        "cUSDC": "0xCEC4a43eBB02f9B80916F1c718338169d6d5C1F0",
        "cUSDT": "",
        "cWBTC": "0x6CE27497A64fFFb5517AA4aeE908b1E7EB63B9fF",
        "cZRX": "0xA253295eC2157B8b69C44b2cb35360016DAa25b1",
        "BAT": "0x70cBa46d2e933030E2f274AE58c951C800548AeF",
        "DAI": "0xdc31Ee1784292379Fbb2964b3B9C4124D8F89C60",
        "REP": "0x183Faf58c4461972765f3F90c6272A4ecE66Bd96",
        "SAI": "0x8e9192D6f9d903b1BEb3836F52a9f71E05846e42",
        "USDC": "0xD87Ba7A50B2E7E660f678A895E4B72E7CB4CCd9C",
        "USDT": "",
        "WBTC": "0xC04B0d3107736C32e19F1c62b2aF67BE61d63a05",
        "ZRX": "0xe4E81Fa6B16327D4B78CFEB83AAdE04bA7075165"
    },
    "kovan": {
        "PriceFeed": "0xbBdE93962Ca9fe39537eeA7380550ca6845F8db7",
        "Maximillion": "0xC363f83902Ac614F318b04771d21D25aC0d73be5",
        "CompoundLens": "0x08CcdB87966C4C7c3Ce7dA8C103c8E14627753D0",
        "GovernorAlpha": "0x665a5f09716d63D9256934855b0CE2056a5C4Cf8",
        "Comptroller": "0x5eAe89DC1C671724A672ff0630122ee834098657",
        "Reservoir": "0x33deD5C4eA51dBC7AF955396839655EFe13E3F1b",
        "COMP": "0x61460874a7196d6a22D1eE4922473664b3E95270",
        "cBAT": "0x4a77fAeE9650b09849Ff459eA1476eaB01606C7a",
        "cDAI": "0xF0d0EB522cfa50B716B3b1604C4F0fA6f04376AD",
        "cETH": "0x41B5844f4680a8C38fBb695b7F9CFd1F64474a72",
        "cREP": "0xA4eC170599a1Cf87240a35b9B1B8Ff823f448b57",
        "cSAI": "0xb3f7fB482492f4220833De6D6bfCC81157214bEC",
        "cUSDC": "0x4a92E71227D294F041BD82dd8f78591B75140d63",
        "cUSDT": "0x3f0A0EA2f86baE6362CF9799B523BA06647Da018",
        "cWBTC": "0xa1fAA15655B0e7b6B6470ED3d096390e6aD93Abb",
        "cZRX": "0xAf45ae737514C8427D373D50Cd979a242eC59e5a",
        "BAT": "0x482dC9bB08111CB875109B075A40881E48aE02Cd",
        "DAI": "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa",
        "REP": "0x50DD65531676F718B018De3dc48F92B53D756996",
        "SAI": "0xD1308F63823221518Ec88EB209CBaa1ac182105f",
        "USDC": "0xb7a4F3E9097C08dA09517b5aB877F7a917224ede",
        "USDT": "0x07de306FF27a2B630B1141956844eB1552B956B5",
        "WBTC": "0xd3A691C852CDB01E281545A27064741F0B7f6825",
        "ZRX": "0x162c44e53097e7B5aaE939b297ffFD6Bf90D1EE3"
    },
    "ropsten": {
        "PriceFeed": "0xBEf4E076A995c784be6094a432b9CA99b7431A3f",
        "Maximillion": "0xE0a38ab2951B6525C33f20D5E637Ab24DFEF9bcB",
        "CompoundLens": "0xB272C5C22850CcEB72C6D45DFBDbDE0D9433b036",
        "GovernorAlpha": "0x93ACbA9ecaCeC21BFA09b0C4650Be3596713d747",
        "Comptroller": "0x54188bBeDD7b68228fa89CbDDa5e3e930459C6c6",
        "Reservoir": "0x4Aebe384D31e9309BEDf8552232C07591e0cA56F",
        "COMP": "0x1fe16de955718cfab7a44605458ab023838c2793",
        "cBAT": "0x9E95c0b2412cE50C37a121622308e7a6177F819D",
        "cDAI": "0xdb5Ed4605C11822811a39F94314fDb8F0fb59A2C",
        "cETH": "0xBe839b6D93E3eA47eFFcCA1F27841C917a8794f3",
        "cREP": "0x8F2c8B147A3D316d2b98f32F3864746F034A55a2",
        "cSAI": "0xc4d2A5872E16BC9E6557bE8B24683D96EB6ADca9",
        "cUNI": "0x22531f0f3a9c36bfc3b04c4c60df5168a1cfcec3",
        "cUSDC": "0x8aF93cae804cC220D1A608d4FA54D1b6ca5EB361",
        "cUSDT": "0x135669c2dcBd63F639582b313883F101a4497F76",
        "cWBTC": "0x58145Bc5407D63dAF226e4870beeb744C588f149",
        "cZRX": "0x00e02a5200CE3D5b5743F5369Deb897946C88121",
        "BAT": "0x443Fd8D5766169416aE42B8E050fE9422f628419",
        "DAI": "0xc2118d4d90b274016cB7a54c03EF52E6c537D957",
        "REP": "0x6FD34013CDD2905d8d27b0aDaD5b97B2345cF2B8",
        "SAI": "0x26fF7457496600C63b3E8902C9f871E60eDec4e4",
        "UNI": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
        "USDC": "0x0D9C8723B343A8368BebE0B5E89273fF8D712e3C",
        "USDT": "0x516de3a7A567d81737e3a46ec4FF9cFD1fcb0136",
        "WBTC": "0xBde8bB00A7eF67007A96945B3a3621177B615C44",
        "ZRX": "0xE4C6182EA459E63B8F1be7c428381994CcC2D49c"
    }
};
exports.abi = {
    Erc20: [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" }], "name": "Approval", "type": "event" }],
    cErc20: [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x06fdde03" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x095ea7b3" }, { "constant": false, "inputs": [{ "name": "repayAmount", "type": "uint256" }], "name": "repayBorrow", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x0e752702" }, { "constant": true, "inputs": [], "name": "reserveFactorMantissa", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x173b9904" }, { "constant": false, "inputs": [{ "name": "account", "type": "address" }], "name": "borrowBalanceCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x17bfdfbc" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x18160ddd" }, { "constant": true, "inputs": [], "name": "exchangeRateStored", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x182df0f5" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x23b872dd" }, { "constant": false, "inputs": [{ "name": "borrower", "type": "address" }, { "name": "repayAmount", "type": "uint256" }], "name": "repayBorrowBehalf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x2608f818" }, { "constant": true, "inputs": [], "name": "pendingAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x26782247" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x313ce567" }, { "constant": false, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOfUnderlying", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x3af9e669" }, { "constant": true, "inputs": [], "name": "getCash", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x3b1d21a2" }, { "constant": false, "inputs": [{ "name": "newComptroller", "type": "address" }], "name": "_setComptroller", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x4576b5db" }, { "constant": true, "inputs": [], "name": "totalBorrows", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x47bd3718" }, { "constant": true, "inputs": [], "name": "comptroller", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x5fe3b567" }, { "constant": false, "inputs": [{ "name": "reduceAmount", "type": "uint256" }], "name": "_reduceReserves", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x601a0bf1" }, { "constant": true, "inputs": [], "name": "initialExchangeRateMantissa", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x675d972c" }, { "constant": true, "inputs": [], "name": "accrualBlockNumber", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x6c540baf" }, { "constant": true, "inputs": [], "name": "underlying", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x6f307dc3" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x70a08231" }, { "constant": false, "inputs": [], "name": "totalBorrowsCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x73acee98" }, { "constant": false, "inputs": [{ "name": "redeemAmount", "type": "uint256" }], "name": "redeemUnderlying", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x852a12e3" }, { "constant": true, "inputs": [], "name": "totalReserves", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x8f840ddd" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x95d89b41" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "borrowBalanceStored", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x95dd9193" }, { "constant": false, "inputs": [{ "name": "mintAmount", "type": "uint256" }], "name": "mint", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xa0712d68" }, { "constant": false, "inputs": [], "name": "accrueInterest", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xa6afed95" }, { "constant": false, "inputs": [{ "name": "dst", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xa9059cbb" }, { "constant": true, "inputs": [], "name": "borrowIndex", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xaa5af0fd" }, { "constant": true, "inputs": [], "name": "supplyRatePerBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xae9d70b0" }, { "constant": false, "inputs": [{ "name": "liquidator", "type": "address" }, { "name": "borrower", "type": "address" }, { "name": "seizeTokens", "type": "uint256" }], "name": "seize", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xb2a02ff1" }, { "constant": false, "inputs": [{ "name": "newPendingAdmin", "type": "address" }], "name": "_setPendingAdmin", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xb71d1a0c" }, { "constant": false, "inputs": [], "name": "exchangeRateCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xbd6d894d" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "getAccountSnapshot", "outputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xc37f68e2" }, { "constant": false, "inputs": [{ "name": "borrowAmount", "type": "uint256" }], "name": "borrow", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xc5ebeaec" }, { "constant": false, "inputs": [{ "name": "redeemTokens", "type": "uint256" }], "name": "redeem", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xdb006a75" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xdd62ed3e" }, { "constant": false, "inputs": [], "name": "_acceptAdmin", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xe9c714f2" }, { "constant": false, "inputs": [{ "name": "newInterestRateModel", "type": "address" }], "name": "_setInterestRateModel", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xf2b3abbd" }, { "constant": true, "inputs": [], "name": "interestRateModel", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf3fdb15a" }, { "constant": false, "inputs": [{ "name": "borrower", "type": "address" }, { "name": "repayAmount", "type": "uint256" }, { "name": "cTokenCollateral", "type": "address" }], "name": "liquidateBorrow", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xf5e3c462" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf851a440" }, { "constant": true, "inputs": [], "name": "borrowRatePerBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf8f9da28" }, { "constant": false, "inputs": [{ "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "_setReserveFactor", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xfca7820b" }, { "constant": true, "inputs": [], "name": "isCToken", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xfe9c44ae" }, { "inputs": [{ "name": "underlying_", "type": "address" }, { "name": "comptroller_", "type": "address" }, { "name": "interestRateModel_", "type": "address" }, { "name": "initialExchangeRateMantissa_", "type": "uint256" }, { "name": "name_", "type": "string" }, { "name": "symbol_", "type": "string" }, { "name": "decimals_", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "interestAccumulated", "type": "uint256" }, { "indexed": false, "name": "borrowIndex", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "AccrueInterest", "type": "event", "signature": "0x875352fb3fadeb8c0be7cbbe8ff761b308fa7033470cd0287f02f3436fd76cb9" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "minter", "type": "address" }, { "indexed": false, "name": "mintAmount", "type": "uint256" }, { "indexed": false, "name": "mintTokens", "type": "uint256" }], "name": "Mint", "type": "event", "signature": "0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "redeemer", "type": "address" }, { "indexed": false, "name": "redeemAmount", "type": "uint256" }, { "indexed": false, "name": "redeemTokens", "type": "uint256" }], "name": "Redeem", "type": "event", "signature": "0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "borrowAmount", "type": "uint256" }, { "indexed": false, "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "Borrow", "type": "event", "signature": "0x13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "payer", "type": "address" }, { "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "repayAmount", "type": "uint256" }, { "indexed": false, "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "RepayBorrow", "type": "event", "signature": "0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "liquidator", "type": "address" }, { "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "repayAmount", "type": "uint256" }, { "indexed": false, "name": "cTokenCollateral", "type": "address" }, { "indexed": false, "name": "seizeTokens", "type": "uint256" }], "name": "LiquidateBorrow", "type": "event", "signature": "0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldPendingAdmin", "type": "address" }, { "indexed": false, "name": "newPendingAdmin", "type": "address" }], "name": "NewPendingAdmin", "type": "event", "signature": "0xca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldAdmin", "type": "address" }, { "indexed": false, "name": "newAdmin", "type": "address" }], "name": "NewAdmin", "type": "event", "signature": "0xf9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldComptroller", "type": "address" }, { "indexed": false, "name": "newComptroller", "type": "address" }], "name": "NewComptroller", "type": "event", "signature": "0x7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldInterestRateModel", "type": "address" }, { "indexed": false, "name": "newInterestRateModel", "type": "address" }], "name": "NewMarketInterestRateModel", "type": "event", "signature": "0xedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f926" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldReserveFactorMantissa", "type": "uint256" }, { "indexed": false, "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "NewReserveFactor", "type": "event", "signature": "0xaaa68312e2ea9d50e16af5068410ab56e1a1fd06037b1a35664812c30f821460" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "admin", "type": "address" }, { "indexed": false, "name": "reduceAmount", "type": "uint256" }, { "indexed": false, "name": "newTotalReserves", "type": "uint256" }], "name": "ReservesReduced", "type": "event", "signature": "0x3bad0c59cf2f06e7314077049f48a93578cd16f5ef92329f1dab1420a99c177e" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "error", "type": "uint256" }, { "indexed": false, "name": "info", "type": "uint256" }, { "indexed": false, "name": "detail", "type": "uint256" }], "name": "Failure", "type": "event", "signature": "0x45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Transfer", "type": "event", "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Approval", "type": "event", "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925" }],
    cEther: [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x06fdde03" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x095ea7b3" }, { "constant": false, "inputs": [], "name": "mint", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function", "signature": "0x1249c58b" }, { "constant": true, "inputs": [], "name": "reserveFactorMantissa", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x173b9904" }, { "constant": false, "inputs": [{ "name": "account", "type": "address" }], "name": "borrowBalanceCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x17bfdfbc" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x18160ddd" }, { "constant": true, "inputs": [], "name": "exchangeRateStored", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x182df0f5" }, { "constant": false, "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x23b872dd" }, { "constant": true, "inputs": [], "name": "pendingAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x26782247" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x313ce567" }, { "constant": false, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOfUnderlying", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x3af9e669" }, { "constant": true, "inputs": [], "name": "getCash", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x3b1d21a2" }, { "constant": false, "inputs": [{ "name": "newComptroller", "type": "address" }], "name": "_setComptroller", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x4576b5db" }, { "constant": true, "inputs": [], "name": "totalBorrows", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x47bd3718" }, { "constant": false, "inputs": [], "name": "repayBorrow", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function", "signature": "0x4e4d9fea" }, { "constant": true, "inputs": [], "name": "comptroller", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x5fe3b567" }, { "constant": false, "inputs": [{ "name": "reduceAmount", "type": "uint256" }], "name": "_reduceReserves", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x601a0bf1" }, { "constant": true, "inputs": [], "name": "initialExchangeRateMantissa", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x675d972c" }, { "constant": true, "inputs": [], "name": "accrualBlockNumber", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x6c540baf" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x70a08231" }, { "constant": false, "inputs": [], "name": "totalBorrowsCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x73acee98" }, { "constant": false, "inputs": [{ "name": "redeemAmount", "type": "uint256" }], "name": "redeemUnderlying", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x852a12e3" }, { "constant": true, "inputs": [], "name": "totalReserves", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x8f840ddd" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x95d89b41" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "borrowBalanceStored", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x95dd9193" }, { "constant": false, "inputs": [], "name": "accrueInterest", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xa6afed95" }, { "constant": false, "inputs": [{ "name": "dst", "type": "address" }, { "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xa9059cbb" }, { "constant": true, "inputs": [], "name": "borrowIndex", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xaa5af0fd" }, { "constant": false, "inputs": [{ "name": "borrower", "type": "address" }, { "name": "cTokenCollateral", "type": "address" }], "name": "liquidateBorrow", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function", "signature": "0xaae40a2a" }, { "constant": true, "inputs": [], "name": "supplyRatePerBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xae9d70b0" }, { "constant": false, "inputs": [{ "name": "liquidator", "type": "address" }, { "name": "borrower", "type": "address" }, { "name": "seizeTokens", "type": "uint256" }], "name": "seize", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xb2a02ff1" }, { "constant": false, "inputs": [{ "name": "newPendingAdmin", "type": "address" }], "name": "_setPendingAdmin", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xb71d1a0c" }, { "constant": false, "inputs": [], "name": "exchangeRateCurrent", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xbd6d894d" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "getAccountSnapshot", "outputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xc37f68e2" }, { "constant": false, "inputs": [{ "name": "borrowAmount", "type": "uint256" }], "name": "borrow", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xc5ebeaec" }, { "constant": false, "inputs": [{ "name": "redeemTokens", "type": "uint256" }], "name": "redeem", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xdb006a75" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xdd62ed3e" }, { "constant": false, "inputs": [{ "name": "borrower", "type": "address" }], "name": "repayBorrowBehalf", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function", "signature": "0xe5974619" }, { "constant": false, "inputs": [], "name": "_acceptAdmin", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xe9c714f2" }, { "constant": false, "inputs": [{ "name": "newInterestRateModel", "type": "address" }], "name": "_setInterestRateModel", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xf2b3abbd" }, { "constant": true, "inputs": [], "name": "interestRateModel", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf3fdb15a" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf851a440" }, { "constant": true, "inputs": [], "name": "borrowRatePerBlock", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf8f9da28" }, { "constant": false, "inputs": [{ "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "_setReserveFactor", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xfca7820b" }, { "constant": true, "inputs": [], "name": "isCToken", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xfe9c44ae" }, { "inputs": [{ "name": "comptroller_", "type": "address" }, { "name": "interestRateModel_", "type": "address" }, { "name": "initialExchangeRateMantissa_", "type": "uint256" }, { "name": "name_", "type": "string" }, { "name": "symbol_", "type": "string" }, { "name": "decimals_", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "interestAccumulated", "type": "uint256" }, { "indexed": false, "name": "borrowIndex", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "AccrueInterest", "type": "event", "signature": "0x875352fb3fadeb8c0be7cbbe8ff761b308fa7033470cd0287f02f3436fd76cb9" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "minter", "type": "address" }, { "indexed": false, "name": "mintAmount", "type": "uint256" }, { "indexed": false, "name": "mintTokens", "type": "uint256" }], "name": "Mint", "type": "event", "signature": "0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "redeemer", "type": "address" }, { "indexed": false, "name": "redeemAmount", "type": "uint256" }, { "indexed": false, "name": "redeemTokens", "type": "uint256" }], "name": "Redeem", "type": "event", "signature": "0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "borrowAmount", "type": "uint256" }, { "indexed": false, "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "Borrow", "type": "event", "signature": "0x13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "payer", "type": "address" }, { "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "repayAmount", "type": "uint256" }, { "indexed": false, "name": "accountBorrows", "type": "uint256" }, { "indexed": false, "name": "totalBorrows", "type": "uint256" }], "name": "RepayBorrow", "type": "event", "signature": "0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "liquidator", "type": "address" }, { "indexed": false, "name": "borrower", "type": "address" }, { "indexed": false, "name": "repayAmount", "type": "uint256" }, { "indexed": false, "name": "cTokenCollateral", "type": "address" }, { "indexed": false, "name": "seizeTokens", "type": "uint256" }], "name": "LiquidateBorrow", "type": "event", "signature": "0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldPendingAdmin", "type": "address" }, { "indexed": false, "name": "newPendingAdmin", "type": "address" }], "name": "NewPendingAdmin", "type": "event", "signature": "0xca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldAdmin", "type": "address" }, { "indexed": false, "name": "newAdmin", "type": "address" }], "name": "NewAdmin", "type": "event", "signature": "0xf9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldComptroller", "type": "address" }, { "indexed": false, "name": "newComptroller", "type": "address" }], "name": "NewComptroller", "type": "event", "signature": "0x7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldInterestRateModel", "type": "address" }, { "indexed": false, "name": "newInterestRateModel", "type": "address" }], "name": "NewMarketInterestRateModel", "type": "event", "signature": "0xedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f926" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldReserveFactorMantissa", "type": "uint256" }, { "indexed": false, "name": "newReserveFactorMantissa", "type": "uint256" }], "name": "NewReserveFactor", "type": "event", "signature": "0xaaa68312e2ea9d50e16af5068410ab56e1a1fd06037b1a35664812c30f821460" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "admin", "type": "address" }, { "indexed": false, "name": "reduceAmount", "type": "uint256" }, { "indexed": false, "name": "newTotalReserves", "type": "uint256" }], "name": "ReservesReduced", "type": "event", "signature": "0x3bad0c59cf2f06e7314077049f48a93578cd16f5ef92329f1dab1420a99c177e" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "error", "type": "uint256" }, { "indexed": false, "name": "info", "type": "uint256" }, { "indexed": false, "name": "detail", "type": "uint256" }], "name": "Failure", "type": "event", "signature": "0x45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Transfer", "type": "event", "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "amount", "type": "uint256" }], "name": "Approval", "type": "event", "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925" }],
    COMP: [{ "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Approval", "type": "event", "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "delegator", "type": "address" }, { "indexed": true, "internalType": "address", "name": "fromDelegate", "type": "address" }, { "indexed": true, "internalType": "address", "name": "toDelegate", "type": "address" }], "name": "DelegateChanged", "type": "event", "signature": "0x3134e8a2e6d97e929a7e54011ea5485d7d196dd5f0ba4d4ef95803e8e3fc257f" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "delegate", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "previousBalance", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newBalance", "type": "uint256" }], "name": "DelegateVotesChanged", "type": "event", "signature": "0xdec2bacdd2f05b59de34da9b523dff8be42e5e38e818c82fdb0bae774387a724" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Transfer", "type": "event", "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" }, { "constant": true, "inputs": [], "name": "DELEGATION_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xe7a324dc" }, { "constant": true, "inputs": [], "name": "DOMAIN_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x20606b70" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xdd62ed3e" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "rawAmount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x095ea7b3" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x70a08231" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint32", "name": "", "type": "uint32" }], "name": "checkpoints", "outputs": [{ "internalType": "uint32", "name": "fromBlock", "type": "uint32" }, { "internalType": "uint96", "name": "votes", "type": "uint96" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf1127ed8" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x313ce567" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }], "name": "delegate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x5c19a95c" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "delegatee", "type": "address" }, { "internalType": "uint256", "name": "nonce", "type": "uint256" }, { "internalType": "uint256", "name": "expiry", "type": "uint256" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "delegateBySig", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xc3cda520" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "delegates", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x587cde1e" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getCurrentVotes", "outputs": [{ "internalType": "uint96", "name": "", "type": "uint96" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xb4b5ea57" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint256", "name": "blockNumber", "type": "uint256" }], "name": "getPriorVotes", "outputs": [{ "internalType": "uint96", "name": "", "type": "uint96" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x782d6fe1" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x06fdde03" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "nonces", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x7ecebe00" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "numCheckpoints", "outputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x6fcfff45" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x95d89b41" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x18160ddd" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "rawAmount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xa9059cbb" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "rawAmount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x23b872dd" }],
    GovernorAlpha: [{ "inputs": [{ "internalType": "address", "name": "timelock_", "type": "address" }, { "internalType": "address", "name": "comp_", "type": "address" }, { "internalType": "address", "name": "guardian_", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "ProposalCanceled", "type": "event", "signature": "0x789cf55be980739dad1d0699b93b58e806b51c9d96619bfa8fe0a28abaa7b30c" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "proposer", "type": "address" }, { "indexed": false, "internalType": "address[]", "name": "targets", "type": "address[]" }, { "indexed": false, "internalType": "uint256[]", "name": "values", "type": "uint256[]" }, { "indexed": false, "internalType": "string[]", "name": "signatures", "type": "string[]" }, { "indexed": false, "internalType": "bytes[]", "name": "calldatas", "type": "bytes[]" }, { "indexed": false, "internalType": "uint256", "name": "startBlock", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "endBlock", "type": "uint256" }, { "indexed": false, "internalType": "string", "name": "description", "type": "string" }], "name": "ProposalCreated", "type": "event", "signature": "0x7d84a6263ae0d98d3329bd7b46bb4e8d6f98cd35a7adb45c274c8b7fd5ebd5e0" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }], "name": "ProposalExecuted", "type": "event", "signature": "0x712ae1383f79ac853f8d882153778e0260ef8f03b504e2866e0593e04d2b291f" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "eta", "type": "uint256" }], "name": "ProposalQueued", "type": "event", "signature": "0x9a2e42fd6722813d69113e7d0079d3d940171428df7373df9c7f7617cfda2892" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "voter", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "proposalId", "type": "uint256" }, { "indexed": false, "internalType": "bool", "name": "support", "type": "bool" }, { "indexed": false, "internalType": "uint256", "name": "votes", "type": "uint256" }], "name": "VoteCast", "type": "event", "signature": "0x877856338e13f63d0c36822ff0ef736b80934cd90574a3a5bc9262c39d217c46" }, { "constant": true, "inputs": [], "name": "BALLOT_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xdeaaa7cc" }, { "constant": true, "inputs": [], "name": "DOMAIN_TYPEHASH", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x20606b70" }, { "constant": false, "inputs": [], "name": "__abdicate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x760fbc13" }, { "constant": false, "inputs": [], "name": "__acceptAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xb9a61961" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "newPendingAdmin", "type": "address" }, { "internalType": "uint256", "name": "eta", "type": "uint256" }], "name": "__executeSetTimelockPendingAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x21f43e42" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "newPendingAdmin", "type": "address" }, { "internalType": "uint256", "name": "eta", "type": "uint256" }], "name": "__queueSetTimelockPendingAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x91500671" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "proposalId", "type": "uint256" }], "name": "cancel", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x40e58ee5" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "proposalId", "type": "uint256" }, { "internalType": "bool", "name": "support", "type": "bool" }], "name": "castVote", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x15373e3d" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "proposalId", "type": "uint256" }, { "internalType": "bool", "name": "support", "type": "bool" }, { "internalType": "uint8", "name": "v", "type": "uint8" }, { "internalType": "bytes32", "name": "r", "type": "bytes32" }, { "internalType": "bytes32", "name": "s", "type": "bytes32" }], "name": "castVoteBySig", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x4634c61f" }, { "constant": true, "inputs": [], "name": "comp", "outputs": [{ "internalType": "contract CompInterface", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x109d0af8" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "proposalId", "type": "uint256" }], "name": "execute", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function", "signature": "0xfe0d94c1" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "proposalId", "type": "uint256" }], "name": "getActions", "outputs": [{ "internalType": "address[]", "name": "targets", "type": "address[]" }, { "internalType": "uint256[]", "name": "values", "type": "uint256[]" }, { "internalType": "string[]", "name": "signatures", "type": "string[]" }, { "internalType": "bytes[]", "name": "calldatas", "type": "bytes[]" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x328dd982" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "proposalId", "type": "uint256" }, { "internalType": "address", "name": "voter", "type": "address" }], "name": "getReceipt", "outputs": [{ "components": [{ "internalType": "bool", "name": "hasVoted", "type": "bool" }, { "internalType": "bool", "name": "support", "type": "bool" }, { "internalType": "uint96", "name": "votes", "type": "uint96" }], "internalType": "struct GovernorAlpha.Receipt", "name": "", "type": "tuple" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xe23a9a52" }, { "constant": true, "inputs": [], "name": "guardian", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x452a9320" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "latestProposalIds", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x17977c61" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x06fdde03" }, { "constant": true, "inputs": [], "name": "proposalCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xda35c664" }, { "constant": true, "inputs": [], "name": "proposalMaxOperations", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "pure", "type": "function", "signature": "0x7bdbe4d0" }, { "constant": true, "inputs": [], "name": "proposalThreshold", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "pure", "type": "function", "signature": "0xb58131b0" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "proposals", "outputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "proposer", "type": "address" }, { "internalType": "uint256", "name": "eta", "type": "uint256" }, { "internalType": "uint256", "name": "startBlock", "type": "uint256" }, { "internalType": "uint256", "name": "endBlock", "type": "uint256" }, { "internalType": "uint256", "name": "forVotes", "type": "uint256" }, { "internalType": "uint256", "name": "againstVotes", "type": "uint256" }, { "internalType": "bool", "name": "canceled", "type": "bool" }, { "internalType": "bool", "name": "executed", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x013cf08b" }, { "constant": false, "inputs": [{ "internalType": "address[]", "name": "targets", "type": "address[]" }, { "internalType": "uint256[]", "name": "values", "type": "uint256[]" }, { "internalType": "string[]", "name": "signatures", "type": "string[]" }, { "internalType": "bytes[]", "name": "calldatas", "type": "bytes[]" }, { "internalType": "string", "name": "description", "type": "string" }], "name": "propose", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xda95691a" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "proposalId", "type": "uint256" }], "name": "queue", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xddf0b009" }, { "constant": true, "inputs": [], "name": "quorumVotes", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "pure", "type": "function", "signature": "0x24bc1a64" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "proposalId", "type": "uint256" }], "name": "state", "outputs": [{ "internalType": "enum GovernorAlpha.ProposalState", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x3e4f49e6" }, { "constant": true, "inputs": [], "name": "timelock", "outputs": [{ "internalType": "contract TimelockInterface", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xd33219b4" }, { "constant": true, "inputs": [], "name": "votingDelay", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "pure", "type": "function", "signature": "0x3932abb1" }, { "constant": true, "inputs": [], "name": "votingPeriod", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "pure", "type": "function", "signature": "0x02a251a3" }],
    Comptroller: [{ "constant": true, "inputs": [], "name": "pendingAdmin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x26782247" }, { "constant": false, "inputs": [{ "name": "newPendingAdmin", "type": "address" }], "name": "_setPendingAdmin", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xb71d1a0c" }, { "constant": true, "inputs": [], "name": "comptrollerImplementation", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xbb82aa5e" }, { "constant": false, "inputs": [], "name": "_acceptImplementation", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xc1e80334" }, { "constant": true, "inputs": [], "name": "pendingComptrollerImplementation", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xdcfbc0c7" }, { "constant": false, "inputs": [{ "name": "newPendingImplementation", "type": "address" }], "name": "_setPendingImplementation", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xe992a041" }, { "constant": false, "inputs": [], "name": "_acceptAdmin", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xe9c714f2" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf851a440" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldPendingImplementation", "type": "address" }, { "indexed": false, "name": "newPendingImplementation", "type": "address" }], "name": "NewPendingImplementation", "type": "event", "signature": "0xe945ccee5d701fc83f9b8aa8ca94ea4219ec1fcbd4f4cab4f0ea57c5c3e1d815" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldImplementation", "type": "address" }, { "indexed": false, "name": "newImplementation", "type": "address" }], "name": "NewImplementation", "type": "event", "signature": "0xd604de94d45953f9138079ec1b82d533cb2160c906d1076d1f7ed54befbca97a" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldPendingAdmin", "type": "address" }, { "indexed": false, "name": "newPendingAdmin", "type": "address" }], "name": "NewPendingAdmin", "type": "event", "signature": "0xca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "oldAdmin", "type": "address" }, { "indexed": false, "name": "newAdmin", "type": "address" }], "name": "NewAdmin", "type": "event", "signature": "0xf9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "error", "type": "uint256" }, { "indexed": false, "name": "info", "type": "uint256" }, { "indexed": false, "name": "detail", "type": "uint256" }], "name": "Failure", "type": "event", "signature": "0x45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "string", "name": "action", "type": "string" }, { "indexed": false, "internalType": "bool", "name": "pauseState", "type": "bool" }], "name": "ActionPaused", "type": "event", "signature": "0xef159d9a32b2472e32b098f954f3ce62d232939f1c207070b584df1814de2de0" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract CToken", "name": "cToken", "type": "address" }, { "indexed": false, "internalType": "string", "name": "action", "type": "string" }, { "indexed": false, "internalType": "bool", "name": "pauseState", "type": "bool" }], "name": "ActionPaused", "type": "event", "signature": "0x71aec636243f9709bb0007ae15e9afb8150ab01716d75fd7573be5cc096e03b0" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contract CToken", "name": "cToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "newSpeed", "type": "uint256" }], "name": "CompSpeedUpdated", "type": "event", "signature": "0x2ab93f65628379309f36cb125e90d7c902454a545c4f8b8cb0794af75c24b807" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contract CToken", "name": "cToken", "type": "address" }, { "indexed": true, "internalType": "address", "name": "borrower", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "compDelta", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "compBorrowIndex", "type": "uint256" }], "name": "DistributedBorrowerComp", "type": "event", "signature": "0x1fc3ecc087d8d2d15e23d0032af5a47059c3892d003d8e139fdcb6bb327c99a6" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contract CToken", "name": "cToken", "type": "address" }, { "indexed": true, "internalType": "address", "name": "supplier", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "compDelta", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "compSupplyIndex", "type": "uint256" }], "name": "DistributedSupplierComp", "type": "event", "signature": "0x2caecd17d02f56fa897705dcc740da2d237c373f70686f4e0d9bd3bf0400ea7a" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "error", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "info", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "detail", "type": "uint256" }], "name": "Failure", "type": "event", "signature": "0x45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract CToken", "name": "cToken", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "isComped", "type": "bool" }], "name": "MarketComped", "type": "event", "signature": "0x93c1f3e36ed71139f466a4ce8c9751790e2e33f5afb2df0dcfb3aeabe55d5aa2" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract CToken", "name": "cToken", "type": "address" }, { "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "MarketEntered", "type": "event", "signature": "0x3ab23ab0d51cccc0c3085aec51f99228625aa1a922b3a8ca89a26b0f2027a1a5" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract CToken", "name": "cToken", "type": "address" }, { "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "MarketExited", "type": "event", "signature": "0xe699a64c18b07ac5b7301aa273f36a2287239eb9501d81950672794afba29a0d" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract CToken", "name": "cToken", "type": "address" }], "name": "MarketListed", "type": "event", "signature": "0xcf583bb0c569eb967f806b11601c4cb93c10310485c67add5f8362c2f212321f" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "contract CToken", "name": "cToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "newBorrowCap", "type": "uint256" }], "name": "NewBorrowCap", "type": "event", "signature": "0x6f1951b2aad10f3fc81b86d91105b413a5b3f847a34bbc5ce1904201b14438f6" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "oldBorrowCapGuardian", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newBorrowCapGuardian", "type": "address" }], "name": "NewBorrowCapGuardian", "type": "event", "signature": "0xeda98690e518e9a05f8ec6837663e188211b2da8f4906648b323f2c1d4434e29" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "oldCloseFactorMantissa", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newCloseFactorMantissa", "type": "uint256" }], "name": "NewCloseFactor", "type": "event", "signature": "0x3b9670cf975d26958e754b57098eaa2ac914d8d2a31b83257997b9f346110fd9" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract CToken", "name": "cToken", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "oldCollateralFactorMantissa", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newCollateralFactorMantissa", "type": "uint256" }], "name": "NewCollateralFactor", "type": "event", "signature": "0x70483e6592cd5182d45ac970e05bc62cdcc90e9d8ef2c2dbe686cf383bcd7fc5" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "oldCompRate", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newCompRate", "type": "uint256" }], "name": "NewCompRate", "type": "event", "signature": "0xc227c9272633c3a307d9845bf2bc2509cefb20d655b5f3c1002d8e1e3f22c8b0" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "oldLiquidationIncentiveMantissa", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newLiquidationIncentiveMantissa", "type": "uint256" }], "name": "NewLiquidationIncentive", "type": "event", "signature": "0xaeba5a6c40a8ac138134bff1aaa65debf25971188a58804bad717f82f0ec1316" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "oldMaxAssets", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "newMaxAssets", "type": "uint256" }], "name": "NewMaxAssets", "type": "event", "signature": "0x7093cf1eb653f749c3ff531d6df7f92764536a7fa0d13530cd26e070780c32ea" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "oldPauseGuardian", "type": "address" }, { "indexed": false, "internalType": "address", "name": "newPauseGuardian", "type": "address" }], "name": "NewPauseGuardian", "type": "event", "signature": "0x0613b6ee6a04f0d09f390e4d9318894b9f6ac7fd83897cd8d18896ba579c401e" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "contract PriceOracle", "name": "oldPriceOracle", "type": "address" }, { "indexed": false, "internalType": "contract PriceOracle", "name": "newPriceOracle", "type": "address" }], "name": "NewPriceOracle", "type": "event", "signature": "0xd52b2b9b7e9ee655fcb95d2e5b9e0c9f69e7ef2b8e9d2d0ea78402d576d22e22" }, { "constant": false, "inputs": [{ "internalType": "address[]", "name": "cTokens", "type": "address[]" }], "name": "_addCompMarkets", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xce485c5e" }, { "constant": false, "inputs": [{ "internalType": "contract Unitroller", "name": "unitroller", "type": "address" }], "name": "_become", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x1d504dc6" }, { "constant": true, "inputs": [], "name": "_borrowGuardianPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xe6653f3d" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }], "name": "_dropCompMarket", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x3aa729b4" }, { "constant": true, "inputs": [], "name": "_mintGuardianPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x3c94786f" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "newBorrowCapGuardian", "type": "address" }], "name": "_setBorrowCapGuardian", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x391957d7" }, { "constant": false, "inputs": [{ "internalType": "contract CToken", "name": "cToken", "type": "address" }, { "internalType": "bool", "name": "state", "type": "bool" }], "name": "_setBorrowPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x18c882a5" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "newCloseFactorMantissa", "type": "uint256" }], "name": "_setCloseFactor", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x317b0b77" }, { "constant": false, "inputs": [{ "internalType": "contract CToken", "name": "cToken", "type": "address" }, { "internalType": "uint256", "name": "newCollateralFactorMantissa", "type": "uint256" }], "name": "_setCollateralFactor", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xe4028eee" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "compRate_", "type": "uint256" }], "name": "_setCompRate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x6a491112" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "newLiquidationIncentiveMantissa", "type": "uint256" }], "name": "_setLiquidationIncentive", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x4fd42e17" }, { "constant": false, "inputs": [{ "internalType": "contract CToken[]", "name": "cTokens", "type": "address[]" }, { "internalType": "uint256[]", "name": "newBorrowCaps", "type": "uint256[]" }], "name": "_setMarketBorrowCaps", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x607ef6c1" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "newMaxAssets", "type": "uint256" }], "name": "_setMaxAssets", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xd9226ced" }, { "constant": false, "inputs": [{ "internalType": "contract CToken", "name": "cToken", "type": "address" }, { "internalType": "bool", "name": "state", "type": "bool" }], "name": "_setMintPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x3bcf7ec1" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "newPauseGuardian", "type": "address" }], "name": "_setPauseGuardian", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x5f5af1aa" }, { "constant": false, "inputs": [{ "internalType": "contract PriceOracle", "name": "newOracle", "type": "address" }], "name": "_setPriceOracle", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x55ee1fe1" }, { "constant": false, "inputs": [{ "internalType": "bool", "name": "state", "type": "bool" }], "name": "_setSeizePaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x2d70db78" }, { "constant": false, "inputs": [{ "internalType": "bool", "name": "state", "type": "bool" }], "name": "_setTransferPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x8ebf6364" }, { "constant": false, "inputs": [{ "internalType": "contract CToken", "name": "cToken", "type": "address" }], "name": "_supportMarket", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xa76b3fda" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "accountAssets", "outputs": [{ "internalType": "contract CToken", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xdce15449" }, { "constant": true, "inputs": [], "name": "admin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xf851a440" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "allMarkets", "outputs": [{ "internalType": "contract CToken", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x52d84d1e" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "borrower", "type": "address" }, { "internalType": "uint256", "name": "borrowAmount", "type": "uint256" }], "name": "borrowAllowed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xda3d454c" }, { "constant": true, "inputs": [], "name": "borrowCapGuardian", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x21af4569" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "borrowCaps", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x4a584432" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "borrowGuardianPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x6d154ea5" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "borrower", "type": "address" }, { "internalType": "uint256", "name": "borrowAmount", "type": "uint256" }], "name": "borrowVerify", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x5c778605" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "contract CToken", "name": "cToken", "type": "address" }], "name": "checkMembership", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x929fe9a1" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "holder", "type": "address" }, { "internalType": "contract CToken[]", "name": "cTokens", "type": "address[]" }], "name": "claimComp", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x1c3db2e0" }, { "constant": false, "inputs": [{ "internalType": "address[]", "name": "holders", "type": "address[]" }, { "internalType": "contract CToken[]", "name": "cTokens", "type": "address[]" }, { "internalType": "bool", "name": "borrowers", "type": "bool" }, { "internalType": "bool", "name": "suppliers", "type": "bool" }], "name": "claimComp", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x6810dfa6" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "holder", "type": "address" }], "name": "claimComp", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xe9af0292" }, { "constant": true, "inputs": [], "name": "closeFactorMantissa", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xe8755446" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "compAccrued", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xcc7ebdc4" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "compBorrowState", "outputs": [{ "internalType": "uint224", "name": "index", "type": "uint224" }, { "internalType": "uint32", "name": "block", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x8c57804e" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "compBorrowerIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xca0af043" }, { "constant": true, "inputs": [], "name": "compClaimThreshold", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x747026c9" }, { "constant": true, "inputs": [], "name": "compInitialIndex", "outputs": [{ "internalType": "uint224", "name": "", "type": "uint224" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xa7f0e231" }, { "constant": true, "inputs": [], "name": "compRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xaa900754" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "compSpeeds", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x1d7b33d7" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "compSupplierIndex", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xb21be7fd" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "compSupplyState", "outputs": [{ "internalType": "uint224", "name": "index", "type": "uint224" }, { "internalType": "uint32", "name": "block", "type": "uint32" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x6b79c38d" }, { "constant": true, "inputs": [], "name": "comptrollerImplementation", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xbb82aa5e" }, { "constant": false, "inputs": [{ "internalType": "address[]", "name": "cTokens", "type": "address[]" }], "name": "enterMarkets", "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xc2998238" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cTokenAddress", "type": "address" }], "name": "exitMarket", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xede4edd0" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getAccountLiquidity", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x5ec88c79" }, { "constant": true, "inputs": [], "name": "getAllMarkets", "outputs": [{ "internalType": "contract CToken[]", "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xb0772d0b" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "getAssetsIn", "outputs": [{ "internalType": "contract CToken[]", "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xabfceffc" }, { "constant": true, "inputs": [], "name": "getBlockNumber", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x42cbb15c" }, { "constant": true, "inputs": [], "name": "getCompAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x9d1b5a0a" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }, { "internalType": "address", "name": "cTokenModify", "type": "address" }, { "internalType": "uint256", "name": "redeemTokens", "type": "uint256" }, { "internalType": "uint256", "name": "borrowAmount", "type": "uint256" }], "name": "getHypotheticalAccountLiquidity", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x4e79238f" }, { "constant": true, "inputs": [], "name": "isComptroller", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x007e3dd2" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cTokenBorrowed", "type": "address" }, { "internalType": "address", "name": "cTokenCollateral", "type": "address" }, { "internalType": "address", "name": "liquidator", "type": "address" }, { "internalType": "address", "name": "borrower", "type": "address" }, { "internalType": "uint256", "name": "repayAmount", "type": "uint256" }], "name": "liquidateBorrowAllowed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x5fc7e71e" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cTokenBorrowed", "type": "address" }, { "internalType": "address", "name": "cTokenCollateral", "type": "address" }, { "internalType": "address", "name": "liquidator", "type": "address" }, { "internalType": "address", "name": "borrower", "type": "address" }, { "internalType": "uint256", "name": "actualRepayAmount", "type": "uint256" }, { "internalType": "uint256", "name": "seizeTokens", "type": "uint256" }], "name": "liquidateBorrowVerify", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x47ef3b3b" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "cTokenBorrowed", "type": "address" }, { "internalType": "address", "name": "cTokenCollateral", "type": "address" }, { "internalType": "uint256", "name": "actualRepayAmount", "type": "uint256" }], "name": "liquidateCalculateSeizeTokens", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xc488847b" }, { "constant": true, "inputs": [], "name": "liquidationIncentiveMantissa", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x4ada90af" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "markets", "outputs": [{ "internalType": "bool", "name": "isListed", "type": "bool" }, { "internalType": "uint256", "name": "collateralFactorMantissa", "type": "uint256" }, { "internalType": "bool", "name": "isComped", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x8e8f294b" }, { "constant": true, "inputs": [], "name": "maxAssets", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x94b2294b" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "minter", "type": "address" }, { "internalType": "uint256", "name": "mintAmount", "type": "uint256" }], "name": "mintAllowed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x4ef4c3e1" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "mintGuardianPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x731f0c2b" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "minter", "type": "address" }, { "internalType": "uint256", "name": "actualMintAmount", "type": "uint256" }, { "internalType": "uint256", "name": "mintTokens", "type": "uint256" }], "name": "mintVerify", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x41c728b9" }, { "constant": true, "inputs": [], "name": "oracle", "outputs": [{ "internalType": "contract PriceOracle", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x7dc0d1d0" }, { "constant": true, "inputs": [], "name": "pauseGuardian", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x24a3d622" }, { "constant": true, "inputs": [], "name": "pendingAdmin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x26782247" }, { "constant": true, "inputs": [], "name": "pendingComptrollerImplementation", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xdcfbc0c7" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "redeemer", "type": "address" }, { "internalType": "uint256", "name": "redeemTokens", "type": "uint256" }], "name": "redeemAllowed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xeabe7d91" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "redeemer", "type": "address" }, { "internalType": "uint256", "name": "redeemAmount", "type": "uint256" }, { "internalType": "uint256", "name": "redeemTokens", "type": "uint256" }], "name": "redeemVerify", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x51dff989" }, { "constant": false, "inputs": [], "name": "refreshCompSpeeds", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x4d8e5037" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "payer", "type": "address" }, { "internalType": "address", "name": "borrower", "type": "address" }, { "internalType": "uint256", "name": "repayAmount", "type": "uint256" }], "name": "repayBorrowAllowed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x24008a62" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "payer", "type": "address" }, { "internalType": "address", "name": "borrower", "type": "address" }, { "internalType": "uint256", "name": "actualRepayAmount", "type": "uint256" }, { "internalType": "uint256", "name": "borrowerIndex", "type": "uint256" }], "name": "repayBorrowVerify", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x1ededc91" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cTokenCollateral", "type": "address" }, { "internalType": "address", "name": "cTokenBorrowed", "type": "address" }, { "internalType": "address", "name": "liquidator", "type": "address" }, { "internalType": "address", "name": "borrower", "type": "address" }, { "internalType": "uint256", "name": "seizeTokens", "type": "uint256" }], "name": "seizeAllowed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xd02f7351" }, { "constant": true, "inputs": [], "name": "seizeGuardianPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xac0b0bb7" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cTokenCollateral", "type": "address" }, { "internalType": "address", "name": "cTokenBorrowed", "type": "address" }, { "internalType": "address", "name": "liquidator", "type": "address" }, { "internalType": "address", "name": "borrower", "type": "address" }, { "internalType": "uint256", "name": "seizeTokens", "type": "uint256" }], "name": "seizeVerify", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x6d35bf91" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "transferTokens", "type": "uint256" }], "name": "transferAllowed", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xbdcdc258" }, { "constant": true, "inputs": [], "name": "transferGuardianPaused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x87f76303" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "address", "name": "src", "type": "address" }, { "internalType": "address", "name": "dst", "type": "address" }, { "internalType": "uint256", "name": "transferTokens", "type": "uint256" }], "name": "transferVerify", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x6a56947e" }],
    Cantroller: [
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "contract CToken",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "newSpeed",
                    "type": "uint256"
                }
            ],
            "name": "AcmdSpeedUpdated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "action",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "pauseState",
                    "type": "bool"
                }
            ],
            "name": "ActionPaused",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "contract CToken",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "action",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "pauseState",
                    "type": "bool"
                }
            ],
            "name": "ActionPaused",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "protocol",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "creditLimit",
                    "type": "uint256"
                }
            ],
            "name": "CreditLimitChanged",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "contract CToken",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "borrower",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "acmdDelta",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "acmdBorrowIndex",
                    "type": "uint256"
                }
            ],
            "name": "DistributedBorrowerAcmd",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "contract CToken",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "supplier",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "acmdDelta",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "acmdSupplyIndex",
                    "type": "uint256"
                }
            ],
            "name": "DistributedSupplierAcmd",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "error",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "info",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "detail",
                    "type": "uint256"
                }
            ],
            "name": "Failure",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "contract CToken",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "MarketEntered",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "contract CToken",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "MarketExited",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "contract CToken",
                    "name": "cToken",
                    "type": "address"
                }
            ],
            "name": "MarketListed",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "oldRate",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "acmdRate_",
                    "type": "uint256"
                }
            ],
            "name": "NewAcmdRate",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "oldCloseFactorMantissa",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "newCloseFactorMantissa",
                    "type": "uint256"
                }
            ],
            "name": "NewCloseFactor",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "contract CToken",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "oldCollateralFactorMantissa",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "newCollateralFactorMantissa",
                    "type": "uint256"
                }
            ],
            "name": "NewCollateralFactor",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "oldLiquidationIncentiveMantissa",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "newLiquidationIncentiveMantissa",
                    "type": "uint256"
                }
            ],
            "name": "NewLiquidationIncentive",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "oldMaxAssets",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "newMaxAssets",
                    "type": "uint256"
                }
            ],
            "name": "NewMaxAssets",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "oldPauseGuardian",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "newPauseGuardian",
                    "type": "address"
                }
            ],
            "name": "NewPauseGuardian",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "contract PriceOracle",
                    "name": "oldPriceOracle",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "contract PriceOracle",
                    "name": "newPriceOracle",
                    "type": "address"
                }
            ],
            "name": "NewPriceOracle",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "cTokens",
                    "type": "address[]"
                }
            ],
            "name": "_addAcmdMarkets",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "contract Unitroller",
                    "name": "unitroller",
                    "type": "address"
                }
            ],
            "name": "_become",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "_borrowGuardianPaused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cToken",
                    "type": "address"
                }
            ],
            "name": "_dropAcmdMarket",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "_mintGuardianPaused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "acmdRate_",
                    "type": "uint256"
                }
            ],
            "name": "_setAcmdRate",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "newBalanceUtiRate",
                    "type": "uint256"
                }
            ],
            "name": "_setBalanceUtiRate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "contract CToken",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "state",
                    "type": "bool"
                }
            ],
            "name": "_setBorrowPaused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "newCloseFactorMantissa",
                    "type": "uint256"
                }
            ],
            "name": "_setCloseFactor",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "contract CToken",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "newCollateralFactorMantissa",
                    "type": "uint256"
                }
            ],
            "name": "_setCollateralFactor",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "protocol",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "creditLimit",
                    "type": "uint256"
                }
            ],
            "name": "_setCreditLimit",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "newLiquidationIncentiveMantissa",
                    "type": "uint256"
                }
            ],
            "name": "_setLiquidationIncentive",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "contract CToken",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "state",
                    "type": "bool"
                }
            ],
            "name": "_setMintPaused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newPauseGuardian",
                    "type": "address"
                }
            ],
            "name": "_setPauseGuardian",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "contract PriceOracle",
                    "name": "newOracle",
                    "type": "address"
                }
            ],
            "name": "_setPriceOracle",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "bool",
                    "name": "state",
                    "type": "bool"
                }
            ],
            "name": "_setSeizePaused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "bool",
                    "name": "state",
                    "type": "bool"
                }
            ],
            "name": "_setTransferPaused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "contract CToken",
                    "name": "cToken",
                    "type": "address"
                }
            ],
            "name": "_supportMarket",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "accountAssets",
            "outputs": [
                {
                    "internalType": "contract CToken",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "acmdAccrued",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "acmdBorrowState",
            "outputs": [
                {
                    "internalType": "uint224",
                    "name": "index",
                    "type": "uint224"
                },
                {
                    "internalType": "uint32",
                    "name": "block",
                    "type": "uint32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "acmdBorrowerIndex",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "acmdClaimThreshold",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "acmdInitialIndex",
            "outputs": [
                {
                    "internalType": "uint224",
                    "name": "",
                    "type": "uint224"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "acmdRate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "acmdSpeeds",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "acmdSupplierIndex",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "acmdSupplyState",
            "outputs": [
                {
                    "internalType": "uint224",
                    "name": "index",
                    "type": "uint224"
                },
                {
                    "internalType": "uint32",
                    "name": "block",
                    "type": "uint32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "admin",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "allMarkets",
            "outputs": [
                {
                    "internalType": "contract CToken",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "balanceUtiRate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "borrower",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "borrowAmount",
                    "type": "uint256"
                }
            ],
            "name": "borrowAllowed",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "borrowGuardianPaused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "borrower",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "borrowAmount",
                    "type": "uint256"
                }
            ],
            "name": "borrowVerify",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "contract CToken",
                    "name": "cToken",
                    "type": "address"
                }
            ],
            "name": "checkMembership",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "holder",
                    "type": "address"
                }
            ],
            "name": "claimAcmd",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "holder",
                    "type": "address"
                },
                {
                    "internalType": "contract CToken[]",
                    "name": "cTokens",
                    "type": "address[]"
                }
            ],
            "name": "claimAcmd",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "holders",
                    "type": "address[]"
                },
                {
                    "internalType": "contract CToken[]",
                    "name": "cTokens",
                    "type": "address[]"
                },
                {
                    "internalType": "bool",
                    "name": "borrowers",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "suppliers",
                    "type": "bool"
                }
            ],
            "name": "claimAcmd",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "closeFactorMantissa",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "comptrollerImplementation",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "creditLimits",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "cTokens",
                    "type": "address[]"
                }
            ],
            "name": "enterMarkets",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cTokenAddress",
                    "type": "address"
                }
            ],
            "name": "exitMarket",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "getAccountLiquidity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getAcmdAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getAllMarkets",
            "outputs": [
                {
                    "internalType": "contract CToken[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getBlockNumber",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cToken",
                    "type": "address"
                }
            ],
            "name": "getBorrowSpeed",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "cTokenModify",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "redeemTokens",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "borrowAmount",
                    "type": "uint256"
                }
            ],
            "name": "getHypotheticalAccountLiquidity",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cToken",
                    "type": "address"
                }
            ],
            "name": "getSupplySpeed",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cToken",
                    "type": "address"
                }
            ],
            "name": "getUtilizationRate",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "isComptroller",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cTokenBorrowed",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "cTokenCollateral",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "liquidator",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "borrower",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "repayAmount",
                    "type": "uint256"
                }
            ],
            "name": "liquidateBorrowAllowed",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cTokenBorrowed",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "cTokenCollateral",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "liquidator",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "borrower",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "actualRepayAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "seizeTokens",
                    "type": "uint256"
                }
            ],
            "name": "liquidateBorrowVerify",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cTokenBorrowed",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "cTokenCollateral",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "actualRepayAmount",
                    "type": "uint256"
                }
            ],
            "name": "liquidateCalculateSeizeTokens",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "liquidationIncentiveMantissa",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "markets",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "isListed",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "collateralFactorMantissa",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isAcmded",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "minter",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "mintAmount",
                    "type": "uint256"
                }
            ],
            "name": "mintAllowed",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "mintGuardianPaused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "minter",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "actualMintAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "mintTokens",
                    "type": "uint256"
                }
            ],
            "name": "mintVerify",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "oracle",
            "outputs": [
                {
                    "internalType": "contract PriceOracle",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "pauseGuardian",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "pendingAdmin",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "pendingComptrollerImplementation",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "redeemer",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "redeemTokens",
                    "type": "uint256"
                }
            ],
            "name": "redeemAllowed",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "redeemer",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "redeemAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "redeemTokens",
                    "type": "uint256"
                }
            ],
            "name": "redeemVerify",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "refreshAcmdSpeeds",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "payer",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "borrower",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "repayAmount",
                    "type": "uint256"
                }
            ],
            "name": "repayBorrowAllowed",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "payer",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "borrower",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "actualRepayAmount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "borrowerIndex",
                    "type": "uint256"
                }
            ],
            "name": "repayBorrowVerify",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cTokenCollateral",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "cTokenBorrowed",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "liquidator",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "borrower",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "seizeTokens",
                    "type": "uint256"
                }
            ],
            "name": "seizeAllowed",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "seizeGuardianPaused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cTokenCollateral",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "cTokenBorrowed",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "liquidator",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "borrower",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "seizeTokens",
                    "type": "uint256"
                }
            ],
            "name": "seizeVerify",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "src",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "dst",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "transferTokens",
                    "type": "uint256"
                }
            ],
            "name": "transferAllowed",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "transferGuardianPaused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "cToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "src",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "dst",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "transferTokens",
                    "type": "uint256"
                }
            ],
            "name": "transferVerify",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
    PriceFeed: ["function price(string symbol) returns (uint256)"],
    CompoundLens: [{ "constant": false, "inputs": [{ "internalType": "contract CToken", "name": "cToken", "type": "address" }, { "internalType": "address payable", "name": "account", "type": "address" }], "name": "cTokenBalances", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "uint256", "name": "balanceOf", "type": "uint256" }, { "internalType": "uint256", "name": "borrowBalanceCurrent", "type": "uint256" }, { "internalType": "uint256", "name": "balanceOfUnderlying", "type": "uint256" }, { "internalType": "uint256", "name": "tokenBalance", "type": "uint256" }, { "internalType": "uint256", "name": "tokenAllowance", "type": "uint256" }], "internalType": "struct CompoundLens.CTokenBalances", "name": "", "type": "tuple" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "contract CToken[]", "name": "cTokens", "type": "address[]" }, { "internalType": "address payable", "name": "account", "type": "address" }], "name": "cTokenBalancesAll", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "uint256", "name": "balanceOf", "type": "uint256" }, { "internalType": "uint256", "name": "borrowBalanceCurrent", "type": "uint256" }, { "internalType": "uint256", "name": "balanceOfUnderlying", "type": "uint256" }, { "internalType": "uint256", "name": "tokenBalance", "type": "uint256" }, { "internalType": "uint256", "name": "tokenAllowance", "type": "uint256" }], "internalType": "struct CompoundLens.CTokenBalances[]", "name": "", "type": "tuple[]" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "contract CToken", "name": "cToken", "type": "address" }], "name": "cTokenMetadata", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "uint256", "name": "exchangeRateCurrent", "type": "uint256" }, { "internalType": "uint256", "name": "supplyRatePerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "borrowRatePerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "reserveFactorMantissa", "type": "uint256" }, { "internalType": "uint256", "name": "totalBorrows", "type": "uint256" }, { "internalType": "uint256", "name": "totalReserves", "type": "uint256" }, { "internalType": "uint256", "name": "totalSupply", "type": "uint256" }, { "internalType": "uint256", "name": "totalCash", "type": "uint256" }, { "internalType": "bool", "name": "isListed", "type": "bool" }, { "internalType": "uint256", "name": "collateralFactorMantissa", "type": "uint256" }, { "internalType": "address", "name": "underlyingAssetAddress", "type": "address" }, { "internalType": "uint256", "name": "cTokenDecimals", "type": "uint256" }, { "internalType": "uint256", "name": "underlyingDecimals", "type": "uint256" }], "internalType": "struct CompoundLens.CTokenMetadata", "name": "", "type": "tuple" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "contract CToken[]", "name": "cTokens", "type": "address[]" }], "name": "cTokenMetadataAll", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "uint256", "name": "exchangeRateCurrent", "type": "uint256" }, { "internalType": "uint256", "name": "supplyRatePerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "borrowRatePerBlock", "type": "uint256" }, { "internalType": "uint256", "name": "reserveFactorMantissa", "type": "uint256" }, { "internalType": "uint256", "name": "totalBorrows", "type": "uint256" }, { "internalType": "uint256", "name": "totalReserves", "type": "uint256" }, { "internalType": "uint256", "name": "totalSupply", "type": "uint256" }, { "internalType": "uint256", "name": "totalCash", "type": "uint256" }, { "internalType": "bool", "name": "isListed", "type": "bool" }, { "internalType": "uint256", "name": "collateralFactorMantissa", "type": "uint256" }, { "internalType": "address", "name": "underlyingAssetAddress", "type": "address" }, { "internalType": "uint256", "name": "cTokenDecimals", "type": "uint256" }, { "internalType": "uint256", "name": "underlyingDecimals", "type": "uint256" }], "internalType": "struct CompoundLens.CTokenMetadata[]", "name": "", "type": "tuple[]" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "contract CToken", "name": "cToken", "type": "address" }], "name": "cTokenUnderlyingPrice", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "uint256", "name": "underlyingPrice", "type": "uint256" }], "internalType": "struct CompoundLens.CTokenUnderlyingPrice", "name": "", "type": "tuple" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "contract CToken[]", "name": "cTokens", "type": "address[]" }], "name": "cTokenUnderlyingPriceAll", "outputs": [{ "components": [{ "internalType": "address", "name": "cToken", "type": "address" }, { "internalType": "uint256", "name": "underlyingPrice", "type": "uint256" }], "internalType": "struct CompoundLens.CTokenUnderlyingPrice[]", "name": "", "type": "tuple[]" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "contract ComptrollerLensInterface", "name": "comptroller", "type": "address" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "getAccountLimits", "outputs": [{ "components": [{ "internalType": "contract CToken[]", "name": "markets", "type": "address[]" }, { "internalType": "uint256", "name": "liquidity", "type": "uint256" }, { "internalType": "uint256", "name": "shortfall", "type": "uint256" }], "internalType": "struct CompoundLens.AccountLimits", "name": "", "type": "tuple" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "contract Comp", "name": "comp", "type": "address" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "getCompBalanceMetadata", "outputs": [{ "components": [{ "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "votes", "type": "uint256" }, { "internalType": "address", "name": "delegate", "type": "address" }], "internalType": "struct CompoundLens.CompBalanceMetadata", "name": "", "type": "tuple" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "contract Comp", "name": "comp", "type": "address" }, { "internalType": "contract ComptrollerLensInterface", "name": "comptroller", "type": "address" }, { "internalType": "address", "name": "account", "type": "address" }], "name": "getCompBalanceMetadataExt", "outputs": [{ "components": [{ "internalType": "uint256", "name": "balance", "type": "uint256" }, { "internalType": "uint256", "name": "votes", "type": "uint256" }, { "internalType": "address", "name": "delegate", "type": "address" }, { "internalType": "uint256", "name": "allocated", "type": "uint256" }], "internalType": "struct CompoundLens.CompBalanceMetadataExt", "name": "", "type": "tuple" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "contract Comp", "name": "comp", "type": "address" }, { "internalType": "address", "name": "account", "type": "address" }, { "internalType": "uint32[]", "name": "blockNumbers", "type": "uint32[]" }], "name": "getCompVotes", "outputs": [{ "components": [{ "internalType": "uint256", "name": "blockNumber", "type": "uint256" }, { "internalType": "uint256", "name": "votes", "type": "uint256" }], "internalType": "struct CompoundLens.CompVotes[]", "name": "", "type": "tuple[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "contract GovernorAlpha", "name": "governor", "type": "address" }, { "internalType": "uint256[]", "name": "proposalIds", "type": "uint256[]" }], "name": "getGovProposals", "outputs": [{ "components": [{ "internalType": "uint256", "name": "proposalId", "type": "uint256" }, { "internalType": "address", "name": "proposer", "type": "address" }, { "internalType": "uint256", "name": "eta", "type": "uint256" }, { "internalType": "address[]", "name": "targets", "type": "address[]" }, { "internalType": "uint256[]", "name": "values", "type": "uint256[]" }, { "internalType": "string[]", "name": "signatures", "type": "string[]" }, { "internalType": "bytes[]", "name": "calldatas", "type": "bytes[]" }, { "internalType": "uint256", "name": "startBlock", "type": "uint256" }, { "internalType": "uint256", "name": "endBlock", "type": "uint256" }, { "internalType": "uint256", "name": "forVotes", "type": "uint256" }, { "internalType": "uint256", "name": "againstVotes", "type": "uint256" }, { "internalType": "bool", "name": "canceled", "type": "bool" }, { "internalType": "bool", "name": "executed", "type": "bool" }], "internalType": "struct CompoundLens.GovProposal[]", "name": "", "type": "tuple[]" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "contract GovernorAlpha", "name": "governor", "type": "address" }, { "internalType": "address", "name": "voter", "type": "address" }, { "internalType": "uint256[]", "name": "proposalIds", "type": "uint256[]" }], "name": "getGovReceipts", "outputs": [{ "components": [{ "internalType": "uint256", "name": "proposalId", "type": "uint256" }, { "internalType": "bool", "name": "hasVoted", "type": "bool" }, { "internalType": "bool", "name": "support", "type": "bool" }, { "internalType": "uint96", "name": "votes", "type": "uint96" }], "internalType": "struct CompoundLens.GovReceipt[]", "name": "", "type": "tuple[]" }], "payable": false, "stateMutability": "view", "type": "function" }]
};
exports.cTokens = ['cBAT', 'cCOMP', 'cDAI', 'cETH', 'cREP', 'cSAI', 'cUNI', 'cUSDC', 'cUSDT', 'cWBTC', 'cZRX'];
exports.underlyings = ['BAT', 'COMP', 'DAI', 'ETH', 'REP', 'SAI', 'UNI', 'USDC', 'USDT', 'WBTC', 'ZRX'];
// additional assets supported by the open price feed
exports.opfAssets = ['KNC', 'LINK', 'BTC'];
exports.decimals = {
    'cBAT': 8,
    'cCOMP': 8,
    'cDAI': 8,
    'cETH': 8,
    'cREP': 8,
    'cSAI': 8,
    'cUNI': 8,
    'cUSDC': 8,
    'cUSDT': 8,
    'cWBTC': 8,
    'cZRX': 8,
    'BAT': 18,
    'COMP': 18,
    'DAI': 18,
    'ETH': 18,
    'REP': 18,
    'SAI': 18,
    'UNI': 18,
    'USDC': 6,
    'USDT': 6,
    'WBTC': 8,
    'ZRX': 18,
    'KNC': 18,
    'LINK': 18,
    'BTC': 8
};
exports.errorCodes = {
    'comptroller': {
        'codes': {
            '0': { 'error': 'NO_ERROR', 'description': 'Not a failure.', 'hint': '' },
            '1': { 'error': 'UNAUTHORIZED', 'description': 'The sender is not authorized to perform this action.', 'hint': '' },
            '2': { 'error': 'COMPTROLLER_MISMATCH', 'description': 'Liquidation cannot be performed in markets with different comptrollers.', 'hint': '' },
            '3': { 'error': 'INSUFFICIENT_SHORTFALL', 'description': 'The account does not have sufficient shortfall to perform this action.', 'hint': '' },
            '4': { 'error': 'INSUFFICIENT_LIQUIDITY', 'description': 'The account does not have sufficient liquidity to perform this action.', 'hint': '' },
            '5': { 'error': 'INVALID_CLOSE_FACTOR', 'description': 'The close factor is not valid.', 'hint': '' },
            '6': { 'error': 'INVALID_COLLATERAL_FACTOR', 'description': 'The collateral factor is not valid.', 'hint': '' },
            '7': { 'error': 'INVALID_LIQUIDATION_INCENTIVE', 'description': 'The liquidation incentive is invalid.', 'hint': '' },
            '8': { 'error': 'MARKET_NOT_ENTERED', 'description': 'The market has not been entered by the account.', 'hint': '' },
            '9': { 'error': 'MARKET_NOT_LISTED', 'description': 'The market is not currently listed by the comptroller.', 'hint': '' },
            '10': { 'error': 'MARKET_ALREADY_LISTED', 'description': 'An admin tried to list the same market more than once.', 'hint': '' },
            '11': { 'error': 'MATH_ERROR', 'description': 'A math calculation error occurred.', 'hint': '' },
            '12': { 'error': 'NONZERO_BORROW_BALANCE', 'description': 'The action cannot be performed since the account carries a borrow balance.', 'hint': '' },
            '13': { 'error': 'PRICE_ERROR', 'description': 'The comptroller could not obtain a required price of an asset.', 'hint': '' },
            '14': { 'error': 'REJECTION', 'description': 'The comptroller rejects the action requested by the market.', 'hint': '' },
            '15': { 'error': 'SNAPSHOT_ERROR', 'description': 'The comptroller could not get the account borrows and exchange rate from the market.', 'hint': '' },
            '16': { 'error': 'TOO_MANY_ASSETS', 'description': 'Attempted to enter more markets than are currently supported.', 'hint': '' },
            '17': { 'error': 'TOO_MUCH_REPAY', 'description': 'Attempted to repay more than is allowed by the protocol.', 'hint': '' }
        },
        'info': {
            '0': { 'error': 'ACCEPT_ADMIN_PENDING_ADMIN_CHECK', 'description': '', 'hint': '' },
            '1': { 'error': 'ACCEPT_PENDING_IMPLEMENTATION_ADDRESS_CHECK', 'description': '', 'hint': '' },
            '2': { 'error': 'EXIT_MARKET_BALANCE_OWED', 'description': '', 'hint': '' },
            '3': { 'error': 'EXIT_MARKET_REJECTION', 'description': '', 'hint': '' },
            '4': { 'error': 'SET_CLOSE_FACTOR_OWNER_CHECK', 'description': '', 'hint': '' },
            '5': { 'error': 'SET_CLOSE_FACTOR_VALIDATION', 'description': '', 'hint': '' },
            '6': { 'error': 'SET_COLLATERAL_FACTOR_OWNER_CHECK', 'description': '', 'hint': '' },
            '7': { 'error': 'SET_COLLATERAL_FACTOR_NO_EXISTS', 'description': '', 'hint': '' },
            '8': { 'error': 'SET_COLLATERAL_FACTOR_VALIDATION', 'description': '', 'hint': '' },
            '9': { 'error': 'SET_COLLATERAL_FACTOR_WITHOUT_PRICE', 'description': '', 'hint': '' },
            '10': { 'error': 'SET_IMPLEMENTATION_OWNER_CHECK', 'description': '', 'hint': '' },
            '11': { 'error': 'SET_LIQUIDATION_INCENTIVE_OWNER_CHECK', 'description': '', 'hint': '' },
            '12': { 'error': 'SET_LIQUIDATION_INCENTIVE_VALIDATION', 'description': '', 'hint': '' },
            '13': { 'error': 'SET_MAX_ASSETS_OWNER_CHECK', 'description': '', 'hint': '' },
            '14': { 'error': 'SET_PENDING_ADMIN_OWNER_CHECK', 'description': '', 'hint': '' },
            '15': { 'error': 'SET_PENDING_IMPLEMENTATION_OWNER_CHECK', 'description': '', 'hint': '' },
            '16': { 'error': 'SET_PRICE_ORACLE_OWNER_CHECK', 'description': '', 'hint': '' },
            '17': { 'error': 'SUPPORT_MARKET_EXISTS', 'description': '', 'hint': '' },
            '18': { 'error': 'SUPPORT_MARKET_OWNER_CHECK', 'description': '', 'hint': '' }
        }
    }
};
//# sourceMappingURL=constants.js.map

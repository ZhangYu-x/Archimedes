import pool_abi from './json/POOLABI.json';
import erc_abi from './json/ERC20.json';
import MdexRouterABI from './json/MdexRouterABI.json';
import HomoraBank_abi from './json/HomoraBank_abi.json'
import spell_abi from './json/spell_abi.json'
import WHT_abi from "./json/WHT_Abi.json";
import Contract from 'web3-eth-contract'
// import dao_pool_abi from './json/dao_pool_abi.json'
// import i18n from "@/i18n";
// import {BigNumber} from "@ethersproject/bignumber/lib.esm";

// todo 质押池相关
export const address = {
    token: '0xD8a76e09c6284A81d622D140AD4301FD085a7CE1',
    IBank: '0x8094EB2dAa7E8cd1bfDE56Ee0521c1717549Ab14',
    ACMDMining: '0xa295F34ec7028575DABBbf355f5a19434C5f35B0',
    // todo 下面三个要逐步重构
    mdexSpell: '0xe928961CC71d58bc1CcEbc9502F64CA18604Dbb3',
    mdexRouter: '0xED7d5F38C79115ca12fe6C0041abb22F0A06C300',
    mdexHecoPool: '0xFB03e11D93632D97a8981158A632Dd5986F5E909',
    WHT: '0x5545153CCFcA01fbd7Dd11C0b23ba694D9509A6F',
    Mdex: {
        Spell: '0xe928961CC71d58bc1CcEbc9502F64CA18604Dbb3',
        WMasterChef: '0x1551bca608DD8a29C944Bbed8A5eD68C7F8e302F',
        Router: '0xED7d5F38C79115ca12fe6C0041abb22F0A06C300',
        HecoPool: '0xFB03e11D93632D97a8981158A632Dd5986F5E909',
    },
    BXH: {
        Spell: '',
        WMasterChef: '',
        Router: '0x00eFB96dBFE641246E961b472C0C3fC472f6a694',
        HecoPool: '0x55bf276e2a2e10AEB62c0Ed37D36585cB24d9cC1',
    },

    acmd: {
        pool: '0x37e6A0C7C1ec86db43505e57B1A928cf2E5C0071',
        erc20: '0xD8a76e09c6284A81d622D140AD4301FD085a7CE1'
    },
    mdx: {
        pool: '0x1267D6B22bf97e20CdA9D261Bc985C78ABE24C87',
        erc20: '0x25D2e80cB6B86881Fd7e07dd263Fb79f4AbE033c'
    },
    bxh: {
        pool: '0x1267D6B22bf97e20CdA9D261Bc985C78ABE24C87',
        erc20: '0xcBD6Cb9243d8e3381Fea611EF023e17D1B7AeDF0'
    },

}

export const initContracts = () => {
    // const val = localStorage.getItem('rpcnode')
    // if (val) {
    //     if (val === 'weth') {
    //         Contract.setProvider(window.ethereum);
    //     } else {
    //         Contract.setProvider(uitls.nodeValToUrl[val]);
    //     }
    // } else if (i18n.locale === 'en') {
    //     Contract.setProvider(uitls.nodeValToUrl['htglobal']);
    // } else {
    //     // todo 换默认节点
    //     Contract.setProvider(uitls.nodeValToUrl['bingoo']);
    // }
    //todo 自定义节点
    Contract.setProvider(window.ethereum);
    return {
        address: address,
        token: new Contract(erc_abi.abi, address.token),
        IBank: new Contract(HomoraBank_abi, address.IBank),
        //todo 重构
        mdexRouter: new Contract(MdexRouterABI.abi, address.mdexRouter),
        mdexSpell: new Contract(spell_abi, address.mdexSpell),
        WHT: new Contract(WHT_abi.abi, address.WHT),

        acmd: {
            pool: new Contract(pool_abi.abi, address.acmd.pool),
            erc20: new Contract(erc_abi.abi, address.acmd.erc20)
        },

        //todo 质押池相关
        mdx: {
            pool: new Contract(pool_abi.abi, address.mdx.pool),
            erc20: new Contract(erc_abi.abi, address.mdx.erc20)
        },

    }
}

export const initContractsSend = () => {
    Contract.setProvider(window.ethereum || 'wss://ws-mainnet-node1.hecochain.com:443')
    return {
        address: address,
        token: new Contract(erc_abi.abi, address.token),
        IBank: new Contract(HomoraBank_abi, address.IBank),
        //todo 重构
        mdexRouter: new Contract(MdexRouterABI.abi, address.mdexRouter),
        mdexSpell: new Contract(spell_abi, address.mdexSpell),
        WHT: new Contract(WHT_abi.abi, address.WHT),

        acmd: {
            pool: new Contract(pool_abi.abi, address.acmd.pool),
            erc20: new Contract(erc_abi.abi, address.acmd.erc20)
        },

        //todo 质押池相关
        mdx: {
            pool: new Contract(pool_abi.abi, address.mdx.pool),
            erc20: new Contract(erc_abi.abi, address.mdx.erc20)
        },


    }
}


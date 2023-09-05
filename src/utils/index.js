import Vue from 'vue'
import BigNumber from "bignumber.js";
import {poolIdToLpAddress, tokenSymbol} from "./constants";

export const numToString = (num) => {
    let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
};

export const getPoolName = (poolTokens) => {
    return poolTokens.map(tokenAddress => {
        return tokenSymbol['heco-mainnet'][tokenAddress]
    }).join('/')
};

export const getLPName = (poolTokens) => {
    return poolTokens.map(tokenAddress => {
        return tokenSymbol['heco-mainnet'][tokenAddress]
    }).join('-')
};

export const lpLogoSource = (poolTokens) => {
    const lpSymbol = poolTokens.map(tokenAddress => {
        return tokenSymbol['heco-mainnet'][tokenAddress]
    }).join('-')
    return require(`../assets/coin/asset_${lpSymbol}.svg`)
};

export const getAmountOut = (amountIn, reserveIn, reserveOut) => {
    const amountInwithFee = new BigNumber(amountIn).times(997)
    const numerator = amountInwithFee.times(reserveOut)
    const denominator = new BigNumber(reserveIn).times(1000).plus(amountInwithFee)
    return numerator.div(denominator)
};
export const getAmountIn = (amountOut, reserveIn, reserveOut) => {
    const numerator = new BigNumber(reserveIn).times(amountOut).times(1000)
    const denominator = new BigNumber(reserveOut).minus(amountOut).times(997)
    return numerator.div(denominator).plus(1)
};
export const getPriceImpact = (amountIn, reserveIn) => {
    const numerator = new BigNumber(0.997).times(amountIn)
    const denominator = new BigNumber(reserveIn).div(0.997).plus(amountIn)
    return numerator.div(denominator)
};
export const getLpMint = (amount0, amount1, reserve0, reserve1, lpTotalSupply) => {
    const liquidity0 = new BigNumber(amount0).times(lpTotalSupply).div(reserve0)
    const liquidity1 = new BigNumber(amount1).times(lpTotalSupply).div(reserve1)
    return liquidity0.isLessThan(liquidity1) ? liquidity0 : liquidity1
};
export const getPidByCollId = (collId) => {
    const pidStr = collId.slice(0,-60); // First 16 bits
    return new BigNumber('0x'+pidStr).toString()
}
export const getSushiPerShareByCollId = (collId) => {
    const sushiPerShareStr = collId.slice(-60); // Last 240 bits
    return new BigNumber('0x'+sushiPerShareStr).toString()
}
export const getLpAddressByCollId = (collId, DEX) => {
    const pid = getPidByCollId(collId)
    return poolIdToLpAddress['heco-mainnet'][DEX][(pid)]
}

export const optimalDeposit = (amtA, amtB, resA, resB) => {
    if (new BigNumber(amtA).times(resB).isGreaterThanOrEqualTo(new BigNumber(amtB).times(resA))) {
        return {
            swapAmt: _optimalDeposit(amtA, amtB, resA, resB),
            isReversed: false,
        }
    } else {
        return {
            swapAmt: _optimalDeposit(amtB, amtA, resB, resA),
            isReversed: true,
        }
    }
};
const _optimalDeposit = (amtA, amtB, resA, resB) => {
    const a = new BigNumber(997)
    const b = new BigNumber(1997).times(resA)
    const _c = new BigNumber(amtA).times(resB).minus(new BigNumber(amtB).times(resA))
    const c = _c.times(1000).div(new BigNumber(amtB).plus(resB)).times(resA)
    const d = a.times(c).times(4)
    const e = Math.sqrt(b.times(b).plus(d).toNumber())
    const numerator = new BigNumber(e).minus(b)
    const denominator = a.times(2)
    return numerator.div(denominator)
};

export const mToUpperCase = (e) => {
    // todo 质押池相关 质押池大写名字
    switch (e) {
        case 'cusdt':
            return 'cUSDT'
        case 'xpipi':
            return 'xPIPI'
        case 'can_usdt':
            return 'CAN-USDT for MDEX'
        case 'can_usdt_bxh':
            return 'CAN-USDT for BXH'
        case 'can_ht':
            return 'CAN-HT for MDEX'
        case 'can_dao':
            return 'CAN'
        case 'can_husd':
            return 'CAN-HUSD for MDEX'
        default:
            return e.toUpperCase();
    }
}

export const keepDecimalsDown = (num,digits = 4) =>{
    if (num._isBigNumber) {
        num = new BigNumber(num.toFixed(digits,1))
    }
    num = num + '';
    if(num.indexOf('.') === -1 || (num.indexOf('.') > -1 && num.split('.')[1].length <= 3)){
        return num;
    }
    return Math.floor(num * eval(`1e${digits}`)) / eval(`1e${digits}`);
}
export const hiddenAddress = (e) => {
    if (e && e.length > 0) {
        let left = e.substring(0, 6);
        let right = e.substring(e.length - 4, e.length)
        return left + '...' + right;
    } else {
        return '';
    }
}

export const toNonExponential = (num) => {
    if (isNaN(num)) {
        return num;
    }
    let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}

export const goTo = (val, type) => {
    console.log('val=',val)
    console.log('type=',type)
    // if (val === '/home') {
    //     let suffix = window.location.hostname.split('.').slice(-1)[0];
    //     // suffix为顶级域名
    //     window.location.href = "https://golff."+suffix;
    //     return;
    // }
    if (type === undefined || type === 0) {
        Vue.routerGo.push(val)
    }
    else if (type === 1) {
        window.location.href = e;
    }

}

export const isEmpty = (val) => {
    if (val === null || typeof val === 'undefined') {
        return true;
    }
    if (typeof val === 'string') {
        if (trim(val) === '') {
            return true;
        }
    }
    if (Object.prototype.toString.call(val) === '[object Array]') {
        if (val.length === 0) {
            return true;
        }
    }
    return false;
}


export const isUrl = (e) => {
    var RegUrl = new RegExp('^([hH][tT]{2}[pP]://|[hH][tT]{2}[pP][sS]://)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+$');
    return (RegUrl.test(e));
};

export const isAndroid = (name, value) => {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('.android.') > -1; // android终端
    return isAndroid;
};

export const isiOS = (name, value) => {
    let u = navigator.userAgent;
    let isiOS = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || /iPhone|iPad|iPod|\.ios\./i.test(u); // ios终端
    return isiOS;
};

export const isH5 = (name, value) => {
    let sUserAgent = navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    let bIsMidp = sUserAgent.match(/midp/i) == "midp";
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    let bIsUcBrowser = sUserAgent.match(/ucbrowser/i) == "ucbrowser";
    let bIsAndroid = sUserAgent.match(/android/i) == "android";
    let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bIsUcBrowser) {
        return true;
    } else {
        return false;
    }
};

export const timestampToTime = (timestamp) => {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());

    return Y+M+D+h+m+s;
}

export const leftTime = (e) => {
    let Time = {
        day: '00',
        hour: '00',
        minutes: '00',
        seconds: '00'
    };
    let Distance = e;

    if (Distance > 0) {
        Time.day = Math.floor(Distance / 86400000);
        Distance -= Time.day * 86400000;
        Time.hour = Math.floor(Distance / 3600000);
        Distance -= Time.hour * 3600000;
        Time.minutes = Math.floor(Distance / 60000);
        Distance -= Time.minutes * 60000;
        Time.seconds = Math.floor(Distance / 1000).toFixed(0);
        Distance -= Time.seconds * 1000;
        if (Time.day < 10) {
            Time.day = '0' + Time.day;
        }
        if (Time.hour < 10) {
            Time.hour = '0' + Time.hour;
        }
        if (Time.minutes < 10) {
            Time.minutes = '0' + Time.minutes;
        }
        if (Time.seconds < 10) {
            Time.seconds = '0' + Time.seconds;
        }
        return Time;
    } else {
        return Time;
    }

}

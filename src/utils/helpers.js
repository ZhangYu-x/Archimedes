import numeral from 'numeral'
const BigNumber = require("bignumber.js");

export const getBigNumberStr = (bigNumber, fixed, factor = 1) => {
    if (!BigNumber.isBigNumber(bigNumber)) {
        return new BigNumber(bigNumber||0)?.times(factor)?.toFixed(fixed) || '0'
    }
    return bigNumber?.times(factor)?.toFixed(fixed) || '0'
}
export const formatDollars = (val) => {
    return numeral(val).format('$0,0.00')
}

// eX(2, 3) = 2e3 = 2000
// eX(2, -3) = 2e-3 = 0.002
export const eX = (value, x) => {
    return new BigNumber(`${value}e${x}`);
};

export const convertToLargeNumberRepresentation = (value) => {
    if (!value) {
        return "0";
    } else if (+value >= 1e5) {
        return `${eX(value.toString(), -6)}M`;
    } else if (+value >= 1e2) {
        return `${eX(value.toString(), -3)}K`;
    } else {
        return value.toString();
    }
};

// This function is not used, because it can be replaced by new BigNumber().decimalPlaces()
export const roundToDecimalPlaces = (value, n) => {
    const factor = Math.pow(10, n);
    return Math.round((+value + Number.EPSILON) * factor) / factor;
};

export const emptyStringIfNullish = (value) => {
    if (value && value !== "NaN") {
        return value;
    } else {
        return "";
    }
};

export const zeroStringIfNullish = (value, dp) => {
    if (value && value !== "NaN") {
        return value;
    } else {
        return Number(0).toFixed(dp);
    }
};

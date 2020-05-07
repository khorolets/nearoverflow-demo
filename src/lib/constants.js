import Big from 'big.js'

export const QUESTION_MIN_PRICE = Big(10).times(10 ** 24).toFixed();
export const ANSWER_PRICE = Big(1).times(10 ** 24).toFixed()
export const BOATLOAD_OF_GAS = Big(1).times(10 ** 16).toFixed()
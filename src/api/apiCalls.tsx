const BASE_URL = "https://openapi-sandbox.kucoin.com/api/v1/"

export const fetchSymbolsList = async () => {
    const res = await fetch(BASE_URL + `symbols`)
    return res.json()
}

export const fetchDailyTick = async (symbol: any) => {
    const res = await fetch(BASE_URL + `market/stats?symbol=${symbol}`)
    return res.json()
}

export const fetchTick = async (symbol: any) => {
    const res = await fetch(BASE_URL + `market/orderbook/level1?symbol=${symbol}`)
    return res.json()
}

export const fetchTrades = async (symbol: any) => {
    const res = await fetch(BASE_URL + `market/histories?symbol=${symbol}`)
    return res.json()
}

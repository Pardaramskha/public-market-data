import React from "react";


interface Tick {
    sequence: string
    bestAsk: string
    size: string
    price: string
    bestBidSize: string
    bestBid: string
    bestAskSize: string
    time: number
}

interface Trade {
    price: string
    sequence: string
    side: string
    size: string
    time: number
}

interface Tick24 {
    time: number
    symbol: string
    buy: string
    sell: string
    changeRate: string
    changePrice: string
    high: string
    low: string
    vol: string
    volValue: string
    last: string
    averagePrice: string
    takerFeeRate: string
    makerFeeRate: string
    takerCoefficient: string
    makerCoefficient: string
}

// MUI
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

// Cusotm components interfaces
interface ErrorAlertProps {
    text: string
}


export type { Tick, TabPanelProps, ErrorAlertProps, Trade, Tick24 }
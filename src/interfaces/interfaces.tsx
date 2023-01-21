import React from "react";


interface Ticker {
    sequence: string
    bestAsk: string
    size: string
    price: string
    bestBidSize: string
    bestBid: string
    bestAskSize: string
    time: number
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


export type { Ticker, TabPanelProps, ErrorAlertProps }
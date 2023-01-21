import React, {useEffect, useState} from "react"
import {APIGet} from "../../api/apiCalls";
import {Grid, List, ListItem} from "@mui/material";
import {returnDateFrom19Timestamp, returnDateFromTimestamp} from "../../functions/functions";

interface Trade {
    price: string
    sequence: string
    side: string
    size: string
    time: number
}

export default function TradesDisplay(props: any) {

    const {symbol} = props

    const [tradesData, setTradesData] = useState<Trade[] | null>(null)
    const [sortedTrades, setSortedTrades] = useState<Trade[] | null>(null)
    // could be replaced by global error management system
    const [error, setError] = useState<string>("")

    useEffect(() => {
        if (!!symbol) fetchTrades().then()
    }, [symbol])

    useEffect(() => {
        if (!tradesData) return
        if (!sortedTrades) setSortedTrades(tradesData)
    }, [tradesData])

    // fetch data
    const fetchTrades = async () => {
        if (!!tradesData) return null
        let uri = `https://openapi-sandbox.kucoin.com/api/v1/market/histories?symbol=${symbol}`

        APIGet(uri)
            .then((res: any) => { if (!!res.parsedBody) setTradesData(res.parsedBody.data); console.log(res.parsedBody.data) })
            .catch(() => setError("Error while retrieving pair trades data"))
    }

    // sort data
    const sortTrades = () => {
        if (!!tradesData) return null
    }

    return (
        <>
            <List>
                <ListItem>
                    <Grid container spacing={2} justifyContent={"space-between"}>
                        <Grid item xs={10} lg={3} textAlign={"center"}>Time</Grid>
                        <Grid item xs={10} lg={3} textAlign={"center"}>Side</Grid>
                        <Grid item xs={10} lg={3} textAlign={"center"}>Price</Grid>
                        <Grid item xs={10} lg={3} textAlign={"center"}>Size</Grid>
                    </Grid>
                </ListItem>
                {
                    !!sortedTrades && sortedTrades.map((trade: Trade, index: any) => {
                        return (
                            <ListItem
                                key={index}
                                sx={{
                                    border: "1px solid",
                                    borderColor: "divider",
                                    backgroundColor: trade.side === "sell" ? "rgba(239,83,80,0.5)" : "rgba(76,176,80,0.5)"
                                }}
                            >
                                <Grid container spacing={2} justifyContent={"space-between"}>
                                    <Grid item xs={10} lg={3} textAlign={"center"}>{returnDateFrom19Timestamp(trade.time)}</Grid>
                                    <Grid item xs={10} lg={3} textAlign={"center"}>{trade.side}</Grid>
                                    <Grid item xs={10} lg={3} textAlign={"center"}>{trade.price}</Grid>
                                    <Grid item xs={10} lg={3} textAlign={"center"}>{trade.size}</Grid>
                                </Grid>
                            </ListItem>
                        )
                    })
                }
            </List>
        </>
    )
}
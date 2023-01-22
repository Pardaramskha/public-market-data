import React, {useEffect, useState} from "react"
import {APIGet} from "../../api/apiCalls";
// MUI
import {Divider, Grid, Typography} from "@mui/material";
// Functions
import {returnDateFromTimestamp} from "../../functions/functions";
// Interfaces
import {Tick} from "../../interfaces/interfaces";
import RawDataDisplay from "../RawDataDisplay/RawDataDisplay";

export default function DetailsTicks(props: any) {

    const {symbol} = props

    const [ticksData, setTicksData] = useState<Tick | null>(null)
    // could be replaced by global error management system
    const [error, setError] = useState<string>("")

    useEffect(() => {
        if (!!symbol) fetchTicks().then()
    }, [symbol])


    const fetchTicks = async () => {
        // TODO: could be placed in .env
        let uri = `https://openapi-sandbox.kucoin.com/api/v1/market/orderbook/level1?symbol=${symbol}`

        APIGet(uri)
            .then((res: any) => { if (!!res.parsedBody) setTicksData(res.parsedBody.data); console.log(res.parsedBody.data) })
            .catch(() => setError("Error while retrieving pair ticks data"))
    }

    if (!ticksData) return <Typography fontWeight={700}>No ticker data available for this pair</Typography>

    return (
        <>
            <Grid container spacing={4} justifyContent={"center"}>
                <Grid item xs={12} lg={3}>
                    <RawDataDisplay title={"Pair"} data={symbol} primary />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <RawDataDisplay title={"Tick date"} data={returnDateFromTimestamp(ticksData?.time)} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <RawDataDisplay title={"Sequence"} data={ticksData.sequence} />
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <RawDataDisplay title={"Best ask"} data={ticksData.bestAsk} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <RawDataDisplay title={"Best bid"} data={ticksData.bestBid} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <RawDataDisplay title={"Price"} data={ticksData.price} />
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <RawDataDisplay title={"Best ask size"} data={ticksData.bestAskSize} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <RawDataDisplay title={"Best bid size"} data={ticksData.bestBidSize} />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <RawDataDisplay title={"Size"} data={ticksData.size} />
                </Grid>
            </Grid>
        </>
    )
}
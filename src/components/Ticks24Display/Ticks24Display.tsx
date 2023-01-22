import React, {useEffect, useState} from "react"
import {Tick24} from "../../interfaces/interfaces";
import {APIGet} from "../../api/apiCalls";
import {Grid, Typography} from "@mui/material";
import RawDataDisplay from "../RawDataDisplay/RawDataDisplay";
import {returnDateFromTimestamp} from "../../functions/functions";

export default function Ticks24Display(props: any) {

    const {symbol} = props

    const [ticksData, setTicksData] = useState<Tick24 | null>(null)
    // could be replaced by global error management system
    const [error, setError] = useState<string>("")

    useEffect(() => {
        if (!!symbol) fetchTick().then()
    }, [symbol])


    const fetchTick = async () => {
        // TODO: could be placed in .env
        let uri = `https://openapi-sandbox.kucoin.com/api/v1/market/stats?symbol=${symbol}`

        APIGet(uri)
            .then((res: any) => { if (!!res.parsedBody) setTicksData(res.parsedBody.data); console.log(res.parsedBody.data) })
            .catch(() => setError("Error while retrieving pair ticks data"))
    }

    if (!ticksData) return <Typography fontWeight={700}>No ticks data available for this pair</Typography>

    return (
        <>
            <Grid container spacing={4} justifyContent={"center"}>
                <Grid item>
                    <RawDataDisplay title={"Pair"} data={symbol} primary />
                </Grid>
                <Grid item>
                    <RawDataDisplay title={"Tick date"} data={returnDateFromTimestamp(ticksData?.time)} />
                </Grid>
                <Grid item>
                    <RawDataDisplay title={"Average price"} data={ticksData.averagePrice} />
                </Grid>


                <Grid item>
                    <RawDataDisplay title={"Best ask"} data={ticksData.buy} />
                </Grid>
                <Grid item>
                    <RawDataDisplay title={"Best bid"} data={ticksData.sell} />
                </Grid>
                <Grid item>
                    <RawDataDisplay title={"Volume"} data={ticksData.vol} />
                </Grid>


                <Grid item>
                    <RawDataDisplay title={"Change rate"} data={ticksData.changeRate} />
                </Grid>
                <Grid item>
                    <RawDataDisplay title={"Change price"} data={ticksData.changePrice} />
                </Grid>
                <Grid item>
                    <RawDataDisplay title={"Volume value"} data={ticksData.volValue} />
                </Grid>


                <Grid item>
                    <RawDataDisplay title={"Highest price"} data={ticksData.high} />
                </Grid>
                <Grid item>
                    <RawDataDisplay title={"Lowest price"} data={ticksData.low} />
                </Grid>
                <Grid item>
                    <RawDataDisplay title={"Last price"} data={ticksData.last} />
                </Grid>


                <Grid item>
                    <RawDataDisplay title={"Taker fee rate"} data={ticksData.takerFeeRate} />
                </Grid>
                <Grid item>
                    <RawDataDisplay title={"Maker fee rate"} data={ticksData.makerFeeRate} />
                </Grid>
                <Grid item>
                    <RawDataDisplay title={"Taker coefficient"} data={ticksData.takerCoefficient} />
                </Grid>
                <Grid item>
                    <RawDataDisplay title={"Maker coefficient"} data={ticksData.makerCoefficient} />
                </Grid>
            </Grid>
        </>
    )
}
import React, {useEffect, useState} from "react"
// MUI
import {Divider, Grid, Typography} from "@mui/material"
// API
import {APIGet} from "../../api/apiCalls"
// Functions
import {returnDateFromTimestamp} from "../../functions/functions"
// Interfaces
import {Tick} from "../../interfaces/interfaces"
// Components
import RawDataDisplay from "../RawDataDisplay/RawDataDisplay"
import ErrorAlert from "../ErrorAlert/ErrorAlert"

export default function TickDisplay(props: any) {

    const {symbol} = props

    const [ticksData, setTicksData] = useState<Tick | null>(null)
    // could be replaced by global error management system
    const [error, setError] = useState<string>("")

    useEffect(() => {
        if (!!symbol) fetchTicks().then()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol])

    // fetch
    const fetchTicks = async () => {
        // TODO: could be placed in .env
        let uri = `https://openapi-sandbox.kucoin.com/api/v1/market/orderbook/level1?symbol=${symbol}`

        APIGet(uri)
            .then((res: any) => { if (!!res.parsedBody) setTicksData(res.parsedBody.data) })
            .catch(() => setError("Error while retrieving pair ticks data"))
    }

    // display
    const displayDataGrid = () => {
        if (!!ticksData) {
            const dataMap = [
                { label: "Tick date", data: returnDateFromTimestamp(ticksData?.time)},
                { label: "Sequence", data: ticksData.sequence },
                { label: "divider", data: null },
                { label: "Best ask", data: ticksData.bestAsk },
                { label: "Best bid", data: ticksData.bestBid },
                { label: "Price", data: ticksData.price },
                { label: "divider", data: null },
                { label: "Best ask size", data: ticksData.bestAskSize },
                { label: "Best bid size", data: ticksData.bestBidSize },
                { label: "Size", data: ticksData.size },
            ]

            return (
                <>
                    {
                        dataMap.map((object, index: number) => {
                            if (object.label === "divider") return <Grid item xs={12} key={index}><Divider /></Grid>
                            return <Grid item xs={12} lg={3} key={index}><RawDataDisplay title={object.label} data={object.data} /></Grid>
                        })
                    }
                </>
            )
        }
    }

    if (!ticksData) return <Typography fontWeight={700}>No tick data available for this pair</Typography>

    return (
        <>
            <Grid container spacing={4} justifyContent={"center"}>
                <Grid item xs={12} lg={3}>
                    <RawDataDisplay title={"Pair"} data={symbol} primary />
                </Grid>

                {displayDataGrid()}

                {error && <Grid item xs={12} lg={7}><ErrorAlert text={error} /></Grid>}
            </Grid>
        </>
    )
}
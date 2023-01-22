import React, {useEffect, useState} from "react"
// MUI
import {Divider, Grid, Skeleton, Typography} from "@mui/material"
// API
import {fetchTick} from "../../api/apiCalls"
// Functions
import {returnDateFromTimestamp} from "../../functions/functions"
// Interfaces
import {Tick} from "../../interfaces/interfaces"
// Components
import RawDataDisplay from "../RawDataDisplay/RawDataDisplay"
import ErrorAlert from "../ErrorAlert/ErrorAlert"
// Queries
import {useQuery} from "react-query";

export default function TickDisplay(props: any) {

    const {symbol} = props
    const { data, status } = useQuery(`tick-${symbol}`, () => fetchTick(symbol))

    const [ticksData, setTicksData] = useState<Tick | null>(null)
    // error management
    // could be replaced by global error management system
    const [error, setError] = useState<string>("")

    useEffect(() => {
        // clear error
        setError("")
        // set error message for blank page
        if (!symbol) setError("No pair was provided!")

        if (!!symbol) {
            if (status === "error") setError("Error while retrieving pair ticks data")
            if (!!data) setTicksData(data.data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, status])

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

    if (status === "error" || error) return <ErrorAlert text={error} />

    if (status === "loading") return <Skeleton width={"100%"} height={150} />

    if (!ticksData && status === "success") return <Typography fontWeight={700}>No tick data available for this pair</Typography>

    return (
        <>
            <Grid container spacing={4} justifyContent={"center"}>
                <Grid item xs={12} lg={3}>
                    <RawDataDisplay title={"Pair"} data={symbol} primary />
                </Grid>

                {displayDataGrid()}
            </Grid>
        </>
    )
}
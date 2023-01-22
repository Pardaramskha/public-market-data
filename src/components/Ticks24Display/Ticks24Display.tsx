import React, {useEffect, useState} from "react"
// MUI
import {Grid, Skeleton, Typography} from "@mui/material"
// interface
import {Tick24} from "../../interfaces/interfaces"
// Components
import RawDataDisplay from "../RawDataDisplay/RawDataDisplay"
import ErrorAlert from "../ErrorAlert/ErrorAlert"
// functions
import {returnDateFromTimestamp} from "../../functions/functions"
import {useQuery} from "react-query";
// API
import {fetchDailyTick} from "../../api/apiCalls";

export default function Ticks24Display(props: any) {

    const {symbol} = props
    const { data, status } = useQuery(symbol, () => fetchDailyTick(symbol))

    const [ticksData, setTicksData] = useState<Tick24 | null>(null)
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
                { label: "Date", data: returnDateFromTimestamp(ticksData?.time) },
                { label: "Average price", data: ticksData.averagePrice },
                { label: "Best ask", data: ticksData.buy },
                { label: "Best bid", data: ticksData.sell },
                { label: "Volume", data: ticksData.vol },
                { label: "Change rate", data: ticksData.changeRate },
                { label: "Change price", data: ticksData.changePrice },
                { label: "Volume value", data: ticksData.volValue },
                { label: "Highest price", data: ticksData.high },
                { label: "Lowest price", data: ticksData.low },
                { label: "Last price", data: ticksData.last },
                { label: "Taker fee rate", data: ticksData.takerFeeRate },
                { label: "Maker fee rate", data: ticksData.makerFeeRate },
                { label: "Taker coefficient", data: ticksData.takerCoefficient },
                { label: "Maker coefficient", data: ticksData.makerCoefficient },
            ]

            return (
                <>
                    {
                        dataMap.map((object, index:number) => {
                            return <Grid item key={index}><RawDataDisplay title={object.label} data={object.data} /></Grid>
                        })
                    }
                </>
            )
        }
    }

    if (status === "error" || error) return <ErrorAlert text={error} />

    if (status === "loading") return <Skeleton width={"100%"} height={150} />

    if (!data && status === "success") return <Typography fontWeight={700}>No ticks data available for this pair</Typography>

    return (
        <>
            <Grid container spacing={4} justifyContent={"center"}>
                <Grid item>
                    <RawDataDisplay title={"Pair"} data={symbol} primary />
                </Grid>

                {displayDataGrid()}
            </Grid>
        </>
    )
}
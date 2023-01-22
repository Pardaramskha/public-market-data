import React, {useEffect, useState} from "react"
// MUI
import {Grid, Typography} from "@mui/material"
// interface
import {Tick24} from "../../interfaces/interfaces"
// API
import {APIGet} from "../../api/apiCalls"
// Components
import RawDataDisplay from "../RawDataDisplay/RawDataDisplay"
import ErrorAlert from "../ErrorAlert/ErrorAlert"
// functions
import {returnDateFromTimestamp} from "../../functions/functions"

export default function Ticks24Display(props: any) {

    const {symbol} = props

    const [ticksData, setTicksData] = useState<Tick24 | null>(null)
    // could be replaced by global error management system
    const [error, setError] = useState<string>("")

    useEffect(() => {
        if (!!symbol) fetchTick().then()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol])


    const fetchTick = async () => {
        // TODO: could be placed in .env
        let uri = `https://openapi-sandbox.kucoin.com/api/v1/market/stats?symbol=${symbol}`

        APIGet(uri)
            .then((res: any) => { if (!!res.parsedBody) setTicksData(res.parsedBody.data) })
            .catch(() => setError("Error while retrieving pair ticks data"))
    }

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

    if (!ticksData) return <Typography fontWeight={700}>No ticks data available for this pair</Typography>

    return (
        <>
            <Grid container spacing={4} justifyContent={"center"}>
                <Grid item>
                    <RawDataDisplay title={"Pair"} data={symbol} primary />
                </Grid>

                {displayDataGrid()}

                {error && <Grid item xs={12} lg={7}><ErrorAlert text={error} /></Grid>}
            </Grid>
        </>
    )
}
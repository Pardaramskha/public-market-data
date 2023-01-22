import React, {useEffect, useState} from "react"
// API
import {APIGet} from "../../api/apiCalls"
// MUI
import {Button, Grid, List, ListItem} from "@mui/material"
// Functions
import {returnDateFrom19Timestamp} from "../../functions/functions"
// Components
import ErrorAlert from "../ErrorAlert/ErrorAlert"
// Interfaces
import {Trade} from "../../interfaces/interfaces"


export default function TradesDisplay(props: any) {

    const {symbol} = props

    const [tradesData, setTradesData] = useState<Trade[] | null>(null)
    const [sortedTrades, setSortedTrades] = useState<Trade[] | null>(null)
    // filters
    const [activeFilter, setActiveFilter] = useState<string>("")
    // could be replaced by global error management system
    const [error, setError] = useState<string>("")

    useEffect(() => {
        if (!!symbol) fetchTrades().then()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbol])

    useEffect(() => {
        if (!tradesData) return
        if (!sortedTrades) sortTrades()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tradesData])

    useEffect(() => {
        sortTrades()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilter])

    // fetch data
    const fetchTrades = async () => {
        if (!!tradesData) return null
        // TODO: could be placed in .env
        let uri = `https://openapi-sandbox.kucoin.com/api/v1/market/histories?symbol=${symbol}`

        APIGet(uri)
            .then((res: any) => { if (!!res.parsedBody) setTradesData(res.parsedBody.data) })
            .catch(() => setError("Error while retrieving pair trades data"))
    }

    // sort data
    const sortTrades = () => {
        if (tradesData && tradesData.length > 1) {
            let _trades
            switch (activeFilter) {
                case "date":
                    _trades = tradesData.sort((x: Trade, y: Trade) => {
                        return x.time - y.time
                    })
                    setSortedTrades(_trades)
                    break;
                case "buy":
                    _trades = tradesData?.filter((trade: Trade) => {
                        return trade.side === "buy"
                    })
                    setSortedTrades(_trades)
                    break;
                case "sell":
                    _trades = tradesData?.filter((trade: Trade) => {
                        return trade.side === "sell"
                    })
                    setSortedTrades(_trades)
                    break;
                case "none":
                case "":
                    setSortedTrades(tradesData); break;
                default: setSortedTrades(tradesData)
            }
        }
    }

    // components display
    const displayFilterButtons = () => {

        const filterButtons = [
            { label: "Show buying side", key: "buy" },
            { label: "Show selling side", key: "sell" },
            { label: "Sort by date", key: "date" },
            { label: "Disable filters", key: "" },
        ]

        return (
            <>
                {
                    filterButtons.map((button, index: number) => {
                        return (
                            <Button
                                variant={!!activeFilter && activeFilter === button.key ? "contained" : "outlined"}
                                onClick={() => setActiveFilter(button.key)}
                                disableElevation
                                sx={{ mr: 1 }}
                                key={index}
                            >
                                {button.label}
                            </Button>
                        )
                    })
                }
            </>
        )
    }

    const displayDataGrid = () => {
        return (
            <>
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
            </>
        )
    }

    return (
        <>
            <List>
                <ListItem>
                    {displayFilterButtons()}
                </ListItem>
                <ListItem>
                    <Grid container spacing={2} justifyContent={"space-between"}>
                        <Grid item xs={10} lg={3} textAlign={"center"}>Time</Grid>
                        <Grid item xs={10} lg={3} textAlign={"center"}>Side</Grid>
                        <Grid item xs={10} lg={3} textAlign={"center"}>Price</Grid>
                        <Grid item xs={10} lg={3} textAlign={"center"}>Size</Grid>
                    </Grid>
                </ListItem>

                {displayDataGrid()}

                {error && <ErrorAlert text={error} />}
            </List>
        </>
    )
}
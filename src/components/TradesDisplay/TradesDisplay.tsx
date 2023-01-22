import React, {useEffect, useState} from "react"
// API
import {fetchTrades} from "../../api/apiCalls"
// MUI
import {Button, Grid, List, ListItem, Skeleton, Typography} from "@mui/material"
// Functions
import {returnDateFrom19Timestamp} from "../../functions/functions"
// Components
import ErrorAlert from "../ErrorAlert/ErrorAlert"
// Interfaces
import {Trade} from "../../interfaces/interfaces"
// Queries
import {useQuery} from "react-query";
// Styles
import {styles} from "./styles";

export default function TradesDisplay(props: any) {

    const {symbol} = props
    const { data, status } = useQuery(`trades-${symbol}`, () => fetchTrades(symbol))

    const [tradesData, setTradesData] = useState<Trade[] | null>(null)
    const [sortedTrades, setSortedTrades] = useState<Trade[] | null>(null)
    // filters
    const [activeFilter, setActiveFilter] = useState<string>("")
    // error management
    // could be replaced by global error management system
    const [error, setError] = useState<string>("")

    // init data hydration
    useEffect(() => {
        // clear error
        setError("")
        // set error message for blank page
        if (!symbol) setError("No pair was provided!")

        if (!!symbol) {
            if (status === "error") setError("Error while retrieving pair trades data")
            if (!!data) setTradesData(data.data); console.log(data)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, status])

    // init filtered data hydration
    useEffect(() => {
        if (!tradesData) return
        if (!sortedTrades) sortTrades()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tradesData])

    // sort trades on filter change
    useEffect(() => {
        sortTrades()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFilter])

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
                                sx={styles.filterButtons}
                                disabled={!sortedTrades || sortedTrades.length === 0}
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

        if (!sortedTrades || sortedTrades.length === 0) return(
            <ListItem>
                <Typography fontWeight={700}>No trade data for this pair</Typography>
            </ListItem>
        )

        return (
            <>
                {
                    !!sortedTrades && sortedTrades.map((trade: Trade, index: any) => {
                        return (
                            <ListItem
                                key={index}
                                sx={{
                                    ...styles.tradeListItem,
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

    if (status === "error" || error) return <ErrorAlert text={error} />

    if (status === "loading") return <Skeleton width={"100%"} height={150} />

    return (
        <>
            <List>
                <ListItem>
                    {displayFilterButtons()}
                </ListItem>
                <ListItem sx={styles.tableHeader}>
                    <Grid container spacing={2} justifyContent={"space-between"}>
                        {
                            ["Time", "Side", "Price", "Size"].map((el: string, index: number) => (
                                <Grid item xs={10} lg={3} textAlign={"center"} key={index}>
                                    <Typography fontWeight={700} color={"primary"}>{el}</Typography>
                                </Grid>
                            ))
                        }
                    </Grid>
                </ListItem>

                {displayDataGrid()}
            </List>
        </>
    )
}
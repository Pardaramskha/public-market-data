import React, {FormEvent, useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
// API
import {APIGet} from "../api/apiCalls"
// MUI
import {Button, Container, Grid, MenuItem, Paper, Select, Typography} from "@mui/material";
// Components
import ErrorAlert from "../components/ErrorAlert/ErrorAlert"


export default function Home() {

    const navigate = useNavigate()

    // states
    const [symbols, setSymbols] = React.useState<string[]>([])
    const [selectedSymbol, setSelectedSymbol] = React.useState<any>("a")
    // could be replaced by global error management system
    const [error, setError] = useState<string>("")

    const styles = {
        container: { p: 10 },
        paper: { p: 3 },
        selectMenu: { maxHeight: 300 }
    }

    useEffect(() => {
        fetchData().then()
    }, [])

    useEffect(() => {
        if (!!symbols && symbols.length > 1) setSelectedSymbol(symbols[0])
    }, [symbols])

    // fetch
    const fetchData = async () => {
        let uri = "https://openapi-sandbox.kucoin.com/api/v1/symbols"

        APIGet(uri)
            .then((res: any) => {
                if (!!res.parsedBody) {
                    let _symbols: any = []
                    res.parsedBody.data.forEach((symbol: any) => {
                        _symbols = [..._symbols, symbol.symbol]
                    })
                    setSymbols(_symbols)
                }
            })
            .catch(() => setError(
                    "Error while loading pair data. " +
                    "This may be due to a CORS policy limitation from KUCOIN public API. " +
                    "Read project documentation to learn how to avoid it."
                )
            )
    }

    // handleSearch function for form confirmation
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate(`/details?symbol=${selectedSymbol}`)
    }

    // display
    const displaySymbolSelector = () => {

        if (!symbols || symbols.length === 0) return <></>

        return (
            <Select
                size={"small"}
                fullWidth
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                MenuProps={{ sx: styles.selectMenu }}
            >
                {symbols.map((symbol: any, index: number) => (
                    <MenuItem key={index} value={symbol}>
                        {symbol}
                    </MenuItem>
                ))}
            </Select>
        )
    }

    return (
        <>
            <Container sx={styles.container}>
                <Paper variant={"outlined"} sx={styles.paper}>

                    <form onSubmit={(e) => handleSearch(e)}>
                        <Grid container justifyContent={"center"} spacing={4}>
                            <Grid item xs={12}>
                                <Typography variant={"h4"} component={"h1"} align={"center"}>
                                    Public market data
                                </Typography>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                {displaySymbolSelector()}
                            </Grid>
                            <Grid item xs={12} lg={"auto"} textAlign={"center"}>
                                <Button variant={"contained"} size={"small"} type={"submit"}>
                                    Search
                                </Button>
                            </Grid>

                            <Grid item xs={12} lg={7}>
                                <ErrorAlert text={error} />
                            </Grid>
                        </Grid>
                    </form>

                </Paper>
            </Container>
        </>
    )
}
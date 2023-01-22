import React, {FormEvent, useEffect, useState} from "react"
import {useNavigate} from "react-router-dom"
// API
import {fetchSymbolsList} from "../api/apiCalls"
// MUI
import {Autocomplete, Button, Container, Grid, Paper, Skeleton, TextField, Typography} from "@mui/material";
// Components
import ErrorAlert from "../components/ErrorAlert/ErrorAlert"
// Queries
import {useQuery} from "react-query";

export default function Home() {

    const navigate = useNavigate()
    const { data, status } = useQuery('symbolsList', fetchSymbolsList)

    // states
    const [symbols, setSymbols] = useState<string[]>([])
    const [selectedSymbol, setSelectedSymbol] = useState<any>("a")
    // autocomplete
    const [autocompleteValue, setAutocompleteValue] = useState<any>("")
    // error management
    // could be replaced by global error management system
    const [error, setError] = useState<string>("")

    const styles = {
        container: { p: { xs: 3, md: 6, xl: 10 } },
        paper: { p: 3 },
        selectMenu: { maxHeight: 300 },
        buttonWrapper: { display: "flex", justifyContent: "center", alignItems: "center" }
    }

    useEffect(() => {
        // clear error
        setError("")

        // set error message
        if (status === "error") {
            setError(
                "Error while loading pair data. " +
                "This may be due to a CORS policy limitation from KUCOIN public API. " +
                "Read project documentation to learn how to avoid it."
            )
        }

        // map data when provided
        if (!!data && symbols.length === 0 ) {
            let _symbols: any = []
            data.data.forEach((symbol: any) => {
                _symbols = [..._symbols, symbol.symbol]
            })
            setSymbols(_symbols)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, status])

    useEffect(() => {
        if (!!symbols && symbols.length > 1) setSelectedSymbol(symbols[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [symbols])

    // handleSearch function for form confirmation
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        navigate(`/details?symbol=${selectedSymbol}`)
    }

    // display
    const displaySymbolSelector = () => {
        // loading
        if (status === "loading") return <Grid item xs={12}><Skeleton width={"100%"} height={64} /></Grid>
        // no symbols provided, mostly because of a CORS error
        if (!symbols || symbols.length === 0) return <></>

        return (
            <>
                <Grid item xs={12} sm={6} md={5} lg={4} xl={3}>
                    <Autocomplete
                        value={selectedSymbol}
                        onChange={(e: any, selected: string | null) => setSelectedSymbol(selected)}
                        inputValue={autocompleteValue}
                        onInputChange={(e, newInputValue) => setAutocompleteValue(newInputValue)}
                        renderInput={(params) => <TextField {...params} label={"Pairs"} />}
                        options={symbols}
                    />
                </Grid>
                <Grid item xs={12} lg={"auto"} textAlign={"center"} sx={styles.buttonWrapper}>
                    <Button
                        variant={"contained"}
                        type={"submit"}
                        disabled={!selectedSymbol}
                    >
                        Search
                    </Button>
                </Grid>
            </>
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

                            {displaySymbolSelector()}

                            {error && <Grid item xs={12} lg={7}><ErrorAlert text={error} /></Grid>}
                        </Grid>
                    </form>

                </Paper>
            </Container>
        </>
    )
}
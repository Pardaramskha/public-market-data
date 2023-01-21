import React, {useState} from "react"
import {Link, useSearchParams} from "react-router-dom";
// MUI
import {Container, Grid, Paper, Tabs, Tab, Typography, Button} from "@mui/material";
// Components
import DetailsTicks from "../components/TicksDisplay/DetailsTicks";
// Interfaces
import {TabPanelProps} from "../interfaces/interfaces";
import TradesDisplay from "../components/TradesDisplay/TradesDisplay";

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`pair-details-panel-${index}`}
            aria-labelledby={`pair-details-panel-${index}`}
            {...other}
        >
            {value === index && (<>{children}</>)}
        </div>
    );
}

function commonTabProps(index: number) {
    return {
        id: `pair-details-tab-${index}`,
        'aria-controls': `pair-details-panel-${index}`,
    };
}

export default function PairDetails() {

    const [params] = useSearchParams()
    const [selectedTab, setSelectedTab] = useState<number>(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <>
            <Container maxWidth={"lg"}>
                <Paper variant={"outlined"} sx={{ width: "100%", p: 4 }}>
                    <Grid container justifyContent={"center"} spacing={4}>
                        <Grid item>
                            <Button component={Link} to={"/"} variant={"outlined"}>
                                Back
                            </Button>
                        </Grid>
                        <Grid item xs={10} sx={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
                            <Typography variant={"h5"} component={"h1"}>
                                Pair details
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Tabs value={selectedTab} onChange={handleChange} aria-label="pair details tabs">
                                <Tab label="Ticks" {...commonTabProps(0)} />
                                <Tab label="Ticks 24h" {...commonTabProps(1)} />
                                <Tab label="Trades" {...commonTabProps(2)} />
                            </Tabs>
                        </Grid>
                        <Grid item xs={12}>
                            <TabPanel value={selectedTab} index={0}>
                                <DetailsTicks symbol={params.get("symbol")} />
                            </TabPanel>
                            <TabPanel value={selectedTab} index={1}>
                                Item Two
                            </TabPanel>
                            <TabPanel value={selectedTab} index={2}>
                                <TradesDisplay symbol={params.get("symbol")} />
                            </TabPanel>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    )
}
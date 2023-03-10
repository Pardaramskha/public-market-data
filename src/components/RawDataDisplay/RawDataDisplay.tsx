import React from "react"
// MUI
import {Paper, Typography} from "@mui/material";
// styles
import {styles} from "./styles";

export default function RawDataDisplay(props: any) {

    const {title, data, primary} = props

    return (
        <Paper elevation={0} sx={styles.paper}>
            <Typography variant={"body2"} component={"p"}>
                {title}
            </Typography>
            <Typography variant={"h6"} component={"p"} fontWeight={700} color={primary ? "primary" : "text"}>
                {!!data ? data : "No data"}
            </Typography>
        </Paper>
    )
}
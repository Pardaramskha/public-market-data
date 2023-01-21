import React from "react"
// MUI
import {Alert, Collapse} from "@mui/material";
// interfaces
import {ErrorAlertProps} from "../../interfaces/interfaces";

export default function ErrorAlert(props: ErrorAlertProps) {

    const {text} = props

    return (
        <Collapse in={Boolean(text)}>
            <Alert severity={"error"}>
                {text}
            </Alert>
        </Collapse>
    )
}

const returnDateFromTimestamp = (timestamp: number) => {
    let date = new Date(timestamp)
    return date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();

}

// TODO: debug
const returnDateFrom19Timestamp = (timestamp: number) => {
    let _time = timestamp.toString().substring(0,13)
    let date = new Date(_time as unknown as number)
    return date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();
}

export {returnDateFromTimestamp, returnDateFrom19Timestamp}
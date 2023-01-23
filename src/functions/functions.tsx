
const returnDateFromTimestamp = (timestamp: number) => {
    let date = new Date(timestamp)
    return date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();

}

const returnDateFrom19Timestamp = (timestamp: number) => {
    let date = new Date(timestamp / 1000000)
    return date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();
}

export {returnDateFromTimestamp, returnDateFrom19Timestamp}
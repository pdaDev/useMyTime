


//compare to deffretn time values and return true if first is bigger then second
export const CompareToTimes = (time1: string, time2: string) => {
    const timeParts1 = time1.split(':')
    const timeParts2 = time2.split(':')
    if (timeParts1[0] > timeParts2[0]) {
        return true
    }
    if (timeParts2[0] === timeParts1[0]) {
        if (timeParts2[1] > timeParts1[1]) {
            return true
        }
        if (timeParts2[1] === timeParts1[1]) {
            if (timeParts1[2] > timeParts2[1]) {
                return  true
            }
        }
    }
    return false
}


export const getTimeInFewHours = (time: string, hours: number = 0) => {
    const timeParts = time.split(':')
    let newHour = +timeParts[0] + hours
    newHour = newHour >= 24 ? newHour - 24 : newHour
    timeParts[0] = newHour.toString().padStart(2, '')
    return timeParts.join(':')
}
export const roundTImeToHalf = (time: string) => {
    const timeParts = time.split(':')
    const nextHour = +timeParts[1] > 30
    timeParts[2] = '00'
    timeParts[1] = nextHour ? '00' : '30'
    timeParts[0] = nextHour ? getTimeInFewHours(time).split(":")[0] : timeParts[0]
    return timeParts.join(':')
}

export const findPeriodDuration = (timeStart: string, timeEnd: string) => {
    const timeStartParts = timeStart.split(':')
    const timeEndParts = timeEnd.split(':')
    let resultHour = +timeEndParts[0] - +timeStartParts[0]
    let resultMinute = +timeEndParts[1] - +timeStartParts[1]
    let resultSecond = +timeEndParts[2] - +timeStartParts[2]
    if (resultMinute < 0) {
        resultMinute = 60 + resultMinute
        resultHour = resultHour - 1
    }
    if (resultSecond < 0) {
        resultSecond = 60 + resultSecond
        resultMinute = resultMinute - 1
    }
    return `${resultHour.toString().padStart(2, '0')}:${resultMinute.toString().padStart(2, '0')}:${resultSecond.toString().padStart(2, '0')}`
}

export const getTimeWithoutSeconds = (time: string) => {
    const timeParts = time.split(':')
    return `${timeParts[0]}:${timeParts[1]}`
}

export const getHour = (time: string) => {
    return +time.split(':')[0]
}
export const getMinute = (time: string) => {
    return +time.split(':')[1]
}
export const getSecond = (time: string) => {
    return +time.split(':')[2]
}

export const convertTimeToCountOfSeconds = (time: string) => {
    const timeParts = time.split(':')
    return +timeParts[0] * 3600 + +timeParts[1] * 60 + +timeParts[2]
}
export const convertSecondsToTimeFormat = (countOfSec: number) => {
    const hours = Math.floor(countOfSec / 3600)
    const minutes = Math.floor((countOfSec - 3600 * hours) / 60 )
    const seconds = countOfSec - minutes * 60 - hours * 3600
    return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2,'0')}`
}
export const splitIntoIntervals = ( timeStart: string, timeEnd: string, countOfIntervals: number ) => {
    const timeStartInSec = convertTimeToCountOfSeconds(timeStart)
    const intervalDurationInseconds = Math.floor(convertTimeToCountOfSeconds(findPeriodDuration(timeStart, timeEnd)) / countOfIntervals)
    return Array.apply(null, new Array(countOfIntervals))
        .map((_, i) => convertSecondsToTimeFormat(timeStartInSec + intervalDurationInseconds * i))
}

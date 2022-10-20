


export const addSecondToToTimer = (time: string) => {
    const timeParts = time.split(':')
    let sec = +timeParts[2] + 1
    let min = +timeParts[1]
    let h = +timeParts[0]
    if (sec >= 60) {
        sec = 0
        min += 1
    }
    if (min >= 60) {
        min = 0
        h += 1
    }
    return `${h.toString().padStart(2,'0')}:${min.toString().padStart(2,'0')}:${sec.toString().padStart(2,'0')}`

}
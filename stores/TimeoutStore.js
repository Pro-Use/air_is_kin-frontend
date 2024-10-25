export const useTimeout = defineStore('timeout', () => {
    const timer = 90000
    let timeoutID = null
    const timedOut = ref(false)
    const ignore = ['index']
    const isPlaying = ref(false)

    const timeOut = () => {
        console.log('(re)setting timer')
        timeoutID = setTimeout(() => {
            timedOut.value = true
            console.log('Timed Out')
        }, timer)
    }

    const setTimer = () => {
        const route = useRoute()
        const to_ignore = ignore.findIndex((page) => page == route.name)
        console.log(`route name: ${route.name}, ignore val: ${to_ignore}`)
        if (to_ignore == -1 && !isPlaying.value) {
            console.log('playing', isPlaying.value)
            if (timeoutID) {
                clearTimeout(timeoutID)
            }
            timedOut.value = false
            timeOut()
        } else if (timeoutID) {
            stopTimer()
        }
    }

    const stopTimer = () => {
        console.log('Stopping Timer')
        if (timeoutID) {
            clearTimeout(timeoutID)
            timeoutID = null
        }
    }

    const nowPlaying = () => {
        console.log("playing")
        isPlaying.value = true
        setTimer()
    }

    const notPlaying = () => {
        console.log("not playing")
        isPlaying.value = false
        setTimer()
    }

    setTimer()

    return { timedOut, setTimer, stopTimer, nowPlaying, notPlaying }
})
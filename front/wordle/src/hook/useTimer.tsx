import { useState, useEffect } from 'react'

const useTimer = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    let interval = 0
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [seconds])

  const resetTimer = () => {
    setSeconds(initialSeconds)
  }

  return { seconds, resetTimer }
}

export default useTimer

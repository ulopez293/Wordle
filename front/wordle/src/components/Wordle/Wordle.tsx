import { LAST_ATTEMP_CHANGE, MAX_LARGE_WORDS, TIMER_SECONDS } from '../../constants/Constants'
import { useEffect, useState } from 'react'
import Board from '../Board/Board'
import useTimer from '../../hooks/useTimer'
import { useAtom } from 'jotai'
import { tokenDataAtom, userDataAtom } from '../../state/atoms'
import words from 'an-array-of-spanish-words'
import { useNavigate } from 'react-router-dom'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'
import Modal from 'react-modal'
import { Server } from '../../enums/Server'
Modal.setAppElement('#root')

interface SpanishWords extends Array<string> { includes: (searchValue: string, fromIndex?: number) => boolean }
const spanishWords = words as SpanishWords
const getRandomWord = (wordsArray: SpanishWords) => {
  const fiveLetterWords = wordsArray.filter(word => word.length === 5)
  const randomIndex = Math.floor(Math.random() * fiveLetterWords.length)
  return fiveLetterWords[randomIndex]
}

const Wordle = () => {
  const navigate = useNavigate()
  const [userData, setUserData] = useAtom(userDataAtom)
  const [tokenData, ] = useAtom(tokenDataAtom)
  const [guess, setGuess] = useState('')
  const [accomplishedAttempts, setAccomplishedAttempts] = useState(0)
  const [resetMatrix, setResetMatrix] = useState(false)
  const { seconds, resetTimer } = useTimer(TIMER_SECONDS)
  const [showModal, setShowModal] = useState(false)

  const [result, setResult] = useState(false)
  const [localWins, setLocalWins] = useState(0)
  const [localLosses, setLocalLosses] = useState(0)

  const [wordToGuess, setWordToGuess] = useState(getRandomWord(spanishWords))
  const [readywittedWord, setReadywittedWord] = useState(``)

  useEffect(() => { if (userData.name === ``) navigate('/') }, [userData])

  useEffect(() => {
    if (seconds === 0 && !result) {
      setLocalLosses(localLosses + 1)
      setUserData({ ...userData, losses: userData.losses + 1 })
      setResult(true)
      setGuess('')
    }
  }, [seconds])

  const reset = async () => {
    try {
      const response = await fetch(Server.Host + `user`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "authorization": tokenData
        },
        body: JSON.stringify({ name: userData.name, games: userData.games, wins: userData.wins, losses: userData.losses, word: readywittedWord})
      })
      await response.json()
      setWordToGuess(getRandomWord(spanishWords))
      setResetMatrix(true)
      setAccomplishedAttempts(0)
      resetTimer()
      setResult(false)
      setShowModal(false)
      setReadywittedWord(``)
    } catch (error) {
      console.log(error)
    }
  }

  const checkWord = () => {
    if (guess.trim().length !== MAX_LARGE_WORDS) return
    if (!spanishWords.includes(guess.trim())) { alert(`Palabra Inexistente`); return }

    if (accomplishedAttempts === LAST_ATTEMP_CHANGE) {
      setResult(true)
      if (guess.trim() !== wordToGuess) {
        setLocalLosses(localLosses + 1)
        setUserData({ ...userData, losses: userData.losses + 1 })
      }
    }
    if (guess.trim() === wordToGuess) {
      setResult(true)
      setLocalWins(localWins + 1)
      setUserData({ ...userData, wins: userData.wins + 1 })
      setReadywittedWord(wordToGuess)
    }

    setGuess('')
    setAccomplishedAttempts(accomplishedAttempts + 1)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, '')
    setGuess(value)
  }

  const seeResult = () => {
    setUserData({ ...userData, games: userData.games + 1 })
    setShowModal(true)
  }

  return (
    <div>
      <p className="mb-4 mt-3">
        <small>
          User: {userData.name} | local wins: {localWins} | local losses: {localLosses}<br />
          Next Word, Time: {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60} |
          Attemps: {accomplishedAttempts}
        </small>
      </p>
      <Board word={guess} wordToGuess={wordToGuess} attempted={accomplishedAttempts} reset={resetMatrix} setReset={setResetMatrix} />
      {!result ?
        <div className="input-container">
          <input type="text" value={guess} onChange={handleChange} maxLength={5} />
          <button onClick={checkWord}>Check</button>
        </div> :
        <button onClick={seeResult}>See Result</button>
      }
      {/* teclado opcional */}{/* <Keyboard style={{ position: `absolute`, width: `100%`, left: `0`, right: `0`, bottom: `auto` }}/> */}
      <Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} contentLabel="modal" >
        <div className='text-center'>
          <br />
          <h4>- Estadisticas -</h4>
          <hr />
          <p className="font-weight-bold">User: {userData.name}</p>
          <p className="font-weight-bold">Total Wins: {userData.wins}</p>
          <p className="font-weight-bold">Total Losses: {userData.losses}</p>
          <p className="font-weight-bold">Total Games: {userData.games}</p>
          <p className="font-weight-bold">Right Word: {wordToGuess}</p>
          <hr />
          <button type="button" className="btn btn-success btn-sm btn-block" onClick={reset}>New Game</button>
        </div>
      </Modal>
    </div>
  )
}

export default Wordle

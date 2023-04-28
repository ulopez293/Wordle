import React, { useEffect, useState } from 'react'
import './Board.css'

interface BoardProps {
    word: string
    wordToGuess: string
    attempted: number
    reset: boolean
    setReset: React.Dispatch<React.SetStateAction<boolean>>
}

const initialStateMatrix = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

const Board: React.FC<BoardProps> = ({ word, attempted, reset, setReset, wordToGuess }) => {
    const [matrix, setMatrix] = useState(initialStateMatrix)

    useEffect(() => {
        if (reset) {
            setMatrix([...initialStateMatrix])
            setReset(false)
        }
    }, [reset])

    useEffect(() => {
        if (attempted >= 5) return
        setMatrix(prevMatrix => {
            const updatedMatrix = [...prevMatrix]
            updatedMatrix[attempted] = [word[0], word[1], word[2], word[3], word[4]]
            return updatedMatrix
        })
    }, [word, attempted])


    const isLetterInWord = (letter: string, position: number): boolean => {
        return wordToGuess.includes(letter) && wordToGuess.indexOf(letter) !== position && matrix.some(row => row.includes(letter));
    }
    
    const renderMatrix = () => {
        return matrix.map((row, indexRows) => (
            <div key={indexRows} className="board__row">
                {row.map((value, indexCells) => {
                    const guessedLetter = value;
                    const actualLetter = wordToGuess[indexCells];
                    let colorClass = '';
                    if (indexRows < attempted) {
                        if (guessedLetter === actualLetter) {
                            colorClass = 'board__cell--green';
                        } else if (guessedLetter && isLetterInWord(guessedLetter, indexCells)) {
                            colorClass = 'board__cell--yellow';
                        }
                    }
                    return (
                        <div key={`${indexRows}-${indexCells}`} className={`board__cell ${colorClass}`}>
                            {value || ''}
                        </div>
                    );
                })}
            </div>
        ));
    }



    return <div className="board mb-4">{renderMatrix()}</div>
}

export default Board

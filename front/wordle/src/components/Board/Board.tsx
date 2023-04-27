import React, { useEffect, useState } from 'react'
import './Board.css'

interface BoardProps {
    word: string
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

const Board: React.FC<BoardProps> = ({ word, attempted, reset, setReset }) => {
    const [matrix, setMatrix] = useState(initialStateMatrix)

    useEffect(() => { 
        if (reset) {
            setMatrix([...initialStateMatrix])
            setReset(false)
        }
    }, [reset])

    useEffect(() => {
        setMatrix(prevMatrix => {
            const updatedMatrix = [...prevMatrix]
            updatedMatrix[attempted] = [word[0], word[1], word[2], word[3], word[4]]
            return updatedMatrix
        })
    }, [word, attempted])

    const renderMatrix = () => {
        return matrix.map((row, i) => (
            <div key={i} className="board__row">
                {row.map((value, j) => (
                    <div key={`${i}-${j}`} className="board__cell">
                        {value || ""}
                    </div>
                ))}
            </div>
        ))
    }


    return <div className="board mb-4">{renderMatrix()}</div>
}

export default Board

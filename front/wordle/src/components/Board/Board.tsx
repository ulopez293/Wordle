import React, { useEffect, useState } from 'react'
import './Board.css'

interface BoardProps {
    word: string
    attempted: number
}

const Board: React.FC<BoardProps> = ({ word, attempted }) => {
    const [matrix, setMatrix] = useState([
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
    ])

    useEffect(() => {
        setMatrix(prevMatrix => {
            const updatedMatrix = [...prevMatrix]
            updatedMatrix[attempted] = [word[0], word[1], word[2], word[3], word[4]]
            return updatedMatrix
        })
    }, [word, attempted])

    const renderMatrix = () => {
        const grid = []
        for (let i = 0; i < 5; i++) {
            const row = []
            for (let j = 0; j < 5; j++) {
                const value = matrix[i][j]
                row.push(<div key={`${i}-${j}`} className="board__cell">{value ? value : ""}</div>)
            }
            grid.push(<div key={i} className="board__row">{row}</div>)
        }
        return grid
    }


    return <div className="board mb-5">{renderMatrix()}</div>
}

export default Board

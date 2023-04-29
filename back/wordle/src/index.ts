import express, { Request, Response } from 'express'
import morgan from 'morgan'
import { validateToken } from './middleware/validateToken'
import cors from 'cors'
import { connectionDB } from './database/connectionDB'
import User from './models/User'
import Word from './models/Word'
import jwt from 'jsonwebtoken'
import { Secret } from './enums/Secret'

const app = express()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use(morgan(`dev`))


app.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await User.find()
        res.json({ status: 200, users })
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
})

app.get('/words', async (req: Request, res: Response) => {
    try {
        const words = await Word.find()
        res.json({ status: 200, words })
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
})

app.post('/user', async (req: Request, res: Response) => {
    try {
        const { name } = req.body
        console.log(req.body)
        if (name === undefined || name === null || name === ``) throw new Error
        let user = await User.findOne({ name })
        if (!user) {
            user = new User({ name, games: 0, wins: 0, losses: 0 })
            await user.save()
        }
        const token = `Bearer ` + jwt.sign({ id: name }, Secret.Key)
        res.json({ status: 200, message: 'Datos recibidos correctamente', token, user })
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
})

//protected
app.put('/user', validateToken, async (req: Request, res: Response) => {
    try {
        const {name, games, wins, losses, word } = req.body
        if (name === undefined || name === null || name === ``) throw new Error
        const user = await User.findOne({ name })
        if (!user) throw new Error('User not found')
        user.games = games
        user.wins = wins
        user.losses = losses
        await user.save()


        if (word == undefined || word == null || word == ``) { console.log(word) } else {
            let winnerWord = await Word.findOne({ word })
            if (!winnerWord) {
                winnerWord = new Word({ word, readywitted: 0 })
                await winnerWord.save()
            } else {
                winnerWord.readywitted = winnerWord.readywitted + 1
                await winnerWord.save()
            }
        }


        res.json({ status: 200, message: 'Datos recibidos correctamente' })
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
})


connectionDB()
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})

import express, { Request, Response } from 'express'
import morgan from 'morgan'
import { validateToken } from './middleware/validateToken'
import cors from 'cors'
import { connectionDB } from './database/connectionDB'
import User from './models/User'
import jwt from 'jsonwebtoken'
import { Secret } from './enums/Secret'

const app = express()
const port = 3000
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

app.post('/user', async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const { name } = req.body
        console.log(name)
        if (name === undefined || name === null || name === ``) throw new Error
        let user = await User.findOne({ name })
        if (!user) {
            user = new User({ name, games: 0, wins: 0, losses: 0 })
            await user.save()
        }
        const token = `Bearer ` + jwt.sign({ id: name }, Secret.Key)
    
        res.json({
            status: 200,
            message: 'Datos recibidos correctamente',
            token,
            user
        })
        
    } catch (error) {
        res.status(500).json({ status: 500, message: error })
    }
})

app.put('/user', validateToken, (req: Request, res: Response) => {
    // Obtén los datos enviados en el cuerpo de la solicitud
    const data = req.body
    // Realiza alguna operación con los datos recibidos
    // ...
    // Devuelve una respuesta en formato JSON
    res.json({ status: 200, message: 'Datos recibidos correctamente' })
})




connectionDB()
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})

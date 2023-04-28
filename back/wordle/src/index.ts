import express, { Request, Response }  from 'express'
import morgan from 'morgan'
import { validateToken } from './middleware/validateToken'

const app = express()
const port = 3000

app.use(express.json())
app.use(morgan(`dev`))

app.get('/', (req: Request, res: Response) => {
    res.json({ status: 200, message: 'Hello world' })
})

app.post('/api/data', validateToken, (req: Request, res: Response) => {
    // Obtén los datos enviados en el cuerpo de la solicitud
    const data = req.body
    // Realiza alguna operación con los datos recibidos
    // ...
    // Devuelve una respuesta en formato JSON
    res.json({ status: 200, message: 'Datos recibidos correctamente' });
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`)
})

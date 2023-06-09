import { NextFunction, Request, Response }  from 'express'
import jwt from 'jsonwebtoken'
import { Secret } from '../enums/Secret'

interface CustomRequest extends Request {
    authorization?: string
    user?: string | jwt.JwtPayload | undefined
}

function validateToken(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ status: 401, message: 'No se ha proporcionado el token de autenticación' })
    
    jwt.verify(token, Secret.Key, (err, user) => {
        if (err) return res.status(403).json({ status: 403, message: 'Token inválido' })
        req.user = user
        next()
    })
}

export { validateToken }
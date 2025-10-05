
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import esquema from "../models/clietSchema.js"

import * as dotenv from "dotenv"

dotenv.config()

const SECRET = process.env.SECRET

const login = async (req, res) => {

    try {
        const cliet = await esquema.findOne({email: req.body.email}).exec()
        if (!cliet) {
            res.status(401).json({
                statusCode: 401,
                message: "Usuário ou Senha Incorretos!",
                data: {}
            })
        }
        const result = bcrypt.compareSync(req.body.password, cliet.password)

        if (!result) {
            res.status(401).json({
                statusCode: 401,
                message: "Usuário ou Senha Incorretos!",
                data: {}
            })
        }

        cliet.password = undefined

        const token  = jwt.sign({cliet}, SECRET,{
            expiresIn: 300
        })
        delete cliet.password
        res.status(200).json({
            statusCode: 200,
            message: "Login Realizado com sucesso",
            data: {
                token,
                cliet
            }
        })
    } catch (error) {
            }
}

export default {
    login
}
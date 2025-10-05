import jwt from "jsonwebtoken"
import userSchema from "../models/userSchema.js";

const validateToken = async (req, res, next) => {

    try {
        if(!req.headers.authorization){ 
            return res.status(401).json({
            statusCode: 401,
            message: "Usuário Não Autorizado!",
        })}
    console.log(req.headers);
    const token  = jwt.decode(req.headers.authorization.split("Bearer ")[1])
    console.log(token);
    // Fazer aqui a validação do email e da data de expiração do token
    const user = await userSchema.findOne({email: token.user.email}).exec()
    if (user){
        next()
    } else{
        res.status(401).json({
            statusCode: 401,
            message: "Usuário Não Autorizado!",
        })
    }
    } catch (error) {
        console.error(error)
        
            }
        
    
}

export default {
    validateToken
}
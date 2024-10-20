import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../constants/Constant.js"



export const generateToken=(data)=>{
    const token = jwt.sign(data,TOKEN_SECRET,{
        expiresIn : 3600
    });
    return token;
}

export const verifyToken=(token)=>{
    return jwt.verify(token,TOKEN_SECRET);
}


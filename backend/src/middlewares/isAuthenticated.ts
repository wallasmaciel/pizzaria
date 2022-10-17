import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

type Payload = {
    sub: string;
};

function isAuthenticated(request: Request, response: Response, next: NextFunction) {
    // Receber o token
    const authToken = request.headers.authorization;
    //
    if(!authToken)
        return response.status(401)
            .end();
    // 
    const [type, token] = authToken.split(" ");

    try {
        // Validar esse token
        const { sub } = verify(token, 
            process.env.JWT_SECRET) as Payload;
        // Adicionar id do token na requisição (Request)
        request.user_id = sub;
        // 
        return next();
    }catch(err) {
        return response.status(401)
            .end();
    }
};

export default isAuthenticated;
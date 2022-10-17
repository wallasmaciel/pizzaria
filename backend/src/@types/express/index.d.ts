// Estou adicionando dentro do meu 'Express' uma propriedade 'user_id' para a interface 'Request'
declare namespace Express {
    export interface Request {
        user_id: string;
    }
};
import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController {
    async handle(request: Request, response: Response) {
        const { name, price, description, category_id } = request.body;
        const createProductService = new CreateProductService();
        // Não cadastrar um produto sem foto 
        if(!request.file) 
            throw new Error("error upload file");

        // 
        const { 
            originalname, 
            // Renomeano o filename para banner
            filename: banner 
        } = request.file;
        // 
        banner
        const product = await createProductService.execute({
            name, 
            price, 
            description, 
            banner,
            category_id
        });
        // 
        return response.json(product);
    }
};

export { CreateProductController };
import { createProduct } from "../controllers/ProductUtils";

//constants
const ID_PREFIX = "VP-";

export const createNewProduct = async (newProduct) => {
    //call create new product method
    const createdProduct = await createProduct(
        (ID_PREFIX+newProduct.name),
        newProduct.name,
        newProduct.category,
        newProduct.description,
        newProduct.color,
        newProduct.size,
        newProduct.price
    );
};
import Query from "../models/Query.js"

// on récupere tout les produits | DONE
export const getAll = async (req, res, next) => {
    const query = "SELECT * FROM product";
    try {
        const result = await Query.getAllDatas(query);
        res.status(200).json({
            msg: "All products found !",
            result: result
        });
        
    } catch (error) {
        return next(error);
    }
}

// on récupere un produit | DONE
export const getOne = async (req, res, next) => {
    const query = `SELECT * FROM product WHERE ${req.params.col_name} = ?`;

    try {
        const result = await Query.getDataByValue(query, req.params.value);
        if(result.length) {
            res.status(200).json({
                msg: "Product(s) found !",
                result: result,
            });
            return;
        }
        res.status(404).json({
            msg: "Product(s) not found !",
        })
    } catch (error) {
        return next(error);
    }
}

// on récupere les détails d'un produit | DONE
export const getDetails = async (req, res, next) => {
    const query = `SELECT * FROM product WHERE id = ?`;

    try {
        const result = await Query.getDataByValue(query, req.params.id);
        if(result.length) {
            res.status(200).json({
                msg: "Product(s) found !",
                result: result,
            });
            return;
        }
        res.status(404).json({
            msg: "Product(s) not found !",
        })
    } catch (error) {
        return next(error);
    }
}

// on créer un produit | DONE
export const create = async (req, res, next) => {
    const query = `SELECT * FROM product WHERE title = ?`;
    try {
        const result = await Query.getDataByValue(query, req.body.title);
        if(result.length) {
            res.status(409).json({
                msg: "Product already exist !",
            });
            return;
        } else {
            const datas = {
                title: req.body.title,
                description: req.body.description,
                image_name: !req.body.image_name ? "noImg.png" : req.body.image_name,
                quantityInStock: req.body.quantityInStock,
                price: req.body.price,
                category_id: req.body.category_id,
            }
            const query = "INSERT INTO product (title, description, image_name, quantityInStock, price, category_id) VALUES (?, ?, ?, ?, ?, ?)";
            try {
                await Query.save(query, datas);
                res.status(201).json({
                    msg: "Product add (+)",
                })
                
            } catch (error) {
                return next(error)
            }
        }
    } catch (error) {
        return next(error);
    }   
}

// on ajoute une image au back | DONE
export const addImg = async (req, res) => {
    try {
        await req.files.image.mv(`public/images/${req.files.image.name}`);
        res.status(200).json({
            msg: `Image added to the back' [ ${req.files.image.name} ] !`,
            url: req.files.image.name,
        })
    } catch (error) {        
        res.status(500).json({ msg: "photo can't be recover", error: error  });
    }    
}

// on update un produit | DONE
export const update = async (req, res, next) => {
    try {
        const query1 = "SELECT * FROM product WHERE id = ?";     
        const [product] = await Query.getDataByValue(query1, req.params.id);
        const datas = {
            title: !req.body.title ? product.title : req.body.title,
            description: !req.body.description ? product.description : req.body.description,
            image_name: !req.body.image_name ? product.image_name : req.body.image_name,
            quantityInStock: !req.body.quantityInStock ? product.quantityInStock : req.body.quantityInStock,
            price: !req.body.price ? product.price : req.body.price,
            category_id: !req.body.category_id ? product.category_id : req.body.category_id,
            id: req.params.id,
        }
        const query = `UPDATE product SET title = ?, description = ?, image_name = ?, quantityInStock = ?, price = ?, category_id = ? WHERE id = ?`;
    
        await Query.save(query, datas);
        res.status(200).json({
            msg: "Product updated !",
        })
    } catch (error) {
        return next(error)
    }
}

// on supprime un produit | DONE
export const remove = async (req, res, next) => {
    const query = "DELETE FROM product WHERE id = ?";
    try {
        await Query.save(query, req.params.id);
        res.status(200).json({
            msg: "Product deleted !",
        })
    } catch (error) {
        return next(error)
    }
}
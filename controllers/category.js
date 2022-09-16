import Query from '../models/Query.js';

// on créer une nouvelle catégorie | DONE
export const create = async (req, res, next) => {
    try {
        const query1 = "SELECT * FROM category WHERE category_name = ?";
        const result = await Query.getDataByValue(query1, req.body.category_name);
        if(result.length){
            res.status(409).json({
                msg: 'Category already exist !',
            });
            return;
        }
        const query2 = "INSERT INTO category (category_name) VALUES (?)";
            await Query.save(query2, req.body);
            res.status(201).json({
                msg: "Category added (+)",
            });        
    } catch (error) {
        return next(error);
    }
}

// on récupère toutes les catégories | DONE
export const getAll = async (req, res, next)=>{
    try {
        const query = "SELECT * FROM category"
        const result = await Query.getAllDatas(query);
        res.status(200).json({
            result: result,
        })
    } catch (error) {
        return next(error);
    }
}

// on supprime une catégorie | DONE
export const deleteCategory = async (req, res, next) => {
    try {
        const query = "DELETE FROM category WHERE id = ?";
        await Query.save(query, req.params.id);
        res.status(200).json({
            msg: "Category deleted (-)",
        });
    } catch (error) {
        return next(error);
    }
}
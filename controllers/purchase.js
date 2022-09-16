import Query from '../models/Query.js';

// on créer une nouvelle commande | TODO (PAS FINI)
export const create = async (req, res) => {
    try {
        const query1 = "SELECT * FROM purchase WHERE id = ?";
        const result = await Query.getAllDatas(query1);
        if(result.length){
            res.status(409).json({
                msg: 'Purchase already exist !',
            });
            return;
        }
        const query2 = "INSERT INTO purchase id VALUES (?)";
            await Query.save(query2, req.body);
            res.status(201).json({
                msg: "Purchase added (+)",
            });        
    } catch (error) {
        return next(error);
    }
}
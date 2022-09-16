import pool from '../database/db.js';

// q --> query
// d --> data
// v --> value

class Query {

    static async save(query, data){
        const [result] = await pool.execute(query, [...Object.values(data)]);
        return result; 
    }

    static async getDataByValue(query, value){
        const [result] = await pool.execute(query, [value]);
        return result;
    }

    static async getAllDatas(query){
        const [result] = await pool.execute(query);
        return result;
    }

    static async remove(query, uuid){
        const [result] = await pool.execute(query, [uuid]);
        return result;
    }

}

export default Query;
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { saltRounds } from '../config/index.js';
import jwt from 'jsonwebtoken';
import mailing from '../lib/mailing.js';

// const saltRounds = 10;
const { TOKEN_SECRET } = process.env;

import Query from '../models/Query.js';

// on récupere tout les utilisateurs | DONE
export const getAll = async (req, res, next) => {
    try {
        const query = "SELECT * FROM user";
        const users = await Query.getAllDatas(query);

        res.status(200).json({
            msg: "ALL users are get",
            result: users,
        });
        return;
    } catch (error) {
        return next(error);
    }
}

// on récupere un utilisateur | DONE
export const getOne = async (req, res, next) => {
    try {
        const query = "SELECT * FROM user WHERE uuid = ?";
        const user = await Query.getDataByValue(query, req.params.uuid);

        res.status(200).json({
            msg: "User found !",
            result: user[0],
        });
        return;
    } catch (error) {
        return next(error);
    }
}

// on créer un utilisateur | DONE
export const register = async (req, res, next) => {
    try {
        const datas = {
            email: req.body.email,
            password: await hash(req.body.password, saltRounds),
            uuid: uuidv4(),
        }

        const query1 = "SELECT * FROM user WHERE email = ?";
        const user = await Query.getDataByValue(query1, req.body.email)
        if(user.length){
            res.status(409).json({
                msg: 'User already exist !',
            });
            return;
        }
        const query2 = "INSERT INTO user (email, password, signup_date, uuid, role_id) VALUES (?, ?, NOW(), ?, 1)";
        await Query.save(query2, datas);
        mailing(req.body.email, "PROJET FINAL - Validation du compte", "Pour finaliser votre inscription vous devez valider votre compte en cliquant sur le bouton ci-dessous.", "", user.uuid);
        res.status(201).json({
            msg: "User created (+), check your mail to validate your registration",
        })
        
    } catch (error) {
        return next(error);
    }
}

// on se connecte | DONE
export const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const query1 = "SELECT * FROM user WHERE email = ?";
        const [user] = await Query.getDataByValue(query1, email);
        if(!user || (user.email !== req.body.email)){
            res.status(404).json({
                msg: "User does not exist !",
            });
            return;
        } 
        const isSame = await compare(password, user.password);        
        if(isSame){
            const TOKEN = jwt.sign({uuid: user.uuid}, TOKEN_SECRET );
            res.status(200).json({
                msg: "All infos are correct !",
                token: TOKEN,
                uuid: user.uuid,
            });
            return;
        } else {
            res.status(401).json({msg: "bad password"});
            return;            
        }
        
    } catch (error) {        
        return next(error);
    }
}

// on met à jour un utilisateur | DONE
export const update = async (req, res, next) => {
    try {
        const query = "SELECT * FROM user WHERE uuid = ?";        
        const [user] = await Query.getDataByValue(query, req.params.uuid);
        const datas = {
            alias: !req.body.alias ? user.alias : req.body.alias,
            firstname: !req.body.firstname ? user.firstname : req.body.firstname,
            lastname: !req.body.lastname ? user.lastname : req.body.lastname,
            address: !req.body.address ? user.address : req.body.address,
            zip: !req.body.zip ? user.zip : req.body.zip,
            city: !req.body.city ? user.city : req.body.city,
            phone: !req.body.phone ? user.phone : req.body.phone,
            uuid: user.uuid,
        }
        console.log('datas entry: ', datas);
        const query2 = "UPDATE user SET alias = ?, firstname = ?, lastname = ?, address = ?, zip = ?, city = ?, phone = ? WHERE uuid = ?";
        await Query.save(query2, datas);
        res.status(200).json({
            msg: "User updated (+)",
        });
        return;
    } catch (error) {
        return next(error)
    }
}


// on supprime un utilisateur | DONE
export const remove = async (req, res, next) => {
    try {
        const uuid = req.params.uuid;
        const query = "DELETE FROM user WHERE uuid = ?";
        await Query.remove(query, uuid);
        res.status(200).json({
            msg: "user deleted",
        });
        return;
    } catch (error) {
        return next(error)
    }
}
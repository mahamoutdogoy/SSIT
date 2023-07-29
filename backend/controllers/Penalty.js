import Penalty from "../models/PenaltyModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getPenalties= async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Penalty.findAll({
                attributes:['uuid','description', 'amount'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Penalty.findAll({
                attributes:['uuid','description', 'amount'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPenaltyById = async(req, res) =>{
    try {
        const penalty = await Penalty.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!penalty) return res.status(404).json({msg: "data not found"});
        let response;
        if(req.role === "admin"){
            response = await Penalty.findOne({
                attributes:['uuid','description', 'amount'],
                where:{
                    id: penalty.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Penalty.findOne({
                attributes:['uuid','description', 'amount'],
                where:{
                    [Op.and]:[{id: penalty.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createPenalty = async(req, res) =>{
    const {uuid , description, amount} = req.body;
    try {
        await Penalty.create({
              description: description,
              amount: amount,
              userId: req.userId
        });
        res.status(201).json({msg: "Penalty Created Successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updatePenalty = async(req, res) =>{
    try {
        const penalty = await Penalty.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!penalty) return res.status(404).json({msg: "Data not found"});
        const {description , amount} = req.body;
        if(req.role === "admin"){
            await Penalty.update({description , amount},{
                where:{
                    id: penalty.id
                }
            });
        }else{
            if(req.userId !== penalty.userId) return res.status(403).json({msg: " access Forbidden"});
            await Penalty.update({description ,amount},{
                where:{
                    [Op.and]:[{id: penalty.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Penalty updated successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deletePenalty = async(req, res) =>{
    try {
        const penalty = await Penalty.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!penalty) return res.status(404).json({msg: "Data not found"});
        const {description , amount}= req.body;
        if(req.role === "admin"){
            await Penalty.destroy({
                where:{
                    id: penalty.id
                }
            });
        }else{
            if(req.userId !== penalty.userId) return res.status(403).json({msg: "access Forbidden"});
            await Penalty.destroy({
                where:{
                    [Op.and]:[{id: penalty.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Penalty deleted successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
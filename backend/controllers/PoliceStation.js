
import PoliceStation from "../models/PoliceStationModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getPoliceStations= async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await PoliceStation.findAll({
                attributes:['id','uuid','name', 'city'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await PoliceStation.findAll({
                attributes:['id','uuid','name', 'city'],
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

export const getPoliceStationById = async(req, res) =>{
    try {
        const policeStation= await PoliceStation.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!policeStation) return res.status(404).json({msg: "data not found"});
        let response;
        if(req.role === "admin"){
            response = await PoliceStation.findOne({
                attributes:['id','uuid','name', 'city'],
                where:{
                    id: policeStation.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await PoliceStation.findOne({
                attributes:['id','uuid','name', 'city'],
                where:{
                    [Op.and]:[{id: policeStation.id}, {userId: req.userId}]
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

export const createPoliceStation = async(req, res) =>{
    const {uuid , name, city} = req.body;
    try {
        await PoliceStation.create({
              name: name,
              city: city,
              userId: req.userId
        });
        res.status(201).json({msg: "Police Station Created Successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updatePoliceStation = async(req, res) =>{
    try {
        const policeStation= await PoliceStation.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!policeStation) return res.status(404).json({msg: "Police Station not found"});
        const {name , city} = req.body;
        if(req.role === "admin"){
            await PoliceStation.update({name , city},{
                where:{
                    id: policeStation.id
                }
            });
        }else{
            if(req.userId !== policeStation.userId) return res.status(403).json({msg: " access Forbidden"});
            await PoliceStation.update({name ,city},{
                where:{
                    [Op.and]:[{id: policeStation.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Police Station updated successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deletePoliceStation = async(req, res) =>{
    try {
        const policeStation = await PoliceStation.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!policeStation) return res.status(404).json({msg: "Police Station not found"});
        const {name , city}= req.body;
        if(req.role === "admin"){
            await PoliceStation.destroy({
                where:{
                    id: policeStation.id
                }
            });
        }else{
            if(req.userId !== policeStation.userId) return res.status(403).json({msg: "access Forbidden"});
            await PoliceStation.destroy({
                where:{
                    [Op.and]:[{id: policeStation.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Police Station deleted successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
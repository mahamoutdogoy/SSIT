import Vehicule from "../models/VehiculeModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getVehicules = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin" || req.role === "user" || req.role === "police"){
            response = await Vehicule.findAll({
                attributes:['uuid','mark','model','year', 'color', 'type', 'chasie','owner', 'plaque'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
           
        }else{
            response = await Vehicule.findAll({
                attributes:['uuid','mark','model','year', 'color', 'type', 'chasie','owner','plaque'],
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

export const getVehiculeById = async(req, res) =>{
    try {
        const vehicule = await Vehicule.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!vehicule) return res.status(404).json({msg: "data not found"});
        let response;
        if(req.role === "admin"){
            response = await Vehicule.findOne({
                attributes:['uuid','mark','model','year', 'color', 'type', 'chasie','owner','plaque'],
                where:{
                    id: vehicule.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Vehicule.findOne({
                attributes:['uuid','mark','model','year', 'color', 'type', 'chasie', 'owner','plaque'],
                where:{
                    [Op.and]:[{id: vehicule.id}, {userId: req.userId}]
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

export const createVehicule = async(req, res) =>{
    const {mark,model , year, color, type, chasie, owner, plaque} = req.body;
    try {
        await Vehicule.create({
            mark: mark,
            model: model,
            year: year,
            color: color,
            type: type,
            chasie: chasie,
            owner: owner,
            plaque: plaque,
            userId: req.userId
        });
        res.status(201).json({msg: "Vehicule Created Successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateVehicule = async(req, res) =>{
    try {
        const vehicule = await Vehicule.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!vehicule) return res.status(404).json({msg: "Data not found"});
        const {mark,model , year, color, type, chasie, owner,plaque} = req.body;
        if(req.role === "admin"){
            await Vehicule.update({mark,model , year, color, type, chasie, owner,plaque},{
                where:{
                    id: vehicule.id
                }
            });
        }else{
            if(req.userId !== vehicule.userId) return res.status(403).json({msg: " access Forbidden"});
            await Vehicule.update({mark,model , year, color, type, chasie, owner,plaque},{
                where:{
                    [Op.and]:[{id: vehicule.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Vehicule updated successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteVehicule = async(req, res) =>{
    try {
        const vehicule = await Vehicule.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!vehicule) return res.status(404).json({msg: "Data not found"});
        const {mark,model , year, color, type, chasie, owner,plaque}= req.body;
        if(req.role === "admin"){
            await Vehicule.destroy({
                where:{
                    id: vehicule.id
                }
            });
        }else{
            if(req.userId !== vehicule.userId) return res.status(403).json({msg: "access Forbidden"});
            await Product.destroy({
                where:{
                    [Op.and]:[{id: vehicule.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Vehicule deleted successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getVehiculeCount = async (req, res) => {
    try {
      const count = await Vehicule.count();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching vehicule count' });
    }
  };
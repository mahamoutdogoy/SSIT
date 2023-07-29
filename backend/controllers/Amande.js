import Amandes from "../models/AmandeModel.js";
import Penalty from "../models/PenaltyModel.js";
import User from "../models/UserModel.js";
import argon2 from "argon2";
import multer from "multer";
import path from "path";


export const getAmandes= async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Amandes.findAll({
                attributes:['uuid','plaque','userId','PTypeId','status','lat','long','image'],
                include: [
                    {
                      model: Penalty,
                      attributes: ['description', 'amount'],
                    },
                    {
                      model: User,
                      attributes: ['email', 'name'],
                    },
                   
                  ],
            });
        }else{
            response = await Amandes.findAll({
                attributes:['uuid','plaque','userId','PTypeId','status','lat','long','image'],
                where:{
                    userId: req.userId
                },
                include: [
                    {
                      model: Penalty,
                      attributes: ['description', 'amount'],
                    },
                    {
                      model: User,
                      attributes: ['email', 'name'],
                    },
                   
                  ],
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



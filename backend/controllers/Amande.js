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



export const updateAmande = async(req, res) =>{
  try {
      const amande = await Amandes.findOne({
          where:{
              uuid: req.params.id
          }
      });
      if(!amande) return res.status(404).json({msg: "Data not found"});
      const {uuid,  plaque ,userId,PTypeId,status,lat,long,image} = req.body;
      if(req.role === "admin"){
          await Amandes.update({uuid,plaque ,userId,PTypeId,status,lat,long,image},{
              where:{
                  id: amande.id
              }
          });
      }else{
          if(req.userId !== amande.userId) return res.status(403).json({msg: " access Forbidden"});
          await Amandes.update({plaque ,userId,PTypeId,status,lat,long,image},{
              where:{
                  [Op.and]:[{id: amande.id}, {userId: req.userId}]
              }
          });
      }
      res.status(200).json({msg: "Amande updated successfully"});
  } catch (error) {
      res.status(500).json({msg: error.message});
  }
}



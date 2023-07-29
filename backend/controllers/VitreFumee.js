import VitreFumee from "../models/VitreFumeeModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";
import multer from "multer";
import path from "path";
import fs from "fs";

export const getVitreFumees= async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await VitreFumee.findAll({
                attributes:['id','uuid','mark','fonction','address', 'plaque','owner','image','status','vitrefumeeNo'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await VitreFumee.findAll({
                attributes:['id','uuid','mark','fonction','address', 'plaque','owner','image','status','vitrefumeeNo'],
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

export const getVitreFumeeById = async(req, res) =>{
    try {
        const vitreFumee = await VitreFumee.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!vitreFumee) return res.status(404).json({msg: "data not found"});
        let response;
        if(req.role === "admin"){
            response = await VitreFumee.findOne({
                attributes:['uuid','mark','fonction','address', 'plaque','owner','image','status','vitrefumeeNo'],
                where:{
                    id: vitreFumee.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await VitreFumee.findOne({
                attributes:['uuid','mark','fonction','address', 'plaque','owner','image','status','vitrefumeeNo'],
                where:{
                    [Op.and]:[{id: vitreFumee.id}, {userId: req.userId}]
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

export const createVitreFumee = async(req, res) =>{
    const {uuid , mark , fonction , address ,  plaque , owner,status,vitrefumeeNo} = req.body;   
  try {
        await VitreFumee.create({
              mark: mark,
              fonction: fonction,
              address: address,
              plaque: plaque,
              owner: owner,
              image: req.file.path,
              status:status,
              vitrefumeeNo:vitrefumeeNo,
              userId: req.userId
        });
        res.status(201).json({msg: "VitreFumee Created Successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateVitreFumee = async(req, res) =>{
    try {
        const vitreFumee = await VitreFumee.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!vitreFumee) return res.status(404).json({msg: "Data not found"});
        const {mark , fonction , address ,  plaque , owner,status} = req.body;
        if(req.role === "admin"){
            await VitreFumee.update({mark , fonction , address ,  plaque , owner,status,vitrefumeeNo},{
                where:{
                    id: vitreFumee.id
                }
            });
        }else{
            if(req.userId !== vitreFumee.userId) return res.status(403).json({msg: " access Forbidden"});
            await VitreFumee.update({mark , fonction , address ,  plaque , owner,status},{
                where:{
                    [Op.and]:[{id: vitreFumee.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Vitre fumee updated successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteVitreFumee = async(req, res) =>{
    try {
        const vitreFumee = await VitreFumee.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!vitreFumee) return res.status(404).json({msg: "Data not found"});
        const {mark , fonction , address ,  plaque , owner,image,status,vitrefumeeNo}= req.body;
        if(req.role === "admin"){
            await VitreFumee.destroy({
                where:{
                    id: vitreFumee.id
                }
                
            });
            if(image){
                fs.unlinkSync(Images + image)
            }
        }else{
            if(req.userId !== vitreFumee.userId) return res.status(403).json({msg: "access Forbidden"});
            await VitreFumee.destroy({
                where:{
                    [Op.and]:[{id: vitreFumee.id}, {userId: req.userId}]
                }
            });
        };
        res.status(200).json({msg: "Vitre fumee deleted successfully"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getMaxVitrefumeeNo = async (req, res) => {
    try {
      const maxVitrefumee = await VitreFumee.findOne({
        attributes: ['vitrefumeeNo'],
        order: [['vitrefumeeNo', 'DESC']],
      });
  
      if (!maxVitrefumee) {
        res.status(200).json({ maxVitrefumeeNo: '0000' });
      } else {
        res.status(200).json({ maxVitrefumeeNo: maxVitrefumee.vitrefumeeNo });
      }
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };



export const getVitreFumeeCount = async (req, res) => {
    try {
      const count = await VitreFumee.count();
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching Vitre Fumee' });
    }
  };


const storage = multer.diskStorage({
    destination: (req , file, cb) =>{
        cb(null, 'Images')
    },
    filename: (req  , file , cb) => {

        cb(null, Date.now() + path.extname(file.originalname))

    }
})

export const upload = multer({
    storage :storage,
    limits: {fieldSize: '1000000'},
    fileFilter: (req , file , cb) =>{
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))
        if(mimeType && extname ){
            return cb(null, true)
        }
        cb("give proper file format")
    }
}).single('image')
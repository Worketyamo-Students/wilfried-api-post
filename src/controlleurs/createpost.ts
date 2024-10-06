/**
    * @description      : 
    * @author           : Hp
    * @group            : 
    * @created          : 17/09/2024 - 16:33:09
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/09/2024
    * - Author          : Hp
    * - Modification    : 
**/
import express , {Request,Response} from 'express';
import { PrismaClient } from '@prisma/client';
import { HttpCode } from '../core/constants';
const prisma = new PrismaClient();
const controlleursPost = {
 createPost : async (req:Request,res: Response) => {
    try {
        const {author,title,content} = req.body;
        const post = await prisma.post.create({
            data: {author,title,content}
        })
        res.status(HttpCode.CREATED).send(post)
    } catch (error) {
        console.log(error);
    }
 },
 getAllpost : async (req:Request,res:Response) =>{
    try {
        const post = await prisma.post.findMany()
    res.status(HttpCode.OK).send(post)
    } catch (error) {
        console.log(error)
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send('msg:erreur')
    }
 },
 updatePost: async (req:Request,res:Response) => {
    try {
        const {id} =req.params;
        const {author,title,content}= req.body
        const modify = await prisma.post.update({
            where:{
                id:parseInt(id)
            },
            data:{
                author,
                title,
                content,
            
            }
        })
        if(!modify){
            res.status(HttpCode.NOT_FOUND).send({ms:'post not found'})
        }else{
            res.status(HttpCode.OK).send({msg:'post update succefully'})
        }
    } catch (error) {
        console.log(error)
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send({msg:'erreur du serveur'})
    }
 },
 getOnepost : async (req:Request,res:Response)=>{
    try {
        const {id}=req.params;
        const post = await prisma.post.findUnique({
            where: {id:parseInt(id)}
        })


        if(!post){
            res.status(HttpCode.NOT_FOUND).send({msg:'post not found'})
        }else{
            res.status(HttpCode.OK).send(post)
        }
    } catch (error) {
        console.log(error)
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send({msg:'erreur du serveur'})
    }
 },
 deletePost : async (req:Request,res:Response)=>{
    try {
        const {id}= req.params;
        const post = await prisma.post.delete({
            where:{id:parseInt(id)}
        })
        if(!post){
            res.status(HttpCode.NOT_FOUND).send({msg:'post not found'})
        }else{
            res.status(HttpCode.OK).send({msg:'post delete succefully'})
        }
    } catch (error) {
        console.log(error)
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send({msg:'erreur du serveur'})
    }
 }
}
export default controlleursPost;
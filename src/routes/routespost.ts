/**
    * @description      : 
    * @author           : Hp
    * @group            : 
    * @created          : 17/09/2024 - 16:50:46
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/09/2024
    * - Author          : Hp
    * - Modification    : 
**/
import { Router } from "express";
import controlleursPost from "../controlleurs/createpost";
const routerPost = Router()
routerPost.post("/",controlleursPost.createPost);
routerPost.get("/",controlleursPost.getAllpost);
routerPost.put("/:id",controlleursPost.updatePost);
routerPost.get('/:id',controlleursPost.getOnepost);
routerPost.delete('/:id',controlleursPost.deletePost)
export default routerPost
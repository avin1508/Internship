import User from "../models/users.js";
import post from "../models/post.js";

async function getUserProfile(req,res){
    const userID = req.user.ID;

    try {
        const user = await User.findByPk(userID,{attributes:{exclude:['password']}});
        if(!user){
            return res.sendStatus(401);
        }
        const userPosts = await post.findAll({where:{userID}});
        return res.status(200).json({user,posts:userPosts})
    } catch (error) {
        console.error("error while fetchingthe user profile:",error);
        return res.status(500).json({message:'Intternal seerver error'})
    }
}

async function createPost(req,res){
    const {caption,imageUrl} = req.body;
    const userId= req.user.id;

    try{
        const newPost = await post.create({
            userId,
            caption,
            imageUrl
        })
        return res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
      console.error('Error creating post:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
  export { getUserProfile, createPost };
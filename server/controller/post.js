import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  console.log('get called');
  try {
    const postMessages = await PostMessage.find();
    //console.log(postMessages)
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  console.log('create called');
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  console.log('update called');
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.isValidObjectId(_id))
    return res.status(404).send("No such post with this is");
  else{

      try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id:_id}, {
          new: true,
        });
    
        res.json(updatePost);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
    }
};

export const deletePost = async (req, res) => {
  console.log("delete called");
  const { id: _id } = req.params;
  try {
    if (!mongoose.isValidObjectId(_id))
      return res.status(404).send("No such post with this is");
    await PostMessage.findOneAndDelete(_id);
    res.json({message:'Post deleted successfully'});
    
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const likePost = async (req,res) => {
  console.log('likePost called');
  const { id: _id } = req.params;
  try {
    if (!mongoose.isValidObjectId(_id))
      return res.status(404).send("No such post with this is");
    const post = await PostMessage.findById(_id);
    const updatedPost = await PostMessage.findByIdAndUpdate(_id,{ likeCount: post.likeCount+1},{new:true})
    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

import Post from "../models/Post.js";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const createPost = async (req, res) => {
  const { title, body, category } = req.body;

  if (!title || !body || !category) {
    throw new BadRequestError("Please provide all values");
  }

  req.body.createdBy = req.user.userId;
  const post = await Post.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

const getAllPosts = async (req, res) => {
  const { sort, search } = req.query;

  const queryObject = {};

  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }

  let result = Post.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const posts = await result;

  const totalPosts = await Post.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalPosts / limit);

  res.status(StatusCodes.OK).json({ posts, totalPosts, numOfPages });
};

const getSinglePost = async (req, res) => {
  const { id: postId } = req.params;
  const post = await Post.findOne({ _id: postId });
  const { username } = await User.findOne({ _id: post.createdBy });
  res.status(StatusCodes.OK).json({ post, username });
};

const updatePost = async (req, res) => {
  const { id: postId } = req.params;
  const { category, title, body } = req.body;

  if (!category || !title || !body) {
    throw new BadRequestError("Please provide all values");
  }
  const post = await Post.findOne({ _id: postId });

  if (!post) {
    throw new NotFoundError(`No post with id :${jobId}`);
  }
  // check permissions

  checkPermissions(req.user, post.createdBy);

  const updatedPost = await Post.findOneAndUpdate({ _id: postId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({ updatedPost });
};

const deletePost = async (req, res) => {
  const { id: postId } = req.params;

  const post = await Post.findOne({ _id: postId });
  if (!post) {
    throw new NotFoundError(`No post with id :${postId}`);
  }
  checkPermissions(req.user, post.createdBy);

  await post.remove();
  res.status(StatusCodes.OK).json({ msg: "Success! Post removed" });
};

export { createPost, getAllPosts, getSinglePost, updatePost, deletePost };

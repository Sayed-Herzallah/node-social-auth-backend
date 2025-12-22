const postservice = require('../services/post.service');

async function createpost(req, res, next) {
  try {
    const data = req.body;
    const newpost = await postservice.createpost(data);
    return res.status(201).json(newpost);
  } catch (err) {
    next(err);
  }
}

async function getallposts(req, res, next) {
  try {
    const allposts = await postservice.getallposts();
    return res.status(200).json(allposts);
  } catch (err) {
    next(err);
  }
}

async function getpostbyid(req, res, next) {
  try {
    const postid = req.params.id;
    const post = await postservice.getpostbyid(postid);
    if (!post) return res.status(404).json({ message: "post not found" });
    return res.status(200).json(post);
  } catch (err) {
    next(err);
  }
}

async function updatepost(req, res, next) {
  try {
    const postid = req.params.id;
    const iduser = req.user && req.user.id;
    const postdata = req.body;
    if (!iduser) return res.status(401).json({ message: "unauthenticated" });

    const updated = await postservice.updatepost(postid, iduser, postdata);
    return res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

async function deletapost(req, res, next) {
  try {
    const postid = req.params.id;
    const iduser = req.user && req.user.id;
    if (!iduser) return res.status(401).json({ message: "unauthenticated" });

    await postservice.deletepost(postid, iduser);
    return res.status(200).json({ message: "post deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = { createpost, getallposts, getpostbyid, updatepost, deletapost };

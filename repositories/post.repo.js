const POST = require("../models/post.model");

async function createposts(categorydata) {
  const newcategory = new POST(categorydata);
  return newcategory.save();
}

async function findallposts() {
  return POST.find();
}

async function getpostbyid(id) {
  return POST.findById(id);
}

async function updatecategorybyid(id, categorydata) {
  return POST.findByIdAndUpdate(id, categorydata, { new: true });
}

async function deletepost(id) {
  return POST.findByIdAndDelete(id);
}

module.exports = {
  createposts,
  findallposts,
  getpostbyid,
  updatecategorybyid,
  deletepost,
};

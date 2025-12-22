const postrepo = require('../repositories/post.repo');

async function createpost({ userid, title, body }) {
    return postrepo.createpost({ userid, title, body });
}

async function getallposts() {
    return postrepo.findallposts();
}

async function getpostbyid(id) {
    const post = await postrepo.getpostbyid(id);
    if (!post) throw new Error("post not found");
    return post;
}

async function updatepost(id, iduser, postdata) {
    const postexist = await postrepo.getpostbyid(id);
    if (!postexist) throw new Error("post not found");
    if (postexist.userId.toString() !== iduser.toString()) {
        throw new Error("you are not allowed to update this post");
    }
    return postrepo.updatabyid(id, postdata);
}

async function deletepost(id, iduser) {
    const postexist = await postrepo.getpostbyid(id);
    if (!postexist) throw new Error("post not found");
    if (postexist.userId.toString() !== iduser.toString()) {
        throw new Error("you not allowed to delete this post");
    }
    return postrepo.deletapost(id);
}

module.exports = {
    createpost,
    getallposts,
    getpostbyid,
    updatepost,
    deletepost
};

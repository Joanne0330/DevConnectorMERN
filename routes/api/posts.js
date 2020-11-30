const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route     POST api/posts
//@desc      Create a post
//@access    Private
router.post(
    '/', 
    [ 
        auth, 
        [
            check('text', 'Text is required!')
                .not()
                .isEmpty()
        ] 
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        try {  // now getting the name, id, and avatar from User model automatically
            const user = await User.findById(req.user.id).select('-password'); // grab everything using auth, except password

            const newPost = new Post({
                text: req.body.text, //setting the input text (req.body) to text
                name: user.name,  // rest info come from User model
                avatar: user.avatar,
                user: req.user.id 
            });

            const post = await newPost.save(); //save the new post
        
            res.json(post); //send the post back

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error!');
        }
});

//@route     GET api/posts
//@desc      Get all posts
//@access    Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 }); //sort by the date, most recent fist
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

//@route     GET api/posts/:id
//@desc      Get post by ID
//@access    Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({ msg: 'Post not found!'});
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);

        if(err.kind === 'ObjectId') {  //if the kind of error is due to the incorrectly formatted id
            return res.status(404).json({ msg: 'Post not found!'}); 
        }
        res.status(500).send('Server Error!');
    }
});

//@route     DELETE api/posts/:id
//@desc      Delete a post
//@access    Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(404).json({ msg: 'Post not found!'});
        }

        //check if the request user is the same as the post user
        if(post.user.toString() !== req.user.id) {  //post.user is an ObjectId so turn it into a string, then compare to req.user.id which is already a string
            return res.status(401).json({ msg: 'User not authorised to remove the post!' });
        }
        
        await post.remove();

        res.json({ msg: 'Post removed!' });
    } catch (err) {
        console.error(err.message);

        if(err.kind === 'ObjectId') {  //if the kind of error is due to the incorrectly formatted id
            return res.status(404).json({ msg: 'Post not found!'}); 
        }
        res.status(500).send('Server Error!');
    }
});


//@route     PUT api/posts/like/:id  liking a post is more like an update, also needs to include the id of the post in order to add the likes
//@desc      Like a post
//@access    Private
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); //find the post by its id

        //check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            //iterate through the likes array to try and find any liked user (in string format) that matches req.user.id, 
            //if it exists, we count how many and if it's greater than 0
            return res.status(400).json({ msg: 'Post already liked!' });
        }

        post.likes.unshift({ user: req.user.id }); //add the user and user id at the beginning of the array
        
        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }

});

//@route     PUT api/posts/unlike/:id  
//@desc      Unlike a post
//@access    Private
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); //find the post by its id

        //check if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            //iterate through the likes array to try and find any liked user (in string format) that matches req.user.id, 
            //if it does not exist because it's equal to 0, it has not been liked therefore you cannot unlike
            return res.status(400).json({ msg: 'Post has not yet been liked!' });
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        // map through the likes array, find the index of the like (in string format) that matches req.user's id
        
        post.likes.splice(removeIndex, 1); //splice the particular index
        
        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }

});

//@route     POST api/posts/comment/:id  // need the id of the post to make comments
//@desc      Comment on a post
//@access    Private
router.post(
    '/comment/:id', 
    [ 
        auth, 
        [
            check('text', 'Text is required!')
                .not()
                .isEmpty()
        ] 
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        try {  // now getting the name, id, and avatar from User model automatically
            const user = await User.findById(req.user.id).select('-password'); // grab everything using auth, except password
            const post = await Post.findById(req.params.id);  //find the post by id

            const newComment = {
                text: req.body.text, //setting the input text (req.body) to text
                name: user.name,  // rest info come from User model
                avatar: user.avatar,
                user: req.user.id 
            };

            post.comments.unshift(newComment); // adding the comment into the post, newest one in the beginning
            await post.save(); //save the post with added comment
        
            res.json(post.comments); //send the comment back

        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error!');
        }
});

//@route     DELETE api/posts/comment/:id/:comment_id     //need post id and comment id
//@desc      Delete a comment from a post
//@access    Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);  //find the post by id

        //Pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id); // find the comment id and compare with the req
        
        if(!comment) {   //check if this comment is found
            return res.status(404).json({ msg: 'Comment does not exist!'});
        }

        if(comment.user.toString() !== req.user.id) {   //checking if the comment user id(ObjectID) is the same person requesting to delete
            return res.status(401).json({ msg: 'User not authorsied to delete this comment!'});
        }

        // remove the index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        // map through the comments array, find the index number of the comment (in string format) that matches req.user's id
        
        post.comments.splice(removeIndex, 1); //splice the particular index
        
        await post.save();

        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
    
});
module.exports = router;
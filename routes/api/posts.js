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

module.exports = router;
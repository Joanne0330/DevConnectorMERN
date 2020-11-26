const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); // using token to authenticate

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//@route     GET api/profile/me   get a particular profile
//@desc      Get current users profile
//@access    Private  (need to use the id and authorization)
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']); // access to the req.user from the ProfileSchema

        if(!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user!' });
        }

        res.json(profile); // return the profile

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

module.exports = router;
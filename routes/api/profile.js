const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth'); // using token to authenticate
const { check, validationResult } = require('express-validator');

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

//@route     POST api/profile   
//@desc      Create or update user profile
//@access    Private  (need to use the id and authorization)
router.post(
    '/',
    [
        auth, //use auth middleware to identify who's making the post req
        [  
        check('status', 'Status is required!') //use the validator middleware to check if all fields 'required' fields are filled
            .not()
            .isEmpty(),
        check('skills', 'Skills is required!')
            .not()
            .isEmpty()
        ] 
    ], 
    async (req, res) => {
        const errors = validationResult(req);  //checking if the above fields are ok with validator
        if(!errors.isEmpty()) { //if there are errors
            return res.status(400).json({ errors: errors.array() });
        }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;  //sorting out the req.body to each fields

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id; //setting token to the user in the profile schema
    if(company) profileFields.company = company; //now assigning each fields from req.body and make it an object
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim()); // turning it into an array sort out the spaces ex:[ 'Ruby', 'JavaScript', 'HTML', 'CSS' ]
    }

    //Build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id}) //look for the profile from the schema via id(token)

        if(profile) { //if there's already a profile, then update it
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, //find by the user
                { $set: profileFields }, //set the profileFileds
                { new: true } 
            );
            return res.json(profile); //return the entire profile
        }

        //Create a new profile if it doesn't exist (or found)
        profile = new Profile(profileFields); //pass in the profileFileds object

        await profile.save();
        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error!!')
    }
  }
);


module.exports = router;
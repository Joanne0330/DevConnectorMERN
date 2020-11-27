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


//@route     GET api/profile
//@desc      Get all profiles
//@access    Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

//@route     GET api/profile/user/:user_id
//@desc      Get profile by user ID
//@access    Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']); //requesting specific user request by the id
        
        if(!profile) 
            return res.status(400).json({ msg: 'Profile not found!' });
       
        res.json(profile);
    } catch(err) {
        console.error(err.message);
        if(err.kind == 'ObjectId') {  //if the error is due to wrong profile id
            return res.status(400).json({ msg: 'Profile not found!' });
        }
        res.status(500).send('server Error!')
    }

});

//@route     DELETE api/profile
//@desc      Delete profile, user & posts
//@access    Private
router.delete('/', auth, async (req, res) => {
    try {
        //@todo - remove users posts
        await Profile.findOneAndRemove({ user: req.user.id});//Removing profile 

        await User.findOneAndRemove({ _id: req.user.id}); //Removing user 
        res.json({ msg: 'User deleted!'});
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

//@route     PUT api/profile/experience   in the form of update the profile
//@desc      Add profile experience
//@access    Private
router.put(
    '/experience', 
    [ 
        auth, //have to check all the required fields are filled first
        [
            check('title', 'Title is required!')
                .not()
                .isEmpty(),
            check('company', 'Company is required!')
                .not()
                .isEmpty(),
            check('from', 'From date is required!')
                .not()
                .isEmpty()
        ]
    ], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title, 
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body //pull info from req.body

    const newExp = { //creating the new experience object
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {  //fetching the profile to add the experience to
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp); //newest experience at the front

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
}); 


//@route     DELETE api/profile/experience/:exp_id   
//@desc      delete profile experience
//@access    Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });// find the profile first
        //Get remove index
        const removeIndex = profile.experience
            .map(item => item.id)
            .indexOf(req.params.exp_id); //match the experience id to the id from the request

        profile.experience.splice(removeIndex, 1); //take out the specific index, and just one

        await profile.save();
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
});

module.exports = router;
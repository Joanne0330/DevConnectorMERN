const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

// Signing up a new user
//@route          POST api/users
//@description    Register user
//@access         Public
router.post(
  '/', 
  [ 
    check('name', 'Name is required!')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email!').isEmail(),
    check('password', 'Please enter a password with 6 or more characters!').isLength({ min: 6})

], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;   //getting the body of the user input

    try {
        let user = await User.findOne({ email }); // Find the user via email

        if(user) { // if user(email) already exist...
            return res.status(400).json({ errors: [{ msg: 'User already exist!' }] });
        }
        
        const avatar = gravatar.url(email, {//if user not found, pass user's email to grab the url of the gravatar
            s: '200', //size
            r: 'pg', //rating: pg, r, pg13 etc
            d: 'mm' //use default image
        })

        user = new User({ // resetting user becuase now creating a new uer 
            name,
            email, 
            avatar,
            password
        })
        
        const salt = await bcrypt.genSalt(10);//Encrypt password

        user.password = await bcrypt.hash(password, salt);

        await user.save(); //save the user with encrypted password
        
        const payload = { //creating json webtoken
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err;
                res.json({ token }); //returning json webtoken
            });
    
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error!');
    }

});

module.exports = router;
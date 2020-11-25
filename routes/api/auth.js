const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

//@route     GET api/auth
//@desc      Test route
//@access    Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // User model using the id from decoded req.body in middleware/auth
        res.json(user); // respond with user but leave out the passord
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error!');
    }

});

module.exports = router;
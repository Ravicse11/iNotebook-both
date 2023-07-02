const express = require('express');
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
require('../db.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User.js')

const JWT_SECRET=process.env.JWT_SECRET1;

//1 rotes for creating new user

router.post('/createuser', [
    //name must be present
    body('name', 'enter the valid name').isLength({ min: 3 }),
    // username must be an email
    body('email', 'enter the valid email id').isEmail(),
    // password must be at least 5 chars long
    body('password', 'enter the strone password and minimum length should be five').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { name, email, password, dob,phone_no ,gender} = req.body;
    
    try {

        let user = await User.findOne({ email: email });

        if (user) {

            return res.status(200).json({ success, email: "you have already registered member" });
        }
        const salt = bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(password, salt);


        //user = new User({ name, email, password: secPass });
        //const ravi = await user.save();
        user = await User.create({ name, email, password: secPass, dob,phone_no,gender });
        

        const data = {
            user: {
                id: user.id,
            }
        }
        const token = jwt.sign(data, JWT_SECRET);
        console.log("User registered successfully");
        success = true;
        res.json({ success, token });

    } catch (err) {
        console.log(err);
        res.send({ success, err: "this is  error" });
    }

});

// 2 routes for login 
router.post('/login', [
    // username must be an email
    body('email', 'enter the valid email id').isEmail(),
    // password must be at least 5 chars long
    body("password", "password cannot be blank").exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email: email });

        if (!user) {

            return res.status(200).json({ success, email: "please fill the correct credentials" });
        }
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {

            return res.status(200).json({ success, email: "please fill the correct credentials" });
        }
        const data = {
            user: {
                id: user.id,
            }
        }
        const token = jwt.sign(data, JWT_SECRET);
        success = true;
        console.log("user login successfully");
        res.json({ success, token });
    } catch (err) {
        console.log(err);
        res.send({ err: "error from server side please wait to respond" });
    }


});

// 3 rotes fetch the details from token
router.get('/getuser', fetchuser, async (req, res) => {
    let success = false;
    try {
        let userId = req.user;
        const user = await User.findById(userId.id).select("-password");
        success = true;
        res.send({ success, user});
    } catch (error) {
        //console.log(err);
        res.send({ success, err: "error from server side please wait to respond" });

    }

});

router.put('/updateuser', fetchuser, async (req, res) => {
    const { name, email, password, dob,phone_no } = req.body;
    try {
        const updateUser = {};
        if (name) { updateUser.name = name };
        if (email) { updateUser.email = email };
        if (dob) { updateUser.dob = dob };
        const salt = bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hash(password, salt);
        if (secPass) { updateUser.password = secPass };
        if (phone_no) { updateUser.phone_no = phone_no };
       

        let user = await User.findById(req.user.id);
        if (!user) {
            return res.status(402).send("you cannot do it");
        }
        user = await User.findByIdAndUpdate(req.user.id, { $set: updateUser }, { new: true });
        res.json({user });
    } catch (error) {
        console.log(error)
        res.send({ err: "there is something error" });
    }

});
module.exports = router;
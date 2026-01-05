const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./models/UserModel');
const jwt = require('jsonwebtoken')
const app = express();
const PORT = 8000;

app.use(cors({
    origin: 'https://userdashboardbytecodeproject.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));
app.use(express.json());

mongoose.connect('mongodb+srv://dhruvesaral_db_user:<db_password>@cluster0.isgivcy.mongodb.net/?appName=Cluster0/UserDashboard')
    .then(() => console.log('Database Connected'))
    .catch((error) => console.log(error.message));

const JWT_SECRET_KEY = 'absfkj327687g%^#$%^&*YHUVGHVBN'

app.get('/', function(req, res){
    res.send("Server is running")
})

app.post('/create-user', async function(req, res){
    try {
        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            return res.json({err: 'All fields are required', status: 'false'})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const nayaUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        })
        await nayaUser.save()
        res.json({message: 'User saved successfully', status: 'true'})
    } catch (error) {
        res.json({err: error.message, status: 'false'})
    }
})

app.get('/users' , async function(req, res){
    try {
        const allUsers = await User.find();
        res.json({message: 'All users fetched successfuly', users: allUsers, status: 'true'})
    } catch (error) {
        res.json({err: error.message, status: 'false'})
    }
})

app.get('/user/:id' , async function(req, res){
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        if(!user) {
            return res.json({err: 'No user found', status: 'false'})
        }
        res.json({message: 'All users fetched successfuly', user, status: 'true'})
    } catch (error) {
        res.json({err: error.message, status: 'false'})
    }
})

app.put('/update/:id', async function(req, res){
    try {
        const {id} = req.params;
        const {name, email, password} = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, {
            name: name,
            email: email,
            password: password
        }, {new: true});
        if(!updatedUser){
            res.json({err: 'Cannot able to edit user', status: 'false'})
        }
        res.json({message: 'User updated successfuly', status: 'true'})
    } catch (error) {
        res.json({err: error.message, status: 'false'})
    }
})

app.delete('/delete/:id', async function(req, res) {
    try {
        const {id} = req.params;
        console.log(id)
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            res.json({err: error.message, status: 'false'})
        }
        res.json({message: 'User deleted successfuly', status: 'true'})
    } catch (error) {
        res.json({err: error.message, status: 'false'})
    }
})

app.post('/signup', async function(req, res){
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            return res.json({err: 'All fields are required', status: 'false'})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const nayaUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        })
        await nayaUser.save()
        const token = jwt.sign({id: nayaUser._id}, JWT_SECRET_KEY, {expiresIn: '7d'})
        res.json({message: 'Signup successfully', status: 'true', token})
    } catch (error) {
        res.json({err: error.message, status: 'false'})
    }
})

app.post('/login', async function(req, res){
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.json({err: 'All fields are required', status: 'false'})
        }
        const user = await User.findOne({email});
        if(!user){
            return res.json({err: 'No user found', status: 'false'})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.json({err: 'Invalid password', status: 'false'})
        }
        const token = jwt.sign({id: user._id}, JWT_SECRET_KEY, {expiresIn: '7d'})
        res.json({message: 'Login successfully', status: 'true', token})
    } catch (error) {
        res.json({err: error.message, status: 'false'})
    }
})

app.listen(PORT, () => console.log('Server is listening on Port: 8000'))
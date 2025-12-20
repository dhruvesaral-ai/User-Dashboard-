const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/UserModel');
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/UserDashboard')
    .then(() => console.log('Database Connected'))
    .catch((error) => console.log(error.message));

app.get('/', function(req, res){
    res.send("Server is running")
})

app.post('/create-user', async function(req, res){
    try {
        const {name, email, password, role} = req.body;
        if(!name || !email || !password || !role){
            return res.json({err: 'All fields are required', status: 'false'})
        }
        const nayaUser = new User({
            name: name,
            email: email,
            password: password,
            role: role
        })
        await nayaUser.save()
        res.json({message: 'User saved successfully', status: 'true'})
    } catch (error) {
        res.json({err: error.message, status: 'false'})
    }
})

app.listen(PORT, () => console.log('Server is listening on Port: 8000'))
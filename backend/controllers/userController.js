const userModel = require('../models/userModel');

module.exports.getUser = async (req, res) => {
    const queryProp = req.query.email;
    
    const user = queryProp ? await userModel.find({email: req.query.email}) : await userModel.find();
    res.send(user);
};

module.exports.registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    userModel
    .create({username, email, password})
    .then((userData) => {
        console.log("Successfully create user, data: " + JSON.stringify(userData));
        res.send(userData);
    })
    .catch((err) => console.log(err));
}

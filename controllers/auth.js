const crypto = require('crypto');
const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat');

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_API_ID;

const signup = async (req, res) => {
    try {
        const { fullName, username, password, phoneNumber } = req.body;
        const userId = crypto.randomBytes(16).toString('hex');
        const serverCient = connect(api_key, api_secret, app_id);

        //hashing the password with bcrypt and the level of encryption
        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverCient.createUserToken(userId);

        res.status(200).json({token, fullName, username, userId, hashedPassword, phoneNumber});

    } catch(error){
        console.log(error);

        res.status(500).json({ message: error})
    }
};

const login = (req, res) => {
    try {
       
        
    } catch(error){
        console.log(error);

        res.status(500).json({ message: error})
    }
};



module.exports = {
    signup,
    login
}
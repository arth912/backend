const connection = require('../config/db.js');
const generateToken = require('../utils/generateToken.js');




// @desc      start page
// @route     GET /
// @access    public

const startPage = async (req,res) =>{
    res.send('start page')
}

// @desc      get login data from login page
// @route     POST /login
// @access    public

const loginData = async (req,res) =>{
    let email = req.body.email;
    let password = req.body.password;
    let q1 = "SELECT userPassword FROM tblusers WHERE userEmail = '"+email+"' ";
    connection.query(q1,(err,result)=>{
        if(!err){
            var databasePassword = result[0].userPassword;
            if( password === databasePassword)
            {
                let gToken = generateToken(email);
                res.cookie('jwt_Token',gToken,{httpOnly:true})
                res.send('login Successfully');
            }   
        }
        else {
            throw new Error(err);
        }
    })
}

// @desc      get login data from login page
// @route     GET /login
// @access    public

const loginPage = async (req,res) =>{
    res.send('login page')
}


// @desc      get registration data from register page
// @route     GET /login
// @access    public

const registerPage = async (req,res) =>{
    res.send('register page')
}



// @desc      logout page
// @route     /logout
// @access    public

const logout = async (req,res) =>{
    console.log(res.cookie('jwt_Token'));
    res.clearCookie('jwt_Token');
    console.log(res.cookie('jwt_Token'));    
    res.redirect('/login');
}

module.exports ={
    startPage,
    loginData,
    logout,
    loginPage,
    registerPage,
}
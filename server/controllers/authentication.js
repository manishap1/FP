const jwt =require('jwt-simple');
const User = require('../models/user');
const config = require('../config');



function tokenForUser(user){
    const timestamp = new Date().getTime();
    return jwt.encode({sub : user.id , iat : timestamp}, config.secret );
}

exports.signin = function(req,res,next){
    //user has already has email and password and we have to give them token
    res.send({ token : tokenForUser(req.user)});
}

exports.signup = function(req,res,next){
// res.send({success:'true'});
// console.log(req.body);
const email = req.body.email;
const password = req.body.password;

if(!email || !password){
    return res.status(422).send({err : 'You must provide email and password'});
}

//see if user with the given email exists
User.findOne({email : email}, function(err, existingUser){
    if(err){ return next(err);}
    //if a user with email does exist, return an error
    if(existingUser){
        return res.status(422).send({err : 'email is already in use'});
    }

    // if a user with email doen't exist, save the user
    const user = new User({
          email : email,
          password : password
    });

    //save user to the database
    user.save(function(err){
        if(err){ return next(err)}

        //respond to indicate that user has been created and saved
        res.json({token : tokenForUser(user) });
    });
    
});

}
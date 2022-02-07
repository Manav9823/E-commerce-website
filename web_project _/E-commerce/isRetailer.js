


// this is the midleware function 

const User = require("./models/user");




const isR = (req, res, next) => {
    
    if (req.RetailerorConsumer==="Consumer") {
        req.flash('error', 'You are not a Retailer');
        return res.redirect('/login');
    }
    next();

}



module.exports = {
    isR
}
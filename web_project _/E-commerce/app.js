const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const seedDB = require('./seed');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

// confiring our application to use passport in it
const passport=require('passport');
const LocalStrategy = require('passport-local');

const User=require('./models/user');

mongoose.connect('mongodb://localhost:27017/shop-db')
    .then(() => console.log('DB Connected'))
    .catch((err) => console.log(err));

// seedDB();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionConfig = {
    secret: 'weneedsomebettersecret',
    resave: false,
    saveUninitialized: true,
}

app.use(session(sessionConfig));
app.use(flash());



app.use(passport.initialize()); // to intilaze the passport
app.use(passport.session()); // using Session storage to store the users Information using this middleware


// Local mongoose provide static methods these methods can be directly called on models 
// We need not to make objects

passport.use(new LocalStrategy(User.authenticate()));// to authenticate whether the user is correct user or not ( User.auth is a static method)
// to enter the session 
passport.serializeUser(User.serializeUser());
// to take out fron user session
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser=req.user;
    next();
});



const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes=require('./routes/cartRoutes');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/error', (req, res) => {
    
    res.render('error');
})


app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);


app.listen(2323, (req, res) => {
    console.log('server running at port 2323');
});
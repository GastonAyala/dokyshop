require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require("passport");
const { configServiceLoginGoogle } = require('./service/google.service');

const cors = require('cors');

const partials = require("express-partials");
const methodOverride =  require('method-override');
const insertDataLocals = require('./middleware/insertDataLocals');
const session = require('express-session');
const createSessionFromCookie = require('./middleware/createSessionFromCookie');
var app = express();
configServiceLoginGoogle()

/* RUTAS MVC*/
const otherRoutes = require('./routes/other.routes');
const productRoutes = require('./routes/product.routes');
const authRoutes = require('./routes/auth.routes');
const cartRoutes = require('./routes/cart.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/users.routes')

/* RUTAS API*/
const apiOtherRoutes = require('./routes/api/other.api');
const apiUsersRoutes = require("./routes/api/users.api.");
const apiProductsRoutes = require('./routes/api/products.api');
const apiOrderRoutes = require('./routes/api/order.api');
const apiCategoriesRoutes = require('./routes/api/categories.api');
const apiSubcategoriesRoutes = require('./routes/api/subcategories.api');

/* CONFIGS */
app.set("views", path.join(__dirname, "/views"))
app.set('view engine', 'ejs');

/* MIDDLEWARE */
app.use(cors());
app.use(partials())
app.use(express.static(path.join(__dirname, '../public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(session( {secret: "Mensaje secreto dokyshop", resave: false, saveUninitialized: false}));
app.use(createSessionFromCookie)
app.use(insertDataLocals) // usuario logueado y tiene acceso a session
app.use(passport.initialize())
app.use(passport.session())

/* ENRUTADORES MVC */ 
app.use("/", otherRoutes);
app.use("/productos", productRoutes);
app.use("/autenticacion", authRoutes)
app.use("/usuario", userRoutes)
app.use("/carrito-compra", cartRoutes)
app.use("/admin", adminRoutes);

/* ENRUTADOR API */
app.use('/api', apiOtherRoutes);
app.use("/api/users", apiUsersRoutes);
app.use('/api/products', apiProductsRoutes);
app.use('/api/order', apiOrderRoutes);
app.use('/api/categories', apiCategoriesRoutes);
app.use('/api/subcategories', apiSubcategoriesRoutes);


app.use('/dashboard', express.static(path.join(__dirname, '../public/dashboard')));
app.get('/dashboard/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dashboard/index.html'));
});

app.use((req,res, next) => {
    res.status(404).render("./other/notFound") 
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error'); 
});


module.exports = app;
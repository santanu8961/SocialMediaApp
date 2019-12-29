var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var multer = require('multer');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/SocialmediaDB',{ useNewUrlParser: true ,useUnifiedTopology: true});


var app = express();
var session = require('express-session');

FileStore = require('session-file-store')(session)

app.use(bodyParser.json());

app.use(cors());
app.set('port', process.env.PORT || 4200);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var MemoryStore =session.MemoryStore;
app.use(session({
  store: new FileStore({
 
    path: './session-store'

}),
name: '_fs_demo', // cookie will show up as foo site
secret: "alkjjq4q394q9wei93489q3u9",
resave: false,
saveUninitialized: false,
cookie: {
    // five year cookie
    maxAge: 1000 * 60 * 60 * 24 * 365 * 5
}
}));

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, "./Images");
  },
  filename: function(req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

app.use('/', indexRouter);


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

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('615e24aa6f3366d416fa76c0')
    .then(user => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


// const corsOptions = {
//     origin: "https://rlkilger-cse341.herokuapp.com/",
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));


// const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://rebecca:rebecca@cse341cluster-3dwlw.mongodb.net/test?retryWrites=true&w=majority";
                        

mongoConnect(() => {
  app.listen(PORT);
});

// mongoose
//   .connect(
//     MONGODB_URL, options
//   )
//   .then(result => {
//      // This should be your user handling code implement following the course videos
//     app.listen(PORT);
//   })
//   .catch(err => {
//     console.log(err);
//   });

const path = require('path');

const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://rebecca:cY3XIFukwEugXkXu@cluster0.kdj51.mongodb.net/shop?retryWrites=true&w=majority";

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('61626b6b78cb88ebc0fce8c4')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);


const corsOptions = {
    origin: "https://rlkilger-cse341.herokuapp.com/",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
                        

// mongoConnect(() => {
//   app.listen(PORT);
// });

mongoose
  .connect(
    MONGODB_URL
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Rebecca',
          email: 'rebecca@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });

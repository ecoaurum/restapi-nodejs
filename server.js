const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

const PORT = process.env.PORT || 3500;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./middleware/passport')(passport);

const routes = require('./settings/routes');
routes(app);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

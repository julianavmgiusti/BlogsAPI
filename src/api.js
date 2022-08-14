const express = require('express');
const routeLogin = require('./routes/routeLogin');
const routeUser = require('./routes/routeUser');
const error = require('./middlewares/errorMiddleware');
const routeCategory = require('./routes/routeCategory');
// ...

const app = express();

app.use(express.json());
app.use('/login', routeLogin);
app.use('/user', routeUser);
app.use('/categories', routeCategory);
app.use(error);

// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;

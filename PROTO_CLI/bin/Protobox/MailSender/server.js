const express = require('express');
var config    = require('./config/config');
const routes  = require('./routes/routefile');
var cors = require('cors');
const app     = express();

app.use(cors());
app.get('/sendmail/:id', function (req, res, next) {
  res.json({ msg: 'This is CORS-enabled for all origins!' });
})


app.use(express.json());

app.use(routes);

app.listen(config.PORT, () => {
  console.log(
    `Live Developement Server is listening at 👍 ${config.URL}:${config.PORT}/`
  )
});

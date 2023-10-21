const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
connectDB();

app.get('/', (req, res) => res.send('Server của bé Moon xinh đẹp'));

//app.post('/', (req, res) => res.send('Server của bé Moon xinh đẹp'));

// user route
app.use('/api/benhnhan', require('./routes/api/benhnhan'));

//

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
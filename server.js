const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
connectDB();

app.get('/', (req, res) => res.send('Server của bé Moon xinh đẹp'));

// Benh nhan route
app.use('/api/benhnhan', require('./routes/api/benhnhan'));

// loai phong kham route
app.use('/api/loaiphongkham', require('./routes/api/loaiphongkham'));


//phong kham route
app.use('/api/phongkham', require('./routes/api/phongkhambenh'));

//thong tin benh nhan
app.use('/api/thongtinbenhnhan', require('./routes/api/thongtinbenhnhan'));

//dat lich kham benh
app.use('/api/datlichkham', require('./routes/api/datlich'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));
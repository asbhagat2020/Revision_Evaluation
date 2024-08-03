const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const countryRoutes = require('./src/routes/countryRoutes');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const app = express();

app.get("/", (req, res)=>{
    res.send("this is the home route");
})

app.use(bodyParser.json());
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', countryRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
);

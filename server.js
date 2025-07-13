const express = require('express');
const cors = require('cors');
require('dotenv').config();
const DB = require('./config/db');


const app = express();
DB();
const PORT = process.env.PORT;
const authRouter = require('./routes/auth');
const adminRouter= require('./routes/admin');
const userRouter = require('./routes/users');
const providerRouter= require('./routes/provider')

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use('/auth', authRouter);
app.use('/admin',adminRouter)
app.use('/user', userRouter);
app.use('/provider', providerRouter)



app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING ON ${PORT}`);

})
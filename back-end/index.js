const express = require('express');
const bodyPaser = require('body-parser');
const cors = require('cors');
const dbConnect = require('./src/config/dbConnect');
const dotenv = require('dotenv').config();
const app = express();
const PORT = process.env.port || 3001;
const User = require('./src/app/models/userModel');
const authRoute = require('./src/routes/authRoute');
const morgan = require('morgan');
const productRoute = require('./src/routes/produtcRoute');
const errorHandler = require('./src/app/middlewares/errorMiddleware');
const cookieParser = require('cookie-parser');

app.use(cookieParser());


dbConnect();
app.use(morgan('dev'));


app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended: false,}));
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials:true,
    })
);

app.use('/users', authRoute);
app.use('/products', productRoute);




app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
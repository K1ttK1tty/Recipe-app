// libs
const express = require('express');
const fileupload = require('express-fileupload')
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const router = require('./router/router.js')
// middlewares
const errorMiddleware = require('./middlewares/errorMiddleware.js')
// services
const fileService = require('./service/fileService.js')
const notificationService = require('./service/notificationsService.js')

const PORT = process.env.PORT || 5001;
const app = express();

app.use(fileupload({}))
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    credentials: true, 
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware) // всегда в конце  

const start = () => {
    try {
        fileService.createUsersDataDir();
        notificationService.createSubsDir();
        app.listen(PORT, () => console.log('Server start at port ' + PORT))
    } catch (err) { 
        console.log(err)    
    }
}
start();
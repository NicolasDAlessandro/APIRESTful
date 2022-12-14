const express = require('express');
const appRoutes = require('./routers/app.routers');

const app = express();

const PORT = process.env.PORT || 8080

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.use('/api',appRoutes)

const connectedServer = app.listen(PORT,() =>{
    console.log(`Server running in port ${PORT}`);
})

connectedServer.on('error',(error) =>{
    console.log('Error: ', error)
})
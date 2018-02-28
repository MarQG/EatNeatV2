const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const apiRoutes = require("./controller/yummlyAPI.js")

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4000;

app.use(express.static(publicPath));
app.use(cors());



app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
    //This console.log is to test we are getting a response from yummly
    console.log(apiRoutes)
});

app.listen(port, () => {
    console.log("Server is listening on port:" + port);
});
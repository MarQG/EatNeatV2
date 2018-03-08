const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const apiRoutes = require("./controller/yummlyAPI.js")

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4000;

app.use(express.static(publicPath));
app.use(cors());

console.log("Line 14: " + process.env.NODE_ENV)

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use("/api", apiRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log("Server is listening on port:" + port);
});
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4000;

app.use(express.static(publicPath));
app.use(cors());

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log("Server is listening on port:" + port);
});
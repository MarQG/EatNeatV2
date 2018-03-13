const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const yummlyRoutes = require("./controller/yummlyAPI");
const favRoutes = require("./routes/favorites.js");
const listRoutes = require("./routes/groceryList.js");
const weekRoutes = require("./routes/myWeek.js");
const searchRoutes = require("./routes/search.js");

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 4000;

app.use(express.static(publicPath));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use("/api", yummlyRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log("Server is listening on port:" + port);
});
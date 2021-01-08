const express = require('express');
const path = require('path');

const PORT = 8080;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    const datas = path.join(__dirname, 'index.html');
    console.log(datas);
    res.sendFile(datas);
});

app.listen(PORT, function() {
    console.log('server is rdy in port ' +PORT);
});
 
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.end('Hello World!');
});
app.get('/abc',function (req,res) {
    res.send('my')
})
app.listen(3000);
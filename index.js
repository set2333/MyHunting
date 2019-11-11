const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index', {title: 'My hunting'});
});

app.listen(8080, function() {
    console.log('Server started');
})
const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index', {title: 'Моя охота', typePage: 'main'});
});

app.get('/main', function(req, res) {
    res.render('index', {title: 'Моя охота', typePage: 'main'});
});

app.get('/fowl', function(req, res) {
    res.render('index', {title: 'Дичь', typePage: 'fowl'});
});

app.get('/journal', function(req, res) {
    res.render('index', {title: 'Журнал', typePage: 'journal'});
});

app.get('/route', function(req, res) {
    res.render('index', {title: 'Заходки', typePage: 'route'});
});

app.listen(8080, function() {
    console.log('Server started');
})

function getContent(addr) {
    if (arrd.typeContent == 'main') {
        return getMainPage();
    }
}

function getMainPage() {
    result = 'main';
    return result;
}
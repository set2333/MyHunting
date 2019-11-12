const express = require('express');
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('*', function (req, res) {
//    console.log(req);
    let positionAjax = req.url.indexOf('ajax');
    if (~positionAjax) {
        res.render(req.url.slice(1, positionAjax));
    }
    else {
        res.render('index', {
            title: 'Моя охота',
            typePage: req.url
        });
    }
});

//Получение ajax фрагмента страницы

app.get('mainajax', function (req, res) {
    res.render('main');
});

app.get('fowlajax', function (req, res) {
    res.render('fowl');
    console.log('ajax fowl');
});

app.get('journalajax', function (req, res) {
    res.render('journal');
});

app.get('routeajax', function (req, res) {
    res.render('route');
});

app.listen(8080, function () {
    console.log('Server started');
});

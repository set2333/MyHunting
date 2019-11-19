const express = require('express');
const app = express();
const _db = require('./_my_modules/_db');
const _session = require('./_my_modules/_session');

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(_session);
app.use(express.urlencoded()); //Нужно чтобы разобрать данные полученные от формы
//app.use(express.json());

app.get('*', function (req, res) {
    let positionAjax = req.url.indexOf('ajax');
    if (isAutorized(req)) {
        let url;
        if (~positionAjax) {
            url = req.url.slice(1, positionAjax);
            if ((url == 'main') || (url == '/')) {
                url = 'main_auth'
            }
            res.render(url);
        } else {
            url = req.url;
            if ((url == 'main') || (url == '/')) {
                url = 'main_auth'
            }
            res.render('index', {
                title: 'Моя охота',
                typePage: url,
                authorized: true
            });
        }
    } else {
        if (~positionAjax) {
            res.render('main');
        } else {
            res.render('index', {
                title: 'Моя охота',
                typePage: 'main',
                authorized: false
            });
        }
    }
});

app.post('/auth', function (req, res) {
    _db.getPassword(req.body.login, req.body.password).then(
        function (resPass) {
            if (resPass) {
                req.session.key = _db.getHash(req.body.password + req.body.login);
                res.cookie('authorized', true);
                res.render('main_auth');
            } else {
                res.render('main');
            }
        }
    );
});

app.post('/exit', function (req, res) {
    req.session.destroy(function() {
        res.cookie('authorized', false);
        res.render('main');
    })
});

app.listen(8080, function () {
    console.log('Server started');
});

//Пользователь авторизован
function isAutorized(data) {
    if (data.session.key) {
        return true;
    }
    return false;
}

//Прочее
//Этот код раюотал с redis

//                redis_client.get(getHash(req.body.password), function (err, obj) {
//                    if (err) {
//                        console.log(err);
//                    } else {
//                        if (obj) {
//                            console.log(obj);
//                        } else {
//                            redis_client.set(getHash(req.body.password), getHash(req.body.password));
//                            console.log('Set redis');
//                        }
//                    }
//                });

//А так страница рисуется целиком

//res.render('index', {
//                title: 'Моя охота',
//                typePage: req.url
//            });

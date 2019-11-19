const express = require('express');
const app = express();
const pg = require('pg');
const conString = "postgres://postgres:123@localhost:5432/myhunting";
const crypto = require('crypto');
const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);

var redis_client = redis.createClient();
redis_client.on('error', function (err) {
    console.log("Error client.on");
});

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(session({
    secret: 'testSecretKey',
    store: new redisStore({
        host: 'localhost',
        port: 6379,
        client: redis_client,
        ttl: 260
    }),
    saveUninitialized: false,
    resave: false
}));

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
            console.log(url);
            res.render('index', {
                title: 'Моя охота',
                typePage: url
            });
        }
    } else {
        if (~positionAjax) {
            res.render('main');
        } else {
            res.render('index', {
                title: 'Моя охота',
                typePage: 'main'
            });
        }
    }
});

app.post('/auth', function (req, res) {
    getPassword(req.body.login, req.body.password).then(
        function (resPass) {
            if (resPass) {
                req.session.key = getHash(req.body.password + req.body.login);
                res.render('main_auth');
            } else {
                res.render('main');
            }
        }
    );
});

app.listen(8080, function () {
    console.log('Server started');
});

//Функция возвращает хэш
function getHash(value) {
    let hash = crypto.createHash('sha256');
    hash.update(value);
    return hash.digest('hex');
}


//Пользователь авторизован
function isAutorized(data) {
    if (data.session.key) {
        return true;
    }
    return false;
}

//Работа с БД

//Проверим правильность логина и пароля
async function getPassword(userName, userPassword) {
    var client = new pg.Client(conString);
    let password = null;
    client.connect();
    var res = await client.query("SELECT password FROM users Where users.name = '" + userName + "'");
    res.rows.forEach(row => {
        password = row.password;
    });
    await client.end();
    if (password !== null && getHash(userPassword) == password) {
        return true;
    } else {
        return false;
    }
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

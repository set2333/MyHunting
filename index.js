const express = require('express');
const app = express();
const pg = require('pg');
const conString = "postgres://postgres:123@localhost:5432/myhunting";
const crypto = require('crypto');

app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));

app.use(express.urlencoded()); //Нужно чтобы разобрать данные полученные от формы
//app.use(express.json());

app.get('*', function (req, res) {
    let positionAjax = req.url.indexOf('ajax');
    if (~positionAjax) {
        res.render(req.url.slice(1, positionAjax));
    } else {
        res.render('index', {
            title: 'Моя охота',
            typePage: req.url
        });
    }
});

app.post('/auth', function (req, res) {
    getPassword(req.body.login, req.body.password).then(
        function (resPass) {
            if (resPass) {
                res.render('index', {
                    title: 'Моя охота',
                    typePage: '/route'
                });
            } else {
                res.render('index', {
                    title: 'Моя охота',
                    typePage: '/main'
                });
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

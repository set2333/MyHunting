//Работа с БД
const pg = require('pg');
const conString = "postgres://postgres:123@localhost:5432/myhunting";
const crypto = require('crypto');

const db = {
    getPassword: getPassword,
    getHash: getHash,
    addFowl: addFowl
}

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

async function addFowl(nameFowl) {
    await add('fowl', {name: nameFowl});
}

async function add(tableName, addData) {
    var client = new pg.Client(conString);
    client.connect();
    let strParams = 'INSERT INTO ' + tableName + ' (';
    let strValues = 'VALUES(';
    let sizeData = Object.keys(addData).length;
    for (let key in addData) {
        strParams += key;
        strValues += "'" + addData[key] + "'";
        if (--sizeData) {
            strParams += ', ';
            strValues += ', ';
        }
        else {
            strParams += ') ';
            strValues += ');';
        }
    }
    var res = await client.query(strParams + strValues);
    await client.end();
}

//Функция возвращает хэш
function getHash(value) {
    let hash = crypto.createHash('sha256');
    hash.update(value);
    return hash.digest('hex');
}

module.exports = db;
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
    let res = await get('users', ['password'], {name: userName});
    let password = res ? res.rows[0].password : null; 
    if (password !== null && getHash(userPassword) == password) {
        return true;
    } else {
        return false;
    }
}

async function addFowl(nameFowl) {
    await add('fowl', {
        name: nameFowl
    });
}

//Добавление записи в таблицуб tableName - строка имя таблицы addData - объект название добавляемого поля и его значение
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
        } else {
            strParams += ') ';
            strValues += ');';
        }
    }
    var res = await client.query(strParams + strValues);
    await client.end();
}

//Получение записей из таблицы tableName - строка имя таблицы feilds - массив полей таблицы values - объект название поля и условие
async function get(tableName, feilds, values) {
    var client = new pg.Client(conString);
    client.connect();
    let strFeilds = 'SELECT ';
    let strTableName = " FROM " + tableName + " ";
    let strValues = "Where ";
    let sizeData = feilds.length;
    feilds.forEach((item, i, arr) => {
        strFeilds += item;
        if (--sizeData) {
            strFeilds += ", ";
        } else {
            strFeilds += " ";
        }
    });
    sizeData = Object.keys(values).length;
    for (let key in values) {
        strValues += tableName + "." + key + " = '" + values[key];
        if (--sizeData) {
            strValues += "', ";
        }
        else {
            strValues += "';";
        }
    }
    let result = await client.query(strFeilds + strTableName + strValues);
    await client.end();
    if (result.rowCount) {
        return result;
    }
    return null;
}

//Функция возвращает хэш
function getHash(value) {
    let hash = crypto.createHash('sha256');
    hash.update(value);
    return hash.digest('hex');
}

module.exports = db;

const express = require('express');
const app = express()
const PORT = 3000;

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

///////////////////

// Объект с ссылками и ключевыми словами
const objectURL = {
    bmw: [['Офф. сайт BMW', 'https://www.bmw.ru/ru/index.html'], ['BMW M5', 'https://auto.ru/moskva/cars/bmw/m5/all/'], ['BMW M4', 'https://auto.ru/moskva/cars/bmw/m4/all/']],
    mercedes: [['Офф. сайт Mercedes', 'https://mbr.ru'], ['Mercedes GLE', 'https://www.major-auto.ru/models/mercedes/gle/'], ['Mercedes CLS', 'https://panavto-mercedes.ru/new_cars/cls-class/cls-63-amg-cls-class/']],
    porsche: [['Офф. сайт Porsche', 'https://www.porsche-moscow.ru'], ['Porsche Taycan', 'https://www.porsche-leninsky.ru/cars/custom/taycan/taycan/taycan'], ['Porsche Macan', 'https://porsche-avtodom.ru/model/macan/']],
    noLink: [['для этого ссылка не была создана', 'error! no link!']]
}

// Ключевые слова по которым будет поиск
const keyWords = Object.keys(objectURL)

///////////////////

app.get('/', (req, res) => {
    res.send(`Server started on ${PORT} port!`)
});

app.post('/', (req, res) => {
    let sentWord = req.body.text
    if (keyWords.includes(sentWord)) {
        for (let i of Object.entries(objectURL)) {
            if (i[0] == sentWord) {
                res.send({
                    'links': i[1]
                });
                break
            }
        }
    } else {
        res.send({
            'links': objectURL.noLink
        });
    }
});

app.post('/links', (req, res) => {
    const request = require('request');

    const URL = req.body.text;
    request(URL, function (err, resp, body) {
        if (err) throw err;
        res.send({ "result": body })
    });
})


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
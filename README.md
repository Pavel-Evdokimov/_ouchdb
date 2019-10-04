## Установим все что нужно
### CouchDB
Установка проста. Для наших целей воспользуемся сервисом [katacoda](https://www.katacoda.com/courses/docker/playground).

`docker pull couchdb`

`docker run -p 5984:5984 -d couchdb`

### Установка http сервера
`npm install express`

Сделаем простой сайт для демонстрации. Сайт будет лежать в папке **public**.

```javascript
const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(3001);
```

### Страничка index.html и src

Положим страничку **index.html** в папку **public**.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>CouchDB and PouchDB demo</title>
</head>
<body>
</body>
</html>
```

### Подключаем PouchDB
https://pouchdb.com. Большая зеленая кнопка Download и ставим это в папку **public/src/**

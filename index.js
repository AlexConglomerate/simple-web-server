const express = require('express')
const path = require('path')
const {addNote, getNotes, removeNote} = require('./notes.controller')

// Стандартный код ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
const port = 3000  // Указываем порт
const app = express()  // Создаем экземпляр express
app.set('views', 'pages') // Указываем название папки, где лежит файл, который нужно открыть (по дефолту 'views'. Поэтому меняем на 'pages')
app.set('view engine', 'ejs') // Переопределяем базовые настройки. Задаем шаблонизатор ejs
app.use(express.urlencoded({extended: true})) // Добавляем парсер входящих данных (middleware)
app.use(express.static(path.resolve(__dirname, 'public'))) // Подключаем файл app.js, который лежит в папке public

// Ниже обработка запросов с клиента ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// Обрабатываем запрос на страницу '/' с методом GET. Т.е. когда пользователь просто зашёл на главную страницу
app.get('/', async (req, res) => {
    res.render('index', { // index - название файла, который нужно отрендерить.
        // Объявляем переменные для ejs файла.
        title: 'Express App', // в ejs '<%= title %>' заменится на 'Express App'
        notes: await getNotes(),
        created: false
    })
})
// Обрабатываем запрос на страницу '/' с методом POST. Т.е. когда пользователь заполнил форму, отправил нам что-то
app.post('/', async (req, res) => {
    console.log(`res.body`, req.body) // Так в консоли отразим, какие данные приняли с сервера
    await addNote(req.body.title) // Добавляем в нашу «БД» || title - значение параметра name в input, откуда пришли данные
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: true
    })
})

// Обрабатываем запрос на страницу '/' с методом DELETE
app.delete('/:id', async (req, res) => {
    await removeNote(req.params.id)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})

// Запуск сервера ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
app.listen(port, () => console.log(`Server started`))


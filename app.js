const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const colors = ['#FF69B4', '#DA70D6', '#DC143C', '#FF4500', '#FFFF00', '#00FA9A', '#7FFFD4', '#1E90FF', '	#DAA520', '	#FFF0F5', '	#708090']
let time = 0
let score = 0


startBtn.addEventListener('click', (event) => {
    //    Отменяем поведение добавление хэша
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    // Делегирование событий, проверка состоит ли класс 
    if (event.target.classList.contains("time-btn")) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let currentTime = --time
        if (currentTime < 10) {
            currentTime = `0${currentTime}`
        }
        setTime(currentTime)
    }
}

function setTime(value) {
    timeEl.innerHTML = (`00:${value}`)
}

function finishGame() {
    // Удаляем таймер вместе с родителем h3
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span> </h1>`
}

function createRandCircle() {
    const circle = document.createElement('div')
    const size = getRandNum(10, 60)
    // С помощью деструктуризации получаем размеры доски через getBoundingClientRect
    const {
        width,
        height
    } = board.getBoundingClientRect()

    const x = getRandNum(0, width - size)
    const y = getRandNum(0, height - size)


    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    // Метод append позволяет вставить в конец какого-либо элемента другой элемент.
    board.append(circle)
}

function getRandNum(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle')
        if (circle) {
            circle.click()
        }
    }
    setInterval(kill, 75)
}
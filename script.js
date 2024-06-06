let x = 0,
	y = 0,
	dirX = 1,
	dirY = 1

const speed = 2
const palette = ['#0071c5', '#eeeeee', '#ff8800', '#e124ff', '#6a19ff', '#ff2188']
let paletteIndex = 0
const dvd = document.getElementById('dvd')
const dvdColorElement = document.getElementById('g4421')

const setDVDColor = color => { dvdColorElement.style.fill = color }

setDVDColor(palette[0])

let prevColorChoiceIndex = 0
let black = document.getElementById('black')

let timeoutID = null

function getNewRandomColor() {
	if (timeoutID !== null) {
		clearTimeout(timeoutID)
		timeoutID = null
	}

	const currentPalette = [...palette]
	currentPalette.splice(prevColorChoiceIndex, 1)
	const colorChoiceIndex = Math.floor(Math.random() * currentPalette.length)
	prevColorChoiceIndex = colorChoiceIndex < prevColorChoiceIndex ? colorChoiceIndex : colorChoiceIndex + 1
	const colorChoice = currentPalette[colorChoiceIndex]

	paletteIndex = paletteIndex >= palette.length ? 0 : (paletteIndex + 1)

	return colorChoice
}

const screenHeight = document.body.clientHeight
const screenWidth = document.body.clientWidth

function animate() {
	let dvdWidth = dvd.clientWidth
	let dvdHeight = dvd.clientHeight

	let needNewRandomColor = false
	if (x + dvdWidth >= screenWidth || x < 0) {
		dirX *= -1
		needNewRandomColor = true
	}
	if (y + dvdHeight >= screenHeight || y < 0) {
		dirY *= -1
		needNewRandomColor = true
	}
	if (needNewRandomColor) {
		setDVDColor(getNewRandomColor())
	}

	x += dirX * speed
	y += dirY * speed
	dvd.style.left = x + 'px'
	dvd.style.top = y + 'px'

	window.requestAnimationFrame(animate)
}

window.requestAnimationFrame(animate)
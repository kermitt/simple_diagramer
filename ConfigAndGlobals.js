// This file will hold _stuff_.
// It will be used and tested, but these are helper functions or constants -
// The goal is this file is to remove y2e-clutter from the core logic.

// + -- TODO: Set globals via localstorage ----------------------------------- +
let NEXT = 1  // TODO! LOCALSTORAGE
let NODES = {}
let default_size = 30
const DOM_ID = '#board'
// const RETURN_KEY = 16
// const SPACE_BAR = 32

// + -- Lines IDs... ---------------------------------------------------------- +
let NEXT_LINE_ID = 1
const setHighestLineId = () => {
  let actualIds = []
  for (let key in NODES) {
    NODES[key].siblings.forEach((fromTo) => {
      let tmp = fromTo.id.replace('#', '')
      tmp = fromTo.id.replace('line_', '')
      let i = parseInt(tmp)
      actualIds.push(i)
    })
  }
  actualIds.sort(sort_numbers)
  actualIds = actualIds.reverse()
  NEXT_LINE_ID = actualIds[0]
  NEXT_LINE_ID++
}

const getNextLineId = () => {
  let id = 'line_' + NEXT_LINE_ID++
  return id
}

// + -- Color ---------------------------------------------------------------- +
const BLACK = '#000000'
const BLUE = '#0000ff'
const GREY = '#e0e0e0'
const ORANGE = '#ff6633'

const getColor = () => {
  let w = document.getElementById('color_select')
  let selectedColor = w.options[w.selectedIndex].text
  if (selectedColor === 'Black') {
    return BLACK
  } else if (selectedColor === 'Orange') {
    return Orange
  } else if (selectedColor === 'Blue') {
    return BLUE
  } else if (selectedColor === 'Grey') {
    return GREY
  }
}
// + -- States --------------------------------------------------------------- +
const NODE_MODE = 'State: add node'
const EDGE_MODE = 'State: add an edge'
const NORMAL_MODE = 'State: normal'
const KILL_MODE = 'State: delete node'
let STATE = NORMAL_MODE

// + -- sorting -------------------------------------------------------------- +

const sort_numbers = (a, b) => {
  return a - b
}

const sort_time = (a, b) => {
  return sort_numbers(a.getTime(), b.getTime())
}
// + -- semi-dynamic ids ( letters: Excel style )----------------------------- +
function getNextLetter () {
  let letter = getLetterFromNumber(NEXT)
  NEXT++
  return letter
}
function setNextToOneHigherThanGivenLetter (letter) {
  NEXT = getNumberFromLetter(letter)
  NEXT++
}

const getLetterFromNumber = (i) => {
  let mod = i % 26
  let pow = i / 26 | 0
  let letter = mod ? String.fromCharCode(64 + mod) : (pow--, 'Z')
  return pow ? getLetterFromNumber(pow) + letter : letter
}

const getNumberFromLetter = (letter) => {
  let i = 0,
    len = letter.length,
    pos = len
  while ((pos -= 1) > -1) {
    i += (letter.charCodeAt(pos) - 64) * Math.pow(26, len - 1 - pos)
  }
  return i
}

// + -- Given an origin x & y, distance and angle find the nx2t x & y -------- +
function getNewXY (x, y, angle, distance) {
  let result = {}
  result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + x)
  result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + y)

  return result
}

// + -- Get the angle between two different points. Scale from 0 to 360. ----- +
function getAngleBetween2Points (x1, y1, x2, y2) {
  return angle360(x1, y1, x2, y2)
}

const angle = (x1, y1, x2, y2) => {
  let dy = y2 - y1
  let dx = x2 - x1
  let theta = Math.atan2(dy, dx) // -(PI) to +(PI)
  theta *= 180 / Math.PI // rads to degs...  -180 to 180

  return theta
}
const angle360 = (x1, y1, x2, y2) => {
  let theta = angle(x1, y1, x2, y2) // -180 to 180
  if (theta < 0) theta = 360 + theta // 0 to 360

  return theta
}

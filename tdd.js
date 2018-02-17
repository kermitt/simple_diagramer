
// + ------------------------------------------------------------------------- +
const test_excel_style_letter_labels_like_numbers = () => {
  let expected = {
    'HR': 226,
    'A': 1,
    'Z': 26,
    'AB': 28,
    'NTP': 10000
  }
  let isOk = true
  for (let letter in expected) {
    let number = expected[letter]

    let actualLetter = getLetterFromNumber(number)
    let actualNumber = getNumberFromLetter(letter)

    if (actualNumber !== number || actualLetter !== letter) {
      isOk = false
    }
  }
  verdict(isOk, 'test_excel_style_letter_labels_like_numbers')
}

const count_to_10_useExcelStyleLetters = () => {
  let expected = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
    6: 'F',
    7: 'G',
    8: 'H',
    9: 'I',
    10: 'J'
  }
  let isOk = true
  for (let i = 1; i < 10; i++) {
    // let letter = getNextLetter() <-- This method is state depenent, avoid that and use its dependent function instead
    let letter = getLetterFromNumber(i)
    if (expected[i] !== letter) {
      isOk = false
    }
  }
  verdict(isOk, 'count_to_10_useExcelStyleletters...  this is a test of the next id mechanism')
}

const test_getAngleBetween2Points = () => {
  let expected_actual = {
    right: [0],
    top_right: [45],
    top: [90],
    top_left: [135],
    left: [180],
    bottom_left: [225],
    bottom: [270],
    bottom_right: [315]

  }

  expected_actual.right.push(getAngleBetween2Points(0, 0, 1, 0))
  expected_actual.top_right.push(getAngleBetween2Points(0, 0, 1, 1))
  expected_actual.top.push(getAngleBetween2Points(0, 0, 0, 1))
  expected_actual.top_left.push(getAngleBetween2Points(0, 0, -1, 1))
  expected_actual.left.push(getAngleBetween2Points(0, 0, -1, 0))
  expected_actual.bottom_left.push(getAngleBetween2Points(0, 0, -1, -1))
  expected_actual.bottom.push(getAngleBetween2Points(0, 0, 0, -1))
  expected_actual.bottom_right.push(getAngleBetween2Points(0, 0, 1, -1))

  let isOk = true
  for (let k in expected_actual) {
    if (expected_actual[k][0] !== expected_actual[k][1]) {
      isOk = false
    }
  }
  verdict(isOk, 'getAngleBetween2Points angles between to points ranging from 0 to 360')
}
const test_whether_letterNumber_thing_is_coherent = () => {
  let index = 3
  let expected_letter = 'C'
  let expected_number = 3
  let actualLetter = getLetterFromNumber(index)
  let actualNumber = getNumberFromLetter(actualLetter)

  let isOk = actualLetter === expected_letter && actualNumber === expected_number
  verdict(isOk, 'test_whether_letterNumber_thing_is_coherent letter: ' + actualLetter + ' number: ' + actualNumber)
}

// + ------------------------------------------------------------------------- +
function verdict (isOk, msg) {
  let v = isOk ? 'PASS' : 'FAIL'
  console.log(v + '\t' + msg)
}

function tdd () {
  test_excel_style_letter_labels_like_numbers()
  count_to_10_useExcelStyleLetters()
  test_getAngleBetween2Points()
  test_whether_letterNumber_thing_is_coherent()
}

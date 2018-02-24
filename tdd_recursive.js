const needsInflating = (candidate) => {
  // the 'req' object is crazily http encoded
  if (candidate != undefined) {
    if (typeof candidate === 'string') {
      if (candidate.indexOf('}') > -1) {
        if (candidate.indexOf('{') > -1) {
          return true
        }
      }
    }
  }
  return false
}

let DELIMIT = '|'
const pad = (ancestry) => {
  let n = 0
  for (var i = 0; ancestry.length > i; i++) {
    if (ancestry.charAt(i) == DELIMIT) {
      ++n
    }
  }
  let spaces = ''
  for (let i = 0; i < n; i++) {
    spaces += '.'
  }
  return spaces
}
let seen = {}
let emitted = 0
let total = 0
const recursion = (parent, d) => {
  for (let k in d) {
    let obj = d[k]
    let ancestor = parent + DELIMIT + k
    if (typeof obj === 'object') {
      recursion(ancestor, obj)
    } else if (needsInflating(obj)) {
      // Some of the 'strings' in the object graph are nutty
      obj = JSON.parse(obj)
      recursion(ancestor, obj)
    } else {
      let spacer = pad(ancestor)
      let denumber = ancestor.replace(/\|\d/, '|x')
      if (seen.hasOwnProperty(denumber)) {
        seen[denumber]++
      } else {
        seen[denumber] = 1
        console.log(total + '  ' + denumber + spacer + '   ')// ' + obj)
        emitted++
      }
      total++
    }
  }
}

// + ------------------------------------------------------------------------- +
// let data = require('./results.json')
let data = [1, 2, {z: 'one', y: 'two', 'g': {o: 'ooo', p: 'ppp'}}, 4, 5, 6]

function main () {
  recursion('root', data)
  console.log('The end....   emitted ' + emitted + ' of ' + total)
}

main(data)

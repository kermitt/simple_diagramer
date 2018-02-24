/*
Q: What is this? Why?
A: The ElasticSearch schema is gigantic. And busy. I need a way to look at it
in order to understand it better. This script provides a way.
*/

let emitted = 0
let total = 0

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

const pad = (ancestry) => {
  let n = 0
  for (var i = 0; ancestry.length > i; i++) {
    if (ancestry.charAt(i) == '|') {
      ++n
    }
  }
  let spaces = ''
  for (let i = 0; i < n; i++) {
    spaces += '.'
  }
  return spaces
}

let seen = {} // Just keep track of already seen keys so as to not emit them so as to cut down on clutter
const recursion = (parent, d) => {
  for (let k in d) {
    let obj = d[k]
    let ancestor = parent + '|' + k
    if (typeof obj === 'object') {
      recursion(ancestor, obj)
    } else if (needsInflating(obj)) {
      // Some of the 'strings' in the object graph are nutty
      obj = JSON.parse(obj)
      recursion(ancestor, obj)
    } else {
      let spacer = pad(ancestor)
      let denumberedAncestor = ancestor.replace(/\|\d/, '|x') // Convert numbers, such as '|6' to '|x'...
      if (seen.hasOwnProperty(denumberedAncestor)) {
        seen[denumberedAncestor]++
      } else {
        seen[denumberedAncestor] = 1

        // SEE the keys
        // console.log(total + '  ' + denumberedAncestor + spacer + '   ') // show the keys
        // SEE the values
        console.log(total + '   ' + spacer + '   ' + obj) // show the values
        emitted++
      }
      total++
    }
  }
}

// + ------------------------------------------------------------------------- +
function self_test () {
  const verdict = (bool) => {
    return bool ? 'PASS' : 'FAIL'
  }

  let dummy = [1, 2, {z: 'one', y: 'two', 'x': {o: 'ooo', p: 'ppp', q: 'qqq'}}, 4, {z: 'ichi', y: 'ni', 'x': {o: 'san', p: 'shi', q: 'go', r: 'FINDME'}}, 5, 6]
  recursion('root', dummy)
  console.log('The end....   emitted ' + emitted + ' of ' + total)

  // correct result?
  let isRecursionOk = emitted == 7 && total == 16

  // padding is proper?
  let ancestor1 = pad('path|path')
  let ancestor2 = pad('path|path|path')
  let isPaddingCorrect = ancestor1.length < ancestor2.length

  // ugly json is dealt with?
  let no = needsInflating('not an object')
  let yes = needsInflating('\\"{\\"end\\":[null,null],\\"drain\\":[null,null]}\\"') // Elasticsearch objects can be pretty silly looking
  let ugly_json = no == false && yes == true
  console.log('+ ------------------------------------------------------------- +')
  console.log(verdict(isRecursionOk) + ' recursion')
  console.log(verdict(isPaddingCorrect) + ' padding')
  console.log(verdict(ugly_json) + ' ugly_json')
}

function main () {
  // Actual 105K ElasticSearch gaint-ball-of-JSON
  let data = require('./results.json')
  recursion('root', data)
  console.log('The end....   emitted ' + emitted + ' of ' + total)
}

// main(data)
self_test()

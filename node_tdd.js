console.log("THIS IS A WORK IN PROGRESS...   This will become a recursive unrolling of a ball of json") 
const pad = (ancestry) => {
  let n = 0
  for (var i = 0; ancestry.length > i; i++) {
    if (ancestry.charAt(i) == 'i') {
      ++n
    }
  }
  // console.log(ancestry + '    ' + n)
  let spaces = ''
  for (let i = 0; i < n; i++) {
    spaces += '____'
  }
  return ancestry + '____' + n
}

const test_recursion = (parent, d) => {
  for (let k in d) {
    let obj = d[k]
    if (typeof obj === 'object') {
      // console.log((parent + k) + ' obj! ' + obj)
      test_recursion(parent + '_' + k, obj)
    } else {
    	let spacer = pad(parent + '_' + k)
      console.log(spacer + '   |' + '| ' + obj)
    }
  }
}

// + ------------------------------------------------------------------------- +

function verdict (isOk, msg) {
			  let v = isOk ? 'PASS' : 'FAIL'
}
/*
let data = [
	{ a: '1', b: '2'},
  { c: '3', d: '4', e: '5', f: {'finch': 'bird', 'wren': 'bird'}, h: [1, 2, 3, 4, 5, 6] },
  'h'
]
*/

let data = [1, 2, {z: 'one', y: 'two', 'g': {o: 'ooo', p: 'ppp'}}, 4, 5, 6]

function main () {
  test_recursion('root', data)
}

main(data)


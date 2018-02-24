
const pad = (ancestry) => {
  let n = 0
  for (var i = 0; ancestry.length > i; i++) {
    if (ancestry.charAt(i) == '_') {
      ++n
    }
  }
  let spaces = ''
  for (let i = 0; i < n; i++) {
    spaces += '____'
  }
  return ancestry + '____' + spaces
}

const recursion = (parent, d) => {
  for (let k in d) {
    let obj = d[k]
    if (typeof obj === 'object') {
      recursion(parent + '_' + k, obj)
    } else {
      let spacer = pad(parent + '_' + k)
      console.log(spacer + '   |' + '| ' + obj)
    }
  }
}

// + ------------------------------------------------------------------------- +

let data = [1, 2, {z: 'one', y: 'two', 'g': {o: 'ooo', p: 'ppp'}}, 4, 5, 6]

function main () {
  recursion('root', data)
}

main(data)


   let defaultNodes = {
     'A': {
       'x': 242,
       'y': 207,
       'id': 'A',
       'size': 30,
       'color': '#ff6633',
       'text': 'Slithy toves gyre and gimble',
       'siblings': [
         {
           'from': 'A',
           'to': 'C',
           'id': 'line_1'
         },
         {
           'from': 'A',
           'to': 'B',
           'id': 'line_2'
         },
         {
           'from': 'A',
           'to': 'E',
           'id': 'line_3'
         },
         {
           'from': 'A',
           'to': 'A',
           'id': 'line_5'
         }
       ]
     },
     'B': {
       'x': 455,
       'y': 309,
       'id': 'B',
       'size': 30,
       'color': '#ff6633',
       'text': 'Reuben kicked his donkey',
       'siblings': []
     },
     'C': {
       'x': 118,
       'y': 348,
       'id': 'C',
       'size': 30,
       'color': '#0000ff',
       'text': 'Suppose Truth were a woman - what then?',
       'siblings': []
     },
     'D': {
       'x': 681,
       'y': 268,
       'id': 'D',
       'size': 30,
       'color': '#e0e0e0',
       'text': 'What can be shown, cannot be said.',
       'siblings': [
         {
           'from': 'D',
           'to': 'E',
           'id': 'line_4'
         }
       ]
     },
     'E': {
       'x': 876,
       'y': 143,
       'id': 'E',
       'size': 30,
       'color': '#e0e0e0',
       'text': 'If your Saturnian has learned how to use the word "floor" you may try telling him something new, that _here_ is a floor',
       'siblings': []
     },
     'F': {
       'x': 1104,
       'y': 316,
       'id': 'F',
       'size': 30,
       'color': '#e0e0e0',
       'text': 'The human body is the best picture of the human soul.',
       'siblings': []
     },
     'I': {
       'x': 507,
       'y': 109,
       'id': 'I',
       'size': 30,
       'text': '',
       'siblings': [],
       'color': '#e0e0e0'
     },
     'K': {
       'x': 759,
       'y': 72,
       'id': 'K',
       'size': 30,
       'text': '',
       'siblings': [],
       'color': '#0000ff'
     }
   }

   const getHighestLetter = () => {
      // find the highest id in the nodes...
     let letters = []
     for (let k in NODES) {
       letters.push(NODES[k].id)
     }
     letters.sort()
     return letters[letters.length - 1]
   }

   const len = (map) => {
     let i = 0
     for (let k in map) {
       i++
     }
     return i
   }

   function zap () {
     let nodes_as_a_gaint_string = localStorage.getItem('graph')
     let tmp = JSON.parse(nodes_as_a_gaint_string)
     localStorage.removeItem('cursor')
     localStorage.removeItem('graph')
     alert('Removed ' + len(tmp) + ' nodes from localStorage')
   }

   function save () {
     console.log(JSON.stringify(NODES, null, 6))
     for (let k in NODES) {
       let row_id = 'text_' + NODES[k].id
       NODES[k].text = document.getElementById(row_id).value
     }

     let letter = getHighestLetter()
     localStorage.setItem('graph', JSON.stringify(NODES))
     localStorage.setItem('cursor', letter)
     alert('Overwrote localStorage with ' + len(NODES) + ' nodes ending on ' + letter)
   }

   function load () {
     if (localStorage.getItem('graph') !== null) {
       let nodes_as_a_gaint_string = localStorage.getItem('graph')
       let letter = localStorage.getItem('cursor')

       NODES = JSON.parse(nodes_as_a_gaint_string)
       console.log('Inflated ' + len(NODES) + ' nodes')
     } else {
       console.log('Nothing in localStorage...  ...Using the default graph instead.')
       NODES = defaultNodes
     }

     let highestLetter = getHighestLetter() // Set the 'cursor'/letter/id
     setNextToOneHigherThanGivenLetter(highestLetter)
     for (let id in NODES) {
       inflateNode(NODES[id])
     }

     setHighestLineId()
     for (let key in NODES) {
       let node = NODES[key]
       node.siblings.forEach((fromTo, i) => {
         makeEdge(fromTo)
       })
     }

     makeInfoTable()
   }

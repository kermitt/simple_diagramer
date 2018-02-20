
   let defaultNodes = {
     'AA': {
       'x': 254,
       'y': 130,
       'id': 'AA',
       'size': 30,
       'text': 'Slithy toves gyre and gimble',
       'siblings': [
         {
           'from': 'AA',
           'to': 'AD',
           'id': 'line_2'
         }
       ]
     },
     'AB': {
       'x': 651,
       'y': 220,
       'id': 'AB',
       'size': 30,
       'text': 'Reuben kicked his donkey',
       'siblings': [
         {
           'from': 'AB',
           'to': 'AD',
           'id': 'line_5'
         },
         {
           'from': 'AB',
           'to': 'AC',
           'id': 'line_6'
         }
       ]
     },
     'AC': {
       'x': 976,
       'y': 180,
       'id': 'AC',
       'size': 30,
       'text': 'Suppose Truth were a woman - what then?',
       'siblings': []
     },
     'AD': {
       'x': 688,
       'y': 95,
       'id': 'AD',
       'size': 30,
       'text': 'If your Saturnian has learned how to use the word "floor" you may try telling him something new, that _here_ is a floor',
       'siblings': [
         {
           'from': 'AD',
           'to': 'AC',
           'id': 'line_3'
         }
       ]
     },
     'AE': {
       'x': 87,
       'y': 368,
       'id': 'AE',
       'size': 30,
       'text': '',
       'siblings': [
         {
           'from': 'AE',
           'to': 'AA',
           'id': 'line_1'
         }
       ]
     },
     'AF': {
       'x': 556,
       'y': 359,
       'id': 'AF',
       'size': 30,
       'text': '',
       'siblings': [
         {
           'from': 'AF',
           'to': 'AB',
           'id': 'line_4'
         }
       ]
     }
   }

   /* let defaultNodes = {
     'AA': {
       'x': 254,
       'y': 130,
       'id': 'AA',
       'size': 30,
       'text': 'Slithy toves gyre and gimble',
       'siblings': []
     },
     'AB': {
       'x': 651,
       'y': 220,
       'id': 'AB',
       'size': 30,
       'text': 'Reuben kicked his donkey',
       'siblings': []
     },
     'AC': {
       'x': 976,
       'y': 180,
       'id': 'AC',
       'size': 30,
       'text': 'Suppose Truth were a woman - what then?',
       'siblings': []
     },
     'AD': {
       'x': 688,
       'y': 95,
       'id': 'AD',
       'size': 30,
       'text': 'If your Saturnian has learned how to use the word \"floor\" you may try telling him something new, that _here_ is a floor',
       'siblings': []
     }
   }
*/
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

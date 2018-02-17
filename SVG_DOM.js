// + -- Add a node: TODO: This has defaults: make those params --------------- +
function addNode (x, y) {
  // for raw nodes not from the data store
  let id = getNextLetter()
  NODES[id] = {x: x, y: y, id: id, size: default_size, text: '', siblings: []}
  inflateNode(NODES[id])

  makeInfoTable()
}

function makeInfoTable () {
  let ids = []
  for (let k in NODES) {
    ids.push(NODES[k].id)
  }
  ids.sort()

  let table = "<table id='info_table'>"
  ids.forEach((id, i) => {
    let node = NODES[id]
    let css_row = i % 2 == 0 ? 'even_tr' : 'odd_tr'
    let css_input = i % 2 == 0 ? 'even_info_row' : 'odd_info_row'
    table += "<tr class='" + css_row + "'>"
    table += "<td class='id'>" + node.id + '</td>'
    table += "<td><input class='" + css_input + "' type='text' id='text_" + node.id + "' value='" + node.text + "''></td>"
    table += '</tr>'
  })
  table += '</table>'

  document.getElementById('info').innerHTML = table
}
const inflateNode = (node) => {
  console.log('ADDING : ' + node.id)
  let p = d3.select(DOM_ID)
        .append('svg:g')
        .data([{
          'x': node.x,
          'y': node.y,
          'size': node.size,
          'id': node.id,
          'text': node.text
        }]) // needed for dragging
        .attr('transform', 'translate(' + node.x + ',' + node.y + ')')
        .attr('id', node.id)
        .call(node_drag)
        .on('click', clicked)
  let background = p.append('svg:ellipse')
        .attr('fill-opacity', 0.1)
        .attr('stroke', '#000')
        .attr('stroke-width', 4)
        .attr('rx', node.size * 2)
        .attr('ry', node.size)

//        .attr('r', default_size)

  let foreground = p.append('svg:text')
        .text(node.id)
        .attr('y', '.1em')
        .style('font-size', 40)
        .attr('transform', 'translate(' + [0, node.size * 0.33] + ')')
        .attr('text-anchor', 'middle')
        .attr('font-weight', 700)
        .attr('font-family', 'Helvetica')
        .attr('fill', '#000')
        .attr('stroke', 'none')
        .attr('pointer-events', 'none')
}

// + --- Color the active row in the table ----------------------------------- +
let last_active_node = ''
let last_active_css = ''
function clicked (node, i) {
  if (node.id !== last_active_node) {
    // console.log(node.id + ' i ' + i + ' last_id: ' + last_active_node)
    let thisRow = document.getElementById('text_' + node.id)
    let this_class = thisRow.classList.contains('even_info_row') ? 'even_info_row' : 'odd_info_row'
    thisRow.classList.remove(this_class)
    thisRow.classList.add('highlight')

    if (last_active_node.length > 0) {
      let thatRow = document.getElementById('text_' + last_active_node)
      thatRow.classList.remove('highlight')
      thatRow.classList.add(last_active_css)
    }

    last_active_css = this_class
    last_active_node = node.id
  }
}

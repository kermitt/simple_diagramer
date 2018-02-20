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
    let href = "<a href='javascript:erase(\"" + node.id + "\")'>" + node.id + '</a>'
    table += "<td class='id'>" + href + '</td>'
    table += "<td><input class='" + css_input + "' type='text' id='text_" + node.id + "' value='" + node.text + "''></td>"
    table += '</tr>'
  })
  table += '</table>'

  document.getElementById('info').innerHTML = table
}
const erase = (id) => {
  console.log('removing id ' + id)
  d3.select('#' + id).remove()
  delete NODES[id]

  makeInfoTable()
}
const inflateNode = (node) => {
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
        // .call(node_drag)
        // .on('click', clicked)
        .call(d3.drag()
          .subject(function () {
            let p = [d3.event.x, d3.event.y]
            return [p, p]
          })
          .on('start', dragStarted)
          .on('end', dragEnded)
        )

  let background = p.append('svg:ellipse')
        .attr('fill', '#f6f6f6')
        .attr('fill-opacity', 1.0)
        .attr('stroke', '#000')
        .attr('stroke-width', 2)
        .attr('rx', node.size * 1.2)
        .attr('ry', node.size * 1.2)

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

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
        .on('click', function () {
          if (STATE === KILL_MODE) {
            removeNode(node.id)
          }
        })
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
const removeNode = (targetId) => {
  let lines_to_kill = {}
  for (var key in NODES) {
    let node = NODES[key]
    let keep = []
    node.siblings.forEach((fromTo) => {
      if (fromTo.to !== targetId && fromTo.from !== targetId) {
        keep.push(fromTo)
      } else {
        // Collect ids of lines to remove from the SVG DOM
        lines_to_kill[fromTo.id] = 0
      }
    })
    // Overwrite each in NODES with only the good information
    node.siblings = keep
  }

  // remove the paths
  for (var id in lines_to_kill) {
    DIAGRAM.select('#' + id).remove()
  }
  // remove the node from NODE
  delete NODES[targetId]
  // remove the node from the DOM
  DIAGRAM.select('#' + targetId).remove()
  // recreate the table, now without the target row
  makeInfoTable()
}

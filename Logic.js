
let DIAGRAM = d3.select('#board')

let metro_line = DIAGRAM.append('line').attr('id', 'metro_line').attr('class', 'metro_line')
let metro_circle = DIAGRAM.append('circle').attr('cx', -10).attr('cy', -10).attr('r', 6).attr('id', 'metro_circle').attr('class', 'metro_circle')

const dragstarted = () => {
  console.log('START!')

  let d = d3.event.subject  // What is a 'subject'?! TODO! Learn that.
  console.log('do it!')
  let id = getNextLetter()
  let active = DIAGRAM.append('path').datum(d)
  let x0 = d3.event.x
  let y0 = d3.event.y
  active.attr('id', id)

  d3.event.on('drag', function () {
    let x1 = d3.event.x
    let y1 = d3.event.y
    let dx = x1 - x0
    let dy = y1 - y0

    if (dx * dx + dy * dy > 100) d.push([x0 = x1, y0 = y1])
    else d[d.length - 1] = [x1, y1]
    line.id = id
    active.attr('d', line)
  })
}

function euclide (point) {
  let distance = 1000000
  let selectedId
  for (let id in NODES) {
    var a = NODES[id].x - point[0]
    var b = NODES[id].y - point[1]
    var c = Math.sqrt(a * a + b * b)

    if (c < distance) {
      distance = c
      selectedId = id
    }
  }
  return selectedId
}

const dragended = () => {
  console.log('END! ')
}
// let node_drag = d3.behavior.drag()
let node_drag = d3.drag()
    .on('drag', function (d, i) {
      if (STATE === NORMAL_MODE) {
        d.x += d3.event.dx
        d.y += d3.event.dy
        d3.select(this).attr('transform', function (d, i) { return 'translate(' + [d.x, d.y] + ')' })
      }
    })
    // .on('dragstart', function (d, i) {})
    // .on('dragend', function (d, i) {})

// d3.select('#board').on('click', function () {
DIAGRAM.on('click', function () {
  let coords = d3.mouse(this)
  if (STATE === NORMAL_MODE) {
  } else if (STATE === NODE_MODE) {
    addNode(coords[0], coords[1])
  } else if (STATE === EDGE_MODE) {

  }
}).on('mousemove', function () {
  let coords = d3.mouse(this)
  if (STATE === EDGE_MODE) {
//    console.log('EDGE: ')// + coords[0] + ' y: ' + coords[1])
    let m = d3.mouse(this)
    let id = euclide(m)
    let p2 = [NODES[id].x, NODES[id].y]

    metro_line.attr('x1', p2[0]).attr('y1', p2[1]).attr('x2', m[0]).attr('y2', m[1])
    metro_circle.attr('cx', p2[0]).attr('cy', p2[1])

    console.log('x: ' + p2[0] + '  y: ' + p2[1])
  }
}).on('drag', function () {
  console.log('DRAG!')
})

let line = d3.line().curve(d3.curveBasis)

DIAGRAM.call(d3.drag()
        .subject(function () { var p = [d3.event.x, d3.event.y]; return [p, p] }) // Actually, I do not understand this line: What does this do?
        .on('start', dragstarted)
        .on('end', dragended)
        )

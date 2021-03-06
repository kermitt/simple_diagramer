
let DIAGRAM = d3.select('#board')

let metro_line = DIAGRAM.append('line').attr('id', 'metro_line').attr('class', 'metro_line')
// let metro_circle = DIAGRAM.append('circle').attr('cx', -10).attr('cy', -10).attr('r', 6).attr('id', 'metro_circle').attr('class', 'metro_circle')

class FromTo {
  constructor () {
    this.from = undefined
    this.to = undefined
    this.id = undefined
  }
  setFrom (from) {
    this.from = from
  }
  setTo (to) {
    this.to = to
  }
  setId (id) {
    this.id = id
  }
}
let fromTo = {}

const dragStarted = () => {
  let d = d3.event.subject
  let x0 = d3.event.x
  let y0 = d3.event.y
  let line_id, edge, line
  if (STATE === EDGE_MODE) {
    line = d3.line().curve(d3.curveBasis)
    edge = DIAGRAM.append('path').datum(d)

    line_id = getNextLineId()
    fromTo = new FromTo()
    fromTo.setId(line_id)
    edge.attr('id', line_id)
  }
  d3.event.on('drag', function () {
    let x1 = d3.event.x
    let y1 = d3.event.y
    let dx = x1 - x0
    let dy = y1 - y0

    if (STATE === NORMAL_MODE) {
      // move a node
      d3.select(this)
      .attr('cx', d.x = d3.event.x)
      .attr('cy', d.y = d3.event.y)

      d3.select(this).attr('transform', function (d, i) { return 'translate(' + [x1, y1] + ')' })
      NODES[this.id].x = x1
      NODES[this.id].y = y1
    } else if (STATE === EDGE_MODE) {
      // show the destination
      metro_line.classed('metro_line', true)

      //  draw an edge
      fromTo.setFrom(this.id)
      if (dx * dx + dy * dy > 100) d.push([x0 = x1, y0 = y1])
      else d[d.length - 1] = [x1, y1]
      line.id = line_id
      edge.attr('d', line)

      // metro picker to show where it will end
      let id2 = euclide([x1, y1])
      let p2 = [NODES[id2].x, NODES[id2].y]
      fromTo.setTo(id2)

      metro_line
      .attr('x1', p2[0])
        .attr('y1', p2[1])
        .attr('x2', x1)
        .attr('y2', y1)
    }
  })
}
const moveEdge = (fromTo) => {
  // 'Move'? No. Actually remove and re-create in a different location. TODO: Differently.
  DIAGRAM.select('#' + fromTo.id).remove()
  makeEdge(fromTo)
}
const dragEnded = (id) => {
  if (STATE === NORMAL_MODE) {
    for (let key in NODES) {
      let node = NODES[key]
      node.siblings.forEach((fromTo, i) => {
        DIAGRAM.select('#' + fromTo.id).remove()
        makeEdge(fromTo)
      })
    }
  } else if (STATE === EDGE_MODE) {
    if (fromTo !== undefined) {
      makeEdge(fromTo)
      DIAGRAM.select('#' + fromTo.id).remove()
      NODES[fromTo.from].siblings.push(fromTo)
      fromTo = undefined
      metro_line.classed('metro_line', false)
    }
  }
}

const makeEdge = (fromTo) => {
  let from = NODES[fromTo.from]
  let to = NODES[fromTo.to]
  const context = d3.path()

  if (fromTo.from !== fromTo.to) {
    let middleX = (from.x + to.x) / 2
    let middleY = (from.y + to.y) / 2

    context.moveTo(from.x, from.y)
    context.lineTo(middleX, middleY)
    context.lineTo(to.x, to.y)
  } else {
    let angle = Math.floor(Math.random() * Math.floor(360))

    let xy1 = getNewXY(NODES[fromTo.from].x, NODES[fromTo.from].y, angle, default_size * 1.2)
    context.arc(xy1.x, xy1.y, 20, 0, 2 * Math.PI)
  }

  DIAGRAM.append('path')
    .attr('class', 'path')
    .attr('d', context.toString())
    .attr('id', fromTo.id)
}

const euclide = (point) => {
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
DIAGRAM.on('click', function () {
  let coords = d3.mouse(this)
  if (STATE === NODE_MODE) {
    addNode(coords[0], coords[1])
  }
}).on('mousemove', function () {
}).on('drag', function () {
})

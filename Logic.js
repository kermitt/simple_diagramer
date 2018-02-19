
let DIAGRAM = d3.select('#board')

let metro_line = DIAGRAM.append('line').attr('id', 'metro_line').attr('class', 'metro_line')
let metro_circle = DIAGRAM.append('circle').attr('cx', -10).attr('cy', -10).attr('r', 6).attr('id', 'metro_circle').attr('class', 'metro_circle')
let NEXT_LINE_ID = 1

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
let fromTo

const dragstarted = () => {
  let d = d3.event.subject
  let x0 = d3.event.x
  let y0 = d3.event.y
  let id, edge, line
  if (STATE === EDGE_MODE) {
    line = d3.line().curve(d3.curveBasis)
    edge = DIAGRAM.append('path').datum(d)
    id = 'line_' + NEXT_LINE_ID++
    fromTo = new FromTo()
    fromTo.setId(id)
    edge.attr('id', id)
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
      //  draw an edge

      fromTo.setFrom(this.id)

      if (dx * dx + dy * dy > 100) d.push([x0 = x1, y0 = y1])
      else d[d.length - 1] = [x1, y1]
      line.id = id
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
      metro_circle.attr('cx', p2[0]).attr('cy', p2[1])
    }
  })
}
const dragended = () => {
  if (fromTo !== undefined) {
    console.log('|' + JSON.stringify(fromTo, null, 6) + '|')
    fromTo = undefined
  }
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
}).on('mousemove', function () {
}).on('drag', function () {
})

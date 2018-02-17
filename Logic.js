
let node_drag = d3.behavior.drag()
    .on('drag', function (d, i) {
      d.x += d3.event.dx
      d.y += d3.event.dy
      d3.select(this).attr('transform', function (d, i) { return 'translate(' + [d.x, d.y] + ')' })
    })
    .on('dragstart', function (d, i) {
    })
    .on('dragend', function (d, i) {
      console.log('Let go of ' + this.id)
    })

d3.select('#board').on('click', function () {
  let coords = d3.mouse(this)

  addNode(coords[0], coords[1])
})

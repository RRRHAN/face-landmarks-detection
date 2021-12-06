// triangle drawing method
export default (ctx, points, closePath, color) => {
    const region = new Path2D()
    region.moveTo(points[0][0], points[0][1])
    for (let i = 1; i < points.length; i++) {
        const point = points[i]
        region.lineTo(point[0], point[1])
    }
    if (closePath) {
        region.closePath()
    }
    ctx.strokeStyle = color
    ctx.stroke(region)
}
// drawing the dots
export default (ctx, keypoints, dotsOptions) => {
    keypoints.forEach((element) => {
        const x = element[0]
        const y = element[1]

        ctx.beginPath()
        ctx.arc(x, y, dotsOptions.circleRadius, 0, 3 * Math.PI)
        ctx.fillStyle = dotsOptions.color
        ctx.fill()
    })
}
import triangulation from '../../data/triangulation.json'
import drawTrianglePath from './drawTrianglePath'

// make triangle path using triangulation array
export default (ctx, keypoints, color) => {
    for (let i = 0; i < triangulation.length / 3; i++) {
        // every multiple of 3 values of triangulation array devine a triangle
        // so this code take that value
        const points = [
            triangulation[i * 3],
            triangulation[i * 3 + 1],
            triangulation[i * 3 + 2],
        ].map((index) => keypoints[index])

        // draw triangle
        drawTrianglePath(ctx, points, true, color)
    }
}
import makeTrianglePath from './makeTrianglePath'
import drawDots from './drawDots'

// drawing mesh
export default (predictions, ctx, meshOptions) => {
    if (predictions.length > 0) {
        predictions.forEach((prediction) => {
            const keypoints = prediction.scaledMesh

            // calling function that already declared
            makeTrianglePath(ctx, keypoints, meshOptions.color.line)
            drawDots(ctx, keypoints, {
                color: meshOptions.color.dots,
                circleRadius: meshOptions.dotsCircleRadius,
            })
        })
    }
}
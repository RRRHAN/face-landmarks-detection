import drawMesh from "./drawMesh"

export default async(parameter) => {
    const { net, webcamRef, canvasRef, meshOptions } = parameter
    if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
    ) {
        // get video properties
        const video = webcamRef.current.video
        const videoWidth = video.videoWidth
        const videoHeight = video.videoHeight

        // set video width
        webcamRef.current.videoWidth = videoWidth
        webcamRef.current.videoHeight = videoHeight

        // set canvas width
        canvasRef.current.width = videoWidth
        canvasRef.current.height = videoHeight

        // make detection
        const face = await net.estimateFaces({ input: video })
            // console.log(face)

        // get canvas context
        const ctx = canvasRef.current.getContext("2d")
        requestAnimationFrame(() => {
            drawMesh(face, ctx, meshOptions)
        })
    }
}
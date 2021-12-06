import * as facemesh from "@tensorflow-models/face-landmarks-detection"
import detect from "./detect"
// load posenet
export default async(parameter) => {
    const { webcamRef, canvasRef, meshOptions } = parameter
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh)
    setInterval(() => {
        detect({ net, webcamRef, canvasRef, meshOptions })
    }, 1000 / 30)
}
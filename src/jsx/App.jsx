import { useRef, useEffect, useState } from "react"
import "@tensorflow/tfjs"
import Webcam from "react-webcam"
import useLocalStorage from "../js/hooks/useLocalStorage"
import "../css/App.css"
import runFaceMesh from "../js/facemesh/runFaceMesh"
import DropUpBtn from "./DropUpBtn"

function App() {
	const webcamRef = useRef(null)
	const canvasRef = useRef(null)
	const [onDetect, setOnDetect] = useState(true)
	const [onCam, setOnCam] = useState(true)
	const dotsCircleRadius = useRef(null)
	const lineColor = useRef(null)
	const dotsColor = useRef(null)
	const [meshOptions, setMeshOptions] = useLocalStorage("meshOptions", {
		dotsCircleRadius: 1,
		color: {
			line: "red",
			dots: "grey",
		},
	})
	const videoProperties = { videoHeight: 480, videoWidth: 640 }

	// call runFaceMesh when the page load
	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: false })
			.then(() => {
				if (onDetect) {
					// load posenet
					runFaceMesh({ webcamRef, canvasRef, meshOptions })
				}
			})
			.catch((err) => {
				console.error(err)
			})
		dotsCircleRadius.current.value = meshOptions.dotsCircleRadius
		lineColor.current.value = meshOptions.color.line
		dotsColor.current.value = meshOptions.color.dots
	})

	return (
		<>
			<div
				style={{
					maxWidth: videoProperties.videoWidth,
					maxHeight: videoProperties.videoHeight,
					width: "80%",
					height: "80%",
					border: "5px solid white",
					borderRadius: "5px",
					margin: "1rem auto",
					marginTop: "1rem",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					position: "relative",
					overflow: "hidden",
				}}
			>
				<div
					style={{
						width: videoProperties.videoWidth,
						height: videoProperties.videoHeight,
					}}
				></div>
				{(() => {
					if (onCam) {
						return (
							<Webcam
								ref={webcamRef}
								style={{
									textAlign: "center",
									zindex: 9,
									width: videoProperties.videoWidth,
									height: videoProperties.videoHeight,
									display: !onCam ? "none" : "",
								}}
							/>
						)
					}
				})()}
				<canvas
					ref={canvasRef}
					style={{
						position: "absolute",
						textAlign: "center",
						zindex: 9,
						width: videoProperties.videoWidth,
						height: videoProperties.videoHeight,
						display: !onDetect || !onCam ? "none" : "",
					}}
				/>
			</div>

			{/* contol button */}
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					marginTop: "10px",
					gap: "15px",
				}}
			>
				<button
					style={{
						background: "none",
						borderRadius: "10px",
						border: "1px solid black",
						width: "100px",
						height: "50px",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
					onClick={() => {
						if (onCam) {
							setOnCam(false)
						} else {
							setOnCam(true)
						}
					}}
				>
					<img
						style={{ margin: "5px auto", width: "90%", height: "90%" }}
						src={
							onCam
								? `${process.env.PUBLIC_URL}/video.svg`
								: `${process.env.PUBLIC_URL}/video-off.svg`
						}
						alt={onCam ? `video.svg` : `video-off.svg`}
					/>
				</button>

				{/* detect button */}
				<div
					style={{
						display: "flex",
						borderRadius: "10px",
						border: "1px solid black",
					}}
				>
					<button
						style={{
							display: "inline-block",
							background: "none",
							border: "none",
							borderRight: "1px solid black",
							width: "100px",
							height: "50px",
							justifyContent: "center",
							alignItems: "center",
						}}
						onClick={() => {
							if (onDetect) {
								setOnDetect(false)
							} else {
								setOnDetect(true)
							}
						}}
					>
						<img
							style={{ margin: "5px auto", width: "90%", height: "90%" }}
							src={
								onDetect
									? `${process.env.PUBLIC_URL}/detect.svg`
									: `${process.env.PUBLIC_URL}/detect-off.svg`
							}
							alt={onDetect ? `detect.svg` : `detect-off.svg`}
						/>
					</button>

					<DropUpBtn>
						<div style={{ padding: "10px" }}>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<label htmlFor='lineColorInput'>Line Color : </label>
								<input
									type='color'
									name='line'
									id='lineColorInput'
									style={{ display: "block" }}
									ref={lineColor}
									onChange={(event) => {
										let tempMeshOptions = meshOptions
										tempMeshOptions.color.line = event.target.value
										setMeshOptions(tempMeshOptions)
									}}
								/>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<label htmlFor='dotsColorInput'>Dots Color : </label>
								<input
									type='color'
									name='dots'
									id='dotsColorInput'
									style={{ display: "block" }}
									ref={dotsColor}
									onChange={(event) => {
										let tempMeshOptions = meshOptions
										tempMeshOptions.color.dots = event.target.value
										setMeshOptions(tempMeshOptions)
									}}
								/>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<label htmlFor='dotsCircleRadiusInput'>
									Dots Circle Radius :
								</label>
								<input
									ref={dotsCircleRadius}
									type='range'
									name='dotsCircleRadius'
									id='dotsCircleRadiusInput'
									step='0.01'
									max='7'
									min='0.25'
									style={{ display: "block" }}
									onChange={(event) => {
										let tempMeshOptions = meshOptions
										tempMeshOptions.dotsCircleRadius = parseInt(
											event.target.value
										)
										setMeshOptions(tempMeshOptions)
									}}
								/>
							</div>
						</div>
					</DropUpBtn>
				</div>
				<div style={{ display: "inline-block" }}></div>
			</div>
		</>
	)
}

export default App

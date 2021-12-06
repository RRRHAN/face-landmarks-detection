import "../css/DropUpBtn.css"

const dropUpBtn = (props) => {
	return (
		<>
			<div className='dropup' style={{display:'flex'}}>
				<button
					style={{
						// display: "inline-block",
						background: "none",
						border: "none",
					}}
				>
					<img
						src={`${process.env.PUBLIC_URL}/chevron-up.svg`}
						alt='chevron-up.svg'
					/>
				</button>
				<div class='dropup-content' style={{borderRadius:'10px',backgroundColor:'#bababa',lineHeight:'30px'}}>
				{props.children}
				</div>
			</div>
		</>
	)
}

export default dropUpBtn

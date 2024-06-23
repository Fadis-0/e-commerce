import React, {useState, useEffect} from 'react'

import { MdClose, MdCheck } from 'react-icons/md'

import { useStateContext } from '../contexts/ContextProvider';

const Popup = () => {

	const { activePopup, handlePopup, popupMessage, setPopupMessage, popupType, setPopupType } = useStateContext();

	function handleClose() {
		handlePopup(false);
		setPopupType("alert");
	}

	function handleTrue() {
		handlePopup(false);
		setPopupType("ok");
	}

	return (
		<div className={`px-6 py-4 rounded-lg border-[3px] border-color absolute text-white font-bold text-xl transition-all ease bg-rose-500 ${activePopup ? 'mt-8' : 'mt-[-100px]'}  left-[42vw]`} >
			<div className="flex gap-5">
				{popupMessage}
				<div className="flex gap-1">
					<MdClose onClick={handleClose} className={`mt-[-3px] rounded cursor-pointer hover:bg-rose-700 px-0.5 text-3xl`}/>
				</div>
			</div>
			
		</div>
	)
}

export default Popup;
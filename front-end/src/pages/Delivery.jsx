import React,{ useState, useEffect}  from 'react'

import { Header, Popup } from '../components'


import { AiOutlineDelete, AiOutlineUser, AiOutlineSearch, AiOutlineHome } from 'react-icons/ai'
import { MdOutlineLocalShipping, MdClose, MdOutlineLocationOn, MdCheck } from 'react-icons/md'
import { HiOutlineEye } from 'react-icons/hi'
import { FiBox } from 'react-icons/fi'


import { useStateContext } from '../contexts/ContextProvider';


const Delivery = () => {
	const [orders, setOrders] = useState([]);
	const [filtredOrders, setFiltredOrders] = useState([]);

  	const { handlePopup, popupMessage, setPopupMessage, popupType, setPopupType } = useStateContext();


	function updateorders(){
		fetch('http://192.168.0.138:8080/laivrason/list')
			.then(response => response.json())
			.then(data => {setOrders(data); setFiltredOrders(data)});	

	}
	useEffect(() => {
		fetch('http://192.168.0.138:8080/laivrason/list')
			.then(response => response.json())
			.then(data => {setOrders(data); setFiltredOrders(data)});
	}, []);
	function updateOrderStatus(orderId, status) {
		const changestatus = {
			"id": orderId,
			"status": status,
			};
			console.log(JSON.stringify(changestatus));
		fetch(`http://192.168.0.138:8080/orders/status/${orderId}`, {
		  method: 'PUT',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(changestatus)
		})
		.then(response => {
		  if (response.ok) {
			// Update the order status in your local state or data store
			console.log('Order status updated successfully');
			updateorders();
			return response;
		  } else {
			console.error('Failed to update order status');
		  }
		})
		.catch(error => {
		  console.error(error);
		});
	  }
	  function cancelOrderStatus(orderId, status) {
		if(window.confirm('Are you sure you want to delete this brand?')){
		const changestatus = {
			"id": orderId,
			"status": status,
			};
			
		fetch(`http://192.168.0.138:8080/orders/status/${orderId}`, {
		  method: 'PUT',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(changestatus)
		})
		.then(response => {
		  if (response.ok) {
			// Update the order status in your local state or data store
			console.log('Order status updated successfully');
			updateorders();
			return response;
		  } else {
			console.error('Failed to update order status');
		  }
		})
		.catch(error => {
		  console.error(error);
		});
	    }
	  }

	function handleCancelOrder(){
		setPopupMessage("Are you sure you want to cancel this delivery?");
		handlePopup(true);
	}


	return (
		<div className="max-w-[1400px] m-auto">

			<div className="px-8 ml-2">
				<div className="flex gap-3 text-gray-400 font-semibold mb-5">
					<div className="cursor-pointer"><AiOutlineHome className="text-2xl hover:text-gray-500" /></div>
					<div className="text-gray-200">/</div>
					<div className="cursor-pointer text-green-600 bg-green-100 px-2 rounded-lg">Delivery</div>
				</div>
				<Header title="Delivery Management"/>
			</div>

			<div className="w-full h-28 pr-8 pl-12 mb-4">
				<div className="box w-full bg-white h-full rounded-xl flex items-center px-6 gap-4">
					<div className="w-2/6">
						<div className="text-gray-500 text-sm font-bold">Search for Order</div>
						<div className="relative flex items-center">
							<FiBox className="absolute text-xl left-3 text-gray-400"/>
							<input type="text" className="w-full h-12 border-1 text-gray-500 rounded-lg bg-[#FEFEFE] outline-0 focus:border-indigo-300 focus:border-2 border-color text-lg px-10" placeholder="Order ID" />
						</div>
					</div>

					<div className="w-2/6">
						<div className="text-gray-500 text-sm font-bold">Search for Address</div>
						<div className="relative flex items-center">
							<MdOutlineLocationOn className="absolute text-xl left-3 text-gray-400"/>
							<input type="text" className="w-full h-12 border-1 text-gray-500 rounded-lg bg-[#FEFEFE] outline-0 focus:border-indigo-300 focus:border-2 border-color text-lg px-10" placeholder="Search" />
						</div>
					</div>
					
					<div className="w-1/5">
						<div className="text-gray-500 text-sm font-bold">Status</div>
						<div className="relative flex items-center">
							<div className="absolute left-4 bg-gray-300 w-2 h-2 rounded-full"></div>
							<select type="text" className="bg-[#FEFEFE] cursor-pointer w-full h-12 border-1 text-gray-600 rounded-lg border-color text-lg px-8 outline-0">
								<option>Pending</option>
								<option>Ready</option>
								<option>In Transit</option>
								<option>Delivered</option>
							</select>
						</div>
					</div>
					
					<div className="w-1/5">
						<div className="text-gray-500 text-sm font-bold">Carrier</div>
						<div className="relative flex items-center">
							<select type="text" className="bg-[#FEFEFE] cursor-pointer w-full h-12 border-1 text-gray-600 rounded-lg border-color text-lg px-3 outline-0">
								<option>All</option>
							</select>
						</div>
					</div>

					

				</div>
			</div>

			<div className="pr-8 pl-12 h-[520px] mt-8 mb-10">
				<div className="box bg-white overflow-scroll rounded-xl w-full h-full shadow-sm">
					<div className="flex h-14 border-b-1 border-color">
						<div className="bg-[#FDFDFD] w-16 h-full flex items-center px-4 text-gray-400 font-bold">ID</div>
						<div className="bg-[#FDFDFD] w-2/5 h-full flex items-center px-4 text-gray-400 font-bold">Costumer</div>
						<div className="bg-[#FDFDFD] w-2/5 h-full flex items-center px-4 text-gray-400 font-bold">Address</div>
						<div className="bg-[#FDFDFD] w-2/6 h-full flex items-center px-4 text-gray-400 font-bold">Carrier</div>
						<div className="bg-[#FDFDFD] w-1/5 h-full flex items-center px-4 text-gray-400 font-bold">status</div>
						<div className="bg-[#FDFDFD] w-1/6 h-full flex items-center px-4 text-gray-400 font-bold">Actions</div>
					</div>
				{orders.map((order) => (
					order.orders.status !== "panding" &&
					<div className="flex h-14 border-b-1 border-color cursor-pointer hover:bg-main-bg">
						<div className="w-16 h-full flex items-center px-4 text-gray-400">{order.id}</div>
						<div className="w-2/5 h-full flex items-center px-4 text-gray-700">{order.adresse.name}{order.adresse.first_name}</div>
						<div className="w-2/5 h-full flex items-center px-4 text-gray-700 overflow-y-scroll">{order.adresse.addressclt}</div>
						<div className="w-2/6 h-full flex items-center px-4 text-gray-700">{order.type}</div>
						<div className="w-1/5 h-full flex items-center px-4 text-gray-400">{order.orders.status} </div>
						<div className="w-1/6 h-full flex items-center gap-6 text-gray-700">
						<button className="mt-1  text-sm text-gray-400 hover:text-green-500" onClick={() => updateOrderStatus(order.orders.id, "processing")}><MdCheck className="text-xl ml-4 " />Track</button>
						<button className="mt-1 ml-5 text-sm text-gray-400 hover:text-rose-500" onClick={() => cancelOrderStatus(order.orders.id, "panding")}><MdClose className="text-xl ml-[9px]" />Cancel</button>
						</div>
					</div>
				))}
				</div>

			</div>
		</div>


	)
}

export default Delivery;
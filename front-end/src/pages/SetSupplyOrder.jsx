import React,{ useState, useEffect}  from 'react'

import { Header } from '../components'


import { TbGps, TbFileExport, TbPlus, TbBuildingWarehouse, TbDotsVertical } from 'react-icons/tb'
import { FiMinusSquare, FiEdit2, FiDollarSign, FiBox, FiFilter, FiAlertTriangle } from 'react-icons/fi'
import { AiOutlineTag, AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlineFileDone, AiOutlineShoppingCart, AiOutlineEdit, AiOutlineStar, AiFillStar, AiOutlineTags, AiOutlineDelete, AiFillCaretDown, AiOutlineSearch, AiOutlineSave } from 'react-icons/ai'
import { MdOutlineDone, MdOutlineLocalShipping, MdClose, MdOutlineCategory, MdOutlineLocationOn, MdOutlinePeopleAlt, MdOutlineInventory, MdAccessTime } from 'react-icons/md'
import { BiDollarCircle } from 'react-icons/bi';
import { GiCargoCrate } from 'react-icons/gi';


import { Link, NavLink, useNavigate, useParams }  from 'react-router-dom';



const SetSupplyOrder = () => {

	const { id } = useParams();

	const [status, setStatus] = useState('');
	const [title, setTitle] = useState('');
	const [variant, setVariant] = useState('');
	const [supplier, setSupplier] = useState('');
	const [quantity, setQuantity] = useState('');
	const [cost, setCost] = useState('');
	const [total, setTotal] = useState('');
	const [image, setImage] = useState('');

	const [departure, setDeparture] = useState('');
	const [destination, setDestination] = useState('');
	const [method, setMethod] = useState('');
	const [plan, setPlan] = useState('');
	const [carrier, setCarrier] = useState('');
	const [date, setDate] = useState('');
	const [spcost, setSpcost] = useState('');
	const [track, setTrack] = useState('');

	const [departure2, setDeparture2] = useState('');
	const [destination2, setDestination2] = useState('');
	const [method2, setMethod2] = useState('');
	const [plan2, setPlan2] = useState('');
	const [carrier2, setCarrier2] = useState('');
	const [date2, setDate2] = useState('');
	const [spcost2, setSpcost2] = useState('');

	const [trackedProduct, setTrackedProduct] = useState([]);
	


	useEffect(() => {
		fetch(`http://192.168.0.138:8080/suppliersOrders/list/${id}`)
			.then(response => response.json())
			.then(data => {
				setTrackedProduct(data);
				setStatus(data.status);
				setTitle(data.product.name);
				
				setSupplier(data.suppliers.name);
				setStatus(data.status);
				setQuantity(data.product.quantity);
				setCost(data.cost);
				setTotal(data.total_price);
				setImage(data.product.image_url);

				

			});
	}, []);

	function updateOrder(){
		fetch(`http://192.168.0.138:8080/suppliersOrders/list/${id}`)
			.then(response => response.json())
			.then(data => {
				setStatus(data.status);
                setTrackedProduct(data);
			});
	}

	const [carriers, setCarriers] = useState([]);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/carrier/list')
			.then(response => response.json())
			.then(data => setCarriers(data));
	}, []);

	const [warehouses, setWarehouses] = useState([]);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/warehouses/list')
			.then(response => response.json())
			.then(data => setWarehouses(data));
	}, []);

	function updateStatus(id, status) {
		const formData = new FormData();
		
		formData.set('id', id);
		formData.set('status', status);

		

		fetch('http://192.168.0.138:8080/suppliersOrders/update', {
			method: 'PUT',
			body: formData
		})
		.then(response => {

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			else{
				updateOrder();
				return response;	
			}
				
		})
		.then(data => {
			

			

		});
	}

	function updateTransfer(id) {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		formData.set("id", id);
		
		fetch('http://192.168.0.138:8080/suppliersOrders/updateTransfer', {
			method: 'PUT',
			body: formData
		})
		.then(response => {

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			else{
				updateStatus(id, "transfer1");
				return response;	
			}
				
		})
		.then(data => {
			

			

		});
	}

	function updateTransfer2(id) {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		formData.set("id", id);
		formData.set("track2", track);
		
		fetch('http://192.168.0.138:8080/suppliersOrders/updateTransfer2', {
			method: 'PUT',
			body: formData
		})
		.then(response => {

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			else{
				updateStatus(id, "transfer2");
				return response;	
			}
				
		})
		.then(data => {
			

			

		});
	}


    

	function setInTransit(){
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		formData.set("id", trackedProduct.id);
		
		fetch('http://192.168.0.138:8080/suppliersOrders/updateTransfer', {
			method: 'PUT',
			body: formData
		})
		.then(response => {

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			else{
				updateStatus(id, "In Transit");
				return response;	
			}
				
		})
		.then(data => {
			

			

		});
	}

	function setDelivered(){
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);


		const now = new Date();

		formData.set("id", trackedProduct.id);
		formData.set("date2", now);
		
		fetch('http://192.168.0.138:8080/suppliersOrders/updateDate', {
			method: 'PUT',
			body: formData
		})
		.then(response => {

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			else{
				updateStatus(id, "Delivered");
				return response;	
			}
				
		})
		.then(data => {
			

			

		});
	}

	const history = useNavigate();

	return (
		<div className="max-w-[1400px] m-auto">
			<div className="px-8 ml-2">
				<Header category="Management / Supply" title="Track"/>
			</div>
			<div className="pr-8 pl-4 h-[700px] mb-12">
				<div className="ml-8 h-full border-white box bg-white rounded-xl p-10">
					<div className="flex justify-between items-center">
						<div className="">
							<h2 className="text-2xl font-bold">Order #{trackedProduct.id}</h2>
						</div>
						
							

					</div>

					<div className="mt-10 mx-auto p-4 h-36 w-5/6">
						<div className="flex justify-between mx-auto w-5/6 items-center relative">
												<div className="z-10 relative">
													<div className={`w-16 h-16 rounded-full flex justify-center items-center cursor-pointer hover:shadow border-dashed border-2 shadow-sm ${status === "Order Placed" ? 'bg-green-200 border-black' : 'bg-white border-gray-400'} `}>
														<AiOutlineShoppingCart className={`w-8 h-8 mr-1 ${trackedProduct.status === "Order Placed" ? 'text-black' : 'text-gray-400'}`}/>
													</div>
													<h3 className={`absolute text-sm mt-2 flex left-[-10px] ${trackedProduct.status === "Order Placed" ? 'text-black font-semibold' : 'text-gray-400'}`}><span className="mr-1">Order</span><span>Placed</span></h3>
												</div>
												<div className="z-10 relative">
													<div className={`w-16 h-16 rounded-full flex justify-center items-center cursor-pointer hover:shadow border-dashed border-2 shadow-sm ${trackedProduct.status === "Order Processing" ? 'bg-green-200 border-black' : 'bg-white border-gray-400'}`}>
														<FiBox className={`w-8 h-8 ${trackedProduct.status === "Order Processing" ? 'text-black' : 'text-gray-400'}`}/>
													</div>
													<h3 className={`absolute text-sm mt-2 left-[-22px] ${trackedProduct.status === "Order Processing" ? 'text-black font-semibold' : 'text-gray-400'}`}><span className="mr-1">Order</span><span>Processing</span></h3>

												</div>
												
												<div className="z-10 relative">
													<div className={`w-16 h-16 rounded-full flex justify-center items-center cursor-pointer hover:shadow border-dashed border-2 shadow-sm ${trackedProduct.status === "In Transit" ? 'bg-green-200 border-black' : 'bg-white border-gray-400'}`}>
														<MdOutlineLocalShipping className={`w-8 h-8 mt-1 ${trackedProduct.status === "In Transit" ? 'text-black' : 'text-gray-400'}`}/>
													</div>
													<h3 className={`absolute text-sm mt-2 left-0.5 ${trackedProduct.status === "In Transit" ? 'text-black font-semibold' : 'text-gray-400'}`}><span className="mr-1">In</span><span>Transit</span></h3>

												</div>
												<div className="z-10 relative">
													<div className={`w-16 h-16 rounded-full flex justify-center items-center justify-center items-center over:shadow border-dashed border-2 shadow-sm ${trackedProduct.status === "Delivered" ? 'bg-green-200 border-black' : 'bg-white border-gray-400'}`}>
														<MdOutlineDone className={`w-8 h-8 ${trackedProduct.status === "Delivered" ? 'text-black' : 'text-gray-400'}`}/>
													</div>
													<h3 className={`absolute text-sm mt-2 left-0 ${trackedProduct.status === "Delivered" ? 'text-black font-semibold' : 'text-gray-400'}`}>Delivered</h3>

												</div>
												<div className="absolute w-full top-1/2 border-t-2 border-color"></div>
											</div>
						</div>


						{trackedProduct.status === "Order Placed" && 
							<div className="w-3/5 mx-auto h-3/5 py-16 relative">
								<p className="font-semibold text-lg text-gray-500">Order Details</p>
								<div className="w-full h-full flex gap-32 items-center">
									<div className="flex-col">
										<p className="text-sm font-bold mb-2 flex-col"><p className="">Product</p> <p className="text-lg text-gray-500 font-normal "> {trackedProduct.product.catalog.name}</p></p>
										<p className="text-sm font-bold mb-2 flex-col"><p className="">Destination</p> <p className="text-lg text-gray-500 font-normal "> {trackedProduct.destination}</p></p>
									</div>
									<div className="flex-col">
										<p className="text-sm font-semibold mb-2 flex-col"><p className="">Quantity</p> <p className="text-lg text-gray-500  font-normal">{trackedProduct.product.quantity}</p></p>									
										<p className="text-sm font-semibold flex-col"><p className="">Total</p><p className="text-lg text-gray-500  font-normal">{trackedProduct.total_price} .DZD</p></p>
									</div>
										
								</div>
							
                                <div onClick={() => updateStatus(id, "Order Processing")}  className="absolute right-[-170px] bg-green-300 w-32 hover:bg-green-400 transition-all ease  cursor-pointer hover:shadow border-1 border-color shadow-sm pl-3 pr-5 font-semibold py-1.5 rounded-2xl flex"><AiOutlineArrowRight className="mr-2.5 mt-0.5 text-xl text-indigo-900" />Confirm </div>
                                <div onClick={() => {updateStatus(id, "Cancelled"); history('/orders');}}  className="absolute right-[-15px] bg-white w-32 hover:bg-rose-400 transition-all ease  cursor-pointer hover:shadow border-1 border-color shadow-sm pl-3 pr-5 font-semibold py-1.5 rounded-2xl flex"><MdClose className="mr-2.5 mt-0.5 text-xl text-indigo-900" />Cancel</div>
								
							</div>
                            

						}

						{trackedProduct.status === "Order Processing" && 
							<form onSubmit={setInTransit} className="w-3/5 mx-auto h-3/5 py-16 relative">
								<p className="font-semibold text-lg text-gray-500">Set Shipping Details </p>
								<div className="w-full h-full flex gap-20 items-center">
									<div className="flex-col">
										<p className="text-sm mb-6 font-bold mb-2 flex-col"><p className="text-gray-500">Estimated Delivery Date</p> <p className="text-lg font-normal ">
									            <input type="date" required name="date" className="w-full text-gray-700 outline-0 block border-1 border-color shadow focus:outline-1 focus:outline-indigo-300 rounded py-2 px-3"/>   
										</p></p>

										<p className="text-sm font-bold mb-2 flex-col"><p className="text-gray-500">Carrier</p> <p className="text-lg font-normal ">
									        <input type="text" required name="carrier" className="w-full text-gray-700 outline-0 block border-1 border-color shadow focus:outline-1 focus:outline-indigo-300 rounded py-2 px-3" placeholder='carrier name'/>   
										</p></p>

										

									</div>
									<div className="flex-col">
										<p className="text-sm mb-6 font-bold mb-2 flex-col"><p className="text-gray-500">Method</p> <p className="text-lg font-normal ">
									        <input type="text" required name="method" className="w-full text-gray-700 outline-0 block border-1 border-color shadow focus:outline-1 focus:outline-indigo-300 rounded py-2 px-3" placeholder='Shipping method'/>   																				
										</p></p>

										<p className="text-sm font-bold mb-2 flex-col"><p className="text-gray-500">Shipping Cost</p> <p className="text-lg font-normal flex items-center gap-2">
									        <input type="number" step="0.01" required name="spcost" className="w-full text-gray-700 outline-0 block border-1 border-color shadow focus:outline-1 focus:outline-indigo-300 rounded py-2 px-3" placeholder='cost'/> .DZD   
										</p></p>
									</div>
									
								</div>
							
                                <button type="submit" className="absolute right-[-170px] bg-green-300 w-32 hover:bg-green-400 transition-all ease  cursor-pointer hover:shadow border-1 border-color shadow-sm pl-3 pr-2.5 font-semibold py-2 rounded-2xl flex justify-center">Transit<AiOutlineArrowRight className="ml-2.5 mt-0.5 text-xl text-indigo-900" /> </button>
								
							</form>


						}

						{trackedProduct.status === "In Transit" && 
							<form onSubmit={setDelivered} className="w-3/5 mx-auto h-3/5 py-10 relative">
								<p className="font-semibold text-lg text-gray-500">Order is being transfered to destinated location</p>
								<div className="w-full h-full flex justify-between items-center">
									<div className="flex-col">
										<p className="text-sm font-bold mb-2 flex-col"><p className="text-gray-500">Destination</p> <p className="text-lg font-normal "> {trackedProduct.destination}</p></p>
										<p className="text-sm font-bold mb-2 flex-col"><p className="text-gray-500">Carrier</p> <p className="text-lg font-normal "> {trackedProduct.carrier}</p></p>
										<p className="text-sm font-bold mb-2 flex-col"><p className="text-gray-500">Method</p> <p className="text-lg font-normal "> {trackedProduct.method}</p></p>
									
									</div>
								</div>
							
                                <button type="submit" className="absolute right-[-170px] bg-green-300 w-32 hover:bg-green-400 transition-all ease  cursor-pointer hover:shadow border-1 border-color shadow-sm pl-3 pr-5 font-semibold py-1.5 rounded-2xl flex"><AiOutlineArrowRight className="mr-2.5 mt-0.5 text-xl text-indigo-900" />Delivered</button>
								
							</form>


						}

						{trackedProduct.status === "Delivered" && 
							<div className="w-3/5 mx-auto h-3/5 py-20 relative">
								<p className="font-semibold text-lg text-gray-500">Order has been successfully delivered</p>
								<div className="w-full h-full flex justify-between items-center">
									<div className="flex-col">
										<p className="text-sm font-bold mb-2 flex-col"><p className="text-gray-500">Delivery Date and Time</p> <p className="text-lg font-normal ">{trackedProduct.date2.slice(0, 28)}</p></p>
										<p className="text-sm font-bold mb-2 flex-col"><p className="text-gray-500">Delivery Location</p> <p className="text-lg font-normal "> {trackedProduct.destination}</p></p>

									</div>
								</div>
                              
                                <div onClick={() => {history('/orders');}} className="absolute right-[-170px] bg-green-300 w-32 hover:bg-green-400 transition-all ease  cursor-pointer hover:shadow border-1 border-color shadow-sm pl-3 pr-5 font-semibold py-1.5 rounded-2xl flex"><AiOutlineArrowRight className="mr-2.5 mt-0.5 text-xl text-indigo-900" />Save </div>
							
								
							</div>


						}

						
                        

					

				</div>
                
			</div>
		</div>


	)
}

export default SetSupplyOrder;
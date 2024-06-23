import React,{ useState, useEffect}  from 'react'

import { Header } from '../components'


import { TbGps, TbFileExport, TbPlus, TbBuildingWarehouse, TbDotsVertical } from 'react-icons/tb'
import { FiMinusSquare, FiEdit2, FiDollarSign, FiBox, FiFilter, FiAlertTriangle } from 'react-icons/fi'
import { AiOutlineTag, AiOutlineArrowRight, AiOutlineArrowLeft, AiOutlineFileDone, AiOutlineShoppingCart, AiOutlineEdit, AiOutlineStar, AiFillStar, AiOutlineTags, AiOutlineDelete, AiFillCaretDown, AiOutlineSearch, AiOutlineSave } from 'react-icons/ai'
import { MdOutlineDone, MdOutlineLocalShipping, MdClose, MdOutlineCategory, MdOutlineLocationOn, MdOutlinePeopleAlt, MdOutlineInventory, MdAccessTime } from 'react-icons/md'
import { BiDollarCircle } from 'react-icons/bi';
import { GiCargoCrate } from 'react-icons/gi';


import { Link, NavLink, useNavigate, useParams }  from 'react-router-dom';



const TrackSupplyOrder = () => {

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
				setTitle(data.variant.product.name);
				setVariant(data.variant.sku);
				setSupplier(data.suppliers.name);
				setStatus(data.status);
				setQuantity(data.variant.	quantity);
				setCost(data.cost);
				setTotal(data.total_price);
				setImage(data.variant.product.image_url);

				setDeparture(data.departure);
				setDestination(data.destination);
				setMethod(data.method);
				setPlan(data.plan);
				setCarrier(data.carrier.name);
				setDate(data.date);
				setSpcost(data.spcost);
				setTrack(data.track);

				setDeparture2(data.departure2);
				setDestination2(data.destination2);
				setMethod2(data.method2);
				setPlan2(data.plan2);
				setCarrier2(data.carrier2.name);
				setDate2(data.date2);
				setSpcost2(data.spcost2);
				
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
							<div className="w-3/5 mx-auto h-3/5 py-10">
								<p className="font-semibold text-lg">Order has been successfully placed and awaiting processing</p>
								<div className="w-full h-full flex justify-between items-center">
									<div className="flex-col">
										<p className="text-lg font-semibold mb-2 flex"><p className="underline">Product :</p> <p className="text-lg text-gray-500 ml-8 font-normal ">................. {trackedProduct.product.catalog.name}</p></p>
										<p className="text-lg font-semibold mb-2 flex"><p className="underline">Supplier :</p> <p className="text-lg text-gray-500 ml-8 font-normal">................ {trackedProduct.suppliers.name}</p></p>
										<p className="text-lg font-semibold mb-2 flex"><p className="underline">Quantity :</p> <p className="text-lg text-gray-500 ml-8 font-normal">............... {trackedProduct.product.quantity}</p></p>
										<p className="text-lg font-semibold mb-2 flex"><p className="underline">Cost per item :</p> <p className="text-lg text-gray-500 ml-6 font-normal ">....... {trackedProduct.cost} .DZD</p></p>
										<p className="text-lg font-semibold flex"><p className="underline">Total : </p><p className="text-lg text-gray-500 ml-8 font-normal">...................... {trackedProduct.total_price} .DZD</p></p>
									</div>
									<div className="h-56 w-56 rounded-xl border-2 border-color" style={{backgroundImage: `url(${image})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
								</div>
							
								
							</div>


						}

						{trackedProduct.status === "Order Processing" && 
							<div className="w-3/5 mx-auto h-3/5 py-10">
								<p className="font-semibold text-lg mt-32 ml-28">Order is being processed and prepared for shipment </p>
								
							
								
							</div>


						}

						{trackedProduct.status === "In Transit" && 
							<div className="w-3/5 mx-auto h-3/5 py-10">
								<p className="font-semibold text-lg">Order is being transfered to destinated location </p>
								<div className="w-full h-full flex justify-between items-center">
									<div className="flex-col">
										<p className="text-lg font-semibold mb-2 flex"><p className="">Estimated Delivery Date :</p> <p className="text-lg text-gray-500 ml-4 font-normal ">{trackedProduct.date}</p></p>
										<p className="text-lg font-semibold mb-2 flex"><p className="">Carrier :</p> <p className="text-lg text-gray-500 ml-4 font-normal"> {trackedProduct.carrier}</p></p>
										<p className="text-lg font-semibold mb-2 flex"><p className="">Method :</p> <p className="text-lg text-gray-500 ml-4 font-normal"> {trackedProduct.method}</p></p>
										<p className="text-lg font-semibold mb-2 flex"><p className="">Destination :</p> <p className="text-lg text-gray-500 ml-4 font-normal"> {trackedProduct.destination}</p></p>
									</div>
								</div>
							
								
							</div>


						}

						{trackedProduct.status === "Delivered" && 
							<div className="w-3/5 mx-auto h-3/5 py-10">
								<p className="font-semibold text-lg">Order has been successfully delivered</p>
								<div className="w-full h-full flex justify-between items-center">
									<div className="flex-col">
										<p className="text-lg font-semibold mb-2 flex"><p className="">Delivery Date and Time :</p> <p className="text-lg text-gray-500 ml-4 font-normal ">{trackedProduct.date2}</p></p>
										<p className="text-lg font-semibold mb-2 flex"><p className="">Track Number :</p> <p className="text-lg text-gray-500 ml-4 font-normal"> {trackedProduct.track}</p></p>
										<p className="text-lg font-semibold mb-2 flex"><p className="">Recipient :</p> <p className="text-lg text-gray-500 ml-4 font-normal"> {trackedProduct.destination2}</p></p>
										<p className="text-lg font-semibold mb-2 flex"><p className="">Warehouse / Delivery Address :</p> <p className="text-lg text-gray-500 ml-4 font-normal"> {trackedProduct.destination}</p></p>
									</div>
								</div>
							
								
							</div>


						}

						
						

					

				</div>

			</div>
		</div>


	)
}

export default TrackSupplyOrder;
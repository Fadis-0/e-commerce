import React, { useState, useEffect} from 'react'
import { Header, Modal } from '../components'

import { Link, NavLink }  from 'react-router-dom';


import { TbGps, TbFileExport, TbPlus, TbBuildingWarehouse, TbDotsVertical } from 'react-icons/tb'
import { FiMinusSquare, FiEdit2, FiDollarSign, FiBox, FiFilter, FiAlertTriangle, FiEye } from 'react-icons/fi'
import { AiOutlineUnorderedList, AiOutlineHome,AiOutlineCloudUpload, AiOutlineBook, AiOutlineTag, AiOutlineFileDone, AiOutlineShoppingCart, AiOutlineEdit, AiOutlineStar, AiFillStar, AiOutlineTags, AiOutlineDelete, AiFillCaretDown, AiOutlineSearch, AiOutlineEye } from 'react-icons/ai'
import { MdOutlineDone,MdOutlineLocalShipping,MdCheck,  MdClose, MdOutlineCategory, MdOutlineLocationOn, MdOutlinePeopleAlt, MdOutlineInventory, MdAccessTime, MdAddLocation } from 'react-icons/md'
import { BiDollarCircle, BiBookAdd } from 'react-icons/bi';
import { GiCargoCrate } from 'react-icons/gi';
import { HiLocationMarker, HiOutlineEye } from 'react-icons/hi'
import { RiAddBoxLine } from 'react-icons/ri'


import { useStateContext } from '../contexts/ContextProvider';
import { BsEye } from 'react-icons/bs';

 
const SupplierOrders = () => {
	const {  supplierProducts, setsupplierProducts, filtredSupplierProducts, setFiltredSupplierProducts, isOpenModal, setIsOpenModal, catalog, setCatalog } = useStateContext();

	const user = JSON.parse(localStorage.getItem('user'));

	function handleOpenModal(){
		setIsOpenModal(true);
	}
	const [supplyOrders, setSupplyOrders] = useState([]);
  	const [filtredSupplyOrders, setFiltredSupplyOrders] = useState([]);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/suppliersOrders/list')
			.then(response => response.json())
			.then(data => {
				setSupplyOrders(data);
				setFiltredSupplyOrders(data);
			});

	}, []);

	

	

	return (


		<div className="max-w-[1400px] m-auto">

		  <Modal />

		  <div className="px-8 ml-3">
				<div className="flex gap-3 text-gray-400 font-semibold mb-5">
					<div className="cursor-pointer"><AiOutlineHome className="text-2xl hover:text-gray-500" /></div>
					<div className="text-gray-200">/</div>
					<div className="cursor-pointer text-green-600 bg-green-100 px-2 rounded-lg">Orders</div>
				</div>
				<Header title="Received Orders"/>
			</div>

			<div className="flex mr-8 mb-10">

			<div className="flex-col w-full">

				
				<div className="mr-4 mt-4 pl-5 flex h-[672px]">
				  <div className="border-b-[28px] ml-8 border-white box bg-white w-full rounded-xl p-10 overflow-y-scroll">
					<div className="flex justify-between items-center">
					<div className="w-full h-full flex items-center px-6 gap-4">
					
					<div className="w-2/5">
						<div className="text-gray-500 text-sm font-bold">Search for product</div>
						<div className="relative flex items-center">
							<div className="relative flex items-center">
								<FiBox className="absolute text-xl left-3 text-gray-400"/>
								<input type="text" className="w-full h-12 text-gray-500 rounded-lg bg-[#FEFEFE] outline-1 border-1 border-color focus:outline-indigo-300 focus:border-2 border-color text-lg px-10" placeholder="Search" />
							</div>
						</div>
					</div>	
					
					<div className="w-1/4">
						<div className="text-gray-500 text-sm font-bold">Status</div>
						<div className="relative flex items-center">
							<div className="absolute left-4 bg-gray-400 w-2 h-2 rounded-full"></div>
							<select type="text" className="bg-[#FEFEFE] cursor-pointer w-full h-12 border-1 text-gray-600 rounded-lg border-color text-lg px-8 outline-0">
								<option>All</option>
							</select>
						</div>
					</div>
					<div className="w-1/4">
						<div className="text-gray-500 text-sm font-bold">Quantity</div>
						<div className="relative flex items-center">
							<select type="text" className="bg-[#FEFEFE] cursor-pointer w-full h-12 border-1 text-gray-600 rounded-lg border-color text-lg px-3 outline-0">
								<option>All</option>
								
							</select>
						</div>
					</div>
					<div className="w-1/4">
						<div className="text-gray-500 text-sm font-bold">Date</div>
						<div className="relative flex items-center">
							<select type="text" className="bg-[#FEFEFE] cursor-pointer w-full h-12 border-1 text-gray-600 rounded-lg border-color text-lg px-3 outline-0">
								<option>All</option>
								<option>Today</option>
								<option>This Month</option>
								<option>This Year</option>
							</select>
						</div>
					</div>
				</div>	
					</div>



					<div className="mt-14 px-2">
							
								{supplyOrders.map((order) => (
									order.product.supplier.id === user.id && <div className="border-1 border-color shadow-sm rounded-lg py-2.5 bg-main-bg pr-4 pl-6 w-full relative flex items-center mb-4 rounded" >
									

									
									<div className="flex-col w-2/6">
										<p className="text-gray-500 mt-1">Product</p>
										<p className="font-bold">{order.product.catalog.name}</p>
									</div>
									<div className="ml-6 flex-col w-2/6">
										<p className="text-gray-500 mt-1">Date</p>
										<p className="font-bold">{order.orderDate.slice(0, 28)}</p>
									</div>
									<div className="flex-col w-1/6">
										<p className="text-gray-500 mt-1">Quantity</p>
										<p className="font-bold">{order.product.quantity }</p>
									</div>
																       	{order.status === "Order Placed" && <div className="flex items-center gap-1 w-2/6">
							       		<span className="bg-gray-400 rounded-full h-1.5 w-1.5" />
							       		<p className="text-gray-500 font-bold text-sm ml-1 mt-0.5">{order.status}</p>
							       		<p className="text-gray-500 font-bold text-sm ml-1.5 "><AiOutlineCloudUpload className="text-xl" /></p>
							       		
							       	</div>}

							       	{order.status === "Order Processing" && <div className="flex items-center gap-1 w-2/6">
							       		<span className="bg-orange-500 rounded-full h-1.5 w-1.5" />
							       		<p className="text-orange-600 font-bold text-sm ml-1 mt-0.5">{order.status}</p>
							       		<p className="text-orange-600 font-bold text-sm ml-1.5 "><MdAccessTime className="text-lg" /></p>
							       		
							       	</div>}

							       	{order.status === "In Transit" && <div className="flex items-center gap-1 w-2/6">
							       		<span className="bg-indigo-500 rounded-full h-1.5 w-1.5" />
							       		<p className="text-indigo-600 font-bold text-sm ml-1 mt-0.5">{order.status}</p>
							       		<p className="text-indigo-600 font-bold text-sm ml-1.5 "><MdOutlineLocalShipping className="text-xl" /></p>
							       		
							       	</div>}

							       	{order.status === "Delivered" && <div className="flex items-center gap-1 w-2/6">
							       		<span className="bg-green-500 rounded-full h-1.5 w-1.5" />
							       		<p className="text-green-600 font-bold text-sm ml-1 mt-0.5">{order.status}</p>
							       		<p className="text-green-600 font-bold text-sm ml-1.5 "><MdCheck className="text-xl" /></p>
							       		
							       	</div>}


							       	{order.status === "Cancelled" && <div className="flex items-center gap-1 w-2/6">
							       		<span className="bg-rose-500 rounded-full h-1.5 w-1.5" />
							       		<p className="text-rose-600 font-bold text-sm ml-1 mt-0.5">{order.status}</p>
							       		<p className="text-rose-600 font-bold text-sm ml-1.5 "><MdClose className="text-xl" /></p>
							       		
							       	</div>}
									<div className="flex gap-2 absolute right-4 ml-0">
										<NavLink to={`/orders/track/${order.id}`}>
							       			<div className="mt-1">
												<button className=" text-gray-400 hover:text-green-500 text-sm font-bold"><AiOutlineEdit className="text-xl ml-1 mb-1"/>Edit</button>
											</div>
										</NavLink>
							       	
									</div>
									
								</div>
								)) }

								
						
					</div>
				</div>
			</div>

			








			</div>

			
		</div>

			


		</div>
	)
}

export default SupplierOrders;
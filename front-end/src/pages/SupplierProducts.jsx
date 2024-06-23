import React, { useState, useEffect} from 'react'
import { Header, Modal } from '../components'

import { Link, NavLink }  from 'react-router-dom';


import { TbGps, TbFileExport, TbPlus, TbBuildingWarehouse, TbDotsVertical } from 'react-icons/tb'
import { FiMinusSquare, FiEdit2, FiDollarSign, FiBox, FiFilter, FiAlertTriangle } from 'react-icons/fi'
import { AiOutlineUnorderedList, AiOutlineHome, AiOutlineBook, AiOutlineTag, AiOutlineFileDone, AiOutlineShoppingCart, AiOutlineEdit, AiOutlineStar, AiFillStar, AiOutlineTags, AiOutlineDelete, AiFillCaretDown, AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineDone, MdOutlineLocalShipping, MdClose, MdOutlineCategory, MdOutlineLocationOn, MdOutlinePeopleAlt, MdOutlineInventory, MdAccessTime } from 'react-icons/md'
import { BiDollarCircle, BiBookAdd } from 'react-icons/bi';
import { GiCargoCrate } from 'react-icons/gi';
import { HiOutlineEye } from 'react-icons/hi'
import { RiAddBoxLine } from 'react-icons/ri'


import { useStateContext } from '../contexts/ContextProvider';

 
const SupplierProducts = () => {
	const {  supplierProducts, setsupplierProducts, filtredSupplierProducts, setFiltredSupplierProducts, isOpenModal, setIsOpenModal, catalog, setCatalog } = useStateContext();
	const user = JSON.parse(localStorage.getItem('user'));

	function handleOpenModal(){
		setIsOpenModal(true);
	}

	

	const [orgCategories, setOrgCategories] = useState(true);
	const [orgTypes, setOrgTypes] = useState(false);
	const [orgBrands, setOrgBrands] = useState(false);
	const [orgTags, setOrgTags] = useState(false);

	function setOrganising(n){
		if(n == 1){
			setOrgTypes(false);
			setOrgBrands(false);
			setOrgTags(false);
			setOrgCategories(true);
		}
		if(n == 2){
			setOrgCategories(false);
			setOrgBrands(false);
			setOrgTags(false);
			setOrgTypes(true);
		}
		if(n == 3){
			setOrgCategories(false);
			setOrgTypes(false);	
			setOrgTags(false);
			setOrgBrands(true);
		}
		if(n == 4){
			setOrgCategories(false);
			setOrgTypes(false);
			setOrgBrands(false);
			setOrgTags(true);
		}
	}


	
	

	return (


		<div className="max-w-[1400px] m-auto">

		  <Modal />

		  <div className="px-8 ml-3">
				<div className="flex gap-3 text-gray-400 font-semibold mb-5">
					<div className="cursor-pointer"><AiOutlineHome className="text-2xl hover:text-gray-500" /></div>
					<div className="text-gray-200">/</div>
					<div className="cursor-pointer text-green-600 bg-green-100 px-2 rounded-lg">My Products</div>
				</div>
				<Header title="My Products"/>
			</div>

			<div className="flex mr-8 mb-10">

			<div className="flex-col w-full">

				
				<div className="mr-4 mt-4 pl-5 flex h-[672px]">
				  <div className="border-b-[28px] ml-8 border-white box bg-white w-full rounded-xl p-10 overflow-y-scroll">
					<div className="flex justify-between items-center">
						<div className="">
						</div>
						
						<div className="flex gap-5">
							<div className="relative flex items-center">
								<div className="relative flex items-center">
									<FiBox className="absolute text-xl left-3 text-gray-400"/>
									<input type="text" className="w-full h-12 text-gray-500 rounded-lg bg-[#FEFEFE] outline-1 border-1 border-color focus:outline-indigo-300 focus:border-2 border-color text-lg px-10" placeholder="Search" />
								</div>

						</div>

							<div>
								<button type="button" title="Catalog" onClick={handleOpenModal} className="w-full h-full flex justify-around items-center font-bold bg-indigo-200 hover:bg-indigo-300 border-1 border-color px-4 py-1.5 rounded-lg shadow-sm hover:shadow"><div className="text-indigo-900">Browse the Catalog</div><BiBookAdd className="text-lg ml-2 text-indigo-900"/></button>								
							</div>
							
							<NavLink to="/products/add" onClick={() => {}} >
								<button type="button" title="Add" className="w-full h-full flex justify-around items-center font-bold bg-green-200 hover:bg-green-300 border-1 border-color px-4 py-1.5 rounded-lg shadow-sm hover:shadow"><div className="text-green-900">Add New</div><RiAddBoxLine className="text-xl ml-2 text-green-900"/></button>								
							</NavLink>

						</div>
					</div>

					<div className="mt-14 px-2">
							{catalog.map((product) => (
								 product.supplier.id === user.id && 
								<div key={product.id} className="border-1 border-color shadow-sm rounded-lg py-2.5 bg-main-bg pr-4 pl-6 w-full relative flex items-center mb-4 rounded" >
									<div className="">
									<div className="mr-5 w-[35px] h-[35px] rounded" style={{backgroundImage: `url(${product.image_url})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
									</div>
									<div className="flex-col w-2/6">
										<p className="font-bold mt-1">{product.name}</p>
										<p className="text-blue-800 text-sm ">{product.brand}</p>
									</div>
									
									<div className="ml-6 flex-col w-1/6">
										<p className="text-gray-500 mt-1">Price</p>
										<p className="font-bold">{product.price} .DZD</p>
									</div>

									<div className="flex gap-2 absolute right-3 ml-0">
										
										<Link to={`/products/update/${product.id}`}>
											<button className="mt-3 text-sm text-gray-400 hover:text-green-500 font-bold"><AiOutlineEdit className="text-2xl ml-1"/>edit</button>
										</Link>
										<div className="">
											<button className="mt-3 text-gray-400 hover:text-rose-500 text-sm font-bold" onClick={() => handleProductDelete(product.id)}><AiOutlineDelete className="text-2xl ml-2"/>delete</button>
										</div>
									</div>
									
								</div>
								
							))}
						
					</div>
				</div>
			</div>

			








			</div>

			
		</div>

			


		</div>
	)
}

export default SupplierProducts;
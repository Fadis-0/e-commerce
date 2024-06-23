import React, { useState, useEffect } from 'react'

import { MdOutlineCancel, MdClose } from 'react-icons/md'
import { BiReset } from 'react-icons/bi'
import { AiOutlineWechat, AiOutlineArrowLeft, AiOutlineMail, AiOutlinePlus, AiOutlineShoppingCart, AiOutlineSearch, AiOutlineReload, AiOutlineCaretDown, AiOutlineCaretRight, AiOutlineTag } from 'react-icons/ai'

import { RiAddBoxLine } from 'react-icons/ri'


import { useStateContext } from '../contexts/ContextProvider'

const SupplyModal = () => {

	const { 
			catalog, setCatalog,
			filtredCatalog, setFiltredCatalog,
			isOpenSupplyModal, setIsOpenSupplyModal,
			selectedSearch, setSelectedSearch
			
		} = useStateContext();



	
  	const modalClass = isOpenSupplyModal ? "top-16 slide" : "top-[-100%] slide";

	function handleOpen() {	
		setIsOpenSupplyModal(!isOpenSupplyModal);
	}

	
	const [selected, setSelected] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);

	function handleSelect(product) {
		setSelected(true);
		setSelectedProduct(product);
	}

	function back() {
		setSelected(false);
		setSelectedProduct(null);
	}

	const [quantity, setQuantity] = useState(0);

	function handleSetQuantity(){
		setQuantity(event.target.value);
	}



	function saveProduct() {		

		const formData = new FormData();

		formData.set('id', selectedSearch.id);
		formData.set('idsup', selectedProduct.supplier.id);
		formData.set('idcat', selectedProduct.id);

		fetch('http://192.168.0.138:8080/products/updateSupplier', {
			method: 'PUT',
			body: formData
		})
		.then(data => {
			
		});

		handleOpen();
		setSelected(null);
		setSelectedSearch(null);
	}


	function handleSearch(query) {
  		const filtred = catalog.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
 		setFiltredCatalog(filtred);
  	}

	return (
		<div className={`bg-white rounded-xl mt-5 box max-w-[1098px] right-1 ${modalClass} left-24 h-[660px] z-50 absolute ml-auto mr-auto`}>
			<div className="w-full h-full overflow-y-scroll border-b-[40px] border-b-white border-t-[40px] border-t-white">
				<div className="pl-10 pt-0 rounded-xl bg-white pr-6 border-color flex w-full justify-between">
					<p className="text-2xl mt-1 font-bold">Product Search</p>
					<MdClose onClick={handleOpen} className="text-2xl mt-1 hover:text-rose-500 cursor-pointer" />
				</div>




			<div className="w-full flex h-full">
			  <div className="w-2/5 mt-8 pl-8 pt-6 pr-5">
			  	<p className="text-lg font-semibold ">Requested Prodct</p>
			  		
			  		{selectedSearch !== null &&  <div className="flex-col">
							<div className="mx-auto mt-8">
								<div className="w-44 h-44 flex p-1 justify-center items-center mx-auto border-1 border-color rounded">
									<div className="w-full h-full rounded" style={{backgroundImage: `url(${selectedSearch.image_url})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
								</div>
							</div>
			  				
			  				<div className="w-full">
								<div className="text-lg mt-8 text-gray-600 mr-10 text-center"></div>
								<div className="flex mt-2 border-1 border-gray-100">
									<div className="flex-col w-2/5">
										<div className="h-12 bg-main-bg text-sm text-gray-400 flex items-center pl-4">Title:</div>
										<div className="h-12 bg-white text-sm text-gray-400 flex items-center pl-4">Brand:</div>
										<div className="h-12 bg-main-bg text-sm text-gray-400 flex items-center pl-4">Price:</div>
										<div className="h-12 bg-white text-sm text-gray-400 flex items-center pl-4">Quantity:</div>
										<div className="h-12 bg-main-bg text-sm text-gray-400 flex items-center pl-4">Category:</div>
										<div className="h-12 bg-white text-sm text-gray-400 flex items-center pl-4">Type:</div>
										<div className="h-12 bg-main-bg text-sm text-gray-400 flex items-center pl-4">SKU:</div>
									</div>
									<div className="flex-col w-3/5">
										<div className="h-12 bg-main-bg text-sm flex items-center">{selectedSearch.name}</div>
										<div className="h-12 bg-white text-sm flex items-center">{selectedSearch.brand}</div>
										<div className="h-12 bg-main-bg text-sm flex items-center">{selectedSearch.price} .DZD</div>
										<div className="h-12 bg-white text-sm flex items-center">{selectedSearch.quantity}</div>
										<div className="h-12 bg-main-bg text-sm flex items-center">{selectedSearch.category}</div>
										<div className="h-12 bg-white text-sm flex items-center">{selectedSearch.type}</div>
										<div className="h-12 bg-main-bg text-sm flex items-center">{selectedSearch.sku}</div>
									</div>
								</div>
							</div>

							
							
						</div>}
			  </div>
			  <div className="w-3/5 mt-8 border-l-1 border-color pl-8 pt-6 h-[760px]">
			  	{!selected &&<p className="text-lg font-semibold ">Suppliers Catalog</p>}
				{selected && <p className="text-2xl mt-1 font-semibold hover:underline text-gray-500 hover:text-gray-900 w-16"><div onClick={back} className="flex text-lg mb-8 items-center gap-2 font-normal cursor-pointer"><AiOutlineArrowLeft/><div className="font-bold">Back</div></div></p>}
				
				{!selected && <div className="mt-5 w-full">
						<div className="">
						<div className="relative flex items-center">
							<div className="relative flex items-center mx-auto">
								<AiOutlineSearch className="absolute text-xl left-3 text-gray-400"/>
								<input type="text" onChange={(e) => handleSearch(e.target.value)} className="w-full h-12 text-gray-500 rounded-lg bg-[#FEFEFE] outline-1 border-1 border-color focus:outline-indigo-300 focus:border-2 border-color text-lg px-10" placeholder="Search for product" />
							</div>
						</div>
					</div>
				</div>}
				
				{!selected && <div className="mt-5 px-4 mr-4">
					{
						filtredCatalog.map((product) => (
							<div key={product.id} onClick={() => handleSelect(product)} className="border-1 border-color shadow-sm rounded-lg py-2.5 bg-main-bg hover:bg-gray-100 hover:cursor-pointer hover:shadow pr-4 pl-6 w-full relative flex items-center mb-4 rounded" >
								<div className="">
									<div className="mr-5 w-[35px] h-[35px] rounded" style={{backgroundImage: `url(${product.image_url})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
									</div>
									<div className="flex-col w-3/5">
										<p className="font-bold mt-1">{product.name}</p>
										<p className="text-blue-800 text-sm ">{product.brand}</p>
									</div>
									<div className="ml-8 flex-col w-2/6">
										<p className="text-gray-500 mt-1">Supplier</p>
										<p className="font-bold">{product.supplier.name}</p>
									</div>

							
							</div>
						))
					}

				</div>
				}

				{
					selected && <div className="mr-4">
						<div className="flex gap-8">
							<div className="w-1/3">
								<div className="w-44 h-44 p-1 flex justify-center items-center mx-auto border-1 border-color rounded">
									<div className="w-full h-full rounded" style={{backgroundImage: `url(${selectedProduct.image_url})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
								</div>
							</div>
							<div className="flex-col w-2/3">
								<div className="flex mt-4 mb-8 justify-between gap-5">
									<div className="font-bold flex gap-1 text-lg flex-col"><div>{selectedProduct.name}</div><div className="text-sm font-semibold text-indigo-700">{selectedProduct.brand}</div></div>
									
								</div>
								<div className="flex gap-5 items-center text-gray-500 text-lg font-semibold">Description</div>
								<div className="flex gap-5 items-center mb-3">{selectedProduct.description}</div>
							</div>
							
						</div>
						<div className="flex w-full gap-8">
							<div className="w-full">
								<div className="w-full text-center flex mt-6 mb-6 items-center justify-between">
									<div></div>
									<div className="flex gap-4 mr-4">
										<div className="">
											<div onClick={saveProduct} className="mx-auto cursor-pointer rounded border-1 border-color bg-indigo-300 pt-0.5 hover:bg-indigo-400 shadow flex justify-center items-center text-lg font-semibold px-4 h-12">
												<RiAddBoxLine className="text-2xl mr-4" />
												Select Prodct
											</div>

										</div>
									</div>
								</div>
								<div className="flex mt-2 border-1 border-gray-100">
									<div className="flex-col w-1/2">
										<div className="h-12 bg-main-bg text-lg text-gray-400 flex items-center pl-4">Supplier:</div>
										<div className="h-12 bg-white text-lg text-gray-400 flex items-center pl-4">Price per unit:</div>
									</div>
									<div className="flex-col w-1/2">
										<div className="h-12 bg-main-bg text-lg flex items-center">{selectedProduct.supplier.name}</div>
										<div className="h-12 bg-white text-lg flex items-center">{selectedProduct.price} .DZD</div>
									</div>
								</div>
							</div>

							
							
						</div>

					</div>
				}

			</div>
		  </div>
		 </div>
		</div>
	)
}

export default SupplyModal;
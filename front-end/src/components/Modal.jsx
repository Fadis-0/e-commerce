import React, { useState, useEffect } from 'react'

import { MdOutlineCancel, MdClose } from 'react-icons/md'
import { BiReset } from 'react-icons/bi'
import { AiOutlineWechat, AiOutlineArrowLeft, AiOutlineMail, AiOutlinePlus, AiOutlineShoppingCart, AiOutlineSearch, AiOutlineReload, AiOutlineCaretDown, AiOutlineCaretRight, AiOutlineTag } from 'react-icons/ai'

import { RiAddBoxLine } from 'react-icons/ri'


import { useStateContext } from '../contexts/ContextProvider'

const Modal = () => {

	const { 
			catalog, setCatalog,
			filtredCatalog, setFiltredCatalog,
			isOpenModal, setIsOpenModal,
			role,
			handlePopup, popupMessage, setPopupMessage, popupType, setPopupType
			
		} = useStateContext();


	
  	const modalClass = isOpenModal ? "top-16 slide" : "top-[-100%] slide";

	function handleOpen() {	
		setIsOpenModal(!isOpenModal);
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

		formData.set('name', selectedProduct.name);
		formData.set('brand', selectedProduct.brand);
		
		formData.set('price', selectedProduct.price);
		formData.set('quantity', quantity);
		formData.set('description', selectedProduct.description);
		formData.set('image_url', selectedProduct.image_url);
		formData.set('image_url2', selectedProduct.image_url2);
	
		formData.set('sku', selectedProduct.sku);
		formData.set('barcode', selectedProduct.barcode);
		formData.set('status', "Pending");
		formData.set('category', "None");
		formData.set('tags', null);
		formData.set('type', "None	");
		formData.set('compare_price	', 0);
		formData.set('margin', 0);

		

		fetch('http://192.168.0.138:8080/products/add', {
			method: 'POST',
			body: formData
		})
		.then(response => {
			if (!response.ok) {
				setPopupType("ok");
				setPopupMessage("Product Already Exists");
				handlePopup(true);
				console.log("Error");
				throw new Error('Product Already exist');
				
			}
			else{
				return response.json();	
			}
			
				
		})
		.then(data => {
			const formData = new FormData();

			formData.set('id', data.id);
			formData.set('idcat', selectedProduct.id);
			formData.set('idsup', selectedProduct.supplier.id);

			fetch('http://192.168.0.138:8080/products/updateSupplier', {
				method: 'PUT',
				body: formData
			})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');

				}
				else{
					return response.json();	
				}
					
			})
			.then(data => {

			});
		});

		handleOpen();
		setSelected(null);
	}


	function handleSearch(query) {
  		const filtred = catalog.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
 		setFiltredCatalog(filtred);
  	}

	return (
		<div className={`bg-white rounded-xl mt-5 box max-w-[1098px] right-1 ${modalClass} left-24 h-[650px] z-50 absolute ml-auto mr-auto`}>
			<div className="w-full h-full overflow-y-scroll border-b-[40px] border-b-white border-t-[40px] border-t-white">
				<div className="pl-10 pt-0 rounded-xl bg-white pr-6 border-color flex w-full justify-between">
					{!selected && <p className="text-2xl mt-1 font-semibold ">Suppliers Catalog</p>}
					{selected && <p className="text-2xl mt-1 font-semibold"><div onClick={back} className="text-lg mb-8 font-bold cursor-pointer hover:underline flex items-center gap-1"><AiOutlineArrowLeft />Back</div></p>}
					<MdClose onClick={handleOpen} className="text-2xl mt-1 hover:text-rose-500 cursor-pointer" />
				</div>

				{!selected && <div className="mt-6 px-8">
					<div className="relative flex items-center">
						<div className="relative flex items-center w-3/5 mx-auto">
							<AiOutlineSearch className="absolute text-xl left-3 text-gray-400"/>
							<input type="text" onChange={(e) => handleSearch(e.target.value)} className="w-full h-12 text-gray-500 rounded-lg bg-[#FEFEFE] outline-1 border-1 border-color focus:outline-indigo-300 focus:border-2 border-color text-lg px-10" placeholder="Search a product" />
						</div>
					</div>
				</div>}
				
				{!selected && <div className="mt-8 px-14">
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
									
									<div className="flex-col w-1/5">
										<p className="text-gray-500 mt-1">Price</p>
										<p className="font-bold">{product.price} .DZD</p>
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
					selected && <div className="px-14 py-4">
						<div className="flex gap-8">
							<div className="w-1/3">
								<div className="w-64 h-64 flex justify-center items-center mx-auto border-1 border-color rounded-xl">
									<div className="w-60 h-60 rounded-xl" style={{backgroundImage: `url(${selectedProduct.image_url})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
								</div>
							</div>
							<div className="flex-col w-2/3">
								<div className="flex mt-8 mb-8 justify-between gap-5">
									<div className="font-bold flex gap-1 text-xl flex-col"><div>{selectedProduct.name}</div><div className="text-lg font-semibold text-indigo-700">{selectedProduct.brand}</div></div>
									
								</div>
								<div className="flex gap-5 items-center text-gray-500 text-lg font-semibold">Description</div>
								<div className="flex gap-5 items-center mb-3">{selectedProduct.description}</div>
							</div>
							
						</div>
						<div className="flex w-full gap-8">
							{role !== "supplier" && <div className="w-3/5">
								<div className="text-lg mt-16 text-gray-600 mr-10 text-center">Quick Details</div>
								<div className="flex mt-2 border-1 border-gray-100">
									<div className="flex-col w-1/2">
										<div className="h-12 bg-main-bg text-lg text-gray-400 flex items-center pl-4">Title</div>
										<div className="h-12 bg-white text-lg text-gray-400 flex items-center pl-4">Brand</div>
										<div className="h-12 bg-main-bg text-lg text-gray-400 flex items-center pl-4">Supplier</div>
										<div className="h-12 bg-white text-lg text-gray-400 flex items-center pl-4">Price</div>
									</div>
									<div className="flex-col w-1/2">
										<div className="h-12 bg-main-bg text-lg flex items-center">{selectedProduct.name}</div>
										<div className="h-12 bg-white text-lg flex items-center">{selectedProduct.brand}</div>
										<div className="h-12 bg-main-bg text-lg flex items-center">{selectedProduct.supplier.name}</div>
										<div className="h-12 bg-white text-lg flex items-center">{selectedProduct.price} .DZD</div>
									</div>
								</div>
							</div>}

							{role == "supplier" && <div className="w-full">
								<div className="text-lg mt-16 text-gray-600 mr-10 text-center">Quick Details</div>
								<div className="flex mt-2 border-1 border-gray-100">
									<div className="flex-col w-1/2">
										<div className="h-12 bg-main-bg text-lg text-gray-400 flex items-center pl-4">Title</div>
										<div className="h-12 bg-white text-lg text-gray-400 flex items-center pl-4">Brand</div>
										<div className="h-12 bg-main-bg text-lg text-gray-400 flex items-center pl-4">Supplier</div>
										<div className="h-12 bg-white text-lg text-gray-400 flex items-center pl-4">Price</div>
									</div>
									<div className="flex-col w-1/2">
										<div className="h-12 bg-main-bg text-lg flex items-center">{selectedProduct.name}</div>
										<div className="h-12 bg-white text-lg flex items-center">{selectedProduct.brand}</div>
										<div className="h-12 bg-main-bg text-lg flex items-center">{selectedProduct.supplier.name}</div>
										<div className="h-12 bg-white text-lg flex items-center">{selectedProduct.price} .DZD</div>
									</div>
								</div>
							</div>}

							{role !== "supplier" && <form onSubmit={saveProduct} className="w-2/5 ml-12 flex-col py-20">
								<p className="text-gray-500">Requested Quantity</p>
								<input type="number" required onChange={handleSetQuantity} placeholder="0" className=" px-2.5 outline-indigo-300 pt-0.5 rounded border-1 border-color shadow flex justify-center items-center text-lg font-lg w-48 h-12" />
								<div className="">
								<button type="submit" className="pt-0.5 mt-4 cursor-pointer rounded-xl border-1 border-color bg-white transition-all ease hover:bg-green-300 shadow flex justify-center items-center text-lg font-semibold w-48 h-12">
									Add Product
									<RiAddBoxLine className="text-xl mb-0.5 ml-4" />
								</button>

								</div>
							</form>}
							
						</div>

					</div>
				}
			</div>
		</div>
	)
}

export default Modal;
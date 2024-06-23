import React, { useState, useEffect } from 'react'

import { MdOutlineCancel, MdClose } from 'react-icons/md'
import { BiReset } from 'react-icons/bi'
import { AiOutlineWechat, AiOutlineArrowLeft, AiOutlineMail, AiOutlinePlus, AiOutlineShoppingCart, AiOutlineSearch, AiOutlineReload, AiOutlineCaretDown, AiOutlineCaretRight, AiOutlineTag } from 'react-icons/ai'

import { RiAddBoxLine } from 'react-icons/ri'


import { useStateContext } from '../contexts/ContextProvider'

const OrderModal = () => {

	const { 
			catalog, setCatalog,
			filtredCatalog, setFiltredCatalog,
			isOpenOrderModal, setIsOpenOrderModal,
			selectedOrder, setSelectedOrder
			
		} = useStateContext();



	
  	const modalClass = isOpenOrderModal ? "top-16 slide" : "top-[-100%] slide";

	function handleOpen() {	
		setIsOpenOrderModal(!isOpenOrderModal);
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
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		const now = new Date();
		formData.set('orderDate', now);

		formData.set('idsup', selectedOrder.supplier.id);
		formData.set('idpro', selectedOrder.id);
		formData.set('total_price', parseInt(selectedOrder.catalog.price)*parseInt(selectedOrder.quantity));
		
		formData.set('cost', selectedOrder.catalog.price);
		formData.set('departure', '-');
		formData.set('status', "Order Placed");
		
		

		

		fetch('http://192.168.0.138:8080/suppliersOrders/add', {
			method: 'POST',
			body: formData
		})
		.then(data => {
			updateProduct(selectedOrder);
		});

		handleOpen();
		setSelected(null);
		setSelectedOrder(null);
		
	}


	function updateProduct(product) {

		const formData = new FormData();


		formData.set('id', product.id);
		formData.set('name', product.name);
		formData.set('brand', product.brand);
		formData.set('category', product.category);
		formData.set('price', product.price);
		formData.set('quantity', product.quantity);
		formData.set('description', product.description);
		formData.set('image_url', product.image_url);
		formData.set('image_url2', product.image_url2);
		formData.set('tags', product.tags);
		formData.set('type', product.type);
		formData.set('comparePrice', product.comparePrice);
		formData.set('margin', product.margin);
		formData.set('sku', product.sku);
		formData.set('barcode', product.barcode);
		formData.set('status', "Order Placed");

		

		fetch('http://192.168.0.138:8080/products/update', {
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
	}


	return (
		<div className={`bg-white rounded-xl mt-5 box max-w-[1098px] right-1 ${modalClass} left-24 h-[660px] z-50 absolute ml-auto mr-auto`}>
			<div className="w-full h-full overflow-y-scroll border-b-[40px] border-b-white border-t-[40px] border-t-white">
				<div className="pl-10 pt-0 rounded-xl bg-white pr-6 border-color flex w-full justify-between">
					<p className="text-2xl mt-1 font-bold">Order a Product</p>
					<MdClose onClick={handleOpen} className="text-2xl mt-1 hover:text-rose-500 cursor-pointer" />
				</div>




			<div className="w-full flex ">
			  <div className="w-1/2 mt-8 pl-8 pt-6 pr-5 ">
			  	<p className="font-bold flex gap-2 items-center">PRODUCT {selectedOrder !== null && <div className="text-gray-500 text-sm font-bold">#{selectedOrder.id}</div>}</p>
			  		
			  		{selectedOrder !== null && <div className="flex-col">
							<div className="mx-auto mt-8">
								<div className="w-44 h-44 flex p-1 justify-center items-center mx-auto border-1 border-color rounded">
									<div className="w-full h-full rounded" style={{backgroundImage: `url(${selectedOrder.image_url})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
								</div>
							</div>
			  				
			  				<div className="w-full">
								<div className="text-lg mt-8 text-gray-600 mr-10 text-center"></div>
								<div className="flex mt-2 border-1 border-gray-100">
									<div className="flex-col w-2/5">
										<div className="h-12 bg-main-bg text-sm text-gray-400 flex items-center pl-4">Title:</div>
										<div className="h-12 bg-white text-sm text-gray-400 flex items-center pl-4">Supplier:</div>
										<div className="h-12 bg-main-bg text-sm text-gray-400 flex items-center pl-4">Price per unit:</div>
										<div className="h-12 bg-white text-sm text-gray-400 flex items-center pl-4">Requested Quantity:</div>
									</div>
									<div className="flex-col w-3/5">
										<div className="h-12 bg-main-bg text-sm flex items-center">{selectedOrder.catalog.name}</div>
										<div className="h-12 bg-white text-sm flex items-center">{selectedOrder.catalog.supplier.name}</div>
										{selectedOrder.catalog !== null && <div className="h-12 bg-main-bg text-sm flex items-center">{selectedOrder.catalog.price} .DZD</div>}
										{selectedOrder.catalog == null && <div className="h-12 bg-main-bg text-sm flex items-center">- .DZD</div>}
										<div className="h-12 bg-white text-sm flex items-center">{selectedOrder.quantity}</div>
									</div>
								</div>
							</div>

							
							
						</div>}
			  </div>
			  <div className="w-1/2 bg-main-bg mt-8 border-l-1 border-1 border-color px-8 mr-6 pt-6 rounded-tl-xl rounded-br-xl">
			  	{!selected &&<p className="text-lg font-bold ">Order Details</p>}
				{selected && <p className="text-2xl mt-1 font-semibold hover:underline text-gray-500 hover:text-gray-900 w-16"><div onClick={back} className="flex text-lg mb-8 items-center gap-2 font-normal cursor-pointer"><AiOutlineArrowLeft/><div className="font-bold">Back</div></div></p>}
				
				
				
				{selectedOrder !== null && <form onSubmit={saveProduct} className="mt-10 px-4 mr-4 flex-col">
					
					<div className="mb-5 mx-auto w-3/4">
						<div className="mr-8 font-bold">Supplier</div>
						<div className="mr-8 text-gray-500">{selectedOrder.supplier.name}</div>
					</div>	


					<div className="mb-5 mx-auto w-3/4">
						<div className="mr-8 font-bold">Quantity</div>
						<div className="mr-8 text-gray-500">{selectedOrder.quantity}</div>
					</div>	

					<div className="mb-5 mx-auto w-3/4">
						<div className="mr-8 font-bold">Total</div>
						<div className="mr-8 text-gray-500">{selectedOrder.quantity * selectedOrder.catalog.price} .DZD</div>
					</div>	

					<div className="mb-5 mx-auto w-3/4">
						<div className="mr-8 font-bold">Address</div>
						<input type="text" placeholder="Destination Location" required name="destination" className="w-full text-gray-700 outline-0 block border-1 border-color shadow focus:outline-1 focus:outline-indigo-300 rounded py-2 px-3"/>   
					</div>	


					<div className="flex-row items-center mt-8 mx-auto w-2/5">
						<button type="submit" className="h-10 w-full flex bg-violet-500 items-center justify-center gap-4 text-white font-bold text-lg pt-0.5 cursor-pointer hover:shadow hover:bg-violet-600 border-1 mt-4 border-color shadow-sm rounded outline-indigo-300 px-4" >
							<AiOutlineShoppingCart className="text-xl"/>Submit
						</button>
					</div>				

					

				</form>}
				

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
											<div  className="mx-auto cursor-pointer rounded border-1 border-color bg-indigo-300 pt-0.5 hover:bg-indigo-400 shadow flex justify-center items-center text-lg font-semibold px-4 h-12">
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
										<div className="h-12 bg-main-bg text-lg text-gray-400 flex items-center pl-4">Supply Abbility:</div>
										<div className="h-12 bg-white text-lg text-gray-400 flex items-center pl-4">Location:</div>
										<div className="h-12 bg-main-bg text-lg text-gray-400 flex items-center pl-4">Shipping:</div>
									</div>
									<div className="flex-col w-1/2">
										<div className="h-12 bg-main-bg text-lg flex items-center">{selectedProduct.supplier.name}</div>
										<div className="h-12 bg-white text-lg flex items-center">{selectedProduct.price} .DZD</div>
										<div className="h-12 bg-main-bg text-lg flex items-center">-</div>
										<div className="h-12 bg-white text-lg flex items-center">-</div>
										<div className="h-12 bg-main-bg text-lg flex items-center">-</div>
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

export default OrderModal;
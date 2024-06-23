import React, { useState, useEffect } from 'react'
import { MdOutlineCancel, MdClose } from 'react-icons/md'
import { BiReset } from 'react-icons/bi'
import { AiOutlinePlus, AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai'

import { useStateContext } from '../contexts/ContextProvider'

const Utilitybar = (props) => {
	const { activeUtilityMenu, setActiveUtilityMenu, updateImage, setUpdateImage, updateImage2, setUpdateImage2 } = useStateContext();

	const [categories, setCategories] = useState([]);
	
	const defaultImage = "https://epay.slcc.edu/C20011_ustores/web/images/product-default-image.png";
	
	const [imageUrl, setImageUrl] = useState(defaultImage);
	const [imageUrl2, setImageUrl2] = useState(defaultImage);

	const [selectedImage, setSelectedImage] = useState(1);





	useEffect(() => {
		fetch('http://192.168.0.138:8080/categories/list')
			.then(response => response.json())
			.then(data => setCategories(data));
	}, []);

	function handleSubmit(event) {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		if(props.selectedProduct === null){
			formData.set('image_url', imageUrl);
			formData.set('image_url2', imageUrl2);

			fetch('http://192.168.0.138:8080/products/add', {
				method: 'POST',
				body: formData
			})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				else{
					props.updateData();

					return response;	
				}
				
			})
			.then(data => {
				// handle success
			});		


		}
		else {
			formData.set('id', props.selectedProduct.id);
			formData.set('image_url', updateImage);
			formData.set('image_url2', updateImage2);
			
			fetch('http://192.168.0.138:8080/products/update', {
				method: 'PUT',
				body: formData
			})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				else{
					props.updateData();
					return response;	
				}
				
			})
			.then(data => {
				// handle success
			});	
		}
		setActiveUtilityMenu(false);
		props.setSelectedProduct(null);
	}

	function handleUpload(event){
		const fileInput = event.target;
		const file = fileInput.files[0];

		if(file){
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const base64Url = reader.result;
				const url = 'data:image/png;base64,' + base64Url.split(',')[1];
				setImageUrl(url);
				setUpdateImage(url);
				setSelectedImage(1);

			}
		}
	}

	function handleUpload2(event){
		const fileInput = event.target;
		const file = fileInput.files[0];

		if(file){
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const base64Url = reader.result;
				const url = 'data:image/png;base64,' + base64Url.split(',')[1];
				setImageUrl2(url);
				setUpdateImage2(url);
				setSelectedImage(2);

			}
		}
	}


	return (
		<div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 pr-1">
			<div className="flex justify-between items-center p-4 ml-4">
				{
					props.selectedProduct === null ? (
						<p className="font-semibold text-xl mt-2">Add a new product</p>
					) : (<p className="font-semibold text-xl mt-2">Update Existing product</p>)
				}

				<button 
					type="button"
					onClick={() => setActiveUtilityMenu(false)}
					className="text-2xl p-3 hover:text-rose-500 mt-1"
				>
					<MdClose />
				</button>
			</div>

				<form onSubmit={handleSubmit} className="form flex-col border-t-1 border-color p-4 ml-6 mr-6">

					<span className="block text-lg font-semibold">Upload an image : </span>
					<div className="flex mt-4 justify-around">
						
						<div className="h-60 w-60 flex justify-center items-center relative overflow-hidden rounded border-[2px] mr-2 hover:cursor-pointer">
							
							{props.selectedProduct === null 
								? selectedImage === 1 
									? (<div className="w-[95%] cursor-pointer h-[95%] relative flex justify-center items-center rounded" style={{backgroundImage: `url(${imageUrl})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>)
								: selectedImage === 2
									? (<div className="w-[95%] cursor-pointer h-[95%] relative flex justify-center items-center rounded" style={{backgroundImage: `url(${imageUrl2})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>)
									: <div></div>
								: selectedImage === 1 
									? (<div className="w-[95%] cursor-pointer h-[95%] relative flex justify-center items-center rounded" style={{backgroundImage: `url(${updateImage})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>)
								: selectedImage === 2
									? (<div className="w-[95%] cursor-pointer h-[95%] relative flex justify-center items-center rounded" style={{backgroundImage: `url(${updateImage2})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>)
								: <div></div>								
							}

							
							
								<input type="file" className="ml-[-110px] absolute opacity-0 r-0 top-0 bottom-0 cursor-pointer" name="image" onChange={handleUpload} />
							 
							{selectedImage === 2 ? (
								<input type="file" className="ml-[-110px] absolute opacity-0 r-0 top-0 bottom-0 cursor-pointer" name="image2" onChange={handleUpload2} />
							) : <div></div>}



							


						
						</div>

						<div className="flex-col">
							<div onClick={()=> setSelectedImage(1)} className={`border-[2px] flex justify-center items-center hover:cursor-pointer h-14 w-14 mb-1 rounded mr-2 ${selectedImage === 1 ? 'border-gray-400' : ''}`}>
								{
									props.selectedProduct === null ? (
										<div className="w-[90%] cursor-pointer h-[90%] relative rounded" style={{backgroundImage: `url(${imageUrl})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
									) : (<div className="w-[90%] cursor-pointer h-[90%] relative rounded" style={{backgroundImage: `url(${updateImage})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>)
								}									
							</div>
							<div onClick={()=> setSelectedImage(2)} className={`border-[2px] flex justify-center items-center hover:cursor-pointer h-14 w-14 mb-1 rounded mr-2 ${selectedImage === 2 ? 'border-gray-400' : ''}`}>
								{
									props.selectedProduct === null ? (
										<div className="w-[90%] cursor-pointer h-[90%] relative rounded" style={{backgroundImage: `url(${imageUrl2})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
									) : (<div className="w-[90%] cursor-pointer h-[90%] relative rounded" style={{backgroundImage: `url(${updateImage2})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>)
								}			
							</div>
							
						</div>
					</div>
					<div className="flex-col mt-6 relative">
						<div className="relative w-full h-16">
							<input type="text" id="name" name="name" placeholder=" " defaultValue={props.selectedProduct === null ? "" : props.selectedProduct.name } autoComplete="off" className="input px-4" />
							<label className="label text-gray-400" htmlFor="name">Name</label>
						</div>
						<div className="relative w-full h-16">
							<input type="text" id="brand" name="brand" placeholder=" " defaultValue={props.selectedProduct === null ? "" : props.selectedProduct.brand } autoComplete="off" className="input px-4 border-color" />
							<label className="label text-gray-400" htmlFor="brand">Brand</label>
						</div>
						<div className="selectCtr px-2 mb-4 flex justify-between items-center relative h-12 border-2 border-color">
							<select className="select bg-white px-2" name="category" >
								<option name="category">Category</option>													
								
								{categories.map((category) => (
									<option key={category.id} name="category" value={category.name}
									
									selected={
										props.selectedProduct !== null && category.name === props.selectedProduct.category
										? true : false
									}>
									{category.name}</option>													
								))}
							</select>
							<AiOutlineCaretDown />
						</div>

						<div className="flex justify-between h-16">
							<div className="second relative w-40 mr-1">
								<input type="number" step="0.01" id="price" name="price" placeholder=" " defaultValue={props.selectedProduct === null ? "" : props.selectedProduct.price } autoComplete="off" className="input px-4 border-color" />
								<label className="label text-gray-400" htmlFor="price">Price</label>
							</div>
							<div className="second relative w-40 ml-1">
								<input type="number" id="quantity" name="quantity" placeholder=" " defaultValue={props.selectedProduct === null ? "" : props.selectedProduct.quantity } autoComplete="off" className="input px-4 border-color" />
								<label className="label text-gray-400" htmlFor="quantity">Quantity</label>
							</div>
						</div>
						<div className="second relative h-24 ">
							<textarea type="text" id="description" name="description" placeholder=" " autoComplete="off" className="h-32 area resize-none input px-4 border-color pt-4" defaultValue={props.selectedProduct === null ? "" : props.selectedProduct.description } rows="10"></textarea>
							
							<label className="label text-gray-400" htmlFor="description">Description</label>
						</div>
						
						<div className="add rounded bottom-0 right-0 bg-blue-100 float-right text-blue-900 pl-4 h-10 w-28 mt-14 mb-4 px-2 hover:shadow transition-all ease">
							<button type="submit" className="w-full h-full flex justify-around items-center font-bold">
							{
								props.selectedProduct === null ? (
									<p>Submit</p>
								) : (<p>Update</p>)
							}
							<AiOutlineCaretRight className="text-l"/></button>
						</div>
						<div className="add rounded bottom-0 left-0 cursor-pointer bg-violet-100 flex justify-around items-center float-left text-violet-900 h-10 w-28 mt-14 mb-4 px-2 hover:shadow transition-all ease">
							{
								props.selectedProduct === null ? (
									<input type="reset" className="ml-3 w-full cursor-pointer h-full font-bold" onClick={() => {setImageUrl(defaultImage); setImageUrl2(defaultImage);} } />
								) : (<input type="reset" className="ml-3 w-full cursor-pointer h-full font-bold" onClick={() => {setUpdateImage(defaultImage); setUpdateImage2(defaultImage);} } />)
							}

							<BiReset className="text-xl w-full cursor-pointer"/>
						</div>
						
					</div>
				</form>
	
		</div>
	)
}

export default Utilitybar;
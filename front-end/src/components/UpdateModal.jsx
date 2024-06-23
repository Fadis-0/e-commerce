import React, { useState, useEffect } from 'react'

import { MdOutlineCancel, MdClose } from 'react-icons/md'
import { BiReset } from 'react-icons/bi'
import { AiOutlinePlus, AiOutlineReload, AiOutlineCaretDown, AiOutlineCaretRight, AiOutlineTag } from 'react-icons/ai'

import { useStateContext } from '../contexts/ContextProvider'

const UpdateModal = () => {

	const { updateProductName, setUpdateProductName, updateProductBrand, setUpdateProductBrand, updateProductCategory, setUpdateProductCategory, updateProductPrice, setUpdateProductPrice, updateProductQuantity, setUpdateProductQuantity, updateProductDescription, setUpdateProductDescription, updateProductsData, isOpenUpdateModal, setIsOpenUpdateModal, updateImage, setUpdateImage, updateImage2, setUpdateImage2 } = useStateContext();
	
	const [categories, setCategories] = useState([]);
  	
  	const [brands, setBrands] = useState([]);
  	
  	const [tags, setTags] = useState([]);
  	const [selectedTags, setSelectedTags] = useState([]);
  	const [filtredTags, setFiltredTags] = useState([]);

	const [selectedImage, setSelectedImage] = useState(1);

  	const defaultImage = "https://epay.slcc.edu/C20011_ustores/web/images/product-default-image.png";
	
	const [imageUrl, setImageUrl] = useState(defaultImage);
	const [imageUrl2, setImageUrl2] = useState(defaultImage);




	useEffect(() => {
		fetch('http://192.168.0.138:8080/categories/list')
			.then(response => response.json())
			.then(data => setCategories(data));
	}, []);
	
	useEffect(() => {
		fetch('http://192.168.0.138:8080/brands/list')
			.then(response => response.json())
			.then(data => {setBrands(data);	});
	}, []);


	useEffect(() => {
		fetch('http://192.168.0.138:8080/tags/list')
			.then(response => response.json())
			.then(data => {setTags(data); setFiltredTags(data);});
	}, []);
	
	const modalClass = isOpenUpdateModal ? "top-16 slide" : "top-[-100%] slide";

	function handleOpen() {
		setUpdateProductName('');
	  	setUpdateProductBrand('Brand');
	  	setUpdateProductCategory('Category');
	  	setUpdateProductPrice(null);
		setUpdateProductQuantity(null);
		setUpdateProductDescription('');
		//setSelectedTags([]);

	  	
		setIsOpenUpdateModal(!isOpenUpdateModal);
	}

	function handleTagDelete(name){
		const filtred = [...filtredTags];
		for(let i=0; i<filtred.length; i++){
			if(filtred[i].name === name){
				filtred.splice(i, 1);
				setFiltredTags(filtred);
				break;
			}
		}
	}

	function handleSelectedTagDelete(name){
		const filtred = [...selectedTags];
		for(let i=0; i<filtred.length; i++){
			if(filtred[i].name === name){
				filtred.splice(i, 1);
				setSelectedTags(filtred);
				break;
			}
		}
	}


	function handleTagPush(tag){
		const index = selectedTags.findIndex(selectedTag => selectedTag.id === tag.id);
		if(index !== -1){
			const updated = [...selectedTags];
			updated.splice(index, 1);
			setSelectedTags(updated);
		}
		else setSelectedTags([...selectedTags, tag]);
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

	function handleSubmit(event) {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		formData.set('image_url', imageUrl);
		formData.set('image_url2', imageUrl2);
		formData.set('tags', selectedTags.toString());

		fetch('http://192.168.0.138:8080/products/add', {
			method: 'POST',
			body: formData
		})
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			else{
				updateProductsData();
				handleOpen();
				setSelectedTags([]);
				setFiltredTags(tags);
				form.reset();
				return response;	
			}	
		})
		.then(data => {
			// handle success
		});		
	}

	return (
		<div className={`bg-white rounded-lg box max-w-[1098px] right-1 ${modalClass} left-24 h-[650px] z-50 absolute ml-auto mr-auto`}>
			<div className="w-full h-full">
				<div className="pl-6 py-5 bg-white pr-4 border-b-[3px] border-color flex absolute  w-full justify-between">
					<p className="text-xl mt-1 font-bold ">Update a Product</p>
					<MdClose onClick={handleOpen} className="text-2xl mt-1 hover:text-rose-500 cursor-pointer" />
				</div>
				<div className="flex-col h-full">
					<form onSubmit={handleSubmit} className="form h-full w-full">
						<div className="w-full h-[87%] pt-24 px-6 flex">
							<div className="w-[62%] mr-6 flex">
								<div className="w-full bg-white m-4 p-4">
									<div className="relative w-full h-16">
										<input type="text" id="name" name="name" placeholder=" " autoComplete="off" defaultValue={updateProductName} className="input px-4" />
										<label className="label text-gray-400" htmlFor="name">Name</label>
									</div>
									<div className="selectCtr px-2 mb-4 flex justify-between items-center relative h-12 border-2 border-color">
										<select className="select bg-white px-2" name="brand" >
											<option name="brand">Brand</option>													
											
											{brands.map((brand) => (
												<option key={brand.id} name="brand" value={brand.name} 
													selected={
														brand.name === updateProductBrand
														? true : false
													}>
													{brand.name}
												</option>													
											))}
										</select>
										<AiOutlineCaretDown />
									</div>
									<div className="selectCtr px-2 mb-4 flex justify-between items-center relative h-12 border-2 border-color">
										<select className="select bg-white px-2" name="category" >
											<option name="category">Category</option>													
											
											{categories.map((category) => (
												<option key={category.id} name="category" value={category.name}
													selected={
															category.name === updateProductCategory
															? true : false
														}>
												{category.name}</option>													
											))}
										</select>
										<AiOutlineCaretDown />
									</div>
									<div className="flex justify-between h-16">
										<div className="second relative w-40 mr-1">
											<input type="number" step="0.01" id="price" name="price" defaultValue={updateProductPrice} placeholder=" " autoComplete="off" className="input px-4 border-color" />
											<label className="label text-gray-400" htmlFor="price">Price</label>
										</div>
										<div className="second relative w-40 ml-1">
											<input type="number" id="quantity" name="quantity" placeholder=" " autoComplete="off" defaultValue={updateProductQuantity} className="input px-4 border-color" />
											<label className="label text-gray-400" htmlFor="quantity">Quantity</label>
										</div>
									</div>
									<div className="second relative h-36">
										<textarea type="text" id="description" name="description" placeholder=" " autoComplete="off" defaultValue={updateProductDescription} className="area resize-none input px-4 border-color pt-4" rows="20"></textarea>
										
										<label className="label text-gray-400" htmlFor="description">Description</label>
									</div>
								</div>
								
								<div className="w-full my-8 border-[3px] border-color rounded">
									<div className="w-full h-1/2 border-b-[3px] border-color overflow-y-scroll">
										<p className="italic text-gray-400 mt-1 ml-2 flex text-sm justify-between pr-1">Selected tags appears here...<AiOutlineReload className="font-bold cursor-pointer text-lg mt-1 hover:text-gray-600 hover:shadow" onClick={()=>{setSelectedTags([]); setFiltredTags(tags);}} /></p>
										<div className="mb-2 w-full h-1/2 p-2 border-b-[10px] border-white">
											<div className="flex flex-wrap">
												{selectedTags.map((tag) => (
													<div key={tag.id} className="flex cursor-pointer justify-between items-center py-2 px-2 text-indigo-900 font-semibold mb-2 mr-2 hover:bg-indigo-300 bg-indigo-200 rounded">
														<AiOutlineTag className="mr-1"/>
														<p className="">{tag.name}</p>
														<MdClose onClick={()=>{setFiltredTags([...filtredTags, tag]); handleSelectedTagDelete(tag.name);}} className="text-sm w-3 h-full"/>		
													</div>							
												))}
											</div>
										</div>	
									</div>
									<div className="w-full overflow-y-scroll h-1/2 p-2 border-b-[10px] border-white">
										<div className="flex flex-wrap">
											{filtredTags.map((tag) => (
												<div key={tag.id} onClick={() => {handleTagDelete(tag.name); handleTagPush(tag);}} className="flex cursor-pointer justify-between items-center py-2 px-2 text-stone-900 font-semibold mb-2 mr-2 hover:bg-stone-300 bg-stone-200 rounded">
													<AiOutlineTag className="mr-1"/>
													<p className="">{tag.name}</p>
													
												</div>							
											))}
										</div>
									</div>
									<div className=""></div>
								</div>
							</div>
							<div className="flex-col w-[38%]">
								<div className="h-72 w-72 mt-12 flex justify-center items-center relative overflow-hidden rounded border-[3px] mx-auto hover:cursor-pointer">
									{ selectedImage === 1 
											? (<div className="w-[95%] cursor-pointer h-[95%] relative flex justify-center items-center rounded" style={{backgroundImage: `url(${imageUrl})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>)
									  : selectedImage === 2
											? (<div className="w-[95%] cursor-pointer h-[95%] relative flex justify-center items-center rounded" style={{backgroundImage: `url(${imageUrl2})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>)
									  : <div></div>							
									}
									{selectedImage === 1 ? (
										<input type="file" className="ml-[-110px] absolute opacity-0 r-0 top-0 bottom-0 cursor-pointer" name="image" onChange={handleUpload} />
									) : <div></div>} 
									{selectedImage === 2 ? (
										<input type="file" className="ml-[-110px] absolute opacity-0 r-0 top-0 bottom-0 cursor-pointer" name="image2" onChange={handleUpload2} />
									) : <div></div>}

								</div>
								<div className="h-20 w-72 mx-auto mt-3 flex justify-center gap-3">
									<div onClick={()=> setSelectedImage(1)} className={`cursor-pointer w-16 h-16 border-[3px] border-color rounded flex justify-center items-center ${selectedImage === 1 ? 'border-gray-400' : ''}`}>
										<div className="w-[90%] cursor-pointer h-[90%] relative rounded" style={{backgroundImage: `url(${imageUrl})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>								
									</div>
									<div onClick={()=> setSelectedImage(2)} className={`cursor-pointer w-16 h-16 border-[3px] border-color rounded flex justify-center items-center ${selectedImage === 2 ? 'border-gray-400' : ''}`}>
										<div className="w-[90%] cursor-pointer h-[90%] relative rounded" style={{backgroundImage: `url(${imageUrl2})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>								
									</div>
								</div>
							</div>
						</div>
						<div className="w-full border-t-[3px] border-color flex justify-between items-center h-[13%]">
							<div></div>
							<div className="flex">
								<input type="reset" className="py-2 text-stone-900 font-bold shadow cursor-pointer px-6 hover:bg-stone-300 bg-stone-200 m-4 rounded" />
								<button type="submit" className="hover:bg-indigo-900 text-white font-bold shadow bg-indigo-800 m-4 mr-6 rounded">
									<p className="py-2 cursor-pointer px-4">Submit</p>
								</button>
							</div>
						</div>		
					</form>
					
						
					
					
				</div>
				
			</div>
		</div>
	)
}

export default UpdateModal;
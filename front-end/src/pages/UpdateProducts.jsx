import React, { useState, useEffect} from 'react'
import { Header } from '../components'

import { Link, NavLink, useNavigate, useParams }  from 'react-router-dom';

import { MdClose } from 'react-icons/md'
import { AiOutlineTag, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
 

const UpdateProducts = () => {

	const history = useNavigate();
	const { id } = useParams();
	
	const [products, setProducts] = useState([]);
	



  	const [selectedImage, setSelectedImage] = useState(1);
  	
  	const defaultImage = "https://epay.slcc.edu/C20011_ustores/web/images/product-default-image.png";
  	
  	const optionss = [
		{
			title: "Color",
			values: ["White", "Black", "Red"]
		},
		{
			title: "Size",
			values: ["S", "M", "L", "XL"]
		},
		{
			title: "Material",
			values: ["Metalic", "Plastic", "Selicon"]
		},
	];

	const [options, setOptions] = useState([]);

	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);

	const [optionTitle, setOptionTitle] = useState("Color");
	const [optionValues, setOptionValues] = useState(null);

	
	const [multiOptions, setMultiOptions] = useState(false);
	
	const [imageUrl, setImageUrl] = useState(defaultImage);
	const [imageUrl2, setImageUrl2] = useState(defaultImage);

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
				setSelectedImage(2);
			}
		}
	}

	function toggleMultiOptions(){
		 
		if(multiOptions){
			setQuantity(0);
		} 
		else {
			setOptions([]);
			setVariants([]);
			setVarColor('');
			setVarSize('');
			setVarMaterial('');
			setVarQuantity('');
		}
		setMultiOptions(!multiOptions);

	}

	function handleTagDelete(name){
		const selectedTagsCopy = [...selectedTags];
		for(let i=0; i<selectedTagsCopy.length; i++){
			if(selectedTagsCopy[i].name === name){ 
				selectedTagsCopy.splice(i, 1);
				setSelectedTags(selectedTagsCopy);
				break;
			}
		}
	}

	function handleOptionDelete(title){
		const optionsCopy = [...options];
		for(let i=0; i<optionsCopy.length; i++){
			if(optionsCopy[i].title === title){
				optionsCopy.splice(i, 1);
				setOptions(optionsCopy);
				break;
			}
		}
		if(title === "Color") setVarColor(null);
		else if(title === "Size") setVarSize(null);
		else if(title === "Material") setVarMaterial(null);
	}

	function handleOptionPush(){
		
		let opt = {
					title: optionTitle,
					values: optionValues,
				};

		const index = options.findIndex(option => option.title === opt.title);
		if(index !== -1){
			const updated = [...options];
			updated.splice(index, 1);
			setOptions([...updated, opt]);
		}
		else setOptions([...options, opt]);
		
	}


	


	function handleOptionTitle(event){
		event.preventDefault();
		const select = event.target;
		const value = select.value;

		setOptionTitle(value);
	}
	
	function handleOptionValues(event){
		event.preventDefault();
		const input = event.target;
		const value = input.value;

		const arr = value.split(/\s*,\s*/);

		setOptionValues(arr);
	}

	const [updateTags, setUpdateTags] = useState([]);

	function handleTagsToArray(value){

		const arr = value.split(/\s*,\s*/);

		setUpdateTags(arr);


	}





	const [topTitle, setTopTitle] = useState("Untitled");

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [type, setType] = useState("");
	const [brand, setBrand] = useState("");
	const [price, setPrice] = useState(null);
	const [comparePrice, setComparePrice] = useState(null);
	const [margin, setMargin] = useState(null);
	const [quantity, setQuantity] = useState(null);
	const [sku, setSku] = useState("");
	const [barcode, setBarcode] = useState("");
	const [image1, setImage1] = useState(defaultImage);
	const [image2, setImage2] = useState(defaultImage);
	const [tagList, setTagList] = useState("");
	
	const [variants, setVariants] = useState([]);
	const [varQuantity, setVarQuantity] = useState(null);
	const [varColor, setVarColor] = useState(null);
	const [varSize, setVarSize] = useState(null);
	const [varMaterial, setVarMaterial] = useState(null);

	
	const [tagFocus, setTagFocus] = useState(false);
	const [tags, setTags] = useState([]);
	const [filtredTags, setFiltredTags] = useState([]);

	const [types, setTypes] = useState([]);
	const [filtredTypes, setFiltredTypes] = useState([]);

	const [status, setStatus] = useState(null); 

		


	useEffect(() => {
		fetch('http://192.168.0.138:8080/categories/list')
			.then(response => response.json())
			.then(data => setCategories(data));
	}, []);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/types/list')
			.then(response => response.json())
			.then(data => {setTypes(data); setFiltredTypes(data);});
	}, []);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/brands/list')
			.then(response => response.json())
			.then(data => {setBrands(data);});
	}, []);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/tags/list')
			.then(response => response.json())
			.then(data => {setTags(data); setFiltredTags(data)});
	}, []);


	useEffect(() => {
		multiOptions ? setQuantity(0) : null;
	}, [multiOptions]);




	

	const handleTitleChange = (event) => {
		if(event.target.value === "") setTopTitle("Untitled");
		else{
			setTitle(event.target.value);
			setTopTitle(event.target.value);
		}
	}

	const handleDescriptionChange = (event) => {
		setDescription(event.target.value);
	}

	const handleCategoryChange = (event) => {
		setCategory(event.target.value);

		if(event.target.value === "None") setFiltredTypes(types);
		else {
			let c = null;
			categories.map(ct => {
				if(ct.name === event.target.value){
					c = ct.id;
				}
			});

  			const filtred = types.filter((type) => type.category_id === c);
  			setFiltredTypes(filtred);
  		}

	}

	const handleTypeChange = (event) => {
		setType(event.target.value);
	}

	const handleCompareChange = (event) => {
		setComparePrice(event.target.value);
	}

	const handleMarginChange = (event) => {
		setMargin(event.target.value);
	}

	const handleSkuChange = (event) => {
		setSku(event.target.value);
	}

	const handleBarcodeChange = (event) => {
		setBarcode(event.target.value);
	}

	const handlePriceChange = (event) => {
		setPrice(event.target.value);
	}

	const handleQuantityChange = (event) => {
		setQuantity(event.target.value);
	}

	const handleBrandChange = (event) => {
		setBrand(event.target.value);
	}

	function handleTagSearch(query) {
  		const filtred = tags.filter((tag) => tag.name.toLowerCase().includes(query.toLowerCase()));
 		setFiltredTags(filtred);
  	}

  	useEffect(() => {
		fetch(`http://192.168.0.138:8080/products/list/${id}`)
			.then(response => response.json())
			.then(data => {
				
				setTitle(data.name);
				setDescription(data.description);
				setPrice(data.price);
				setComparePrice(data.comparePrice);
				setMargin(data.margin);
				setSku(data.sku);
				setBarcode(data.barcode);
				setQuantity(data.quantity);
				setCategory(data.category);
				setType(data.type);
				setBrand(data.brand);
				setImageUrl(data.image_url);
				setImageUrl2(data.image_url2);
				setStatus(data.status);
				handleTagsToArray(data.tags);

			});

		
	}, []);

  	function handleTagPush(tag){
		
		const index = selectedTags.findIndex(selectedTag => selectedTag.id === tag.id);
		if(index !== -1){
			
		}
		else {
			setSelectedTags([...selectedTags, tag]);

		}
	}

	function handleVariantPush(){
		const variant = {
					quantity: varQuantity,
					color: varColor,
					size: varSize,
					material: varMaterial
				};


		setVariants([...variants, variant]);

		console.log(quantity);
		
		setQuantity(parseInt(varQuantity)+parseInt(quantity));
		console.log(quantity);
	}

	function handleVariantDelete(i){
		setQuantity(parseInt(quantity)-parseInt(variants[i].quantity));
		const filtred = [...variants];
		
		filtred.splice(i, 1);
		setVariants(filtred);
	}

	const handleVarOptionChange = (event) => {
		
		if(event.target.id === "Quantity") setVarQuantity(event.target.value);
		else if(event.target.id === "Color") setVarColor(event.target.value);
		else if(event.target.id === "Size") setVarSize(event.target.value);
		else if(event.target.id === "Material") setVarMaterial(event.target.value);
	}

	function updateProduct() {

		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		const tagNames = selectedTags.map(tag => tag.name).join(", ");

		formData.set('id', id);
		formData.set('name', title);
		formData.set('brand', brand);
		formData.set('category', category);
		formData.set('price', price);
		formData.set('quantity', quantity);
		formData.set('description', description);
		formData.set('image_url', imageUrl);
		formData.set('image_url2', imageUrl2);
		formData.set('tags', tagNames);
		formData.set('type', type);
		formData.set('comparePrice', comparePrice);
		formData.set('margin', margin);
		formData.set('sku', sku);
		formData.set('barcode', barcode);
		formData.set('status', status);

		

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

		history('/products');
	}


	
	return (

	  <div className="max-w-[1400px] m-auto ">
      	
      	<div className="px-8 ml-2 flex justify-between">
			<Header category="Management / Products" title="Update product"/>
			<form onSubmit={updateProduct} className="flex gap-4 my-8 mr-4">
      			<div onClick={()=>{history('/products');}} className="rounded-lg border-1 border-color shadow-sm hover:shadow cursor-pointer text-sm bg-white hover:bg-gray-100 font-bold px-5 py-2 pt-2.5">Cancel</div>   
   				<button type="submit" className="rounded-lg border-1 border-color shadow-sm hover:shadow cursor-pointer text-sm bg-violet-200 hover:bg-violet-300 font-bold px-6 py-2 pt-2.5">Save</button>
      		</form>
		</div>

		<div className="flex mr-8">
			<div className="flex-col w-[68%] pl-5">
			  <div className="mr-4 ml-8 border-1 border-color rounded-xl overflow-hidden box mb-16">
				<div className="flex">
					<div className="bg-white w-full p-5">
						
						<div className="flex">
							<div className="w-1/2 mt-6 ml-8">
								<label>
									<h3 className="">Title</h3>
									<input type="text" value={title} onChange={handleTitleChange} className="w-full text-gray-700 outline-0 block border-1 border-color shadow focus:outline-1 focus:outline-indigo-300 rounded py-2 px-3" placeholder="ex. Logitech G102 LightSync."/>
								</label>
								
								<h3 className="mt-6">Description</h3>
								<textarea type="text" value={description} onChange={handleDescriptionChange} name="description" placeholder=" " autoComplete="off" className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 p-3 h-48 resize-none w-full border-1 border-color rounded"></textarea>
							</div>

							<div className="w-1/2 pt-8 pl-10 flex-col justify-center items-center">
								<div className="shadow h-60 w-60 relative mb-3 border-1 border-color rounded flex justify-center items-center mx-auto">
									{ selectedImage === 1 
											? (<div className="w-[95%] cursor-pointer h-[95%] relative flex justify-center items-center rounded" style={{backgroundImage: `url(${imageUrl})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>)
									  : selectedImage === 2
											? (<div className="w-[95%] cursor-pointer h-[95%] relative flex justify-center items-center rounded" style={{backgroundImage: `url(${imageUrl2})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>)
									  : <div></div>							
									}
									{selectedImage === 1 ? (
										<input type="file" className="opacity-0 absolute left-0 w-full top-0 bottom-0 cursor-pointer" name="image" onChange={handleUpload} />
									) : <div></div>} 
									{selectedImage === 2 ? (
										<input type="file" className="opacity-0 absolute left-0 w-full top-0 bottom-0 cursor-pointer" name="image2" onChange={handleUpload2} />
									) : <div></div>}
									
								</div>
								<div className="flex gap-3 justify-center">
									<div onClick={()=> setSelectedImage(1)} className={`shadow flex ml-1 justify-center items-center border-2 mb-3 border-color rounded w-16 h-16 cursor-pointer ${selectedImage === 1 ? 'border-gray-400' : ''}`}>
										<div className="w-[90%] cursor-pointer h-[90%] relative rounded" style={{backgroundImage: `url(${imageUrl})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
									</div>
									<div onClick={()=> setSelectedImage(2)} className={`shadow flex justify-center items-center border-2 mb-3 border-color rounded w-16 h-16 cursor-pointer ${selectedImage === 2 ? 'border-gray-400' : ''}`}>
										<div className="w-[90%] cursor-pointer h-[90%] relative rounded" style={{backgroundImage: `url(${imageUrl2})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
									</div>
								</div>
							</div>
						</div>
					</div>	
				</div>

				<div className="flex">
					<div className="bg-white w-full border-t-1 border-color p-8">
						<h3 className="font-bold text-lg">Pricing</h3>
						<div className="flex mt-6 px-2 gap-8 mb-6">
							<label className="w-1/2">
								<h3 className="">Price</h3>
								<input type="number" value={price} onChange={handlePriceChange} step="0.01" className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full outline-0 block border-1 border-color rounded py-2 px-3" placeholder="0"/>
								<p className="italic mb text-gray-400 text-sm mt-2">The price your customers will see.</p>
							</label>
							<label className="w-1/2">
								<h3 className="">Compare at price</h3>
								<input type="number" value={comparePrice} onChange={handleCompareChange} step="0.01" className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full outline-0 block border-1 border-color rounded py-2 px-3" placeholder="0"/>
								<p className="italic mb text-gray-400 text-sm mt-2">The original price before discount.</p>
							</label>							
						</div>
						<div className="flex gap-10">
							<label className="w-1/2 mb-6">
								<h3 className="mx-2">Profit Margin</h3>
								<input type="number" value={margin} onChange={handleMarginChange} step="0.01" className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 ml-2 w-full outline-0 block border-1 border-color rounded py-2 px-3" placeholder="0"/>

							</label>
							<div className="w-1/2 flex items-center">
								<input id="checkbox" type="checkbox" className="shadow ml-2 mr-2 w-4 h-4 cursor-pointer"/>
								<label className="mt-1 cursor-pointer" htmlFor="checkbox">Charge tax on this product.</label>
							</div>
						</div>
					</div>	
				</div>

				<div className="flex">
					<div className="bg-white w-full border-t-1 border-color p-8">
						<h3 className="font-bold text-lg">Inventory</h3>
						<div className="flex px-2 mt-6 gap-6 mb-4 ">
							<label className="w-1/3">
								<h3 className="">SKU (Stock Keeping Unit)</h3>
								<input type="text" value={sku} onChange={handleSkuChange} step="0.01" className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full outline-0 block border-1 border-color rounded py-2 px-3" placeholder="ex. LOG-G102-LS"/>
							</label>
							<label className="w-1/3">
								<h3 className="">Barcode (ISBN, UPC...)</h3>
								<input type="text" value={barcode} onChange={handleBarcodeChange} step="0.01" className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full outline-0 block border-1 border-color rounded py-2 px-3" placeholder="ex. 097855149317"/>
							</label>
							<label className="w-1/3">
								<h3 className="">Quantity</h3>
								{ multiOptions ? (<input type="number" disabled value={quantity} onChange={handleQuantityChange} className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full outline-0 block border-1 border-color rounded py-2 px-3" placeholder="0"/>) :
								(<input type="number" value={quantity} onChange={handleQuantityChange} className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full outline-0 block border-1 border-color rounded py-2 px-3" placeholder="0"/>)}
							</label>							
						</div>
						<div className="ml-2 mt-4">
							<div className="flex w-1/2 items-center">
								<input id="keepbox" type="checkbox" className="shadow ml-2 mr-2 w-4 h-4 cursor-pointer"/>
								<label className="mt-1 cursor-pointer" htmlFor="keepbox">Keep selling when out of stock.</label>
							</div>
							<div className="flex mt-4 mb-2 items-center ">
								<input id="varbox" onChange={toggleMultiOptions} type="checkbox" className="shadow ml-2 mr-2 w-4 h-4 cursor-pointer"/>
								<label className="mt-1 cursor-pointer" htmlFor="varbox">This product have multiple variants.</label>
							</div>
						</div>


						{ multiOptions ? (
							<div className="flex-col pb-4 mt-4 ml-2 gap-8 pt-5">
								<div className="flex-col">
									<h3 className="font-bold ml-2 mb-4 text-sm">Options</h3>
									<div className="mb-3 flex gap-8 px-8">
										<label className="w-1/3">
											<select onChange={handleOptionTitle} className=" w-full bg-main-bg h-11 px-2 rounded outline-0 cursor-pointer border-1 border-color">
												<option value="Color">Color</option>
												<option value="Size">Size</option>
												<option value="Material">Material</option>
											</select>
										</label>
										<div  className="w-1/3">
											<label>
												<input type="text" onChange={handleOptionValues} className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full h-11 outline-0 block border-1 border-color rounded py-2 px-3" placeholder="Values"/>
											</label>
											<p className="italic mb text-gray-400 text-sm mt-1">Values seperated by a commma.</p>
										</div>

										<div className="w-1/3">
											<div onClick={handleOptionPush} className="w-[65%] mt-0.5 cursor-pointer shadow bg-main-bg mx-auto border-1 border-color rounded flex justify-center items-center py-2">
												<h3 className="">Add option</h3>
											</div>
										</div>
									</div>
									<div className="mx-8 flex flex-wrap">
										{options.map((option) => (
											<div className="m-1 px-2 h-8 bg-stone-100 border-1 border-color cursor-pointer text-sm font-semibold flex justify-center items-center rounded">{option.title}<MdClose onClick={() => {handleOptionDelete(option.title);}} className="ml-2 text-lg"/></div>
										))}
									</div>
									
									{options.length > 0 ?( <div>
										<div className="w-full border-t-1 border-color mt-5"></div>
										<h3 className="font-bold ml-2 mt-5 mb-5 text-sm">Variants</h3>
										<div className="mb-3 flex items-center gap-4 px-8">
											{options.map((option) => (
												<label className="w-1/2">
													<h3 className="">{option.title}</h3>
													<select id={option.title} onChange={handleVarOptionChange} className=" w-full bg-main-bg h-11 px-2 rounded outline-0 cursor-pointer border-1 border-color">
														{option.title === "Color" ? (
																<option>Color</option>
															) : option.title === "Size" ? (
																	<option>Size</option>
																) : option.title === "Material" ? (
																		<option>Material</option>
																	) : ( <option>select</option> )}
														
														{option.values.map((value, i) => (
															<option value={value}>{value}</option>
														))}													
													</select>
												</label>
											))}
											
											<label className="w-1/2">
												<h3 className="">Quantity</h3>
												<input type="number" id="Quantity" onChange={handleVarOptionChange} className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full h-11 outline-0 block border-1 border-color rounded py-2 px-3" placeholder="0"/>
											</label>
											<div className="w-1/2">
												<div onClick={handleOptionPush} className="mt-6 cursor-pointer shadow bg-main-bg mx-auto border-1 border-color rounded flex justify-center items-center py-2">
													<h3 onClick={handleVariantPush} className="">Add Variant</h3>
												</div>
											</div>	
										</div>
										<div className="w-full mt-10">
											{variants.map((v, i) => (
												<div className="border-1 border-color shadow-sm h-[70px] bg-main-bg pl-6 pr-4 w-5/6 mx-auto relative flex items-center mb-4 rounded-lg" >
													<div className="w-1/4">
														<p className="text-gray-500 mt-1">Color</p>
														<p className="font-bold">{v.color}</p>
													</div>
													<div className="w-1/4">
														<p className="text-gray-500 mt-1">Size</p>
														<p className="font-bold">{v.size}</p>
													</div>
													<div className="w-1/4">
														<p className="text-gray-500 mt-1">Material</p>
														<p className="font-bold">{v.material}</p>
													</div>
													<div className="w-1/4">
														<p className="text-gray-500 mt-1">Quantity</p>
														<p className="font-bold">{v.quantity}</p>
													</div>
													<div className="flex gap-2 ml-4">
														<div className="">
															<button className="mt-3"><AiOutlineDelete onClick={() => handleVariantDelete(i)} className="text-2xl text-gray-400 hover:text-rose-500"/></button>
														</div>
													</div>	
												</div>
											))}
										</div>
									</div>) : (<div></div>)}

								</div>
										
							</div>
						) : (
							<div></div>
						)}
						




						
					</div>	
				</div>
			  </div>
			</div>



			<div className="w-[32%]">
				<div className="flex-col mb-6 box bg-white border-1 border-color rounded-xl">
					<div className="border-b-1 border-bg-main-bg p-4">
						<p className="font-bold text-lg mt-4 mx-3">Organizing</p>
						<div className="mx-5 mt-6">
							Category
								<label className="w-1/5">
									<select value={category} onChange={handleCategoryChange} className="shadow w-full bg-main-bg h-11 px-2 rounded outline-0 cursor-pointer border-1 border-color">
										<option value="None" >None</option>
										{categories.map((ct) => (
											<option value={ct.name}>{ct.name}</option>							
										))}
									</select>
								</label>
						</div>
						<div className="mx-5 mt-4">
							Type
								<label className="w-1/5">
									<select value={type} onChange={handleTypeChange} className="shadow w-full bg-main-bg h-11 px-2 rounded outline-0 cursor-pointer border-1 border-color">
										<option value="None">None</option>
										{filtredTypes.map((type) => (
											<option value={type.name}>{type.name}</option>							
										))}
									</select>
								</label>
						</div>
						<div className="mx-5 mt-4 mb-4">
							Brand
								<label className="w-1/5">
									<select value={brand} onChange={handleBrandChange} className="shadow w-full bg-main-bg h-11 px-2 rounded outline-0 cursor-pointer border-1 border-color">
										<option>None</option>
										{brands.map((br) => (
											<option value={br.name}>{br.name}</option>							
										))}
									</select>
								</label>
						</div>
					</div>
					<div className="p-4">
						<p className="font-bold text-lg mt-2 mx-3">Collections</p>
						<div className="mx-5 mt-4">
							<label>
								<input type="text" className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full outline-0 block border-1 border-color rounded py-2 px-3" placeholder="Search for collections."/>
							</label>
							<p className="italic mb text-gray-400 text-sm mt-2">Add your products to collections so it's easy to find.</p>
							<div className="mt-4 flex flex-wrap">
								
							</div>
						</div>
					</div>
					<div className="p-4 border-t-1 border-color">
						<p className="font-bold text-lg mt-2 mx-3">Tags</p>
						<div className="mx-5 mb-4 mt-4 relative">
							<p className="italic mb text-gray-400 text-sm mt-2">Add tags to your products so it's easy to find.</p>
							<label>
								<input type="text" onFocus={() => setTagFocus(true)} onChange={(e) => handleTagSearch(e.target.value)} className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full outline-0 block border-1 border-color rounded py-2 px-3" placeholder="Search for tags."/>
							</label>

							{tagFocus && <div className="absolute bg-white rounded-lg border-1 border-color shadow px-4 py-4 h-40 w-full overflow-y-scroll mt-1 flex flex-wrap">
								{filtredTags.map((tag) => (
									<div key={tag.id} onClick={() => {handleTagPush(tag); setTagFocus(false);} } className="m-1 px-2 h-8 bg-green-200 hover:bg-green-300 text-gray-900 shadow-sm cursor-pointer text-sm font-semibold flex justify-center items-center rounded"><AiOutlineTag className="mr-1"/> {tag.name}</div>
								))}
								<MdClose onClick={() => setTagFocus(false)} className="absolute cursor-pointer hover:text-rose-500 mt-3 mr-1 top-0 right-0" />
							</div>}

							<div className="w-full mb-1 mt-2 flex flex-wrap">
								{updateTags.map((tag) => (
									<div key={tag} className="m-1 px-2 h-8 bg-green-200 hover:bg-green-300 text-gray-900 shadow-sm cursor-pointer text-sm font-semibold flex justify-center items-center rounded"><AiOutlineTag className="mr-1"/> {tag} <MdClose className="ml-2"/></div>
								))}
							</div>

						</div>
					</div>
				</div>
			</div>

		 </div>
		</div>
	)
}

export default UpdateProducts;
import React, { useState, useEffect} from 'react'
import { Header } from '../components'

import { Link, NavLink, useNavigate }  from 'react-router-dom';

import { MdClose } from 'react-icons/md'
import { AiOutlineTag, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
 

const AddCatalog = () => {

	const history = useNavigate();

  	const [selectedImage, setSelectedImage] = useState(1);
  	
  	const defaultImage = "https://epay.slcc.edu/C20011_ustores/web/images/product-default-image.png";
  

	const [options, setOptions] = useState([]);

	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);
	const [selectedTags, setSelectedTags] = useState([]);

	const [optionTitle, setOptionTitle] = useState("Color");
	const [optionValues, setOptionValues] = useState(null);

	
	const [multiOptions, setMultiOptions] = useState(false);
	
	const [imageUrl, setImageUrl] = useState(defaultImage);
	const [imageUrl2, setImageUrl2] = useState(defaultImage);

	const user = JSON.parse(localStorage.getItem('user'));

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
			setVarSku('');
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
	const [varSku, setVarSku] = useState('');
	const [varColor, setVarColor] = useState(null);
	const [varSize, setVarSize] = useState(null);
	const [varMaterial, setVarMaterial] = useState(null);

	
	const [tagFocus, setTagFocus] = useState(false);
	const [tags, setTags] = useState([]);
	const [filtredTags, setFiltredTags] = useState([]);

	const [types, setTypes] = useState([]);
	const [filtredTypes, setFiltredTypes] = useState([]);

		


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

  	const mockTags = [
  		{
  			id: 1,
  			name: "gaming",
  		},
  		{
  			id: 2,
  			name: "rgb",
  		},
  	];

  	function handleTagPush(tag){
		
		const index = selectedTags.findIndex(selectedTag => selectedTag.id === tag.id);
		if(index !== -1){
			
		}
		else {
			setSelectedTags([...selectedTags, tag]);

		}
	}

	
	function saveProduct() {

		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		formData.set('idsup', user.id);

		formData.set('image_url', imageUrl);
		formData.set('image_url2', imageUrl2);
		

		
	


		

		fetch('http://192.168.0.138:8080/catalog/add', {
			method: 'POST',
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

	  <form onSubmit={saveProduct}  className="max-w-[1400px] m-auto ">
      	
      	<div className="px-8 ml-2 flex justify-between">
			<Header category="Supplier / Products" title="Add a new product"/>
			<div className="flex gap-4 my-8 mr-4">
      			<div onClick={() => {history('/products');}} className="rounded-lg border-1 border-color shadow-sm hover:shadow cursor-pointer text-lg bg-white hover:bg-main-bg font-bold px-5 py-2 pt-2.5">Cancel</div>   
   				<button type="submit" className="rounded-lg shadow-sm border-1 border-color hover:shadow cursor-pointer text-lg text-white bg-violet-500 hover:bg-violet-600 font-bold px-6 w-32 py-2 pt-2.5">Save</button>
      		</div>
		</div>

		<div className="flex mr-8">
			<div className="flex-col w-full pl-5">
			  <div className="mr-4 ml-8 box rounded-xl overflow-hidden mb-16">
				<div className="flex">
					<div className="bg-white w-full p-5">
						
						<div className="flex">
							<div className="w-1/2 mt-6 ml-8">
								<label>
									<h3 className="">Title</h3>
									<input type="text" name="name" className="w-full text-gray-700 outline-0 block border-1 border-color shadow focus:outline-1 focus:outline-indigo-300 rounded py-2 px-3" placeholder="Product's title"/>
								</label>
								
								<h3 className="mt-6">Description</h3>
								<textarea type="text" name="description" autoComplete="off" className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 p-3 h-48 resize-none w-full border-1 border-color rounded" placeholder="Describe your product."></textarea>
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
									<div onClick={() => setSelectedImage(1)} className={`shadow flex ml-1 justify-center items-center border-2 mb-3 border-color rounded w-16 h-16 cursor-pointer ${selectedImage === 1 ? 'border-gray-400' : ''}`}>
										<div className="w-[90%] cursor-pointer h-[90%] relative rounded" style={{backgroundImage: `url(${imageUrl})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
									</div>
									<div onClick={() => setSelectedImage(2)} className={`shadow flex justify-center items-center border-2 mb-3 border-color rounded w-16 h-16 cursor-pointer ${selectedImage === 2 ? 'border-gray-400' : ''}`}>
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
							<label className="w-1/3">
								<h3 className="">Price</h3>
								<input type="number" name="price" step="0.01" className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full outline-0 block border-1 border-color rounded py-2 px-3" placeholder="0"/>
								<p className="italic mb text-gray-400 text-sm mt-2">The price your customers will see.</p>
							</label>
							<label className="w-1/3">
								<h3 className="">Applied Tax (%)</h3>
								<input type="number" name="tax" step="0.01" className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full outline-0 block border-1 border-color rounded py-2 px-3" placeholder="0"/>
							</label>							
						</div>
						<div className="flex gap-10">
						
						</div>
					</div>	
				</div>

				<div className="flex">
					<div className="bg-white w-full border-t-1 border-color p-8">
						<h3 className="font-bold text-lg">Organizing</h3>
						<div className="flex px-2 mt-6 gap-6 mb-4 ">
							<label className="w-1/3">
								<h3 className="">Brand</h3>
								<input type="text" name="brand" className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full outline-0 block border-1 border-color rounded py-2 px-3" placeholder="Brand or Manufacturer"/>
							</label>							
							<label className="w-1/3">
								<h3 className="">SKU (Stock Keeping Unit)</h3>
								<input type="text" name="sku" step="0.01" className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full outline-0 block border-1 border-color rounded py-2 px-3" placeholder="ex. LOG-G102-LS"/>
							</label>
							<label className="w-1/3">
								<h3 className="">Barcode</h3>
								<input type="text" name="barcode" step="0.01" className="text-gray-700 shadow focus:outline-1 focus:outline-indigo-300 w-full outline-0 block border-1 border-color rounded py-2 px-3" placeholder="ex. 097855149317"/>
							</label>
						</div>
						


						
					</div>	
				</div>
			  </div>
			</div>



			

		 </div>
		</form>
	)
}

export default AddCatalog;
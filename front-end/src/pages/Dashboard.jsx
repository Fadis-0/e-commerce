import React, { useState, useEffect} from 'react'
import { Header, Table, Utilitybar, CatgoriesForm, Modal } from '../components'

import { Link, NavLink }  from 'react-router-dom';

import { TbGps, TbFileExport, TbPlus, TbBuildingWarehouse, TbDotsVertical } from 'react-icons/tb'
import { FiMinusSquare, FiEdit2, FiDollarSign, FiBox, FiFilter, FiAlertTriangle } from 'react-icons/fi'
import { AiOutlineUnorderedList, AiOutlineBook, AiOutlineTag, AiOutlineFileDone, AiOutlineShoppingCart, AiOutlineEdit, AiOutlineStar, AiFillStar, AiOutlineTags, AiOutlineDelete, AiFillCaretDown, AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineDone, MdOutlineLocalShipping, MdClose, MdOutlineCategory, MdOutlineLocationOn, MdOutlinePeopleAlt, MdOutlineInventory, MdAccessTime } from 'react-icons/md'
import { BiDollarCircle, BiBookAdd } from 'react-icons/bi';
import { GiCargoCrate } from 'react-icons/gi';
import { HiOutlineEye } from 'react-icons/hi'
import { RiAddBoxLine } from 'react-icons/ri'



import { useStateContext } from '../contexts/ContextProvider';

 
const Dashboard = () => {

	const { updateProductName, setUpdateProductName, updateProductBrand, setUpdateProductBrand, updateProductCategory, setUpdateProductCategory, updateProductPrice, setUpdateProductPrice, updateProductQuantity, setUpdateProductQuantity, updateProductDescription, setUpdateProductDescription, products, setProducts, filtredProducts, setFiltredProducts, updateProductsData, isClicked, setIsClicked, handleClick, activeUtilityMenu, setActiveUtilityMenu, activeCategotiesForm, setActiveCategotiesForm, categoryImage, setCategoryImage, categoryName, setCategoryName, updateImage, setUpdateImage, updateImage2, setUpdateImage2, isOpenModal, setIsOpenModal, isOpenUpdateModal, setIsOpenUpdateModal} = useStateContext();
  	
  const utilitybarClass = activeUtilityMenu ? "utilitybar--wide" : "utilitybar--short";
  const categotiesFormClass  = activeCategotiesForm ? "utilitybar--wide" : "utilitybar--short";

  const [isActiveModal, setIsActiveModal] = useState(true);

  const [brands, setBrands] = useState([]);
  const [filtredBrands, setFiltredBrands] = useState([]);

  const [tags, setTags] = useState([]);
  const [filtredTags, setFiltredTags] = useState([]);

  const [types, setTypes] = useState([]);
  const [filtredTypes, setFiltredTypes] = useState([]);

	const [categories, setCategories] = useState([]);
  const [filtredCategories, setFiltredCategories] = useState([]);

	const [selectedProduct, setSelectedProduct] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const [variants, setVariants] = useState([]);


	function updateCategoriesData(){
		fetch('http://192.168.0.138:8080/categories/list')
			.then(response => response.json())
			.then(data => {setCategories(data); setFiltredCategories(data)});	

	}

	function updateBrandsData(){
		fetch('http://192.168.0.138:8080/brands/list')
			.then(response => response.json())
			.then(data => {setBrands(data); setFiltredBrands(data);});
	}

	function updateTagsData(){
		fetch('http://192.168.0.138:8080/tags/list')
			.then(response => response.json())
			.then(data => {setTags(data); setFiltredTags(data);});	
		
	}

	function updateTypesData(){
		
		fetch('http://192.168.0.138:8080/types/list')
			.then(response => response.json())
			.then(data => {setTypes(data); setFiltredTypes(data);});

	}


	function updateData(){
		
		fetch('http://192.168.0.138:8080/products/list')
			.then(response => response.json())
			.then(data => {
				const sorted = data.sort((a, b) => {
					const nameA = a.name.toUpperCase();
					const nameB = b.name.toUpperCase();

					if(nameA < nameB) return -1;
					if(nameA > nameB) return 1;
					return 0;

				});

				setProducts(data);
				setFiltredProducts(data);
			});

	}

	useEffect(() => {
		fetch('http://192.168.0.138:8080/products/list')
			.then(response => response.json())
			.then(data => {
				const sorted = data.sort((a, b) => {
					const nameA = a.name.toUpperCase();
					const nameB = b.name.toUpperCase();

					if(nameA < nameB) return -1;
					if(nameA > nameB) return 1;
					return 0;

				});

				setProducts(data);
				setFiltredProducts(data);
			});
	}, []);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/variants/list')
			.then(response => response.json())
			.then(data => {setVariants(data);});



	}, []);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/categories/list')
			.then(response => response.json())
			.then(data => {setCategories(data); setFiltredCategories(data)});
	}, []);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/brands/list')
			.then(response => response.json())
			.then(data => {setBrands(data); setFiltredBrands(data);});
	}, []);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/tags/list')
			.then(response => response.json())
			.then(data => {setTags(data); setFiltredTags(data);});
	}, []);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/types/list')
			.then(response => response.json())
			.then(data => {setTypes(data); setFiltredTypes(data);});
	}, []);


	function handleCategoryClick(category){
		setSelectedCategory(null);
		setSelectedCategory(category);
		setCategoryName(category.name);
		setCategoryImage(category.image_url);
		setActiveUtilityMenu(false);
		
		setActiveCategotiesForm(true);
	}

	function handleProductClick(product){
		setSelectedProduct(product);
		setUpdateImage(product.image_url);
		setUpdateImage2(product.image_url2);
		setActiveCategotiesForm(false);
		setActiveUtilityMenu(true);
	}

  	

  function handleCategoryDelete(id) {
		
		if(window.confirm('Are you sure you want to delete this category?')){
			fetch(`http://192.168.0.138:8080/categories/delete/${id}`, {
				method: 'DELETE',
			})
			.then(response => {
				updateCategoriesData();
				updateTypesData();
				return response;
			});
		}
	}

	function handleTypeDelete(id) {
		
		if(window.confirm('Are you sure you want to delete this type?')){
			fetch(`http://192.168.0.138:8080/types/delete/${id}`, {
				method: 'DELETE',
			})
			.then(response => {
				updateTypesData();
				return response;
			});
		}
	}

	function handleBrandDelete(id) {
		
		if(window.confirm('Are you sure you want to delete this brand?')){
			fetch(`http://192.168.0.138:8080/brands/delete/${id}`, {
				method: 'DELETE',
			})
			.then(response => {
				updateBrandsData();
				return response;
			});
		}
	}

	function handleTagDelete(id) {
		
		if(window.confirm('Are you sure you want to delete this tag?')){
			fetch(`http://192.168.0.138:8080/tags/delete/${id}`, {
				method: 'DELETE',
			})
			.then(response => {
				updateTagsData();
				return response;
			});
		}
	}

	function handleProductDelete(id) {

		if(window.confirm('Are you sure you want to delete this product?')){
			fetch(`http://192.168.0.138:8080/products/delete/${id}`, {
				method: 'DELETE',
			})
			.then(response => {
				updateData();
				return response;
			});
		}

	}

  const total = products.reduce((accumlator, product) => accumlator + product.quantity, 0);

  const [dropDown, setDropDown] = useState(false);

  const handleDropDown = () => {
  	setDropDown(!dropDown);
  }


  function handleFilter(category) {
  	setFiltredProducts(products);
  	const filtred = products.filter((product) => product.category === category);
  	setFiltredProducts(filtred);
  	setDropDown(false);
  }

  function handleSearch(query) {
  	const filtred = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
 		setFiltredProducts(filtred);
  }
	
  function handleCategorySearch(query) {
  	const filtred = categories.filter((category) => category.name.toLowerCase().includes(query.toLowerCase()));
 		setFiltredCategories(filtred);
  }

  function handleTypeSearch(query) {
  	const filtred = types.filter((type) => type.name.toLowerCase().includes(query.toLowerCase()));
 		setFiltredTypes(filtred);
  }

  function handleBrandSearch(query) {
  	const filtred = brands.filter((brand) => brand.name.toLowerCase().includes(query.toLowerCase()));
 		setFiltredBrands(filtred);
  }

  function handleTagSearch(query) {
  	const filtred = tags.filter((tag) => tag.name.toLowerCase().includes(query.toLowerCase()));
 		setFiltredTags(filtred);
  }

  function handleProductUpdate(product){
  	setUpdateProductName(product.name);
  	setUpdateProductBrand(product.brand);
  	setUpdateProductCategory(product.category);
  	setUpdateProductPrice(product.price);
		setUpdateProductQuantity(product.quantity);
		setUpdateProductDescription(product.description);
		//setSelectedTags(product.tags);


  	setIsOpenUpdateModal(true);
  }

  const [addCategory, setAddCategory] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState('');


  function handleAddCategory() {
  	setAddCategory(!addCategory);
  }

  const handleCategoryChange = (event) => {
		setCategoryTitle(event.target.value);
	}

  function saveCategory() {
		const formData = new FormData();
		
		formData.set('name', categoryTitle);
		formData.set('image_url', '');

		fetch('http://192.168.0.138:8080/categories/add', {
			method: 'POST',
			body: formData
		}).then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				else{
					updateCategoriesData();
					setAddCategory(false);
					return response;	
				}
				
			})
			.then(data => {
				// handle success
			});
	}

	const [addType, setAddType] = useState(false);
  const [typeTitle, setTypeTitle] = useState('');
  const [typeCategory, setTypeCategory] = useState('');


  function handleAddType() {
  	setAddType(!addType);
  }

  const handleTypeTitleChange = (event) => {
		setTypeTitle(event.target.value);
	}

	const handleTypeCategoryChange = (event) => {
		setTypeCategory(event.target.value);
	}

  function saveType() {
		const formData = new FormData();
		
		formData.set('name', typeTitle);
		formData.set('category_id', typeCategory);

		fetch('http://192.168.0.138:8080/types/add', {
			method: 'POST',
			body: formData
		}).then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				else{
					updateTypesData();
					setAddType(false);
					console.log(typeTitle);
					console.log(typeCategory);
					return response;	
				}
				
			})
			.then(data => {
				// handle success
			});
	}
	
	
  const [brandTitle, setBrandTitle] = useState('');
	const [addBrand, setAddBrand] = useState(false);

  function handleAddBrand() {
  	setAddBrand(!addBrand);
  }

  const handleBrandChange = (event) => {
		setBrandTitle(event.target.value);
	}

  function saveBrand() {
		const formData = new FormData();
		
		formData.set('name', brandTitle);

		fetch('http://192.168.0.138:8080/brands/add', {
			method: 'POST',
			body: formData
		}).then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				else{
					updateBrandsData();
					setAddBrand(false);
					return response;	
				}
				
			})
			.then(data => {
				// handle success
			});
	}
	

  const [tagTitle, setTagTitle] = useState('');
	const [addTag, setAddTag] = useState(false);

  function handleAddTag() {
  	setAddTag(!addTag);
  }

  const handleTagChange = (event) => {
		setTagTitle(event.target.value);
	}

  function saveTag() {
		const formData = new FormData();
		
		formData.set('name', tagTitle);

		fetch('http://192.168.0.138:8080/tags/add', {
			method: 'POST',
			body: formData
		}).then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				else{
					updateTagsData();
					setAddTag(false);
					return response;	
				}
				
			})
			.then(data => {
				// handle success
			});
	}

	const vs = new Array(products.length);

	function handleActivity(id, active) {
		const changestatus = {
			"id": id,
			"active": active,
			};
			
		fetch(`http://192.168.0.138:8080/products/active/${id}`, {
		  method: 'PUT',
		  headers: {
			'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(changestatus)
		})
		.then(response => {
		  if (response.ok) {
			updateData();
			return response;
		  } else {
			console.log(changestatus, response);
		  }
		})
		.catch(error => {
		  console.error(error);
		});
	  }

	  function handleOpenModal(){
	  	setIsOpenModal(true);
	  }

  return (


	<div className="max-w-[1400px] m-auto">

	  <Modal />			

      <div className="px-8 ml-2">
				<Header category="Management" title="Products"/>
			</div>

			<div className="flex mr-8">

			<div className="flex-col w-[68%]">
				<div className="flex mr-4 ml-8 pl-5">
					<div className="flex items-center box bg-white w-full mr-4 h-32 rounded-xl"> 
						<div className="flex justify-center items-center bg-indigo-200 w-16 h-16 rounded-xl ml-6">
							<FiBox className="text-3xl text-indigo-900"/>
						</div>
						<div className="flex-col ml-4">
							<h2 className="text-2xl mt-1 font-extrabold mb-1">{products.length}</h2>
							<h2 className="">Products</h2>
						</div>
					</div>
					<div className="flex items-center box bg-white w-full h-32 mr-4 rounded-xl">
						<div className="flex justify-center items-center bg-green-200 w-16 h-16 rounded-xl ml-6">
							<MdOutlineCategory className="text-3xl text-green-900"/>
						</div>
						<div className="flex-col ml-4">
							<h2 className="text-2xl mt-1 font-extrabold mb-1">{types.length}</h2>
							<h2 className="">Types</h2>
						</div>
					</div>
					<div className="flex items-center box bg-white w-full h-32 rounded-xl">
						<div className="flex justify-center items-center bg-violet-200 w-16 h-16 rounded-xl ml-6">
							<AiOutlineUnorderedList className="text-3xl text-violet-900"/>
						</div>
						<div className="flex-col ml-4">
							<h2 className="text-2xl mt-1 font-extrabold mb-1">{categories.length}</h2>
							<h2 className="">Categories	</h2>
						</div>
					</div>
				</div>


				<div className="mr-4 mt-4 pl-5 flex h-[672px]">
				<div className="border-b-[28px] ml-8 border-white box bg-white w-full rounded-xl p-10 overflow-y-scroll">
					<div className="flex justify-between items-center">
						<div className="">
							<h2 className="text-2xl font-bold">My Products</h2>
						</div>
						
						<div className="flex gap-5">


							
							<div>
								<button onClick={handleOpenModal} type="button" title="Add" className="w-full h-full flex justify-around items-center font-bold bg-indigo-200 hover:bg-indigo-300 border-1 border-color px-4 py-1.5 rounded shadow-sm hover:shadow"><div className="text-indigo-900">Add from Catalog</div><BiBookAdd className="text-lg ml-2 text-indigo-900"/></button>								
							</div>

							<NavLink to="/products/add" onClick={() => {}} >
								<button type="button" title="Add" className="w-full h-full flex justify-around items-center font-bold bg-green-200 hover:bg-green-300 border-1 border-color px-4 py-1.5 rounded shadow-sm hover:shadow"><div className="text-green-900">Add New</div><RiAddBoxLine className="text-xl ml-2 text-green-900"/></button>								
							</NavLink>

						</div>
					</div>

					<div className="mt-8">
					<div className="flex justify-between mb-7 items-center w-full">
					  <div className="flex items-center gap-3">
						<p className=" mt-1 font-semibold mr-2">Filter By</p> 
						<div className="">
								<label className="">
									<select  className="px-2 shadow-sm bg-white h-10 rounded outline-0 cursor-pointer border-1 border-color">
										<option>Category</option>
										{categories.map((category) => (
											<option>{category.name}</option>				
										))}
									</select>
								</label>
							</div>

							<div className="">
								<label className="">
									<select  className="px-2 shadow-sm bg-white h-10 rounded outline-0 cursor-pointer border-1 border-color">
										<option>Type</option>
										{types.map((type) => (
											<option>{type.name}</option>				
										))}
									</select>
								</label>
							</div>

							

							<div className="">
								<label className="">
									<select  className="px-2 shadow-sm bg-white h-10 rounded outline-0 cursor-pointer border-1 border-color">
										<option>Brand</option>
										{brands.map((brand) => (
											<option>{brand.name}</option>				
										))}
									</select>
								</label>
							</div>
						  </div>
						  <div>
							<div className="w-72 h-full flex items relative"><input onChange={(e) => handleSearch(e.target.value)} type="text" className="rounded bg-stone-100 py-1 px-2 w-full outline-0 mt-1 border-1 border-color" placeholder="Search a product" /><AiOutlineSearch className="absolute right-1.5 top-3 text-xl text-gray-500"/></div>
						  </div>

					</div>
						{filtredProducts.map((product) => (
								<div key={product.id} className="border-1 border-color shadow-sm rounded-lg py-2.5 bg-main-bg pr-4 pl-6 w-full relative flex items-center mb-4 rounded" >
									<div className="">
									<div className="mr-5 w-[35px] h-[35px] rounded" style={{backgroundImage: `url(${product.image_url})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
									</div>
									<div className="flex-col w-5/6">
										<p className="font-bold mt-1">{product.name}</p>
										<p className="text-blue-800 text-sm ">{product.brand}</p>
									</div>

									 <div className=" flex-col w-2/6">
							          {product.active ? (
							          	 <div className="flex items-center gap-10">
							          		<div className="flex items-center gap-1">
							          			<span className="bg-green-500 rounded-full h-1.5 w-1.5" />
							          			<p className="text-green-500 font-bold text-sm ml-1 mt-0.5">Active</p>
							          		</div>
							          		<div className="w-14 h-7 bg-green-300 border-2 border-color rounded-full flex items-center justify-between px-0.5 cursor-pointer hover:bg-green-400" onClick={() => handleActivity(product.id, false)}>
							          			<div></div>
							          			<div className="w-5 h-5 bg-white border-2 border-color rounded-full "></div>
							          	 	</div>
							          	 </div>
							          	) : (
							          	 <div className="flex items-center gap-4">
							          	 	<div className="flex items-center gap-1">
							          			<span className="bg-rose-500 rounded-full h-1.5 w-1.5" />
							          			<p className="text-rose-500 font-bold text-sm mt-0.5">Not Active</p>
							          		</div>
							          		<div className="w-14 h-7 bg-rose-300 border-2 shadow-sm border-color rounded-full flex items-center px-0.5 cursor-pointer hover:bg-rose-400" onClick={() => handleActivity(product.id, true)}>
							          			<div className="w-5 h-5 bg-white border-2 shadow border-color rounded-full "></div>
							          	 	</div>
							          	 </div>
							          	)}
							          
							        </div>
									
							
									
									<div className="flex gap-2 ml-0">
										
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
			 

			<div className="mr-4 mt-4 pl-5 flex h-[530px] mb-2">
			 	<div className="border-b-[30px] ml-8 border-white box bg-white w-full rounded-xl p-10 overflow-y-scroll">
					<div className="flex justify-between items-center">
						<div className="">
							<h2 className="text-2xl font-bold">Collections</h2>
						</div>
						
						
						<div className="flex gap-5">
							<div  onChange={(e) => handleSearch(e.target.value)} className="w-full h-full flex items relative"><input type="text" className="rounded bg-stone-100 py-1 px-2 mt-1 w-44 outline-0 relative" placeholder="Search a product" /><AiOutlineSearch className="absolute right-2 top-2.5 text-xl text-gray-500"/></div>


							
							<NavLink to="/products/add" onClick={() => {}} >
								<button type="button" title="Add" className="w-full h-full flex justify-around items-center font-bold bg-indigo-200 border-1 border-color px-4 py-1.5 rounded shadow-sm hover:shadow"><div className="text-indigo-900">Export</div><TbFileExport className="text-lg ml-2 text-ingigo-900"/></button>								
							</NavLink>

							<NavLink to="/products/add" onClick={() => {}} >
								<button type="button" title="Add" className="w-full h-full flex justify-around items-center font-bold bg-green-200 border-1 border-color px-4 py-1.5 rounded shadow-sm hover:shadow"><div className="text-green-900">Add</div><TbPlus className="text-xl ml-2 text-green-900"/></button>								
							</NavLink>

						</div>
					</div>

					<div className="mt-10">
						
					</div>

				</div>
			 </div>







			 

			<div className="mr-4 mt-4 pl-5 mb-16 flex h-[528px]">
				<div className="border-b-[20px] ml-8 border-white box bg-white w-full rounded-xl p-10 overflow-y-scroll">
					<div className="flex justify-between items-center">
						<div className="">
							<h2 className="text-2xl font-bold">Events</h2>
						</div>
						
						
						<div className="flex gap-5">
							<div  onChange={(e) => handleSearch(e.target.value)} className="w-full h-full flex items relative"><input type="text" className="rounded bg-stone-100 py-1 px-2 mt-1 w-44 outline-0 relative" placeholder="Search a product" /><AiOutlineSearch className="absolute right-2 top-2.5 text-xl text-gray-500"/></div>


							
							<NavLink to="/products/add" onClick={() => {}} >
								<button type="button" title="Add" className="w-full h-full flex justify-around items-center font-bold bg-indigo-200 border-1 border-color px-4 py-1.5 rounded shadow-sm hover:shadow"><div className="text-indigo-900">Export</div><TbFileExport className="text-lg ml-2 text-ingigo-900"/></button>								
							</NavLink>

							<NavLink to="/products/add" onClick={() => {}} >
								<button type="button" title="Add" className="w-full h-full flex justify-around items-center font-bold bg-green-200 border-1 border-color px-4 py-1.5 rounded shadow-sm hover:shadow"><div className="text-green-900">Add</div><TbPlus className="text-xl ml-2 text-green-900"/></button>								
							</NavLink>

						</div>


					</div>

					<div className="mt-10">

					</div>

				</div>	
			 </div>








			</div>



			<div className="flex-col w-[32%] mb-5">
				<div className="border-b-[28px] h-1/4 mb-4 border-white box bg-white rounded-xl p-8 overflow-y-scroll">
					<div className="flex justify-between items-center">
						<div className="">
							<h2 className="text-2xl font-bold">Categories</h2>
						</div>


						
						<div className="flex gap-3">
							<button type="button" onClick={handleAddCategory} title="Add" className="w-full h-full flex justify-around items-center font-bold bg-green-200 border-1 border-color px-4 py-1.5 rounded shadow-sm hover:shadow"><div className="text-green-900">Add</div><TbPlus className="text-xl ml-2 text-green-900"/></button>								
						</div>

					</div>

					{addCategory && <div className="mt-5 w-full flex gap-4">
						<div className="w-full h-10"><input type="text" onChange={handleCategoryChange} className="rounded h-full px-2 outline-0 w-full border-1 border-color shadow-sm" placeholder="Title" /></div>
						<button type="button" onClick={saveCategory} title="Add" className="h-10 flex justify-around items-center font-semibold bg-main-bg border-1 border-color px-4 rounded shadow-sm hover:shadow"><div className="">Save</div></button>									
					</div>}

					<div className="w-full flex-col mt-4 px-1.5">
						<div className="w-full mb-4 h-10 flex items relative"><input type="text" onChange={(e) => handleCategorySearch(e.target.value)} className="rounded bg-stone-100 py-1 px-2 w-full outline-0 relative mt-1 border-1 border-color" placeholder="Search" /><AiOutlineSearch className="absolute right-2 top-2.5 text-xl text-gray-500"/></div>

						{filtredCategories.map((category) => (
							<div className="border-1 border-color shadow-sm h-[54px] bg-main-bg px-4 w-full relative flex items-center mb-3 rounded-lg" >
								<div className="mr-6 ">
									<AiOutlineUnorderedList className="text-xl" />
								</div>
								<div className="flex-col">
									<p className="text-sm font-bold ">{category.name}</p>
								</div>
								<div className="absolute right-3">
										<button className="mt-3"><AiOutlineDelete onClick={() => handleCategoryDelete(category.id)} className="text-xl text-gray-400 hover:text-rose-500"/></button>
									</div>
									<div className="absolute right-10">
										<button className="mt-3"><AiOutlineEdit className="text-xl text-gray-400 hover:text-green-500"/></button>
									</div>
							</div>							
						))}
					</div>

				</div>

				<div className="border-b-[28px] h-1/4 mb-4 border-white box bg-white rounded-xl p-8 overflow-y-scroll">
					<div className="flex justify-between items-center">
						<div className="">
							<h2 className="text-2xl font-bold">Types</h2>
						</div>



						
						<div className="flex gap-3">
							<button type="button" title="Add" onClick={handleAddType} className="w-full h-full flex justify-around items-center font-bold bg-green-200 border-1 border-color px-4 py-1.5 rounded shadow-sm hover:shadow"><div className="text-green-900">Add</div><TbPlus className="text-xl ml-2 text-green-900"/></button>								
						</div>
					</div>

					{addType && <div className="mt-5 w-full flex gap-4">
						<div className="w-1/2 h-10"><input type="text" onChange={handleTypeTitleChange} className="rounded h-full px-2 outline-0 w-full border-1 border-color shadow-sm" placeholder="Title" /></div>
						<select onChange={handleTypeCategoryChange} className="w-1/2 bg-white rounded px-2 h-10 border-1 border-color cursor-pointer outline-0 shadow-sm">
							<option>Category</option>
							{	categories.map((category) => (
									<option value={category.id}>{category.name}</option>
								))
							}
						</select>
						<button type="button" onClick={saveType} title="Add" className="h-10 flex justify-around items-center font-semibold bg-main-bg border-1 border-color px-4 rounded shadow-sm hover:shadow"><div className="">Save</div></button>									
					</div>}

					<div className="w-full flex-col mt-4">
						<div className="w-full mb-4 h-10 flex items relative"><input type="text" onChange={(e) => handleTypeSearch(e.target.value)} className="rounded bg-stone-100 py-1 px-2 w-full outline-0 relative mt-1 border-1 border-color" placeholder="Search" /><AiOutlineSearch className="absolute right-2 top-2.5 text-xl text-gray-500"/></div>


						{filtredTypes.map((type) => (
							<div className="border-1 border-color shadow-sm h-[60px] bg-main-bg px-4 w-full relative flex items-center mb-3 rounded-lg" >
								<div className="mr-6 ">
									<MdOutlineCategory className="text-xl" />
								</div>
								<div className="flex-col mt-1">
									<p className="text-sm font-bold ">{type.name}</p>
									{	categories.map(category => (
											type.category_id === category.id && <p className="text-sm text-indigo-800">{category.name}</p>
										))
									}
								</div>

								<div className="absolute right-3">
										<button className="mt-3"><AiOutlineDelete onClick={() => handleTypeDelete(type.id)} className="text-xl text-gray-400 hover:text-rose-500"/></button>
									</div>
									<div className="absolute right-10">
										<button className="mt-3"><AiOutlineEdit className="text-xl text-gray-400 hover:text-green-500"/></button>
									</div>
							</div>							
						))}
					</div>
				</div>
				
				<div className="border-b-[12px] h-1/4 mb-4 border-white box bg-white rounded-xl p-8 overflow-y-scroll">
					<div className="flex justify-between items-center">
						<div className="">
							<h2 className="text-2xl font-bold">Brands</h2>
						</div>


						
						<div className="flex gap-3">
							<button type="button" title="Add" onClick={handleAddBrand} className="w-full h-full flex justify-around items-center font-bold bg-green-200 border-1 border-color px-4 py-1.5 rounded shadow-sm hover:shadow"><div className="text-green-900">Add</div><TbPlus className="text-xl ml-2 text-green-900"/></button>								
						</div>

					</div>
					{addBrand && <div className="mt-5 w-full flex gap-4">
						<div className="w-full h-10"><input type="text" onChange={handleBrandChange} className="rounded h-full px-2 outline-0 w-full border-1 border-color shadow-sm" placeholder="Title" /></div>
						<button type="button" onClick={saveBrand} title="Add" className="h-10 flex justify-around items-center font-semibold bg-main-bg border-1 border-color px-4 rounded shadow-sm hover:shadow"><div className="">Save</div></button>									
					</div>}
					<div className="w-full flex flex-wrap mt-4">
						<div className="w-full mb-4 h-10 flex items relative"><input type="text" onChange={(e) => handleBrandSearch(e.target.value)} className="rounded bg-stone-100 py-1 px-2 w-full outline-0 relative mt-1 border-1 border-color" placeholder="Search" /><AiOutlineSearch className="absolute right-2 top-2.5 text-xl text-gray-500"/></div>

						{filtredBrands.map((brand) => (
							<div key={brand.id} className="flex cursor-pointer justify-between items-center py-2 px-2 text-violet-900 font-semibold mb-3 mr-3 hover:bg-violet-300 bg-violet-200 rounded">
								<AiOutlineTags className="mr-2"/>
								<p className="mr-2">{brand.name}</p>
								<MdClose onClick={() =>handleBrandDelete(brand.id)} className="text-sm w-3 h-full"/>
							</div>							
						))}

					</div>
				</div>
				<div className="border-b-[20px] h-1/5 mb-4 border-white box bg-white rounded-xl p-8 overflow-y-scroll">
					<div className="flex justify-between items-center">
						<div className="">
							<h2 className="text-2xl font-bold">Tags</h2>
						</div>


						
						<div className="flex gap-3">
							<button type="button" title="Add" onClick={handleAddTag} className="w-full h-full flex justify-around items-center font-bold bg-green-200 border-1 border-color px-4 py-1.5 rounded shadow-sm hover:shadow"><div className="text-green-900">Add</div><TbPlus className="text-xl ml-2 text-green-900"/></button>								
						</div>
					</div>

					{addTag && <div className="mt-5 w-full flex gap-4">
						<div className="w-full h-10"><input type="text" onChange={handleTagChange} className="rounded h-full px-2 outline-0 w-full border-1 border-color shadow-sm" placeholder="Title" /></div>
						<button type="button" onClick={saveTag} title="Add" className="h-10 flex justify-around items-center font-semibold bg-main-bg border-1 border-color px-4 rounded shadow-sm hover:shadow"><div className="">Save</div></button>									
					</div>}

					<div className="w-full flex flex-wrap mt-4">
						<div className="w-full mb-4 h-10 flex items relative"><input type="text" onChange={(e) => handleTagSearch(e.target.value)} className="rounded bg-stone-100 py-1 px-2 w-full outline-0 relative mt-1 border-1 border-color" placeholder="Search" /><AiOutlineSearch className="absolute right-2 top-2.5 text-xl text-gray-500"/></div>

						{filtredTags.map((tag) => (
							<div key={tag.id} className="flex cursor-pointer justify-between items-center py-2 px-2 text-green-900 font-semibold mb-3 mr-3 hover:bg-green-300 bg-green-200 rounded">
								<AiOutlineTag className="mr-2"/>
								<p className="mr-2">{tag.name}</p>
								<MdClose onClick={() => handleTagDelete(tag.id)} className="text-sm w-3 h-full"/>
							</div>							
						))}
					</div>
				</div>				
			</div>

		</div>

			


		</div>
	)
}

export default Dashboard;
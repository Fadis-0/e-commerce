import React, { useState, useEffect} from 'react'
import { Header, Modal } from '../components'

import { Link, NavLink }  from 'react-router-dom';


import { TbGps, TbFileExport, TbPlus, TbBuildingWarehouse, TbDotsVertical } from 'react-icons/tb'
import { FiMinusSquare, FiEdit2, FiDollarSign, FiBox, FiFilter, FiAlertTriangle } from 'react-icons/fi'
import { AiOutlineUnorderedList, AiOutlineHome, AiOutlineBook, AiOutlineTag, AiOutlineFileDone, AiOutlineShoppingCart, AiOutlineEdit, AiOutlineStar, AiOutlineCloudUpload, AiFillStar, AiOutlineTags, AiOutlineDelete, AiFillCaretDown, AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineDone, MdCheck, MdOutlineLocalShipping, MdClose, MdOutlineCategory, MdOutlineLocationOn, MdOutlinePeopleAlt, MdOutlineInventory, MdAccessTime } from 'react-icons/md'
import { BiDollarCircle, BiBookAdd } from 'react-icons/bi';
import { GiCargoCrate } from 'react-icons/gi';
import { HiOutlineEye } from 'react-icons/hi'
import { RiAddBoxLine } from 'react-icons/ri'


import { useStateContext } from '../contexts/ContextProvider';

 
const Products = () => {
	
	// Context
	const { products,  setProducts,
			filtredProducts, setFiltredProducts,
			updateProductsData, handleActivity,

			pending, setPending,
			filtredPending, setFiltredPending,
			
			categories, setCategories,
			filtredCategories, setFiltredCategories,

			types, setTypes,
			filtredTypes, setFiltredTypes,

			brands, setBrands,
			filtredBrands, setFiltredBrands,
				
			tags, setTags,
			filtredTags, setFiltredTags,

			filtredAnnouncement, setFiltredAnnouncement,
			
			isOpenModal, setIsOpenModal,

			pendingV, setPendingV,
			filtredPendingV, setFiltredPendingV,

			handlePopup, popupMessage, setPopupMessage, popupType, setPopupType,
			updateCategoriesData, updateTypesData, updateTagsData, updateBrandsData,

		 } = useStateContext();


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


				setProducts(sorted);
				setFiltredProducts(sorted);
			});
	}, []);


	// Tpggle Modal
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

  	const [addCategory, setAddCategory] = useState(false);
  	const [addType, setAddType] = useState(false);
  	const [addBrand, setAddBrand] = useState(false);
  	const [addTag, setAddTag] = useState(false);

  	function handleAdd() {
  		if(orgCategories) setAddCategory(!addCategory);
  		else if(orgBrands) setAddBrand(!addBrand);
  		else if(orgTags) setAddTag(!addTag);
  		else if(orgTypes) setAddType(!addType);

  	}



	
	function handleProductDelete(id) {

		if(window.confirm('Are you sure you want to delete this product?')){
			fetch(`http://192.168.0.138:8080/products/delete/${id}`, {
				method: 'DELETE',
			})
			.then(response => {
				updateProductsData();
				return response;
			});
		}

	}

	function saveCategory(event) {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);
		
		formData.set('image_url', '');

		fetch('http://192.168.0.138:8080/categories/add', {
			method: 'POST',
			body: formData
		}).then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				else{
					setAddCategory(false);
					updateCategoriesData();
					return response;	
				}
				
			})
			.then(data => {
				// handle success
			});
	}

	function saveType(event) {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);
		
		fetch('http://192.168.0.138:8080/types/add', {
			method: 'POST',
			body: formData
		}).then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				else{
					
					setAddType(false);
					updateTypesData();
					return response;	
				}
				
			})
			.then(data => {
				// handle success
			});
	}

	function saveBrand(event) {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		

		fetch('http://192.168.0.138:8080/brands/add', {
			method: 'POST',
			body: formData
		}).then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				else{
					setAddBrand(false);
					updateBrandsData();
					return response;	
				}
				
			})
			.then(data => {
				// handle success
			});
	}

	function saveTag(event) {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

	
		fetch('http://192.168.0.138:8080/tags/add', {
			method: 'POST',
			body: formData
		}).then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				else{
					setAddTag(false);
					updateTagsData();
					return response;	
				}
				
			})
			.then(data => {
				// handle success
			});
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
	function handleAnnouncementDelete(id) {
		
		if(window.confirm('Are you sure you want to delete this tag?')){
			fetch(`http://192.168.0.138:8080/announcement/delete/${id}`, {
				method: 'DELETE',
			})
			.then(response => {
				updateTagsData();
				return response;
			});
		}
	}
	

  	const [status, setStatus] = useState("all");
  	const [categoryFilter, setCategoryFilter] = useState("all");
  	const [typeFilter, setTypeFilter] = useState("all");

  	function handleOrgSearch(query) {
  		if(orgCategories){
  			const filtred = categories.filter((category) => category.name.toLowerCase().includes(query.toLowerCase()));
 			setFiltredCategories(filtred);
 		}
 		else if (orgTypes){
 			const filtred = types.filter((type) => type.name.toLowerCase().includes(query.toLowerCase()));
 			setFiltredTypes(filtred);	
 		}
 		else if (orgBrands){
 			const filtred = brands.filter((brand) => brand.name.toLowerCase().includes(query.toLowerCase()));
 			setFiltredBrands(filtred);
 		}
 		else if (orgTags){
 			const filtred = tags.filter((tag) => tag.name.toLowerCase().includes(query.toLowerCase()));
 			setFiltredTags(filtred);
 		}
  	}

	function handleSearch(query) {
  		const filtred = products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase()));
 		setFiltredProducts(filtred);
 		setStatus("all");
 		setCategoryFilter("all");
 		setTypeFilter("all");
  	}

  	function filterStatus(query) {  		
  		setStatus(query);
  		setCategoryFilter("all");
  		setTypeFilter("all");

  		if(query === "active"){
  			const filtred = products.filter((product) => product.active === true );
 			setFiltredProducts(filtred);
  		}
  		if(query === "inactive"){
  			const filtred = products.filter((product) => product.active === false && product.status !== "Pending");
 			setFiltredProducts(filtred);
  		}
  		if(query === "pending"){
  			const filtred = products.filter((product) => product.status.toLowerCase().includes(query.toLowerCase()));  			
 			setFiltredProducts(filtred);
  		}
  		if(query === "all"){
 			setFiltredProducts(products);
  		}
  	}

  	function filterCategory(query) {  		
  		setCategoryFilter(query);
  		setStatus("all");
  		setTypeFilter("all");
  		
  		const filtred = products.filter((product) => product.category.toLowerCase().includes(query.toLowerCase()));  			
 		setFiltredProducts(filtred);
  		
  		if(query === "all"){
 			setFiltredProducts(products);
  		}

  	}

  	function filterType(query) {  		
  		setTypeFilter(query);
  		setStatus("all");
  		setCategoryFilter("all");
  		
  		const filtred = products.filter((product) => product.type.toLowerCase().includes(query.toLowerCase()));  			
 		setFiltredProducts(filtred);
  		
  		if(query === "all"){
 			setFiltredProducts(products);
  		}

  	}
  	


	return (


		<div className="max-w-[1400px] m-auto">

		  <Modal />

		  	<div className="px-8 ml-3">
				<div className="flex gap-3 text-gray-400 font-semibold mb-5">
					<div className="cursor-pointer"><AiOutlineHome className="text-2xl hover:text-gray-500" /></div>
					<div className="text-gray-200">/</div>
					<div className="cursor-pointer text-green-600 bg-green-100 px-2 rounded-lg">Store</div>
				</div>
				<Header title="Store Management"/>
			</div>

			<div className="flex mr-8 mb-10">

			<div className="flex-col w-[68%]">
				<div className="flex mr-4 ml-8 pl-5">
					<div className="flex items-center box bg-white w-full mr-4 h-32 rounded-xl"> 
						<div className="flex justify-center items-center bg-indigo-200 w-16 h-16 rounded-xl ml-6">
							<FiBox className="text-3xl text-indigo-900"/>
						</div>
						<div className="flex-col ml-4">
							<h2 className="text-2xl mt-1 font-extrabold mb-1">4</h2>
							<h2 className="">Products</h2>
						</div>
					</div>
					<div className="flex items-center box bg-white w-full h-32 mr-4 rounded-xl">
						<div className="flex justify-center items-center bg-green-200 w-16 h-16 rounded-xl ml-6">
							<MdCheck className="text-3xl text-green-900"/>
						</div>
						<div className="flex-col ml-4">
							<h2 className="text-2xl mt-1 font-extrabold mb-1">3</h2>
							<h2 className="">Active</h2>
						</div>
					</div>
					<div className="flex items-center box bg-white w-full h-32 rounded-xl">
						<div className="flex justify-center items-center bg-gray-200 w-16 h-16 rounded-xl ml-6">
							<MdAccessTime className="text-3xl text-gray-900"/>
						</div>
						<div className="flex-col ml-4">
							<h2 className="text-2xl mt-1 font-extrabold mb-1">{pending.length}</h2>
							<h2 className="">Pending</h2>
						</div>
					</div>
				</div>


				<div className="mr-4 mt-4 pl-5 flex h-[890px]">
				  <div className="border-b-[28px] ml-8 border-white box bg-white w-full rounded-xl p-10 overflow-y-scroll">
					<div className="flex justify-between items-center">
						<div className="">
							<h2 className="text-2xl font-bold">My Products</h2>
						</div>
						
						<div className="flex gap-5">


							
							<div>
								<button onClick={handleOpenModal} type="button" title="Import" className="w-full h-full flex justify-around items-center font-bold bg-indigo-200 hover:bg-indigo-300 border-1 border-color px-4 py-2 rounded-lg shadow-sm hover:shadow"><div className="text-indigo-900">Import from Catalog</div><BiBookAdd className="text-lg ml-2 text-indigo-900"/></button>								
							</div>

							<NavLink to="/products/add" onClick={() => {}} >
								<button type="button" title="Add" className="w-full h-full flex justify-around items-center font-bold bg-green-200 hover:bg-green-300 border-1 border-color px-4 py-2 rounded-lg shadow-sm hover:shadow"><div className="text-green-900">Add new</div><RiAddBoxLine className="text-xl ml-2 text-green-900"/></button>								
							</NavLink>

						</div>
					</div>



					<div className="mt-8">
						<div className="flex justify-between mb-6 items-center w-full">
						
						  
						  
				<div className="w-full h-full flex items-center px-6 gap-4">
					
					<div className="w-2/5">
						<div className="text-gray-500 text-sm font-bold">Search for product</div>
						<div className="relative flex items-center">
							<div className="relative flex items-center">
								<FiBox className="absolute text-xl left-3 text-gray-400"/>
								<input type="text" onChange={(e) => handleSearch(e.target.value)} className="w-full h-12 text-gray-500 rounded-lg bg-[#FEFEFE] outline-1 border-1 border-color focus:outline-indigo-300 focus:border-2 border-color text-lg px-10" placeholder="Search" />
							</div>
						</div>
					</div>	
					
					<div className="w-1/4">
						<div className="text-gray-500 text-sm font-bold">Status</div>
						<div className="relative flex items-center">
							<div className="absolute left-4 bg-gray-400 w-2 h-2 rounded-full"></div>
							<select value={status} onChange={(e) => filterStatus(e.target.value)} className="bg-[#FEFEFE] cursor-pointer w-full h-12 border-1 text-gray-600 rounded-lg border-color text-lg px-8 outline-0">
								<option value="all">All</option>
								<option value="active">Active</option>
								<option value="inactive">Inactive</option>
								<option value="pending">Pending</option>
							</select>
						</div>
					</div>
					<div className="w-1/4">
						<div className="text-gray-500 text-sm font-bold">Category</div>
						<div className="relative flex items-center">
							<select value={categoryFilter} onChange={(e) => filterCategory(e.target.value)} className="bg-[#FEFEFE] cursor-pointer w-full h-12 border-1 text-gray-600 rounded-lg border-color text-lg px-3 outline-0">
								<option value="all">All</option>
								{categories.map((category) => (
									<option value={category.name}>{category.name}</option>
								))}
								
							</select>
						</div>
					</div>
					<div className="w-1/4">
						<div className="text-gray-500 text-sm font-bold">Type</div>
						<div className="relative flex items-center">
							<select value={typeFilter} onChange={(e) => filterType(e.target.value)} className="bg-[#FEFEFE] cursor-pointer w-full h-12 border-1 text-gray-600 rounded-lg border-color text-lg px-3 outline-0">
								<option value="all">All</option>
								{types.map((type) => (
									<option value={type.name}>{type.name}</option>
								))}
							</select>
						</div>
					</div>
				</div>

					</div>

					<div>
						{filtredProducts.map((product) => (
								<div key={product.id} className={`border-1 border-color rounded-lg py-2.5 pr-4 pl-6 w-full relative flex items-center mb-4 rounded ${product.status == "In Stock" ? 'bg-main-bg shadow-sm' : 'bg-stone-100'}`}>
									
									<div className="">
										<div className="mr-5 w-[35px] h-[35px] rounded" style={{backgroundImage: `url(${product.image_url})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
									</div>
									<div className="flex-col w-5/6">
										<p className="font-bold mt-1">{product.name}</p>
										<p className="text-blue-800 text-sm ">{product.brand}</p>
									</div>

									 {product.status === "In Stock" && <div className=" flex-col w-2/6">
							          {product.active ? (
							          	 <div className="flex items-center gap-7">
							          		<div className="flex items-center gap-1">
							          			<span className="bg-green-600 rounded-full h-1.5 w-1.5" />
							          			<p className="text-green-600 font-bold text-sm ml-1 mt-0.5">Active</p>
							          		</div>
							          		<div className="w-14 h-7 bg-green-400 border-2 border-color rounded-full flex items-center justify-between px-0.5 cursor-pointer hover:bg-green-400" onClick={() => handleActivity(product.id, false)}>
							          			<div></div>
							          			<div className="w-5 h-5 bg-white border-2 border-color rounded-full "></div>
							          	 	</div>
							          	 </div>
							          	) : (
							          	 <div className="flex items-center gap-5">
							          	 	<div className="flex items-center gap-1">
							          			<span className="bg-rose-600 rounded-full h-1.5 w-1.5" />
							          			<p className="text-rose-600 font-bold text-sm mt-0.5">Inactive</p>
							          		</div>
							          		<div className="w-14 h-7 bg-rose-400 border-2 shadow-sm border-color rounded-full flex items-center px-0.5 cursor-pointer hover:bg-rose-400" onClick={() => handleActivity(product.id, true)}>
							          			<div className="w-5 h-5 bg-white border-2 shadow border-color rounded-full "></div>
							          	 	</div>
							          	 </div>
							          	)}
							          
							        </div>}

							        {product.status !== "In Stock" && <div className="w-2/6">
							        	<div className="flex items-center gap-1">
							          		<span className="bg-orange-500 rounded-full h-1.5 w-1.5" />
							          		<p className="text-orange-600 font-bold text-sm mt-0.5">Pending</p>
							          	</div>

							        </div>}
									
							
									
									{product.status == "In Stock" && <div className="flex gap-2 ml-0">
										
										<Link to={`/products/update/${product.id}`}>
											<button className="mt-3 text-sm text-gray-400 hover:text-green-500 font-bold"><AiOutlineEdit className="text-2xl ml-1"/>edit</button>
										</Link>
										<div className="">
											<button className="mt-3 text-gray-400 hover:text-rose-500 text-sm font-bold" onClick={() => handleProductDelete(product.id)}><AiOutlineDelete className="text-2xl ml-2"/>delete</button>
										</div>
									</div>}
								</div>

							))}
					</div>
									
						
					</div>
				</div>
			</div>
			 

			











			</div>

			<div className="flex-col w-[32%] mb-8">
				<div className="border-b-[28px] h-[505px] mb-4 border-white box bg-white rounded-xl p-8 overflow-y-scroll">
					<div className="flex justify-between items-center">
						<div className="">
							<h2 className="text-2xl font-bold">Organising</h2>
						</div>
						<div className="flex gap-3">
							<button type="button" title="Add" onClick={handleAdd} className="w-full h-11 flex items-center justify-around items-center font-bold bg-[#FDFDFD] hover:bg-green-300 transition-all ease border-1 border-color px-4 pt-0.5 rounded-lg shadow-sm hover:shadow"><div className="">New</div><TbPlus className="text-xl ml-3"/></button>								
						</div>
					</div>


				

					<div className="flex-col mt-5">
						<div className="flex mb-2 gap-3">
							<button onClick={() => setOrganising(1)} type="button" title="Add" className={`w-2/5 border-2 hover:border-2 hover:border-color hover:bg-main-bg h-full flex justify-around items-center font-bold border-1 border-color py-1.5 rounded shadow-sm hover:shadow ${orgCategories ? 'bg-gray-100 border-color shadow' : ''}`}><div className="text-green-900">Categories</div></button>								
							<button onClick={() => setOrganising(2)} type="button" title="Add" className={`w-1/4 h-full flex justify-around hover:border-2 hover:border-color hover:bg-main-bg items-center font-bold border-1 border-color py-1.5 rounded shadow-sm hover:shadow ${orgTypes ? 'bg-gray-100 border-color shadow' : ''}`}><div className="text-green-900">Types</div></button>								
							<button onClick={() => setOrganising(3)} type="button" title="Add" className={`w-1/4 h-full flex justify-around hover:border-2 hover:border-color hover:bg-main-bg items-center font-bold border-1 border-color py-1.5 rounded shadow-sm hover:shadow ${orgBrands ? 'bg-gray-100 border-color shadow' : ''}`}><div className="text-green-900">Brands</div></button>								
							<button onClick={() => setOrganising(4)} type="button" title="Add" className={`w-1/4 h-full flex justify-around hover:border-2 hover:border-color hover:bg-main-bg items-center font-bold border-1 border-color py-1.5 rounded shadow-sm hover:shadow ${orgTags ? 'bg-gray-100 border-color shadow' : ''}`}><div className="text-green-900">Tags</div></button>								
						</div>
						
					</div>

					{addCategory && orgCategories && <form onSubmit={saveCategory} className="mt-5 w-full flex gap-4">
						<div className="w-full h-10"><input type="text" name="name" className="rounded h-full px-2 outline-0 w-full border-1 border-color shadow-sm" placeholder="Category title" /></div>
						<button type="submit"  title="Add" className="h-10 flex justify-around items-center font-semibold bg-main-bg border-1 border-color px-4 rounded shadow-sm hover:shadow"><div className="">Save</div></button>									
					</form>}

					{addType && orgTypes && <form onSubmit={saveType} className="mt-5 w-full flex gap-4">
						<div className="w-1/2 h-10"><input type="text" name="name" className="rounded h-full px-2 outline-0 w-full border-1 border-color shadow-sm" placeholder="Type title" /></div>
						<select name="category_id" className="w-1/2 bg-white rounded px-2 h-10 border-1 border-color cursor-pointer outline-0 shadow-sm">
							<option>Category</option>
							{	categories.map((category) => (
									<option value={category.id}>{category.name}</option>
								))
							}
						</select>
						<button type="submit" title="Add" className="h-10 flex justify-around items-center font-semibold bg-main-bg border-1 border-color px-4 rounded shadow-sm hover:shadow"><div className="">Save</div></button>									
					</form>}

					{addBrand && orgBrands && <form onSubmit={saveBrand} className="mt-5 w-full flex gap-4">
						<div className="w-full h-10"><input type="text" name="name" className="rounded h-full px-2 outline-0 w-full border-1 border-color shadow-sm" placeholder="Brand name" /></div>
						<button type="submit" title="Add" className="h-10 flex justify-around items-center font-semibold bg-main-bg border-1 border-color px-4 rounded shadow-sm hover:shadow"><div className="">Save</div></button>									
					</form>}

					{addTag && orgTags && <form onSubmit={saveTag} className="mt-5 w-full flex gap-4">
						<div className="w-full h-10"><input type="text" name="name" className="rounded h-full px-2 outline-0 w-full border-1 border-color shadow-sm" placeholder="Tag name" /></div>
						<button type="submit" title="Add" className="h-10 flex justify-around items-center font-semibold bg-main-bg border-1 border-color px-4 rounded shadow-sm hover:shadow"><div className="">Save</div></button>									
					</form>}

					<div className="mb-4 mt-4">
							<div className="relative flex items-center">
								<AiOutlineSearch className="absolute text-xl left-3 text-gray-400"/>
								<input onChange={(e) => handleOrgSearch(e.target.value)} className="w-full h-12 text-gray-500 rounded-lg bg-[#FEFEFE] outline-1 border-1 border-color focus:outline-indigo-300 focus:border-2 border-color text-lg px-10" placeholder="Search" />
							</div>
						</div>

				
				{orgCategories && <div className="w-full flex-col px-2.5">

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
				}

				{orgTypes && <div className="w-full flex-col px-2.5">
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
				}

				{orgBrands && <div className="w-full flex flex-wrap px-1.5">
					{filtredBrands.map((brand) => (
							<div key={brand.id} className="flex cursor-pointer justify-between items-center py-2 px-2 text-violet-900 font-semibold mb-3 mr-3 hover:bg-violet-300 bg-violet-200 rounded">
								<AiOutlineTags className="mr-1"/>
								<p className="mr-1 hover:underline" title="edit">{brand.name}</p>
								<MdClose title="delete" onClick={() =>handleBrandDelete(brand.id)} className="text-2xl px-1 rounded-full hover:bg-violet-400 "/>
							</div>							
						))}
					</div>
				}

				{orgTags && <div className="w-full flex flex-wrap px-1.5">
					{filtredTags.map((tag) => (
							<div key={tag.id} className="flex cursor-pointer justify-between items-center py-2 px-2 text-green-900 font-semibold mb-3 mr-3 hover:bg-green-300 bg-green-200 rounded">
								<AiOutlineTag className="mr-1"/>
								<p className="mr-1 hover:underline">{tag.name}</p>
								<MdClose onClick={() => handleTagDelete(tag.id)} className="text-2xl px-1 rounded-full hover:bg-green-400"/>
							</div>							
						))}
					</div>
				}



				</div>

				
				
				<div className="h-[512px] relative mb-4 border-white box bg-white rounded-xl p-8 overflow-y-hidden">
				<div className="mb-4 flex justify-between items-center">
						<div className="">
							<h2 className="text-2xl font-bold">Announcements</h2>
						</div>


						
						<NavLink to="/promotions/add" onClick={() => {}} >
							<button type="button" title="Add" className="w-full h-full flex justify-around items-center font-bold bg-green-200 hover:bg-green-300 border-1 border-color px-3 py-1.5 rounded shadow-sm hover:shadow"><div className="text-green-900">Add</div><RiAddBoxLine className="text-xl ml-3 text-green-900"/></button>								
						</NavLink>
						
				


					</div>
					<div className="w-full flex-col px-2.5">

					<div className="mb-4 mt-4">
							<div className="relative flex items-center">
								<AiOutlineSearch className="absolute text-xl left-3 text-gray-400"/>
								<input type="text" className="w-full h-12 text-gray-500 rounded-lg bg-[#FEFEFE] outline-1 border-1 border-color focus:outline-indigo-300 focus:border-2 border-color text-lg px-10" placeholder="Search" />
							</div>
						</div>

						{filtredAnnouncement.map((announcement) => (
							<div className="border-1 border-color shadow-sm h-[54px] bg-main-bg px-4 w-full relative flex items-center mb-3 rounded-lg" >
								<div className="mr-6 ">
							
									<div className="mr-5 w-[35px] h-[35px] rounded" style={{backgroundImage: `url(${announcement.image_ur})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
								
								</div>
								<div className="flex-col">
									<p className="text-sm font-bold ">{announcement.title}</p>
								</div>
								<div className="absolute right-3">
										<button className="mt-3"><AiOutlineDelete onClick={() => handleAnnouncementDelete(announcement.id)} className="text-xl text-gray-400 hover:text-rose-500"/></button>
									</div>
									<div className="absolute right-10">
										<button className="mt-3"><AiOutlineEdit className="text-xl text-gray-400 hover:text-green-500"/></button>
									</div>
							</div>							
						))}
					</div>

				</div>
								
			</div>

		</div>

			


		</div>
	)
}

export default Products;
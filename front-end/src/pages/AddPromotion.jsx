import React,{ useState, useEffect}  from 'react';

import { Header } from '../components';


import { AiOutlineDelete,  AiOutlineSearch, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { MdOutlineLocalShipping, MdOutlineTitle } from 'react-icons/md';
import { HiOutlineEye } from 'react-icons/hi';
import { FiBox } from 'react-icons/fi';

import { useStateContext } from '../contexts/ContextProvider';



const AddPromotion = () => {
	
  	const defaultImage = "https://epay.slcc.edu/C20011_ustores/web/images/product-default-image.png";
	const [imageUrl, setImageUrl] = useState(defaultImage);
	const [Product, setProduct] = useState([]);
	const [Title, setTitle] = useState([]);

	const { 
		filtredProducts, setFiltredProducts,
		
	 } = useStateContext();
    

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

			}
		}
	}
	
	const handleProductChange = (event) => {
		setProduct(event.target.value);
	}

	const handleTitleChange = (event) => {
		setTitle(event.target.value);
	}
	function saveProduct() {
	event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);

		formData.set('title', Title);
		formData.set('idprd', Product);
		formData.set('image_ur', imageUrl);
		

		

		fetch('http://192.168.0.138:8080/announcement/add', {
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
		history('/products');
	}




	return (
		<div className="max-w-[1400px] m-auto">
			<div className="px-8 ml-2">
				<Header category="Management / Store " title="Promotions"/>
			</div>
			<div className="pr-8 pl-4 ">
				<div className="border-b-[30px] ml-8 h-full border-white box bg-white rounded-xl p-10">
					<div className="flex justify-between items-center">
						<div className="">
							<h2 className="text-2xl font-bold">Add a new Promotion</h2>
						</div>
						

					</div>

					<div className="w-full h-full flex justify-between p-10">
						<div className=" w-2/5 h-56 flex-col">
							<div className="px-10 relative flex items-center mb-4 mt-8">
								<MdOutlineTitle className="absolute text-2xl left-14 text-gray-500"/>
								
								<select onChange={handleTitleChange} type="text" className="bg-white cursor-pointer w-full h-12 border-2 text-gray-500 rounded shadow-sm focus:outline-indigo-300 border-color text-lg px-12">
 
    <option  value="announcement.top">
       announcement.top
    </option>
	<option  value="announcement.mid.1">
	announcement.mid.1
    </option>
	<option  value="announcement.mid.2">
	announcement.mid.2
    </option>
	<option  value="announcement.bot">
	announcement.bot
    </option>

</select>
							</div>
							<div className="px-10 relative flex items-center mb-4">
								<FiBox className="absolute text-2xl left-14 text-gray-500"/>
								<select onChange={handleProductChange} type="text" className="bg-white cursor-pointer w-full h-12 border-2 text-gray-500 rounded shadow-sm focus:outline-indigo-300 border-color text-lg px-12">
  {filtredProducts.map((product) => (
    <option key={product.id} value={product.id}>
      {product.name} - {product.brand}
    </option>
  ))}
</select>

{filtredProducts.map((product) => (
  <div key={product.id} className="border-1 border-color shadow-sm rounded-lg py-2.5 bg-main-bg pr-4 pl-6 w-full relative flex items-center mb-4 rounded" style={{ display: "none" }}>
    <div className="">
      <div className="mr-5 w-[35px] h-[35px] rounded" style={{backgroundImage: `url(${product.image_url})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
    </div>
    <div className="flex-col w-5/6">
      <p className="font-bold mt-1">{product.name}</p>
      <p className="text-blue-800 text-sm ">{product.brand}</p>
    </div>
  </div>
))}

							</div>

							
						</div>

						<div className="relative hover:bg-main-bg hover:shadow bg-white border-2 border-color p-3 shadow-sm w-[530px] mr-12 h-54">	
							<div className="text-gray-400 text-lg font-semibold absolute top-[-32px] text-center w-full">Select an image</div>
							<div className="h-full w-full relative flex justify-center items-center" style={{backgroundImage: `url(${imageUrl})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
							<input type="file" className="opacity-0 absolute left-0 w-full top-0 bottom-0 cursor-pointer" name="image" onChange={handleUpload} /> 	
												
						</div>



					</div>
					<div className="px-10 relative flex items-center">
					<form onSubmit={saveProduct} className="flex gap-4 my-8 mr-4">
   				<button type="submit" className="w-300 cursor-pointer h-12 border-2 text-white rounded shadow-sm hover:shadow border-color text-xl flex justify-center items-center font-bold px-12 bg-violet-500 hover:bg-violet-600">Save</button>
      		</form>
							</div>
					
				</div>
			</div>
		</div>


	)
}

export default AddPromotion;
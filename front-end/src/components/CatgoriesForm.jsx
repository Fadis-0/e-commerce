import React, { useState } from 'react'
import { MdOutlineCancel, MdClose } from 'react-icons/md'
import { BiReset } from 'react-icons/bi'
import { AiOutlinePlus, AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai'

import { useStateContext } from '../contexts/ContextProvider'

const CatgoriesForm = (props) => {
	const { activeCategotiesForm, setActiveCategotiesForm, categoryImage, setCategoryImage, categoryName, setCategoryName} = useStateContext();
	
	const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbrHWzlFK_PWuIk1Jglo7Avt97howljIWwAA&usqp=CAU";
	const [imageUrl, setImageUrl] = useState(defaultImage);


	const [selectedImage, setSelectedImage] = useState(1);

	function handleSubmit(event) {
		event.preventDefault();
		const form = event.target;
		const formData = new FormData(form);
		
		if(props.selectedCategory === null){
			formData.set('image_url', imageUrl);

			fetch('http://192.168.0.138:8080/categories/add', {
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
		else{
			formData.set('id', props.selectedCategory.id);
			formData.set('image_url', categoryImage);

			fetch('http://192.168.0.138:8080/categories/update', {
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
		setActiveCategotiesForm(false);
		props.setSelectedCategory(null);
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
				setCategoryImage(url);
				setSelectedImage(1);

			}
		}
	}


	return (
		<div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 pr-1">
			<div className="flex justify-between items-center p-4 ml-4">
				{
					props.selectedCategory === null ? (
						<p className="font-semibold text-xl mt-2">Add a new category</p>
					) : (<p className="font-semibold text-xl mt-2">Update Existing category</p>)
				}
				<button 
					type="button"
					onClick={() => setActiveCategotiesForm(false)}
					className="text-2xl p-3 hover:text-rose-500 mt-1"
				>
					<MdClose />
				</button>
			</div>

				<form onSubmit={handleSubmit} className="form flex-col border-t-1 border-color p-4 ml-6 mr-6">

					<span className="block text-lg font-semibold">Upload an image : </span>
					<div className="mt-4">
						
						<div className="h-36 w-full flex justify-center items-center relative overflow-hidden rounded border-[2px] mr-2 hover:cursor-pointer">
							{
								props.selectedCategory === null ? (
									<div className="w-[97%] cursor-pointer h-[93%] relative flex justify-center items-center rounded" style={{backgroundImage: `url(${imageUrl})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
								) : (
									<div className="w-[97%] cursor-pointer h-[93%] relative flex justify-center items-center rounded" style={{backgroundImage: `url(${categoryImage})`, backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}></div>
								)
							}
							<input type="file" className="ml-[-110px] absolute opacity-0 r-0 top-0 bottom-0 cursor-pointer" name="image" onChange={handleUpload} />						
						</div>

						
					</div>
					<div className="flex-col mt-6 h-72">
						<div className="relative w-full h-16">
							<input type="text" id="name" name="name" placeholder=" " defaultValue={props.selectedCategory === null ? "" : categoryName} autoComplete="off" className="input px-4 border-[2px]" />
							<label className="label text-gray-400" htmlFor="name">Name</label>
						</div>
						

						
						
						<div className="add rounded bg-blue-100 float-right text-blue-900 pl-4 h-10 w-28 mt-24 mb-4 px-2 hover:shadow transition-all ease">
							<button type="submit" className="w-full h-full flex justify-around items-center font-bold">Submit<AiOutlineCaretRight className="text-l"/></button>
						</div>
						<div className="add rounded cursor-pointer bg-violet-100 flex justify-around items-center float-left text-violet-900 h-10 w-28 mt-24 mb-4 px-2 hover:shadow transition-all ease">
							<input type="reset" className="ml-3 w-full cursor-pointer h-full font-bold" onClick={() => {setImageUrl(defaultImage);} } />

							<BiReset className="text-xl w-full cursor-pointer"/>
						</div>
						
					</div>
				</form>
	
		</div>
	)
}

export default CatgoriesForm;
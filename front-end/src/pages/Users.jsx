 import React, { useState, useEffect} from 'react'

import { Header } from '../components'

import { AiOutlineDelete, AiOutlineArrowRight,  AiOutlineSearch } from 'react-icons/ai'
import { MdOutlineLocalShipping, MdOutlineDone, MdOutlineLocationOn, MdOutlineDownloading } from 'react-icons/md'
import { HiOutlineEye } from 'react-icons/hi'
import { TbPlus } from 'react-icons/tb'
import { FiBox } from 'react-icons/fi'


const Users = () => {

	const users = [	
		{
			id: 1,
			user: "Fadi Ayad",
			role: "Admin",
			email: "ayadfadi10@gmail.com",
			password: "********"
		},
		{
			id: 2,
			user: "Anis Gasmi",
			role: "Admin",
			email: "gasmianis10@gmail.com",
			password: "********"
		}
		
	];

	const [addRole, setAddRole] = useState(false);

	function handleAddRole() {
  		setAddRole(!addRole);
  	}

	return (
		<div className="max-w-[1400px] m-auto">
			<div className="px-8 ml-2">
				<Header category="Management" title="Users"/>
			</div>
			<div className="pr-8 pl-4 h-[75vh] flex">
				<div className="w-full border-b-[30px] ml-8 h-full border-white box bg-white rounded-xl p-10 overflow-y-scroll">
					<div className="flex justify-between items-center">
						<div className="">
							<h2 className="text-2xl font-bold">Users</h2>
						</div>
						
						<div className="flex gap-5">
							<div  className="w-full h-full flex items relative"><input type="text" className="relative rounded bg-stone-100 py-1 px-2 w-72 border-1 border-color outline-0 mt-0.5" placeholder="Search for a user" /></div>
							<button type="button" title="Add" className="w-full h-full flex justify-around items-center font-bold bg-indigo-200 hover:bg-indigo-300 border-1 border-color px-4 py-1.5 rounded shadow-sm hover:shadow"><div className="text-indigo-900">Export</div></button>								
							<button type="button" title="Add" className="w-full h-full flex justify-around items-center font-bold bg-green-200 hover:bg-green-300 border-1 border-color px-4 py-1.5 rounded shadow-sm hover:shadow"><div className="text-green-900">Add</div><TbPlus className="text-xl ml-2 text-green-900"/></button>								
							
						</div>

					</div>
					<div className="flex mb-5 mt-5 items-center gap-3 w-full">
						<p className=" mt-1 font-semibold mr-2">Filter By</p> 
						

							<div className="">
								<label className="">
									<select  className="px-2 shadow-sm bg-white h-10 rounded outline-0 cursor-pointer border-1 border-color">
										<option>Role</option>
										
									</select>
								</label>
							</div>

							
							

					</div>
						{users.map((user, index) => (
							<div key={index} className="flex-col mb-5 bg-main-bg rounded-lg overflow-hidden border-1 border-color shadow-sm">
								<div key={user.id} className=" p-2 w-full bg-main-bg pl-6 pr-4 relative flex items-center" >
									<div className="flex-col">
										<p className="text-gray-500 mt-1">ID</p>
										<p className="font-bold">#{user.id}</p>
									</div>
									<div className="ml-8 flex-col w-1/6">
										<p className="text-gray-500 mt-1">User</p>
										<p className="font-bold">{user.user}</p>
									</div>
									<div className="ml-8 flex-col w-2/6">
										<p className="text-gray-500 mt-1">Email</p>
										<p className="font-bold">{user.email}</p>
									</div>
									<div className="ml-8 flex-col w-2/6">
										<p className="text-gray-500 mt-1">Password</p>
										<p className="font-bold">{user.password}</p>
									</div>
									<div className=" flex-col w-1/6">
										<p className="text-gray-500 mt-1">Role</p>
										<p className="font-bold">{user.role}</p>
									</div>

									
									<div className="flex gap-3"> 
										<button className="mt-3  text-sm text-gray-400 hover:text-rose-500"><AiOutlineDelete className="text-xl ml-[8px] mb-0.5"/>delete</button>
									</div>
								</div>

							</div>
						))
					}
				</div>
					
			</div>
		</div>


	)
}

export default Users;
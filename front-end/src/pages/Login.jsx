
            import React, { useState } from 'react'


            import { AiOutlineMail, AiOutlineLock, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai'
            import { MdOutlineAdminPanelSettings, MdOutlineLocalShipping, MdOutlineInventory } from 'react-icons/md'
            import { FiBox } from 'react-icons/fi'
            
            import { Header } from '../components'
            import { data } from 'autoprefixer'
            
            
            const Login = () => {
            
                const [profile, setProfile] = useState(null);
            
                function handleSetProfile(profile){
                    setProfile(profile);
                }
                function handleSubmitt(event) {
                    event.preventDefault();
                    const form = event.target;
                    const formData = new FormData(form);
                    const role = formData.get('role');
                  
                    if (!role) {
                      alert('Please select a role');
                      return;
                    }
                  
                    fetch('http://192.168.0.138:8080/userRole/add', {
                      method: 'POST',
                      body: formData,
                    })
                      .then((response) => {
                        if (!response.ok) {
                          throw new Error('Network response was not ok');
                        } else {
                          return response;
                        }
                      })
                      .catch((error) => {
                        console.error('Error submitting form:', error);
                      });
                  }
                  
            
            
                return (
                    <div className="flex justify-center items-center h-[99vh]">
                        <div className="w-[680px] h-[580px] ml-[-80px] flex-col p-10">
                            <div className="text-4xl font-bold text-center ">Signup</div>
                            <div className="text-lg mt-1 font-semibold text-gray-400 text-center ">Administration</div>
                            <div className="mt-20 flex-col">
                                <div className="px-10 h-10 relative flex items-center mb-8">
                                    <AiOutlineUser className="absolute text-2xl left-14 text-gray-500"/>
                                    <p className="text-lg text-gray-500 font-semibold px-12 mt-1">Profile</p>
                                    <div className="w-full ml-8 h-full flex justify-between items-center">
                                        <div className={`shadow-sm hover:shadow group hover:border-lime-600 relative w-12 h-12 flex justify-center cursor-pointer items-center rounded-full bg-white border-2 border-color ${profile === "admin" ? "bg-lime-100 border-lime-600" : "bg-white"}`} onClick={() => handleSetProfile("admin")}>
                                            <MdOutlineAdminPanelSettings className={`group-hover:text-lime-600 text-2xl ${profile === "admin" ? "text-lime-600" : "text-gray-300"}`}/>
                                            <p className="absolute top-[-30px] opacity-0 group-hover:opacity-100 text-gray-500">Admin</p>
                                        </div>
                                        <div className={`relative group hover:border-indigo-600 w-12 h-12 rounded-full bg-white flex justify-center items-center cursor-pointer border-2 border-color ${profile === "store" ? "bg-indigo-100 border-indigo-600" : "bg-white"}`} onClick={() => handleSetProfile("store")}>
                                            <FiBox className={`group-hover:text-indigo-600 text-2xl ${profile === "store" ? "text-indigo-600" : "text-gray-300"}`}/>
                                            <p className="absolute top-[-30px] opacity-0 group-hover:opacity-100 text-gray-500">Store<span className="ml-1.5">Manager</span></p>
            
                                        </div>
                                        <div className={`shadow-sm hover:shadow group hover:border-violet-600 relative w-12 h-12 rounded-full flex justify-center items-center cursor-pointer border-2 border-color ${profile === "supply" ? "bg-violet-100 border-violet-600" : "bg-white"}`} onClick={() => handleSetProfile("supply")}>
                                            <MdOutlineInventory className={`group-hover:text-violet-600 text-2xl ${profile === "supply" ? "text-violet-600" : "text-gray-300"}`}/>
                                            <p className="absolute top-[-30px] opacity-0 group-hover:opacity-100 text-gray-500">Supply<span className="ml-1.5">Manager</span></p>
            
                                        </div>
                                        <div className={`shadow-sm hover:shadow group hover:border-yellow-600 relative w-12 h-12 rounded-full flex justify-center items-center cursor-pointer border-2 border-color ${profile === "orders" ? "bg-yellow-100 border-yellow-600" : "bg-white"}`} onClick={() => handleSetProfile("orders")}>
                                            <AiOutlineShoppingCart className={`group-hover:text-yellow-600 text-2xl ${profile === "orders" ? "text-yellow-600" : "text-gray-300"}`}/>
                                            <p className="absolute top-[-30px] opacity-0 group-hover:opacity-100 text-gray-500">Orders<span className="ml-1.5">/</span><span className="ml-1.5">Delivery</span><span className="ml-1.5">Manager</span></p>
            
            
                                        </div>
                                        <div className="h-full border-[1px] border-gray-200"></div>
                                        <div className={`shadow-sm hover:shadow group hover:border-rose-600 relative w-12 h-12 rounded-full flex justify-center items-center cursor-pointer border-2 border-color ${profile === "supplier" ? "bg-rose-100 border-rose-600" : "bg-white"}`} onClick={() => handleSetProfile("supplier")}>
                                            <MdOutlineLocalShipping className={`group-hover:text-rose-600 text-2xl ${profile === "supplier" ? "text-rose-600" : "text-gray-300"}`}/>
                                            <p className="absolute top-[-30px] opacity-0 group-hover:opacity-100 text-gray-500">Supplier</p>
            
            
                                        </div>
                                        
                                    </div>
            
                                </div>
                                <form method="post" onSubmit={handleSubmitt} >
					<div className="px-10 relative flex items-center mb-4">
					<AiOutlineMail className="absolute text-2xl left-14 text-gray-500"/>
        <input  type="text" name="email" placeholder="email"  className="w-full h-12 border-2 text-gray-500 rounded shadow-sm focus:outline-indigo-300 border-color text-lg px-12"/>
		</div>
		<div className="px-10 relative flex items-center mb-8">
        <AiOutlineLock className="absolute text-2xl left-14 text-gray-500"/>
        <input  type="password" name="password" placeholder="password" className="w-full h-12 border-2 text-gray-500 rounded shadow-sm focus:outline-indigo-300 border-color text-lg px-12"/>
		</div>
        <input type="hidden" name="role" value={profile} />
                  <div className="px-10 relative flex items-center">
                  
                    
      
                    <button className="w-full cursor-pointer h-14 border-2 text-white rounded shadow-sm hover:shadow border-color text-xl flex justify-center items-center font-bold px-12 bg-violet-500 hover:bg-violet-600" type="submit" value="Submit">
						Login</button>
                      
                    </div>
                 
                </form>
                                
                            </div>
                        </div>
                        
                    </div>
                )
            }
            
            export default Login;
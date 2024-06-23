 import React from 'react';
import { Link, NavLink }  from 'react-router-dom';
import { SiShopware } from 'react-icons/si'
import { MdOutlineCancel } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi'
import { TbDashboard } from 'react-icons/tb'
import { FiBox } from 'react-icons/fi'
import { MdOutlinePeopleAlt } from 'react-icons/md'
import { TbBuildingWarehouse } from 'react-icons/tb'
import { BiDollarCircle } from 'react-icons/bi'
import { AiOutlineStar, AiOutlineLogout, AiOutlineUser, AiOutlineShoppingCart } from 'react-icons/ai'
import { MdOutlineAdminPanelSettings, MdOutlineInventory, MdOutlineLocalShipping } from 'react-icons/md'

import { useStateContext } from '../contexts/ContextProvider'
import { AiOutlineMenu } from 'react-icons/ai'


const NavButton = ({title, customFunc, icon, color, darkColor}) => (
	<button type="Button" onClick={customFunc} style={{ color }} className="relative text-xl rounded-full p-3 hover:bg-zinc-700">
		<span style={{background: darkColor}} className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2">
		</span>
			{icon}			

	</button>
);

const Sidebar = () => {
	const { activeMenu, setActiveMenu, role, setRole } = useStateContext();
	const history = useNavigate();
	const activeLink = 'active flex items-center gap-5 pl-4 pt-3 pb-2.5 text-md m-1 mt-2 bg-zinc-700 text-slate-100 ';
	const normalLink = 'normal flex items-center gap-5 pl-4 pt-3 pb-2.5 text-md m-1 mt-2 text-white';
	const user = JSON.parse(localStorage.getItem('user'));
	function handleLogout() {
        localStorage.removeItem('user');
        setRole("none");
        history('/');
      
      }

	return (
		<div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 pr-3">
			{activeMenu && (<>
				<div className="flex justify-between items-center">
					<Link to="/" onClick={() => setActiveMenu(false)} className="items-center gap-3 ml-5 mt-10 flex text-lg font-extrabold tracking-tight dark:text-white text-slate-900">
						<MdOutlineAdminPanelSettings className="logo text-4xl"/>
						<div className="flex-col mt-2 ml-1">
							{role === "store" && <span className="text-white">Store Manager</span>}
							{role === "supply" && <span className="text-white">Supply Manager</span>}
							{role === "orders" && <span className="text-white">O/D Manager</span>}
							{role === "supplier" && <span className="text-white">Supplier</span>}
							{role === "admin" && <span className="text-white">Admin</span>}
							
							<span className="text-green-400 block text-sm">{user.email}</span>
						
						</div>
					</Link>
					<div className="flex justify-between p-2 relative mt-8">
						<NavButton title='menu' customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color="white" icon={<AiOutlineMenu />}/>
					</div>
					<button type="button" onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
						<MdOutlineCancel />
					</button>
				</div>
				<div className="mt-10">
					<div className="mt-6">
						<p className="text-gray-400 m-3 mt-3 uppercase">Management</p>
						{role === "store" && <NavLink to="/products" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<FiBox className="text-2xl" />
							<span className="capitalize">Store</span>
						</NavLink>}

						{role === "admin" && <NavLink to="/products" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<FiBox className="text-2xl" />
							<span className="capitalize">Store</span>
						</NavLink>}

						{role === "store" && <NavLink to="/stock" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<TbBuildingWarehouse className="text-2xl " />
							<span className="capitalize">Stock</span>
						</NavLink>}

						{role === "admin" && <NavLink to="/stock" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<TbBuildingWarehouse className="text-2xl " />
							<span className="capitalize">Stock</span>
						</NavLink>}

						{role === "supply" && <NavLink to="/supply" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<MdOutlineInventory className="text-2xl"/>
							<span className="capitalize">Supply</span>
						</NavLink>}

						{role === "admin" && <NavLink to="/supply" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<MdOutlineInventory className="text-2xl"/>
							<span className="capitalize">Supply</span>
						</NavLink>}
						
						{role === "supply" && <NavLink to="/stock" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<TbBuildingWarehouse className="text-2xl " />
							<span className="capitalize">Stock</span>
						</NavLink>}
						
						{role === "orders" && <NavLink to="/orders" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<AiOutlineShoppingCart className="text-2xl"/>
							<span className="capitalize">Orders</span>
						</NavLink>}

						{role === "admin" && <NavLink to="/orders" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<AiOutlineShoppingCart className="text-2xl"/>
							<span className="capitalize">Orders</span>
						</NavLink>}
						
						{role === "orders" && <NavLink to="/delivery" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<MdOutlineLocalShipping className="text-2xl"/>
							<span className="capitalize">Delivery</span>
						</NavLink>}

						{role === "admin" && <NavLink to="/delivery" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<MdOutlineLocalShipping className="text-2xl"/>
							<span className="capitalize">Delivery</span>
						</NavLink>}

						{role === "supplier" && <NavLink to="/delivery" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<FiBox className="text-2xl"/>
							<span className="capitalize">My Products</span>
						</NavLink>}

						{role === "supplier" && <NavLink to="/delivery" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<AiOutlineShoppingCart className="text-2xl"/>
							<span className="capitalize">Received Orders</span>
						</NavLink>}

						
					</div>
					 
					
				</div>

			</>)}

			{!activeMenu && (<>
				<div className="flex justify-between items-center">
					
					<div className="flex justify-between p-2 relative mt-8 ml-0.5">
						<NavButton title='menu' customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} color="white" icon={<AiOutlineMenu />}/>
					</div>
					<button type="button" onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
						<MdOutlineCancel />
					</button>
				</div>
				<div className="mt-16">
					
					<div className="mt-4">
						<p className="line text-gray-400 m-4 mt-4 uppercase"></p>
						{role == "store" && <NavLink to="/products" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<FiBox className="text-2xl" />
						</NavLink>}
						{role == "admin" && <NavLink to="/products" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<FiBox className="text-2xl" />
						</NavLink>}
						{role == "supply" && <NavLink to="/supply" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<MdOutlineInventory className="text-2xl text-white"/>
						</NavLink>}
						{role == "admin" && <NavLink to="/supply" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<MdOutlineInventory className="text-2xl text-white"/>
						</NavLink>}
						{role == "store" && <NavLink to="/stock" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<TbBuildingWarehouse className="text-2xl text-white"/>
						</NavLink>}
						{role == "supply" && <NavLink to="/stock" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<TbBuildingWarehouse className="text-2xl text-white"/>
						</NavLink>}
						{role == "orders" && <NavLink to="/orders" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<AiOutlineShoppingCart className="text-2xl"/>
						</NavLink>}
						{role == "admin" && <NavLink to="/orders" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<AiOutlineShoppingCart className="text-2xl"/>
						</NavLink>}
						{role == "orders" && <NavLink to="/delivery" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<MdOutlineLocalShipping className="text-2xl text-white"/>
						</NavLink>}
						{role == "admin" && <NavLink to="/delivery" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<MdOutlineLocalShipping className="text-2xl text-white"/>
						</NavLink>}
						

						{role === "supplier" && <NavLink to="/products" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<FiBox className="text-2xl"/>
						</NavLink>}
						{role === "supplier" && <NavLink to="/orders" onClick={() => {}} className={({ isActive }) => isActive ? activeLink : normalLink }>
							<AiOutlineShoppingCart className="text-2xl"/>
						</NavLink>}

						<button className='absolute bottom-6 normal flex items-center gap-5 px-3 pt-3 pb-2.5 text-md m-1 mt-2 text-white' onClick={handleLogout} >
							<AiOutlineLogout className="text-2xl"/>
						</button>
						
					</div>
					
				</div>

			</>)}
		</div>
	)
}

export default Sidebar;
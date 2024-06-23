import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';

import { Navbar, Sidebar, Utilitybar, Popup, Footer, Modal, UpdateModal, ThemeSettings} from './components';
import { AddCatalog, Dashboard, Signup, SupplierOrders, Products, AddProducts, UpdateProducts, Orders, Users, Delivery, Supply, TrackSupplyOrder, SetSupplyOrder, Stock, SupplierProducts, Reviews, Pie, AddPromotion,Login} from './pages';

import { useStateContext } from './contexts/ContextProvider';

import './App.css'

function App() {

  const { activeMenu, activePopup, activeUtilityMenu, setActiveUtilityMenu, isOpenModal, setIsOpenModal, isOpenUpdateModal, setIsOpenUpdateModal, role } = useStateContext();

  const sidebarClass = activeMenu ? "sidebar--wide" : "sidebar--short";
  const modalClass = isOpenModal ? "z-50 absolute w-full h-full slide bg-half-transparent" : "slide";
  const updateModalClass = isOpenUpdateModal ? "z-50 absolute w-full h-full slide bg-half-transparent" : "slide";
  

  const location = window.location.pathname;

  return (
    <div className="App">
      <div>
        
        <BrowserRouter>
            
          <div className="flex relative dark:bg-main-dark-bg bg-main-bg"> 
          <Popup />
            
          
          {
           role !== "none" && (
              <div>
                <div className={`fixed sidebar dark:bg-secondary-dark-bg ${sidebarClass}`} >
                  <Sidebar />
                </div>
              </div>  
            )
          }
            

            <div className={`navbar--container dark:bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'md:ml-20 flex-2'}`}>
              
                  <div>
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                      <Navbar />
                    </div>                         
                  </div>  
                
               

                             
              
              <div>
              
                <Routes>


                    <Route path="/login" element={<Login/>} />

                    {role === "none" && <Route path="/" element={<Signup/>} />}

                  {/* Dashboard */}
                    <Route path="/dashboard"/>

                  {/* Inventory Pages */}
                    {role === "supplier" && <Route path="/" element={<SupplierProducts />} />}
                    {role === "supplier" && <Route path="/products" element={<SupplierProducts />} />}
                    {role === "supplier" && <Route path="/products/add" element={<AddCatalog/>} />}
                    {role === "supplier" && <Route path="/orders" element={<SupplierOrders/>} />}
                    {role === "supplier" && <Route path="/orders/track/:id" element={<SetSupplyOrder/>} />}
                    
                    {role === "store" && <Route path="/" element={<Products/>} />}
                    {role === "store" && <Route path="/products" element={<Products/>} />}
                    {role === "store" && <Route path="/products/add" element={<AddProducts/>} />}
                    {role === "store" && <Route path="/products/update/:id" element={<UpdateProducts/>} />}
                    {role === "store" && <Route path="/products/announcements/add" element={<AddPromotion/>} />}
                    {role === "store" && <Route path="/stock" element={<Stock />} />}

                    {role === "supply" && <Route path="/" element={<Supply/>} />}
                    {role === "supply" && <Route path="/supply" element={<Supply/>} />}
                    {role === "supply" && <Route path="/supply/track/:id" element={<TrackSupplyOrder/>} />}
                    {role === "supply" && <Route path="/stock" element={<Stock/>} />}


                    {role === "orders" && <Route path="/" element={<Orders/>} />}
                    {role === "orders" && <Route path="/orders" element={<Orders/>} />}
                    {role === "orders" && <Route path="/delivery" element={<Delivery/>} />}


                    {role === "admin" && <Route path="/" element={<Products/>} />}
                    {role === "admin" && <Route path="/products" element={<Products/>} />}
                    {role === "admin" && <Route path="/products/add" element={<AddProducts/>} />}
                    {role === "admin" && <Route path="/products/update/:id" element={<UpdateProducts/>} />}
                    {role === "admin" && <Route path="/products/announcements/add" element={<AddPromotion/>} />}
                    {role === "admin" && <Route path="/stock" element={<Stock />} />}

                    {role === "admin" && <Route path="/" element={<Supply/>} />}
                    {role === "admin" && <Route path="/supply" element={<Supply/>} />}
                    {role === "admin" && <Route path="/supply/track/:id" element={<TrackSupplyOrder/>} />}
                    {role === "admin" && <Route path="/stock" element={<Stock/>} />}


                    {role === "admin" && <Route path="/" element={<Orders/>} />}
                    {role === "admin" && <Route path="/orders" element={<Orders/>} />}
                    {role === "admin" && <Route path="/delivery" element={<Delivery/>} />}



                    
                    
                   
                    
                    <Route path="/users" element={<Users/>} />


                </Routes>
                
              </div>
            </div>

            

          </div>
        </BrowserRouter>
      </div>    
    </div>  
  )
}

export default App

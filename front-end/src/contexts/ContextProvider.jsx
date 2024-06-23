import React, { useEffect, createContext, useContext, useState } from 'react'

const StateContext = createContext();
const user = JSON.parse(localStorage.getItem('user'));
const initialState = {
	profile: false,
	settings: false,
	notifications: false,
	add: false,
}

export const ContextProvider = ({ children }) => {

	const [role, setRole] = useState(user ? user.role : "none");

	const [activeMenu, setActiveMenu] = useState(false);
	const [isClicked, setIsClicked] = useState(initialState);
	
	const [multiOptions, setMultiOptions] = useState(false);

	const [isOpenModal, setIsOpenModal] = useState(false);
	const [isOpenSupplyModal, setIsOpenSupplyModal] = useState(false);
	const [isOpenOrderModal, setIsOpenOrderModal] = useState(false);
	const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);

	const [selectedSearch, setSelectedSearch] = useState(null);
	const [selectedOrder, setSelectedOrder] = useState(null);

	const [activeUtilityMenu, setActiveUtilityMenu] = useState(false);
	const [activeCategotiesForm, setActiveCategotiesForm] = useState(false);

	const [updateImage, setUpdateImage] = useState('');
	const [categoryImage, setCategoryImage] = useState('');
	const [updateImage2, setUpdateImage2] = useState('');

  	const [selectedTags, setSelectedTags] = useState([]);
	
	
	const [updateProductName, setUpdateProductName] = useState('');
	const [updateProductBrand, setUpdateProductBrand] = useState('Brand');
	const [updateProductCategory, setUpdateProductCategory] = useState('Category');
	const [updateProductPrice, setUpdateProductPrice] = useState(null);
	const [updateProductQuantity, setUpdateProductQuantity] = useState(null);
	const [updateProductDescription, setUpdateProductDescription] = useState('');
	const [updateProductTags, setUpdateProductTags] = useState([]);


	const [categoryName, setCategoryName] = useState('');
	
	//const [update, setUpdate] = useState(false);

	const handleClick = (clicked) => {
		setIsClicked({ ...initialState, [clicked]: true });
	}


	const [products, setProducts] = useState([]);
	const [filtredProducts, setFiltredProducts] = useState([]);

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

	function updateProductsData(){
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
	}

	const [pending, setPending] = useState([]);
  	const [filtredPending, setFiltredPending] = useState([]);

  	const [inStock, setInStock] = useState([]);
  	const [filtredInStock, setFiltredInStock] = useState([]);



	useEffect(() => {
		fetch('http://192.168.0.138:8080/products/list')
			.then(response => response.json())
			.then(data => {
				const filtred = data.filter(product => product.status !== 'In Stock');
				setPending(filtred);
				setFiltredPending(filtred);
			});

	}, []);

	const [supplyOrders, setSupplyOrders] = useState([]);
  	const [filtredSupplyOrders, setFiltredSupplyOrders] = useState([]);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/suppliersOrders/list')
			.then(response => response.json())
			.then(data => {
				setSupplyOrders(data);
				setFiltredSupplyOrders(data);
			});

	}, []);

	const [pendingV, setPendingV] = useState([]);
  	const [filtredPendingV, setFiltredPendingV] = useState([]);
  
	useEffect(() => {
		fetch('http://192.168.0.138:8080/variants/list')
			.then(response => response.json())
			.then(data => {
				const filtred = data.filter(product => product.status !== 'In Stock');
				setPendingV(data);
				setFiltredPendingV(data);
			});

	}, []);


	const [catalog, setCatalog] = useState([]);
  	const [filtredCatalog, setFiltredCatalog] = useState([]);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/catalog/list')
			.then(response => response.json())
			.then(data => {
				
				setCatalog(data);
				setFiltredCatalog(data);
			});

	}, []);

	const [supplierProducts, setsupplierProducts] = useState([]);
  	const [filtredSupplierProducts, setFiltredSupplierProducts] = useState([]);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/catalog/list')
			.then(response => response.json())
			.then(data => {
				setsupplierProducts(data);
				setFiltredSupplierProducts(data);
			});

	}, []);

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
			updateProductsData();
			return response;
		  }
		})
		.catch(error => {
		  
		});
	}

	const [categories, setCategories] = useState([]);
	const [filtredCategories, setFiltredCategories] = useState([]);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/categories/list')
			.then(response => response.json())
			.then(data => {setCategories(data); setFiltredCategories(data)});
	}, []);

	function updateCategoriesData(){
		fetch('http://192.168.0.138:8080/categories/list')
			.then(response => response.json())
			.then(data => {setCategories(data); setFiltredCategories(data)});
	}

	const [types, setTypes] = useState([]);
  	const [filtredTypes, setFiltredTypes] = useState([]);
	

  	useEffect(() => {
		fetch('http://192.168.0.138:8080/types/list')
			.then(response => response.json())
			.then(data => {setTypes(data); setFiltredTypes(data);});
	}, []);

	function updateTypesData(){
		fetch('http://192.168.0.138:8080/types/list')
			.then(response => response.json())
			.then(data => {setTypes(data); setFiltredTypes(data);});
	}

 	
 	const [brands, setBrands] = useState([]);
  	const [filtredBrands, setFiltredBrands] = useState([]);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/brands/list')
			.then(response => response.json())
			.then(data => {setBrands(data); setFiltredBrands(data);});
	}, []);

	function updateBrandsData(){
		fetch('http://192.168.0.138:8080/brands/list')
			.then(response => response.json())
			.then(data => {setBrands(data); setFiltredBrands(data);});
	}


	const [tags, setTags] = useState([]);
  	const [filtredTags, setFiltredTags] = useState([]);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/tags/list')
			.then(response => response.json())
			.then(data => {setTags(data); setFiltredTags(data);});
	}, []);

	function updateTagsData(){
		fetch('http://192.168.0.138:8080/tags/list')
			.then(response => response.json())
			.then(data => {setTags(data); setFiltredTags(data);});
	}
	const [Announcement, setAnnouncement] = useState([]);
	const [filtredAnnouncement, setFiltredAnnouncement] = useState([]);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/announcement/list')
			.then(response => response.json())
			.then(data => {setAnnouncement(data); setFiltredAnnouncement(data)});
	}, []);

	const [suppliers, setSuppliers] = useState([]);
  	const [filtredSuppliers, setFiltredSuppliers] = useState([]);

	useEffect(() => {
		fetch('http://192.168.0.138:8080/suppliers/list')
			.then(response => response.json())
			.then(data => {setSuppliers(data); setFiltredSuppliers(data)});
	}, []);	

	const [activePopup, setActivePopup] = useState(false);
	const [popupType, setPopupType] = useState("alert");
	const [popupMessage, setPopupMessage] = useState("An error has occured, please close this popup.");

	function handlePopup(condition){
		setActivePopup(condition);
	}
	


	return(
		<StateContext.Provider value={{
				activeMenu, setActiveMenu,
				isClicked, setIsClicked,
				activeUtilityMenu,
				handleClick, setActiveUtilityMenu,
				activeCategotiesForm, setActiveCategotiesForm,
				updateImage, setUpdateImage,
				updateImage2, setUpdateImage2,
				categoryImage, setCategoryImage,
				categoryName, setCategoryName,
				isOpenModal, setIsOpenModal,

				products, setProducts,
				filtredProducts, setFiltredProducts,
				updateProductsData, handleActivity,

				categories, setCategories,
				filtredCategories, setFiltredCategories,

				types, setTypes,
				filtredTypes, setFiltredTypes,

				brands, setBrands,
				filtredBrands, setFiltredBrands,
				
				tags, setTags,
				filtredTags, setFiltredTags,

				Announcement, setAnnouncement,
				filtredAnnouncement, setFiltredAnnouncement,

				updateCategoriesData, updateTypesData, updateTagsData, updateBrandsData,

				catalog, setCatalog,
				filtredCatalog, setFiltredCatalog,

				supplierProducts, setsupplierProducts,
				filtredSupplierProducts, setFiltredSupplierProducts,

				isOpenUpdateModal, setIsOpenUpdateModal,
				updateProductName, setUpdateProductName,
				updateProductBrand, setUpdateProductBrand,
				updateProductCategory, setUpdateProductCategory,
				updateProductPrice, setUpdateProductPrice,
				updateProductQuantity, setUpdateProductQuantity,
				updateProductDescription, setUpdateProductDescription,
				updateProductTags, setUpdateProductTags,
				multiOptions, setMultiOptions,

				pending, setPending,
				filtredPending, setFiltredPending,

				pendingV, setPendingV,
				filtredPendingV, setFiltredPendingV,

				isOpenSupplyModal, setIsOpenSupplyModal,
				selectedSearch, setSelectedSearch,

				isOpenOrderModal, setIsOpenOrderModal,
				selectedOrder, setSelectedOrder,

				supplyOrders, setSupplyOrders,
				filtredSupplyOrders, setFiltredSupplyOrders,

				suppliers, setSuppliers,
				filtredSuppliers, setFiltredSuppliers,

				role, setRole,

				activePopup, setActivePopup, handlePopup, popupMessage, setPopupMessage, popupType, setPopupType
			}}>
			
			{ children }
		</StateContext.Provider>
	)
}

export const useStateContext = () => useContext(StateContext);
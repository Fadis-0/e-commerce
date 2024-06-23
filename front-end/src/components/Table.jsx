import React from 'react'
import { useTable } from 'react-table'

import { FiMinusSquare } from 'react-icons/fi'
import { useStateContext } from '../contexts/ContextProvider'



function Table({columns, data, updateData, selectedProduct, setSelectedProduct, setActiveUtilityMenu}) {
	
	const { updateImage, setUpdateImage, updateImage2, setUpdateImage2, setActiveCategotiesForm } = useStateContext();

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data,
		});

	function handleDelete(id) {
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

	function handleClick(product){
		setSelectedProduct(product);
		setUpdateImage(product.image_url);
		setUpdateImage2(product.image_url2);
		setActiveCategotiesForm(false);
		setActiveUtilityMenu(true);
	}

	

	return (
		<table {...getTableProps()} className="table w-full">
			
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()} className="header">
						<th>
						</th>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps()} >{column.render("Header")}</th>
						))}
						<th></th>
						
					</tr>

				))}
			</thead>

			<tbody {...getTableProps()}>
				{rows.map((row, i) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()} className="row" onClick={()=>handleClick(rows[i].values)}>
							<td>
								<input className="mt-2 ml-4 mr-2 w-4 h-4 cursor-pointer" type="checkbox"/>
							</td>
							{row.cells.map((cell) => {
								return <td {...cell.getCellProps()} className="td">{cell.render("Cell")}</td>;
							})}
							<td className="td"><button type="button" onClick={() => handleDelete(row.cells[0].render("Cell").props.value)} className="mt-2 ml-2"><FiMinusSquare className="text-2xl text-gray-400 hover:text-rose-500"/></button></td>
							
						</tr>

					);
				})}
				
			</tbody>
		</table>
	);
}


export default Table;
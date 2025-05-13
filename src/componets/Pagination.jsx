import React from 'react'
import "../App.css"

const Pagination = ({currentPage, totalPage, onPageChange, pokemonPerPage, setPokemonPerPage}) => {
	const pageNumbers = Array.from({length: totalPage}, (_, index)=> index+1)
	
  return (
	<>
	<div
		style={{
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginTop: '30px',
			flexWrap: 'wrap',
			rowGap: '10px'
		  }}
	>
		<div style={{display:'flex', alignItems:'center', gap:'10px', fontSize:'16px'}}>
		<label htmlFor="pageSizeSelect">Select page size:</label>
		<select value={pokemonPerPage}
			onChange={(e)=>{
				setPokemonPerPage(Number(e.target.value));
				onPageChange(1);
			}}
			
			style={{marginLeft:'0px', fontSize:'16px', padding:'5px'}}
		>
			<option value={10}>10</option>
			<option value={20}>20</option>
			<option value={50}>50</option>	
		</select>
		</div>


		<div className='pagination' style={{display:'flex', alignItems:'center', gap:'2px', fontSize:'16px'}}>
			{pageNumbers.map((index)=>
			<button 
				key={index} 
				onClick={()=> onPageChange(index)}
				className={currentPage === index ? "active": ""}
			>
				{index}
			</button>
			)}
		</div>
	</div>
	</>
  )
}

export default Pagination
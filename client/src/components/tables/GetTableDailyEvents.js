import React, { Fragment, useEffect, useState } from "react";
import Fuse from "fuse.js";

const TableDailyEvents = () => {
	
// 	Methods
	
	const [data, setData] = useState([]);
	
	const getData = async () => {
		try {
			const response = await fetch("/events/daily_name");
      		const jsonData = await response.json();
			
			setData(jsonData);
		} catch (err) {
			console.error(err);
		}
	}
	
	useEffect(() => {
    getData();
  }, []);
	
	console.log(data);
	
	const fuse = new Fuse(data, {
		keys: [
			'name',
			'date',
			'events'],
		includeScore: true
	})
	
	const [query, updateQuery] = useState('');
	
	
	const results = fuse.search(query);
	
	const dataResults = query ? results.map(data => data.item) : data;
	
	console.log('results', results)
	
	function onSearch({ currentTarget }) {
	  updateQuery(currentTarget.value);
	}
	
	return (
		<Fragment>
			<div className="input-group mb-3">
			  <div class="input-group-prepend">
				<span class="input-group-text" id="basic-addon1">Search</span>
			  </div>
			  <input type="text" value={query} onChange={onSearch} className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1" />
			</div>
			<table className="table mt-5 text-center">
			<thead>
			  <tr>
				<th>Date</th>
				<th>Location</th>
				<th>Events</th>
			  </tr>
			</thead>
			<tbody>			  
			  {dataResults.map(result => (
				<tr key={result.data_id}>
				  <td>{result.date}</td>
				  <td>{result.name}</td>
				  <td>{result.events}</td>
				</tr>
			  ))}
			</tbody>
		  </table>
		</Fragment>
	)
}

export default TableDailyEvents;

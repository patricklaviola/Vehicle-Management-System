import { useEffect, useState } from 'react';

function SalespersonHistory() {
  const [sales, setSales] = useState([])
  
  const getData = async () => {
    const response = await fetch('http://localhost:8090/api/sales/');
    
    if (response.ok) {
      const data = await response.json();
      setSales(data.sales)
    }
  };
  
  useEffect(()=>{
    getData()
  }, [])
  
  
  // FILTER BY SALESPERSON
  const [searchBySalesperson, setSearchBySalesperson] = useState('');
  const filteredSales = sales.filter(sale => {
    return searchBySalesperson === '' || sale.salesperson.includes(searchBySalesperson);
  });
  const handleSearchChange = (e) => {
    setSearchBySalesperson(e.target.value);
  }
  const handleClick = () => {
    getData();
  };

  
  return (
    <>
    <h1 className='py-4'>Service History</h1>
    <div className="input-group mb-3">
        <input value={searchBySalesperson} onChange={handleSearchChange} type="text" className="form-control" placeholder="Search by Salesperson..." aria-label="Search by Salesperson..." aria-describedby="button-addon2"/>
        <button onClick={handleClick} className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
    </div>
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Salesperson</th>
                <th>Customer</th>
                <th>VIN</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody>
        {filteredSales.map(sale => {
            return (
                <tr key={sale.id}>
                    <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                    <td>{sale.automobile.vin}</td>
                    <td>{sale.price}</td>
                </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}

export default SalespersonHistory;
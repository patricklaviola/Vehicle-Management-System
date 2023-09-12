import { useEffect, useState } from 'react';

function SalespersonHistory() {
    const [sales, setSales] = useState([])
    const [salespeople, setSalespeople] = useState([]);
    const [salesperson, setSalesperson] = useState('');

    const handleSalespersonChange = (e) => {
        setSalesperson(e.target.value);
    }

    const fetchSalespeople = async () => {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    };

    useEffect(() => {
        fetchSalespeople()
          .catch(err => {
            console.log(err)
          })
    }, [])

    const fetchSales = async () => {
        setSalesperson('');
        try {
            const response = await fetch('http://localhost:8090/api/sales/');
            const data = await response.json();      
            setSales(data.sales);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchSales()
          .catch(err => {
            console.log(err)
          })
    }, [])
    
    // useEffect(() => {
    //     const filtered = sales.filter(sale => 
    //       sale.salesperson.id === salesperson);  
    //     console.log(filtered)  
    //     setFilteredSales(filtered);    
    //   }, [sales, salesperson]);
    

    

    return (
        <>
        <h1 className='py-4'>Service History</h1>
        <label htmlFor="salesperson">Salesperson</label>
        <div className="input-group mb-3">
            <select onChange={handleSalespersonChange} value={salesperson} required name="salesperson" id="salesperson" className="form-select">
                <option value="">Choose a Salesperson...</option>
                {salespeople.map(salesperson => {
                    return(
                        <option key={salesperson.id} value={salesperson.employee_id}>{salesperson.first_name} {salesperson.last_name}</option>
                    )
                })}
            </select>
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
            {sales
            .filter((sale) => {
              return sale.salesperson.employee_id.toString() === salesperson;
            })
            .map((sale) => {
              return (
                <tr key={sale.id}>
                    <td>
                        {sale.salesperson.first_name} {sale.salesperson.last_name}
                    </td>
                    <td>
                        {sale.customer.first_name} {sale.customer.last_name}
                    </td>
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
import { useEffect, useState } from 'react';


// Define functional React Component 'SalesList' that takes a props object as an argument.
function SalesList() {
    const [sales, setSales] = useState([])

        const fetchSales = async () => {
            const response = await fetch("http://localhost:8090/api/sales/");
            if (response.ok) {
                const data = await response.json();
                setSales(data.sales);
            }
        }

        useEffect(() => {
            fetchSales();
        }, []);

    return (
        <>
            <h1 className="list-heading" id="sales-heading">Sales</h1>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson Employee ID</th>
                            <th>Salesperson Name</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map(sale => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.salesperson.employee_id}</td>
                                    <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                    <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>{sale.price}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SalesList;
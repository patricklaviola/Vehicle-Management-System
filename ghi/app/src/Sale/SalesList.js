// Show a list of Sales in Sales!
// Create link 'Sales' in navbar!

// Define functional React Component 'SalesList' that takes a props object as an argument.
function SalesList(props) {
    // Check if sales prop is undefined:
    if (props.sales === undefined)
        // If yes, return null
        return null;

    return (
        <>
        <h1>Sales</h1>
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
                    {props.sales.map(sale => {
                        return (
                            <tr key={sale.id}>
                                <td>{sale.salesperson.employee_id}</td>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>{sale.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
};

export default SalesList;
// Show a list of Customers in Sales!
// Create 'Customers' link in navbar!


function CustomersList(props) {
    if (props.customers === undefined) {
        return null;
    }
    return (
        <>
            <h1 className="list-heading" id="customers-heading">Customers</h1>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.customers.map(customer => {
                            return (
                                <tr key={customer.id}>
                                    <td>{customer.first_name}</td>
                                    <td>{customer.last_name}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.phone_number}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default CustomersList;
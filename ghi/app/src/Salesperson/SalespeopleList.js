// Show a list of Salespeople in Sales!
// Create 'Salespeople' link in navbar!

function SalespeopleList(props) {
    if (props.salespeople === undefined) {
        return null;
    }
    return (
        <>
            <h1 className="list-heading" id="salespeople-heading">Salespeople</h1>
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.salespeople.map(salesperson => {
                            return (
                                <tr key={salesperson.id}>
                                    <td>{salesperson.employee_id}</td>
                                    <td>{salesperson.first_name}</td>
                                    <td>{salesperson.last_name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SalespeopleList;
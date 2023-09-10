// Create a new instance of Sale in Sales!
// Create link 'Record a new sale' in navbar

/*
SPECIAL FEATURE 1: Unsold Only
- All automobiles available for sale must come from inventory and be unsold.
- Requires that already sold automobiles can be detected after a sale. 
- A sold field is available within the Automobile inventory model.
*/
import React, { useEffect, useState } from 'react';


function SaleForm ({fetchSales, fetchAutomobiles}) {
    // Define state variables using useState hook to manage the following:
    const [automobiles, setAutomobiles] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');

    // Define event handlers for each input field using useState hook:
    // Updates specified automobile VIN
    const handleAutomobileChange = (e) => {
        setAutomobile(e.target.value);
    };
    // Updates specified salesperson 
    const handleSalespersonChange = (e) => {
        setSalesperson(e.target.value);
    };
    // Updates specified customer
    const handleCustomerChange = (e) => {
        setCustomer(e.target.value);
    };
    // Updates entered price of the sale
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };


    // Define handleSubmit function to handle form submission
    const handleSubmit = async (e) => {
        // Prevent default form submission behavior
        e.preventDefault();
        // Create newSaleData object with selected data
        const newSaleData = {
            automobile: automobile,
            salesperson: salesperson,
            customer: customer,
            price: price
        };

        // fetchSales, pass as prop to the SaleForm component
        // Define URL and fetch configuration for new sale data
        const saleUrl = "http://localhost:8090/api/sales";
        const saleFetchConfig = {
            method: "POST",
            body: JSON.stringify(newSaleData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // Send POST request to the sales API endpoint with newSaleData as the body
        const saleResponse = await fetch(saleUrl, saleFetchConfig);

        // fetchAutomobiles, pass as prop to the SaleForm component
        // Fefine URL and fetch configuration for automobile data
        const automobileUrl = `http://localhost:8100${automobile}`;
        const automobileFetchConfig = {
            method: "PUT",
            body: JSON.stringify({sold: true}),

            headers: {
                'Content-Type': 'application/json',
            },
        };
        // Send PUT request to the automobile API endpoint with sold field set to true for the selected automobile
        const automobileResponse = await fetch(automobileUrl, automobileFetchConfig);

       // If both requests are successful, update state variables using fetch functions and reset input fields 
        if (saleResponse.ok && automobileResponse.ok) {
            // Fetch updated data from API endpoints 
            fetchSales();
            fetchAutomobiles();
            fetchSalesDataForAllCategories();
            // Reset input fields to their inital state
            setAutomobile('');
            setSalesperson('');
            setCustomer('');
            setPrice('');
        };
    };

    // Define fetchSaleDataForAllCategories function and call it when the component mounts: 
    const fetchSalesDataForAllCategories = async () => {
        // Send GET request to the automobiles API endpoint
        const automobileUrl = "http://localhost:8090/api/cars/";
        const automobileResponse = await fetch(automobileUrl);
        if (automobileResponse.ok) {
            // If the request is successful, update state variable with response data 
            const automobileJsonData = await automobileResponse.json();
            setAutomobiles(automobileJsonData.automobiles);
        };
        // Send GET request to the salespeople API endpoint
        const salespersonUrl = "http://localhost:8090/api/salespeople/";
        const salespersonResponse = await fetch(salespersonUrl);
        if (salespersonResponse.ok) {
            // if the the request is successful, update state variable with response data 
            const salespersonJsonData = await salespersonResponse.json();
            setSalespeople(salespersonJsonData.salespeople);
        };
        // Send GET response to the customer API endpoint 
        const customerUrl = "http://localhost:8090/api/customers/";
        const customerResponse = await fetch(customerUrl);
        if (customerResponse.ok) {
            // if the the request is successful, update state variable with response data 
            const customerJsonData = await customerResponse.json();
            setCustomers(customerJsonData.customers);
        };
    };

    // Call fetchData function when component mounts to update state variables with inital data using useEffect hook:
    useEffect(() => {
        fetchSalesDataForAllCategories();
    }, []);

    // Return JSX element that renders form with the input fields for automobile VIN, salesperson, customer, and price, and submit button.
    // The select and option tags are formatted differently than input tags
    return (
        <>
            <div className="row">
                <div className ="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Record a New Sale</h1>
                        <form onSubmit={handleSubmit} id="new-sale-form">
                            <label htmlFor='automobile'>Automobile VIN</label>
                                <div className="mb-3">
                                    <select className="form-select" required name="automobile" id="automobile" value={automobile} onChange={handleAutomobileChange}>
                                        {/* option element should have the value attribute set to an empty string, so user is indicated to select an option. */}
                                        <option value="">Choose an automobile VIN...</option>
                                            {automobiles.map(automobile => {
                                                if (!automobile.sold) {
                                                    return (
                                                        <option key={automobile.id} value={automobile.id}>
                                                            {automobile.vin}
                                                        </option>
                                                    );
                                                }
                                                return undefined;
                                            })}
                                    </select>
                                </div>
                            <label htmlFor='salesperson'>Salesperson</label>
                                <div className="mb-3">
                                    <select className="form-select" required name="salesperson" id="salesperson" value={salesperson} onChange={handleSalespersonChange}>
                                        <option value="">Choose a salesperson...</option>
                                            {salespeople.map(salesperson => {
                                                return (
                                                    <option key={salesperson.id} value={salesperson.id}>
                                                        {salesperson.first_name} {salesperson.last_name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            <label htmlFor='customer'>Customer</label>
                                <div className="mb-3">
                                    <select className="form-select" required name="customer" id="customer" value={customer} onChange={handleCustomerChange}>
                                        <option value="">Choose a customer...</option>
                                            {customers.map(customer => {
                                                return (
                                                    <option key={customer.id} value={customer.id}>
                                                        {customer.first_name} {customer.last_name}
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                            <label htmlFor='price'>Price</label>
                                <div className="mb-3">
                                    <input className="form-control" type="text" placeholder="$$$" required name="price" id="price" value={price} onChange={handlePriceChange}/>
                                </div>
                            <button className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SaleForm;
// Create a new instance of Sale in Sales!
// Create link 'Record a new sale' in navbar

/*
SPECIAL FEATURE 1: Unsold Only
- All automobiles available for sale must come from inventory and be unsold.
- Requires that already sold automobiles can be detected after a sale. 
- A sold field is available within the Automobile inventory model.
*/
import React, { useEffect, useState } from 'react';


function SaleForm () {
    // Define state variables using useState hook to manage the following:
    const [automobiles, setAutomobiles] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const [salespeople, setSalespeople] = useState([]);
    const [salesperson, setSalesperson] = useState('');
    const [customers, setCustomers] = useState([]);
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


    const fetchAutomobiles = async () => {
        // Send GET request to the automobile API endpoint
        const url = "http://localhost:8090/api/automobile/";
        const response = await fetch(url);
        if (response.ok) {
            // If the request is successful, update state variable with response data 
            const data = await response.json();
            setAutomobiles(data.automobiles);
        };
    };

    const fetchAutomobile = async () => {
        // Send GET request to the automobile API endpoint
        const url = "http://localhost:8090/api/automobile/:vin/";
        const response = await fetch(url);
        if (response.ok) {
            // If the request is successful, update state variable with response data 
            const data = await response.json();
            setAutomobile(data.automobile);
        };
    };

    const fetchSalespeople = async () => {
        // Send GET request to the salespeople API endpoint
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url);
        if (response.ok) {
            // if the the request is successful, update state variable with response data 
            const data = await response.json();
            setSalespeople(data.salespeople);
        };
    };

    const fetchSalesperson = async () => {
        // Send GET request to the salespeople API endpoint
        const url = "http://localhost:8090/api/salespeople/:id/";
        const response = await fetch(url);
        if (response.ok) {
            // if the the request is successful, update state variable with response data 
            const data = await response.json();
            setSalesperson(data.salesperson);
        };
    };
    
    const fetchCustomers = async () => {
        // Send GET response to the customer API endpoint 
        const url = "http://localhost:8090/api/customers/";
        const response = await fetch(url);
        if (response.ok) {
            // if the the request is successful, update state variable with response data 
            const data = await response.json();
            setCustomers(data.customers);
        };
    };

    const fetchCustomer = async () => {
        // Send GET response to the customer API endpoint 
        const url = "http://localhost:8090/api/customers/:id/";
        const response = await fetch(url);
        if (response.ok) {
            // if the the request is successful, update state variable with response data 
            const data = await response.json();
            setCustomer(data.customer);
        };
    };
    
    // Call the fetch functions when component mounts to update state variables with inital data using useEffect hook:
    useEffect(() => {
        fetchAutomobiles();
        fetchAutomobile();
        fetchSalespeople();
        fetchSalesperson();
        fetchCustomers();
        fetchCustomer();
    }, []);


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

        // Define URL and fetch configuration for automobile data
        const automobileUrl = `http://localhost:8100${automobile}`;
        const automobileFetchConfig = {
            method: "PUT",
            body: JSON.stringify({"sold": true}),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        // Send PUT request to the automobile API endpoint with sold field set to true for the selected automobile
        const automobileResponse = await fetch(automobileUrl, automobileFetchConfig);

       // If both requests are successful, update state variables using fetch functions and reset input fields 
        if (saleResponse.ok && automobileResponse.ok) {
            // Fetch updated data from API endpoints 
            fetchAutomobiles();
            fetchAutomobile();
            fetchSalespeople();
            fetchSalesperson();
            fetchCustomers();
            fetchCustomer();
            // Reset input fields to their inital state
            setAutomobile('');
            setSalesperson('');
            setCustomer('');
            setPrice('');
        };
    };


    // Return JSX element that renders form with the input fields for automobile VIN, salesperson, customer, and price, and submit button.
    // The select and option tags are formatted differently than input tags
    return (
        <>
            <div className="row">
                <div className ="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Record a New Sale</h1>
                        <form onSubmit={handleSubmit} id="record-sale-form">
                            <div className="form-floating mb-3">
                                <label htmlFor='automobile'>Automobile VIN</label>
                                <select className="form-select" required name="automobile" id="automobile" value={automobile} onChange={handleAutomobileChange}>
                                    {/* option element should have the value attribute set to an empty string, so user is indicated to select an option. */}
                                    <option value="">Choose an Automobile VIN</option>
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
                            <div className="form-floating mb-3">
                                <label htmlFor='salesperson'>Salesperson</label>
                                <select className="form-select" required name="salesperson" id="salesperson" value={salesperson} onChange={handleSalespersonChange}>
                                    <option value="">Choose a salesperson</option>
                                        {salespeople.map(salesperson => {
                                            return (
                                                <option key={salesperson.id} value={salesperson.id}>
                                                    {salesperson.first_name} {salesperson.last_name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <label htmlFor='customer'>Customer</label>
                                <select className="form-select" required name="customer" id="customer" value={customer} onChange={handleCustomerChange}>
                                    <option value="">Choose a customer</option>
                                        {customers.map(customer => {
                                            return (
                                                <option key={customer.id} value={customer.id}>
                                                    {customer.first_name} {customer.last_name}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <label htmlFor='price'>Price</label>
                                <input className="form-control" type="text" placeholder="0" required name="price" id="price" value={price} onChange={handlePriceChange}/>
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
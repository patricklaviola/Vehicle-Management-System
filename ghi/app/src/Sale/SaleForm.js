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
    const handleAutomobileChange = e => {
        setAutomobile(e.target.value);
    };
    // Updates specified salesperson 
    const handleSalespersonChange = e => {
        setSalesperson(e.target.value);
    };
    // Updates specified customer
    const handleCustomerChange = e => {
        setCustomer(e.target.value);
    };
    // Updates entered price of the sale
    const handlePriceChange = e => {
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

        // Send POST request to the sales API endpoint with newSaleData as the body
        const saleUrl = "http://localhost:8090/api/sales";
        const saleFetchConfig = {
            method: "POST",
            body: JSON.stringify(newSaleData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const saleResponse = await fetch(saleUrl, saleFetchConfig);

        // Send PUT request to the automobile API endpoint with sold field set to true for the selected automobile
        const automobileUrl = `http://localhost:8100${automobile}`;
        const automobileFetchConfig = {
            method: "PUT",
            body: JSON.stringify({sold: true}),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const automobileResponse = await fetch(automobileUrl, automobileFetchConfig);

        /* 
        If both requests are successful, update state variables using fetch functions for sales,
        automobiles, and customers, and reset all input fields to their inital state.
        */
        if (saleResponse.ok && automobileResponse.ok) {
            fetchSales();
            fetchAutomobiles();
            fetchData();
            setAutomobile('');
            setSalesperson('');
            setCustomer('');
            setPrice('');
        };
    };

    /* 
    Define a fetchData function that is called when the component mounts:
    Send GET requests to the automobiles, salespeople, and customers API endpoints. 
    If all requests are successful, update state variables with response data.
    */
    const fetchData = async () => {
        const automobileUrl = "http://localhost:8090/api/automobiles/";
        const automobileResponse = await fetch(automobileUrl);
        if (automobileResponse.ok) {
            const automobileJson = await automobileResponse.json();
            setAutomobiles(automobileJson);
        };
        const salespersonUrl = "http://localhost:8090/api/salespeople/";
        const salespersonResponse = await fetch(salespersonUrl);
        if (salespersonResponse.ok) {
            const salespersonJson = await salespersonResponse.json();
            setSalespeople(salespersonJson);
        };
        const customerUrl = "http://localhost:8090/api/customers/";
        const customerResponse = await fetch(customerUrl);
        if (customerResponse.ok) {
            const customerJson = await customerResponse.json();
            setCustomers(customerJson);
        };
    };

    // Call fetchData function using useEffect hook with component mounts:
    useEffect(() => {
        fetchData();
    }, []);

    // Return JSX element that displays a form with the input fields for automobile VIN, salesperson, customer, and price, and submit button.
    return (
        <>
            <div className="row">
                <div className ="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Record a New Sale</h1>
                        <form onSubmit={handleSubmit} id="record-sale-form">
                        <label htmlFor='automobile'>Automobile VIN</label>
                            <div className="mb-3">
                                <select onChange={handleAutomobileChange} placeholder="Choose an automobile VIN..." required name="automobile" id="automobile" className="form-select" value={automobile}>
                                    <option value="">Choose an Automobile</option>
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
                                <select onChange={handleSalespersonChange} placeholder="Choose a salesperson..." className="form-select" required name="salesperson" id="salesperson" value={salesperson}>
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
                            <label htmlFor='customer'>Customer</label>
                            <div className="mb-3">
                                <select onChange={handleCustomerChange} placeholder="Choose a customer" className="form-select" required name="customer" id="customer" value={customer}>
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
                            <label htmlFor='price'>Price</label>
                            <div className="mb-3">
                                <input onChange={handlePriceChange} placeholder="0" type="text" required name="price" id="price" value={price}/>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        
        </>
    )
};

export default SaleForm;
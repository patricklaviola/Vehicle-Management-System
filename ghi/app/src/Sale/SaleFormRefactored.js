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
    const [automobiles, setAutomobiles] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);

    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');
    const [automobile, setAutomobile] = useState('');
    // const [price, setPrice] = useState(0);

    const [FormData, setFormData] = useState({
        salesperson_id: '',
        customer_id:'',
        automobile_id:'',
        price:''
    });

    const handleChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value})
    };

    useEffect(() => {
        // fetch automobiles data from API and set to state
        fetch("api_automobile_details")
            .then(response => response.json())
            .then(data => setAutomobile(data));

        // fetch salespeople data from API and set to state
        fetch("api_salesperson_details")
            .then(response => response.json())
            .then(data => setSalesperson(data));

        // fetch customers data from API and set to state
        fetch("api_customer_details")
            .then(response => response.json())
            .then(data => setCustomer(data));

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // send form data to API for processing
        fetch("api_sale", {
            method: 'POST',
            body: JSON.stringify(FormData)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    };

    return (
        <>
            <div className="row">
                <div className ="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Record a New Sale</h1>
                        <form onSubmit={handleSubmit} id="record-sale-form">

                        <label htmlFor='automobile'>Automobile VIN</label>
                            <div className="mb-3">
                                <select onChange={handleChange} placeholder="Choose an automobile VIN..." required name="automobile" id="automobile" className="form-select" value={FormData.automobile_id}>
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
                                <select onChange={handleChange} placeholder="Choose a salesperson..." className="form-select" required name="salesperson" id="salesperson" value={FormData.salesperson_id}>
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
                                <select onChange={handleChange} placeholder="Choose a customer" className="form-select" required name="customer" id="customer" value={FormData.customer_id}>
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
                                <input onChange={handleChange} placeholder="0" type="number" required name="price" id="price" value={FormData.price_id}/>
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
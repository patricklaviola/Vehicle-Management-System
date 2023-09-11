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
    const [autos, setAutos] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [auto, setAuto] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');

    const handleAutoChange = (e) => {
        setAuto(e.target.value);
    };
    const handleSalespersonChange = (e) => {
        setSalesperson(e.target.value);
    };
    const handleCustomerChange = (e) => {
        setCustomer(e.target.value);
    };
    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };
    

    const fetchAutos = async () => {
		const url = "http://localhost:8100/api/automobiles/";
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			setAutos(data.autos);
		}
	};

    const fetchSalespeople = async () => {
        const url = "http://localhost:8090/api/salespeople/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salespeople);
        }
    };

    const fetchCustomers = async () => {
        const url = "http://localhost:8090/api/customers/";
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        }
    };

    useEffect(() => {
        fetchAutos();
        fetchSalespeople();
        fetchCustomers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSaleData = {
            auto: auto,
            salesperson: salesperson,
            customer: customer,
            price: price
        };

        const saleUrl = "http://localhost:8090/api/sales/";
        const saleFetchConfig = {
            method: "POST",
            body: JSON.stringify(newSaleData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const saleResponse = await fetch(saleUrl, saleFetchConfig);
        if (saleResponse.ok) {
            setAuto('');
            setSalesperson('');
            setCustomer('');
            setPrice('');
        };
    };
    return (
        <>
            <div className="row">
                <div className ="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Record a New Sale</h1>
                        <form onSubmit={handleSubmit} id="new-sale-form">
                            <label htmlFor='auto'>Automobile VIN</label>
                                <div className="mb-3">                                 
                                    <select className="form-select" required name="auto" id="auto" value={auto} onChange={handleAutoChange}>
                                        <option value="">Choose an automobile VIN...</option>
                                        {autos.map(auto => {
                                            return(
                                                <option key={auto.vin} value={auto.vin}>
                                                    {auto.vin}
                                                </option>
                                            );
                                        })}
                                    </select>                                    
                                </div>
                            <label htmlFor='salesperson'>Salesperson</label>
                                <div className="mb-3">
                                    <select className="form-select" required name="salesperson" id="salesperson" value={salesperson} onChange={handleSalespersonChange}>
                                        <option value="">Choose a salesperson...</option>
                                            {salespeople.map(salesperson => {
                                                return (
                                                    <option key={salesperson.employee_id} value={salesperson.employee_id}>
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
                                    <input className="form-control" type="number" placeholder="$$$" required name="price" id="price" value={price} onChange={handlePriceChange}/>
                                </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SaleForm;
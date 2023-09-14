
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SaleForm () {
    const navigate = useNavigate();
    const [autos, setAutos] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const [salespeople, setSalespeople] = useState([]);
    const [salesperson, setSalesperson] = useState('');
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');

    const handleAutomobileChange = (e) => {
        setAutomobile(e.target.value);
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
            const unsoldAutomobiles = data.autos.filter(
                (sales) => sales.sold === false
            );
            setAutos(unsoldAutomobiles);
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

    const unsoldAutos = autos.filter(auto => !auto.sold);

    const updateAuto = async (vin) => {
        try {
            const updateAutoUrl = `http://localhost:8100/api/automobiles/${vin}/`;
            const updateAutoData = {sold: true};
            const updateAutoFetchConfig = {
                method: "PUT",
                body: JSON.stringify(updateAutoData),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            const updateAutoResponse = await fetch(updateAutoUrl, updateAutoFetchConfig)
            if (updateAutoResponse.ok) {
                fetchAutos();
                navigate('/sales/');
            }
        } catch (error) {
            console.log('error updating auto')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSaleData = {
            automobile: automobile,
            salesperson: salesperson,
            customer: customer,
            price: price
        };
        // get sales
        const saleUrl = "http://localhost:8090/api/sales/";
        const saleFetchConfig = {
            method: "POST",
            body: JSON.stringify(newSaleData),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(saleUrl, saleFetchConfig);
        if (response.ok) {
            setAutomobile('');
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
                                    <select className="form-select" required name="auto" id="auto" value={automobile} onChange={handleAutomobileChange}>
                                        <option value="">Choose an automobile VIN...</option>
                                        {unsoldAutos.map(auto => {
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
                            <button type="submit" className="btn btn-primary" onClick={() => updateAuto(automobile)}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SaleForm;
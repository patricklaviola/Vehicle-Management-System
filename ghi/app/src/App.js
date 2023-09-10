import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';

import ManufacturersList from './Manufacturer/ManufacturersList';
import ManufacturerForm from './Manufacturer/ManufacturerForm';

import ModelsList from './VehicleModels/ModelsList';
import ModelForm from './VehicleModels/ModelForm';

import AutomobilesList from './Automobile/AutomobilesList';
import AutomobileForm from './Automobile/AutomobileForm';

import SalespeopleList from './Salesperson/SalespeopleList';
import SalespersonForm from './Salesperson/SalespersonForm';

import CustomersList from './Customer/CustomersList';
import CustomerForm from './Customer/CustomerForm';

import SalesList from './Sale/SalesList';
import SaleForm from './Sale/SaleForm';
import SalespersonHistory from './Salesperson/SalespersonHistory';

import TechniciansList from './Technician/TechniciansList';
import TechnicianForm from './Technician/TechnicianForm';

import AppointmentsList from './Appointment/AppointmentsList';
import AppointmentsForm from './Appointment/AppointmentForm';
import ServiceHistory from './Appointment/ServiceHistory';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>

          <Route path="/" element={<MainPage />} />

          <Route path="/manufacturers" element={<ManufacturersList />} />
          <Route path="/manufacturers/new" element={<ManufacturerForm />} />

          <Route path="/models" element={<ModelsList />} />
          <Route path="/models/new" element={<ModelForm />} />
    
          <Route path="/automobiles" element={<AutomobilesList />} />
          <Route path="/automobiles/new" element={<AutomobileForm />} />

          <Route path="/salespeople" element={<SalespeopleList />} />
          <Route path="/salespeople/new" element={<SalespersonForm />} />

          <Route path="/customers" element={<CustomersList />} />
          <Route path="/customers/new" element={<CustomerForm />} />

          <Route path="/sales" element={<SalesList />} />
          <Route path="/sales/new" element={<SaleForm />} />
          <Route path="/sales/history" element={<SalespersonHistory />} />
          
          <Route path="/technicians" element={<TechniciansList />} />
          <Route path="/technicians/new" element={<TechnicianForm />} />

          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/appointments/new" element={<AppointmentsForm />} />
          <Route path="/appointments/history" element={<ServiceHistory />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

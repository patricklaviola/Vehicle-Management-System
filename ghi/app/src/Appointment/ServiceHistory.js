import { useEffect, useState } from 'react';

function ServiceHistory() {
  const [appointments, setAppointments] = useState([])
  
  const getData = async () => {
    const response = await fetch('http://localhost:8080/api/appointments/');
    
    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments)
    }
  };
  
  useEffect(()=>{
    getData()
  }, [])
  
  
  // FILTER BY VIN
  const [searchByVIN, setSearchByVIN] = useState('');
  const filteredAppointments = appointments.filter(appointment => {
    return searchByVIN === '' || appointment.vin.includes(searchByVIN);
  });
  const handleSearchChange = (e) => {
    setSearchByVIN(e.target.value);
  }
  const handleClick = () => {
    getData();
  };

  
  return (
    <>
    <h1 className='py-4'>Service History</h1>
    <div className="input-group mb-3">
        <input value={searchByVIN} onChange={handleSearchChange} type="text" className="form-control" placeholder="Search by VIN..." aria-label="Search by VIN..." aria-describedby="button-addon2"/>
        <button onClick={handleClick} className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
    </div>
    <table className="table table-striped">
      <thead>
        <tr>
          <th>VIN</th>
          <th>Is VIP?</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Time</th>
          <th>Technician</th>
          <th>Reason</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {filteredAppointments.map(appointment => {
            const dateTimeObj = new Date(appointment.date_time);
            const formattedDate = `${dateTimeObj.getMonth() + 1}/${dateTimeObj.getDate()}/${dateTimeObj.getFullYear()}`;
            const hours = dateTimeObj.getUTCHours();
            const minutes = String(dateTimeObj.getUTCMinutes()).padStart(2, '0');
            const seconds = String(dateTimeObj.getUTCSeconds()).padStart(2, '0');
            const isPM = hours >= 12;
            const formattedTime = `${hours % 12 || 12}:${minutes}:${seconds} ${isPM ? 'PM' : 'AM'}`;
            return (
                <tr key={appointment.id}>
                    <td>{ appointment.vin }</td>
                    <td>{ appointment.is_vip ? "Yes" : "No" }</td>
                    <td>{ appointment.customer }</td>
                    <td>{ formattedDate }</td>
                    <td>{ formattedTime }</td>
                    <td>{ appointment.technician }</td>
                    <td>{ appointment.reason }</td>
                    <td>{ appointment.status }</td>
                </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}

export default ServiceHistory;
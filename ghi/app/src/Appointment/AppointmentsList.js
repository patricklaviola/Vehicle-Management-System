import { useEffect, useState } from 'react';

function AppointmentsList() {
  const [appointments, setAppointments] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8080/api/appointments/');

    if (response.ok) {
      const data = await response.json();
      setAppointments(data.appointments)
    }
  }

  useEffect(()=>{
    getData()
  }, [])
  
  return (
    <>
    <h2>Service Appointments</h2>
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {appointments.map(appointment => {
            const dateTimeObj = new Date(appointment.date_time);
            const formattedDate = `${dateTimeObj.getMonth() + 1}/${dateTimeObj.getDate()}/${dateTimeObj.getFullYear()}`;
            const hours = dateTimeObj.getHours();
            const minutes = String(dateTimeObj.getMinutes()).padStart(2, '0');
            const seconds = String(dateTimeObj.getSeconds()).padStart(2, '0');
            const isPM = hours >= 12;
            const formattedTime = `${hours % 12 || 12}:${minutes}:${seconds} ${isPM ? 'PM' : 'AM'}`;

            
            return (
                <tr key={appointment.id}>
                    <td>{ appointment.vin }</td>
                    <td>{ appointment.is_vip }</td>
                    <td>{ appointment.customer }</td>
                    <td>{ formattedDate }</td>
                    <td>{ formattedTime }</td>
                    <td>{ appointment.technician }</td>
                    <td>{ appointment.reason }</td>
                    <td>
                        <button type="button" className="btn btn-danger">Cancel</button> {/*add onClick event handler*/}
                        <button type="button" className="btn btn-success">Finish</button> {/*add onClick event handler*/}
                    </td>
                </tr>
          );
        })}
      </tbody>
    </table>
    </>
  );
}

export default AppointmentsList;
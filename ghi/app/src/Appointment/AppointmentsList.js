import { useEffect, useState } from 'react';

function AppointmentsList() {
  const [appointments, setAppointments] = useState([])

  const getData = async () => {
    const response = await fetch('http://localhost:8080/api/appointments/');

    if (response.ok) {
      const data = await response.json();
      // console.log(data);
      setAppointments(data.appointments)
      // console.log(data.appointments);
    }
  }

  useEffect(()=>{
    getData()
  }, [])

  // FINISH APPOINTMENT
  const handleFinishClick = async (id) => {
    const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      console.log("Appointment finished successfully");
      getData();
    } else {
      console.error("Failed to finish appointment");
    }
  };

  // CANCEL APPOINTMENT
  const handleCancelClick = async (id) => {
    const cancelUrl = `http://localhost:8080/api/appointments/${id}/cancel/`
    const fetchConfig = {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(cancelUrl, fetchConfig);

    if (response.ok) {
      console.log("Appointment canceled successfully");
      getData();
    } else {
      console.error('Failed to cancel appointment');
    }
  };

  
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
        {appointments.filter(appointment => appointment.status === "CREATED").map(appointment => {
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
                    <td>
                        <button onClick={() => handleCancelClick(appointment.id)} type="button" className="btn btn-danger">Cancel</button>
                        <button onClick={() => handleFinishClick(appointment.id)} type="button" className="btn btn-success">Finish</button>
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
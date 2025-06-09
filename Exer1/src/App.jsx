import React, { useState } from 'react';
import './App.css';

function UserForm() {
  const [submittedData, setSubmittedData] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const initialFormState = {
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    age: '',
    birthdate: '',
    address: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const birthDateObj = new Date(formData.birthdate);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      calculatedAge--;
    }

    if (parseInt(formData.age, 10) !== calculatedAge) {
      alert(`Age (${formData.age}) does not match Birthdate (${birthDateObj.toLocaleDateString()}). Please correct it.`);
      return;
    }

    setShowConfirmModal(true); // Ask for confirmation
  };

  const confirmSubmission = () => {
    setSubmittedData((prev) => [...prev, formData]);
    setShowConfirmModal(false);
    setShowFormModal(false);
    clearForm();
  };

  return (
    <div>
      <h2>User Form</h2>
      <button onClick={() => setShowFormModal(true)}>Add New User</button>

      {/* Form Modal */}
      {showFormModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter User Information</h3>
            <form onSubmit={handleSubmit} className="form-container">
              <input type="text" name="firstName" value={formData.firstName} placeholder="First name" onChange={handleChange} required />
              <input type="text" name="middleName" value={formData.middleName} placeholder="Middle name" onChange={handleChange} />
              <input type="text" name="lastName" value={formData.lastName} placeholder="Last name" onChange={handleChange} required />
              <input type="text" name="suffix" value={formData.suffix} placeholder="Suffix" onChange={handleChange} />
              <input type="number" name="age" value={formData.age} placeholder="Age" onChange={handleChange} required />
              <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required />
              <input type="text" name="address" value={formData.address} placeholder="Address" onChange={handleChange} required />
              <button type="submit">Submit</button>
              <button type="button" onClick={clearForm}>Clear</button>
              <button type="button" onClick={() => setShowFormModal(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Submission</h3>
            <p><strong>First Name:</strong> {formData.firstName}</p>
            <p><strong>Middle Name:</strong> {formData.middleName || 'N/A'}</p>
            <p><strong>Last Name:</strong> {formData.lastName}</p>
            <p><strong>Suffix:</strong> {formData.suffix || 'N/A'}</p>
            <p><strong>Age:</strong> {formData.age}</p>
            <p><strong>Birthdate:</strong> {new Date(formData.birthdate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <button onClick={confirmSubmission}>Confirm</button>
            <button onClick={() => setShowConfirmModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Table of Submitted Entries */}
      <h3>All Users</h3>
      <div className="submitted-table">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Suffix</th>
              <th>Age</th>
              <th>Birthdate</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.length > 0 ? (
              submittedData.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.firstName}</td>
                  <td>{entry.middleName || 'N/A'}</td>
                  <td>{entry.lastName}</td>
                  <td>{entry.suffix || 'N/A'}</td>
                  <td>{entry.age}</td>
                  <td>{new Date(entry.birthdate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  <td>{entry.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', fontStyle: 'italic' }}>
                  No data submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserForm;

import React, { useState } from 'react';
import './App.css';


function UserForm() {
 const [showModal, setShowModal] = useState(false);

const initialFormState = {
  name: '',
  email: '',
  firstName: '',
  lastName: '',
  middleName: '',
  suffix: '',
  age: '',
  birthdate: '',
  address: '',
};

 const [formData, setFormData] = useState(initialFormState);

 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData((prevData) => ({
     ...prevData,         // keep previous values
     [name]: value,       // update the changed field
   }));
 };

  const clearForm = () => {
  setFormData(initialFormState);
};

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate age from birthdate
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
      return; // stop submission
    }

    console.log('Form submitted:', formData);
    setShowModal(true); // Show the modal
  };
  

  const closeModal = () => {
    setShowModal(false);
  };

 return (
    <div >
      <h2>User Form</h2>

      {/* Inputs */}
      <form onSubmit={handleSubmit} className=  'form-container'>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          placeholder="Enter your first name"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="middleName"
          value={formData.middleName}
          placeholder="Enter your middle name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          placeholder="Enter your last name"
          onChange={handleChange}
          required
        />     
        <input
          type="text"
          name="suffix"
          value={formData.suffix}
          placeholder="Enter your suffix"
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          placeholder="Enter your age"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          placeholder="Enter your birthdate"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          placeholder="Enter your address"
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
        <button type="button" onClick={clearForm}>Clear</button>

      </form>


      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Submitted Information</h3>
            <p><strong>First Name:</strong> {formData.firstName}</p>
            <p><strong>Middle Name:</strong> {formData.middleName || 'N/A'}</p>
            <p><strong>Last Name:</strong> {formData.lastName}</p>
            <p><strong>Suffix:</strong> {formData.suffix || 'N/A'}</p>
            <p><strong>Age:</strong> {formData.age}</p>
            <p><strong>Birthdate:</strong> { new Date(formData.birthdate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}



    </div>
 );
}
export default UserForm;
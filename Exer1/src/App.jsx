import React, { useState } from 'react';
import './App.css';

function UserForm() {
  const [submittedData, setSubmittedData] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null); 
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

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

  const openAddModal = () => {
    clearForm();
    setEditIndex(null);
    setShowFormModal(true);
  };

  const openEditModal = (index) => {
    const userToEdit = submittedData[index];
    setFormData(userToEdit);
    setEditIndex(index);
    setShowFormModal(true);
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const openDeleteAllModal = () => {
    setShowDeleteAllModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, middleName, lastName, suffix, birthdate, age } = formData;

    const nameRegex = /^[A-Za-z][A-Za-z' -]*$/;
    const suffixRegex = /^[A-Za-z.]{0,5}$/;

    // Validate names
    if (!nameRegex.test(firstName)) {
      alert('First Name can only contain letters, spaces, hyphens, or apostrophes. And must start with a letter.');
      return;
    }

    if (middleName && !nameRegex.test(middleName)) {
      alert('Middle Name can only contain letters, spaces, hyphens, or apostrophes. And must start with a letter.');
      return;
    }

    if (!nameRegex.test(lastName)) {
      alert('Last Name can only contain letters, spaces, hyphens, or apostrophes. And must start with a letter.');
      return;
    }

    if (suffix && !suffixRegex.test(suffix)) {
      alert('Suffix can only contain letters, and dots. And must start with a letter. (max 5 characters).');
      return;
    }

    // Validate birthday and age
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
    if (editIndex !== null) {
      // Update existing entry
      setSubmittedData((prev) => {
        const updated = [...prev];
        updated[editIndex] = formData;
        return updated;
      });
    } else {
      // Add new entry
      setSubmittedData((prev) => [...prev, formData]);
    }

    setShowConfirmModal(false);
    setShowFormModal(false);
    clearForm();
    setEditIndex(null);
  };

  const confirmDelete = () => {
    setSubmittedData((prev) => prev.filter((_, idx) => idx !== deleteIndex));
    setShowDeleteModal(false);
    setDeleteIndex(null);
  };
  
  const confirmDeleteAll = () => {
    setSubmittedData([]);
    setShowDeleteAllModal(false);
  };



  return (
    <div>
      <h2>Exer 1</h2>
      <button className="submit-button" onClick={() => openAddModal()}>Add New User</button>

      {submittedData.length > 0 && (
        <button className="delete-button" onClick={() => openDeleteAllModal()}>Delete All</button>
      )}

      {/* Form Modal */}
      {showFormModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editIndex !== null ? 'Edit User Information' : 'Enter User Information'}</h3>
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
              <button type="button" onClick={() => { setShowFormModal(false); clearForm(); }}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm {editIndex !== null ? 'Update' : 'Submission'}</h3>
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

      {/* Confirmation of Deletion Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete <strong>{submittedData[deleteIndex].firstName} {submittedData[deleteIndex].lastName}</strong> ?</p>
            <button onClick={confirmDelete}>Yes</button>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Confirmation of Delete All Modal */}
      {showDeleteAllModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm Delete All</h3>
            <p>Are you sure you want to delete <strong>All User Information</strong> ?</p>
            <button onClick={confirmDeleteAll}>Yes</button>
            <button onClick={() => setShowDeleteAllModal(false)}>Cancel</button>
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
              <th>Actions</th>
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
                  <td>
                    <button className="edit-button" onClick={() => openEditModal(index)}>Edit</button>
                    <button className="delete-button" onClick={() => openDeleteModal(index)}>Delete</button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', fontStyle: 'italic' }}>
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

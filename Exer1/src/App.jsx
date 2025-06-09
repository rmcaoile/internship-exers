import React, { useState } from 'react';

function UserForm() {
 const [formData, setFormData] = useState({
   name: '',
   email: '',
 });

 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData((prevData) => ({
     ...prevData,         // keep previous values
     [name]: value,       // update the changed field
   }));
 };
 
 return (
   <div>
     <h2>User Form</h2>
     <input
       type="text"
       name="name"
       value={formData.name}
       placeholder="Enter your name"
       onChange={handleChange}
     />
     <input
       type="email"
       name="email"
       value={formData.email}
       placeholder="Enter your email"
       onChange={handleChange}
     />
     <p>Name: {formData.name}</p>
     <p>Email: {formData.email}</p>
   </div>
 );
}
export default UserForm;
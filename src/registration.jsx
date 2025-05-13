import { useState } from 'react';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import logo from "./images/logo.png";

const Registration = () => {
  const navigate = useNavigate(); // ✅ Use navigate hook for redirection

  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    age: '',
    pan: '',
    address: '',
    agree: false
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const mobileRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!mobileRegex.test(formData.mobile)) newErrors.mobile = 'Invalid mobile number';
    if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.age || formData.age < 18) newErrors.age = 'Must be at least 18 years old';
    if (!panRegex.test(formData.pan)) newErrors.pan = 'Invalid PAN format';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.agree) newErrors.agree = 'You must agree to terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission (e.g., API call)
      navigate('/login');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="registration-container">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Mobile:</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            maxLength="10"
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="18"
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label>PAN:</label>
          <input
            type="text"
            name="pan"
            value={formData.pan}
            onChange={handleChange}
            maxLength="10"
          />
          {errors.pan && <span className="error">{errors.pan}</span>}
        </div>

        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              
            />
             Agree <span className="nowrap">Terms & Conditions</span>
          </label>
          {errors.agree && <span className="error">{errors.agree}</span>}
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default Registration;
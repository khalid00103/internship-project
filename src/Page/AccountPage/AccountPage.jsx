import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode"; // Make sure to install jwt-decode if not installed
import './AccountPage.css';
import divineLogo from '/assets/AcountPage/images/divine logo vertical.png';
import logoBackground from '/assets/AcountPage/images/pink_design_cutout.png';
import dummy from './dummy.json';
import code from './code.json';

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Form = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [city, setCity] = useState('');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [dob, setDob] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const formatDate = (isoDateString) => {
    if (!isoDateString) return '';
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const decodedToken = jwtDecode(token);
      const email_id = decodedToken.email;

      const response = await axios.get('https://divineconnection.co.in/api/auth/user-data', {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Email': email_id
        },
        withCredentials: true
      });

      const { first_name, last_name, email, phone, dob, birth_place, gender } = response.data;
      setUserData({
        firstName: first_name,
        lastName: last_name,
        email,
        phone
      });

      setDob(formatDate(dob));
      setBirthPlace(birth_place || '');
      setGender(gender || '');
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response && error.response.status === 401) {
        setIsAuthenticated(false);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
      fetchUserData();
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const saveDetails = async () => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put('https://divineconnection.co.in/api/auth/update-user', {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        dob,
        birthPlace,
        gender
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

  const handleCityInput = useCallback(
    debounce((input) => {
      setCity(input);
    }, 300),
    []
  );

  const handleBirthPlaceChange = (selectedOption) => {
    setBirthPlace(selectedOption ? selectedOption.value : '');
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const flattenedCities = useMemo(() => {
    return dummy.flatMap(country => 
      country.cities.map(city => ({
        city,
        country: country.country
      }))
    );
  }, []);

  const filteredData = useMemo(() => {
    return flattenedCities.filter(item => 
      item.city.toLowerCase().startsWith(city.toLowerCase())
    ).slice(0, 100);
  }, [city, flattenedCities]);

  const options = code.map((e) => ({
    value: e.dial_code,
    label: e.dial_code,
  }));

  const cityOptions = filteredData.map((e) => ({
    value: e.city,
    label: `${e.city}, ${e.country}`,
  }));

  return (
    <div className='Account-page'>
      {!isAuthenticated ? (
        <div className='login-message'>
          <h2>Please login before accessing the Account info</h2>
          <button onClick={() => navigate('/login_page')}>Login</button>
        </div>
      ) : (
        <div>
          <div className='Account-page-image'>
            <img src={logoBackground} className="logo-background" />
            <img
              src={divineLogo}
              style={{ position: 'absolute', left: '7%', width: '80%' }}
            />
          </div>
          <div className='Account-page-details'>
            <div className="account-title">Edit Your Account</div>
            <form className="Account-form">
              <div className="change">
                <label htmlFor="firstName" className="label">
                  First Name:-
                </label>
                <input
                  type="text"
                  className="Account-input"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="change">
                <label htmlFor="lastName" className="label">
                  Last Name:-
                </label>
                <input
                  type="text"
                  className="Account-input"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="change">
                <label htmlFor="email" className="label">
                  Email:-
                </label>
                <input
                  type="email"
                  className="Account-input"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="change">
                <label htmlFor="phone" className="label">
                  Contact No :-
                </label>
                <Select
                  className="react-select-container"
                  options={options}
                  placeholder="+91"
                />
                <input
                  type="number"
                  className="number-input"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="change">
                <label htmlFor="dob" className='label'>Date Of Birth :-</label>
                <input
                  type="date"
                  className="Account-input"
                  value={dob}
                  onChange={handleDobChange}
                />
              </div>
              <div className="change">
                <label htmlFor="birthPlace" className='label'>Place Of Birth :-</label>
                <Select
                  className="react-select-city"
                  options={cityOptions}
                  placeholder="Search for city..."
                  isSearchable
                  onInputChange={handleCityInput}
                  onChange={handleBirthPlaceChange}
                  value={cityOptions.find(option => option.value === birthPlace)}
                />
              </div>
              <div className="change">
                <label htmlFor="gender" className='label'>Gender :-</label>&nbsp;
                <input
                  type="radio"
                  className="Account-input"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={handleGenderChange}
                /> Male
                <input
                  type="radio"
                  className="Account-input"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={handleGenderChange}
                /> Female
                <input
                  type="radio"
                  className="Account-input"
                  name="gender"
                  value="other"
                  checked={gender === 'other'}
                  onChange={handleGenderChange}
                /> Other
              </div>
              <button type="button" onClick={saveDetails} className="save-button">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const PhoneNumberInputWithLocation = ({ value, onChange }) => {
  const [defaultCountry, setDefaultCountry] = useState('us'); // Default country

  useEffect(() => {
    const fetchUserLocation = async () => {
      if (value) {
        return
      }
      try {
        const response = await axios.get('https://ipinfo.io/json');
        const data = response.data;
        // console.log(response)
        const countryCode = data.country.toLowerCase();
        setDefaultCountry(countryCode); // Set default country based on user's location
      } catch (error) {
        console.error('Error fetching user location:', error);
      }
    };

    fetchUserLocation();
  }, []);

  return (
    <PhoneInput
      country={defaultCountry}
      value={value || ''}
      onChange={(phone) => onChange({ target: { name: 'phone', value: phone } })}
    />
  );
};

export default PhoneNumberInputWithLocation;

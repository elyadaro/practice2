import React, { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log('Fetched data:', result);
      setData(result);
    } catch (e) {
      console.error('Error fetching data:', e);
      setError('Failed to fetch data. Please check the console for more details.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: newKey, value: newValue }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Data added successfully');
      setNewKey('');
      setNewValue('');
      fetchData();
    } catch (e) {
      console.error('Error adding data:', e);
      setError('Failed to add data. Please check the console for more details.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">רשימת פריטים</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="mb-4">
        {data.map((item, index) => (
          <li key={index} className="mb-2">
            <strong>{item.key}:</strong> {item.value}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="מפתח"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="ערך"
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          הוסף רשומה
        </button>
      </form>
    </div>
  );
}

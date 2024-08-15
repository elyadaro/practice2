import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

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
      setData(result);
    } catch (e) {
      console.error('Error fetching data:', e);
      setError('Failed to fetch data. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'add', key: newKey, value: newValue }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setNewKey('');
      setNewValue('');
      fetchData();
    } catch (e) {
      console.error('Error adding data:', e);
      setError('Failed to add data. Please try again.');
    }
  };

  const handleDelete = async (key, value) => {
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', key, value }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      fetchData();
    } catch (e) {
      console.error('Error deleting data:', e);
      setError('Failed to delete data. Please try again.');
    }
  };

  return (
    <div dir="rtl" className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">רשימת פריטים</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <ul className="space-y-2">
          {data.map((item, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
              <span><strong className="text-blue-600">{item.key}:</strong> {item.value}</span>
              <button onClick={() => handleDelete(item.key, item.value)} className="text-red-500 hover:text-red-700">
                <Trash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <input
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            placeholder="מפתח"
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder="ערך"
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition-colors">
          הוסף רשומה
        </button>
      </form>
    </div>
  );
}
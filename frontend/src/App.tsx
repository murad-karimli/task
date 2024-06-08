import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface User {
  email: string;
  number: string;
}

function App() {
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<string>('');

  const [results, setResults] = useState<User[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  let source = axios.CancelToken.source();

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setResults([]);

    try {
      source.cancel('Operation canceled: new request.');
      source = axios.CancelToken.source();

      const response = await axios.post('http://localhost:5001/search', { email, number }, {
        cancelToken: source.token,
      });

      setResults(response.data);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('Request canceled:', err.message);
      } else {
        setError('error occurred while fetchig data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    const maskedNumber = input.replace(/(\d{2})(\d{2})(\d{2})/, '$1-$2-$3');
    setNumber(maskedNumber);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="bg-blue-600 w-full py-4 shadow-md">
        <h1 className="text-white text-3xl text-center font-bold">User Search</h1>
      </header>
      <main className="w-full flex flex-col items-center mt-10 px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Search Users</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Number</label>
            <input
              type="text"
              className="w-full mt-2 p-2 border border-gray-300 rounded"
              value={number}
              onChange={handleNumberChange}
              placeholder=""
            />
          </div>
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        {loading && <div className="mt-6 text-gray-600">Loading...</div>}
        {error && <div className="mt-6 text-red-600">{error}</div>}
        <div className="mt-6 w-full max-w-md">
          {results.map((result, index) => (
            <div key={index} className="p-4 bg-white border-b border-gray-300 rounded shadow-sm">
              <p className="text-gray-700 font-medium">Email: {result.email}</p>
              <p className="text-gray-700">Number: {result.number}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

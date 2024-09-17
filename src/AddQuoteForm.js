// AddQuoteForm.js
import React, { useState } from 'react';
import { useGlobalContext } from './Context';

const AddQuoteForm = ({ onClose }) => {
  const { fetchQuotes } = useGlobalContext(); // Access context functions if needed

  const [quoteTitle, setQuoteTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the data to send to the backend
    const newQuoteData = {
      quoteTitle,
      author,
      category,
      state,
    };

    try {
      const response = await fetch('http://localhost:6600/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuoteData),
      });

      if (!response.ok) {
        throw new Error('Failed to add new quote');
      }

      const addedQuote = await response.json();
      console.log('Added quote:', addedQuote);

      // Optionally, re-fetch the quotes to update the list
      await fetchQuotes();

      alert('Quote added successfully');

      // Reset form fields
      setQuoteTitle('');
      setAuthor('');
      setCategory('');
      setState('');

      // Close the form
      onClose();
    } catch (error) {
      console.error('Error adding new quote:', error);
      alert('Failed to add the new quote');
    }
  };

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <div className="data heading">Add New Quote</div>
        <div className="data">
          <div className="dataHeading">Title</div>
          <input
            type="text"
            name="quoteTitle"
            value={quoteTitle}
            onChange={(e) => setQuoteTitle(e.target.value)}
            required
          />
        </div>
        <div className="data">
          <div className="dataHeading">Author</div>
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="data">
          <div className="dataHeading">Category</div>
          <input
            type="text"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="data">
          <div className="dataHeading">State</div>
          <input
            type="text"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </div>
        <div className="data">
          <button type="submit">Add Quote</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddQuoteForm;

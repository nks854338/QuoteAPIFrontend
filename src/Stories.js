import React, { useState, useEffect } from "react";
import { useGlobalContext } from "./Context";
import axios from "axios";

const Stories = () => {
  const {
    quote,
    isLoading,
    query,
    filterState,
    setQuotes,
    showAddForm,
    setShowAddForm,
  } = useGlobalContext();
  const [displayedCount, setDisplayedCount] = useState(6);
  const [editingQuote, setEditingQuote] = useState(null);
  const [newQuote, setNewQuote] = useState({
    quoteTitle: "",
    author: "",
    category: "",
    state: "",
  });

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("https://quote-api-backend.vercel.app/");
        const data = await response.json();
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };
    fetchQuotes();
  }, [setQuotes]);

  const handleReadMore = () => {
    setDisplayedCount(displayedCount + 3);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://quote-api-backend.vercel.app/quotes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete");
      }
      alert("Quote deleted successfully");
      await fetchQuotes();
    } catch (error) {
      console.error("Error deleting quote:", error);
      alert("Failed to delete the quote");
    }
  };

  const handleEdit = (quoteItem) => {
    setEditingQuote(quoteItem);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { _id, quoteTitle, author, category, state } = editingQuote;

    try {
      const response = await fetch(`https://quote-api-backend.vercel.app/quotes/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quoteTitle,
          author,
          category,
          state,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      const updatedQuote = await response.json();
      console.log("Updated quote:", updatedQuote);
      setEditingQuote(null);
      await fetchQuotes(); // Re-fetch quotes after update
      alert("Quote updated successfully");
    } catch (error) {
      console.error("Error updating quote:", error);
      alert("Failed to update the quote");
    }
    setShowAddForm(false); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingQuote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddInputChange = (e) => {
    setNewQuote({ ...newQuote, [e.target.name]: e.target.value });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const { quoteTitle, author, category, state } = newQuote;

    console.log("Data being sent:", { quoteTitle, author, category, state }); // Log the data

    try {
      const { data } = await axios.post("https://quote-api-backend.vercel.app/api/quotes", {
        quoteTitle,
        author,
        category,
        state,
      });
      alert("Successfully added");
      await fetchQuotes();
    } catch (error) {
      console.error(
        "Error adding quote:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to add the quote");
    }
    setShowAddForm(false); 
  };

  const fetchQuotes = async () => {
    try {
      const response = await fetch("https://quote-api-backend.vercel.app/");
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const filteredQuotes = quote.filter((item) => {
    const matchesState = filterState
      ? item.state.toLowerCase() === filterState.toLowerCase()
      : true;
    const matchesQuery = item.author
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesState && matchesQuery;
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {showAddForm && (
        <div className="formContainer">
          <form onSubmit={handleAddSubmit}>
            <div className="data heading">Add New Quote</div>
            <div className="data">
              <div className="dataHeading">Title</div>
              <input
                type="text"
                name="quoteTitle"
                value={newQuote.quoteTitle}
                onChange={handleAddInputChange}
              />
            </div>
            <div className="data">
              <div className="dataHeading">Author</div>
              <input
                type="text"
                name="author"
                value={newQuote.author}
                onChange={handleAddInputChange}
              />
            </div>
            <div className="data">
              <div className="dataHeading">Category</div>
              <input
                type="text"
                name="category"
                value={newQuote.category}
                onChange={handleAddInputChange}
              />
            </div>
            <div className="data">
              <div className="dataHeading">State</div>
              <input
                type="text"
                name="state"
                value={newQuote.state}
                onChange={handleAddInputChange}
              />
              <div className="btn">
                <button type="submit">Add Quote</button>
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {editingQuote && (
        <div className="formContainer">
          <form onSubmit={handleEditSubmit}>
            <div className="data heading">Edit Quote</div>
            <div className="data">
              <div className="dataHeading">Title</div>
              <input
                type="text"
                name="quoteTitle"
                value={editingQuote.quoteTitle}
                onChange={handleInputChange}
              />
            </div>
            <div className="data">
              <div className="dataHeading">Author</div>
              <input
                type="text"
                name="author"
                value={editingQuote.author}
                onChange={handleInputChange}
              />
            </div>
            <div className="data">
              <div className="dataHeading">Category</div>
              <input
                type="text"
                name="category"
                value={editingQuote.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="data">
              <div className="dataHeading">State</div>
              <input
                type="text"
                name="state"
                value={editingQuote.state}
                onChange={handleInputChange}
              />
              <div className="btn">
                <button type="submit">Update Quote</button>
                <button type="button" onClick={() => setEditingQuote(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

<div className="stories-div">
  {filteredQuotes
    .slice(-displayedCount) // Get the last `displayedCount` items
    .reverse() // Reverse the order of the items
    .map((quoteItem) => {
      const { _id, quoteTitle, author, category, state } = quoteItem;

      const stateClass = state.toLowerCase();

      return (
        <div key={_id} className="card">
          <div className="card1">
            <h2>{quoteTitle}</h2>
          </div>
          <div className="card1">
            <div className="11">
              <p>
                <strong>Author:</strong> {author}
              </p>
            </div>
            <div className="11">
              <p>
                <strong>Category:</strong> {category}
              </p>
            </div>
          </div>
          <div className="card13">
            <div className={`quetoState ${stateClass}`}>{state}</div>
            <div className="card-button">
              <button
                onClick={() => handleEdit(quoteItem)}
                className="editQueto"
              >
                <img src="images/edit.png" alt="Edit" />
              </button>
              <button
                onClick={() => handleDelete(_id)}
                className="deleteQueto"
              >
                <img src="images/delete.png" alt="Delete" />
              </button>
            </div>
          </div>
        </div>
      );
    })}
</div>

{displayedCount < filteredQuotes.length && (
  <div className="ReadMore">
    <button onClick={handleReadMore}>Read More</button>
  </div>
)}
    </>
  );
};

export default Stories;

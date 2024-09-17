import React, { useState } from "react";
import { useGlobalContext } from "./Context";

const QuoteState = () => {
  const { setFilterState, setShowAddForm } = useGlobalContext();

  const handleFilter = (state) => {
    console.log('Setting filter state to:', state); // Log the state being set
    setFilterState(state);
  };

  return (
    <div>
      <div className="quoteStates">
        <button className="AddNew" onClick={() => setShowAddForm(true)}>Add New Quote</button>
        <button className="AllQuote" onClick={() => handleFilter('')}>All Quotes</button>
        <button className="Active" onClick={() => handleFilter('active')}>Active Quotes</button>
        <button className="Pending" onClick={() => handleFilter('pending')}>Pending Quotes</button>
        <button className="Done" onClick={() => handleFilter('done')}>Done Quotes</button>
      </div>
    </div>
  );
};

export default QuoteState;

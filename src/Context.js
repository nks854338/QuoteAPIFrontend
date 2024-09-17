import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [quote, setQuote] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [filterState, setFilterState] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchQuotes = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:6600/');
      const data = await response.json();
      if (Array.isArray(data)) {
        setQuote(data);
        console.log('Fetched Quotes:', data);
      } else {
        console.error('Data is not an array:', data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const searchPost = (query) => {
    setQuery(query);
  };

  const removePost = (id) => {
    setQuote(quote.filter((post) => post._id !== id));
  };

  return (
    <AppContext.Provider value={{ 
      quote, 
      isLoading, 
      query, 
      searchPost, 
      removePost, 
      filterState, 
      setFilterState, 
      fetchQuotes,
      setQuotes: setQuote,
      showAddForm, 
      setShowAddForm  // Add this line
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

import React from "react";
import Search from './Search';
import Stories from './Stories';
import QuoteState from './quoteState';
// import Form from "./form";
import './App.css';
import { AppProvider } from './Context'; // Ensure AppProvider is imported

const App = () => {
  return (
    <AppProvider>
      <Search />
      <QuoteState />
      <Stories />
    </AppProvider>
  );
};

export default App;

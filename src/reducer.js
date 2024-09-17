// reducer.js
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "GET_STORIES":
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,  // The fetched data
      };

    case "REMOVE_POST":
      return {
        ...state,
        hits: state.hits.filter((curElem) => curElem._id !== action.payload),  // Filter by _id
      };

    case "SEARCH_QUERY":
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;

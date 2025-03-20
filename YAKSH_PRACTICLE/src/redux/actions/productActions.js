import axios from 'axios';

export const fetchProducts = ( ) => async (dispatch) => {
  try {
    const response = await axios.get(`https://dummyjson.com/products`);
    dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: response.data.products });
  } catch (error) {
    dispatch({ type: 'FETCH_PRODUCTS_FAILURE', payload: error.message });
  }
};

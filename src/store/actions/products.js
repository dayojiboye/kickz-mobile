import * as actionTypes from './actionTypes';
// import {auth} from '../../../firebase/utils';
import auth from '@react-native-firebase/auth';
import {
  handleAddProduct,
  handleFetchProducts,
  handleDeleteProduct,
} from '../../utils/products.helpers';

// add product - not needed on the app.

export const addProduct = payload => {
  return dispatch => {
    try {
      const timestamp = new Date();
      handleAddProduct({
        ...payload,
        adminUserUID: auth.currentUser.uid,
        createdDate: timestamp,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

// fetch products

export const fetchProductsSuccess = payload => {
  return {
    type: actionTypes.FETCH_PRODUCTS_SUCCESS,
    payload: payload,
  };
};

export const fetchProductsStart = payload => {
  return {
    type: actionTypes.FETCH_PRODUCTS_START,
    payload: payload,
  };
};

export const fetchProducts = (
  isLoading,
  filterType,
  startAfterDoc,
  persistProducts,
) => {
  return async dispatch => {
    dispatch(fetchProductsStart(isLoading));
    try {
      const products = await handleFetchProducts(
        filterType,
        startAfterDoc,
        persistProducts,
      );

      dispatch(fetchProductsSuccess(products));
      // console.log(products);
    } catch (err) {
      // take care of error
      console.log(err);
    } finally {
      dispatch(fetchProductsStart(false));
    }
  };
};

// delete product - not needed on the app

export const deleteProduct = payload => {
  return dispatch => {
    try {
      handleDeleteProduct(payload).then(() => {
        dispatch(fetchProducts(true));
      });
    } catch (err) {
      // take care of error
      console.log(err);
    }
  };
};

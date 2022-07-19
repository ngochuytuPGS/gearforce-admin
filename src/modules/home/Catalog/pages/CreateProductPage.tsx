import { push } from 'connected-react-router';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../../configs/api';
import { ROUTES } from '../../../../configs/routes';
import { ICreateProductParams } from '../../../../models/product';
import { IAppState } from '../../../../redux/reducer';
import withLayout from '../../../../helpers/Layout/withLayout';
import LoadingScreen from '../../../common/components/LoadingScreen';
import { fetchThunk } from '../../../common/redux/thunk';
import ProductDetail from '../components/ProductDetail';
import { setMessage } from '../../redux/messageReducer';

interface Props {}

const CreateProductPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, Action<string>>>();
  const [loading, setLoading] = useState(false);

  const onCreateProduct = useCallback(
    async (values: ICreateProductParams) => {
      const formData = new FormData();
      formData.append('productDetail', JSON.stringify(values.productDetail));

      for (let i = 0; i < values.images.length; i++) {
        formData.append('images[]', values.images[i]);
      }

      setLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.createProduct, 'post', formData, 'multipart/form-data'));

      if (json.errors) {
        dispatch(setMessage({ open: true, message: json.errors, severity: 'error' }));
      } else {
        dispatch(setMessage({ open: true, message: 'Product created successfully', severity: 'success' }));
        dispatch(push(`${ROUTES.catalogProductDetail}/${json.data}`));
      }
      setLoading(false);
    },
    [dispatch],
  );

  return (
    <>
      <ProductDetail isUpdateProduct={false} onCreateProduct={onCreateProduct} />
      {loading && <LoadingScreen />}
    </>
  );
};

export default withLayout(CreateProductPage);

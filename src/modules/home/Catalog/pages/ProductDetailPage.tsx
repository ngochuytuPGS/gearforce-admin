import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../../configs/api';
import { IGetProductDetailParams, IProductDetail, IUpdateProductParams } from '../../../../models/product';
import { IAppState } from '../../../../redux/reducer';
import { PRODUCT_DETAIL_ID_PARAMS } from '../../../../utils/constants';
import withLayout from '../../../../helpers/Layout/withLayout';
import LoadingScreen from '../../../common/components/LoadingScreen';
import { fetchThunk } from '../../../common/redux/thunk';
import ProductDetail from '../components/ProductDetail';
import { setMessage } from '../../redux/messageReducer';

type ParamType = {
  [PRODUCT_DETAIL_ID_PARAMS]: string;
};

interface Props {}

const ProductDetailPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, Action<string>>>();
  const { [PRODUCT_DETAIL_ID_PARAMS]: productId } = useParams<ParamType>();
  const [loading, setLoading] = useState(false);
  const [productDetail, setProductDetail] = useState<IProductDetail>();

  const ref = useRef<number>(1);

  const onGetProductDetail = useCallback(
    async (values: IGetProductDetailParams) => {
      setLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.detailProduct, 'post', values));
      if (json.success && json.data) {
        setProductDetail(json.data);
      }
      ref.current = ref.current + 1;
      setLoading(false);
    },
    [dispatch],
  );

  useEffect(() => {
    onGetProductDetail({ id: productId });
  }, [onGetProductDetail, productId]);

  const onUpdateProduct = useCallback(
    async (values: IUpdateProductParams) => {
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
        dispatch(setMessage({ open: true, message: 'Product updated successfully', severity: 'success' }));
        onGetProductDetail({ id: productId });
      }
      setLoading(false);
    },
    [dispatch, onGetProductDetail, productId],
  );

  return (
    <>
      {productDetail && (
        <ProductDetail
          key={ref.current} //Key để sau khi update, gọi api lấy đc data mới thì component sẽ fresh render lại
          isUpdateProduct={true}
          productDetail={productDetail}
          onUpdateProduct={onUpdateProduct}
        />
      )}
      {loading && <LoadingScreen />}
    </>
  );
};

export default withLayout(ProductDetailPage);

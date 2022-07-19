import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../../configs/api';
import {
  IDeleteProductParams,
  IExportProductCsvParams,
  IGetProductFilterParams,
  IGetProductPagingParams,
  IGetProductParams,
  IGetProductSortParams,
  IProduct,
} from '../../../../models/product';
import { IAppState } from '../../../../redux/reducer';
import withLayout from '../../../../helpers/Layout/withLayout';
import LoadingScreen from '../../../common/components/LoadingScreen';
import { fetchThunk } from '../../../common/redux/thunk';
import Filter from '../components/Products/Filter';
import Table from '../components/Products/Table';
import { setMessage } from '../../redux/messageReducer';
import LinkButton from '../../../common/components/LinkButton';
import { ROUTES } from '../../../../configs/routes';

interface Props {}

const INITIAL_FILTER_VALUES: IGetProductFilterParams = {
  availability: 'all',
  category: '0',
  search: '',
  search_type: '',
  stock_status: 'all',
  vendor: '',
};

const INITIAL_SORT_VALUES: IGetProductSortParams = {
  order_by: '',
  sort: '',
};

const INITIAL_PAGING_VALUES: IGetProductPagingParams = {
  count: 25,
  page: 1,
};

const ProductsPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, Action<string>>>();
  const [listProduct, setListProduct] = React.useState<Array<IProduct>>([]);
  const [recordTotal, setRecordTotal] = React.useState(0); //Api thi thoảng trả sai recordTotal, cân nhăc sử dụng length userList
  const [loading, setLoading] = React.useState(false);

  const getProductParamsRef = useRef<IGetProductParams>({
    ...INITIAL_FILTER_VALUES,
    ...INITIAL_SORT_VALUES,
    ...INITIAL_PAGING_VALUES,
  });

  const onGetListProduct = useCallback(
    async (values: IGetProductFilterParams | IGetProductSortParams | IGetProductPagingParams | IGetProductParams) => {
      getProductParamsRef.current = {
        ...getProductParamsRef.current,
        ...values,
      };

      setLoading(true);
      const json = await dispatch(fetchThunk(API_PATHS.listProduct, 'post', getProductParamsRef.current));
      if (json.success) {
        if (json.data) setListProduct(json.data);
        else setListProduct([]);
        setRecordTotal(json.recordsTotal);
      }
      setLoading(false);
    },
    [dispatch],
  );

  const onDeleteProducts = useCallback(
    async (values: IDeleteProductParams) => {
      setLoading(true);

      const json = await dispatch(fetchThunk(API_PATHS.editProduct, 'post', values));
      if (json.success) {
        dispatch(setMessage({ open: true, message: 'Delete successfully', severity: 'success' }));
      } else {
        dispatch(setMessage({ open: true, message: json.data, severity: 'error' }));
      }
      await onGetListProduct(getProductParamsRef.current);

      setLoading(false);
    },
    [dispatch, onGetListProduct],
  );

  const onExportProducts = useCallback(
    async (values: IExportProductCsvParams) => {
      setLoading(true);

      const json = await dispatch(fetchThunk(API_PATHS.exportProduct, 'post', values));
      if (json.success) {
        //Download file here
        dispatch(setMessage({ open: true, message: 'This feature will be updated soon', severity: 'success' }));
      }

      setLoading(false);
    },
    [dispatch],
  );

  useEffect(() => {
    onGetListProduct(getProductParamsRef.current);
  }, [onGetListProduct]);

  return (
    <>
      <Filter initialFilterValues={INITIAL_FILTER_VALUES} onGetListProduct={onGetListProduct} />
      <LinkButton label="Add Product" path={ROUTES.catalogCreateProduct} />
      <Table
        initialSortValues={INITIAL_SORT_VALUES}
        initialPagingValues={INITIAL_PAGING_VALUES}
        recordTotal={recordTotal}
        onGetListProduct={onGetListProduct}
        onDeleteProducts={onDeleteProducts}
        onExportProducts={onExportProducts}
        listProduct={listProduct}
      />
      {loading && <LoadingScreen />}
    </>
  );
};

export default withLayout(ProductsPage);

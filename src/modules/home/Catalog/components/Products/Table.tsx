import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../../configs/routes';
import {
  IDeleteProductParams,
  IExportProductCsvParams,
  IGetProductPagingParams,
  IGetProductSortParams,
  IProduct,
} from '../../../../../models/product';
import Pagination from '../../../../common/components/Pagination/Pagination';
import { formatUnixTimestamp } from '../../../utils/functions';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ConfirmModal from '../../../../common/components/ConfirmModal';

interface Props {
  listProduct: Array<IProduct>;
  initialSortValues: IGetProductSortParams;
  initialPagingValues: IGetProductPagingParams;
  recordTotal: number;
  onGetListProduct: (values: IGetProductSortParams | IGetProductPagingParams) => void;
  onDeleteProducts: (values: IDeleteProductParams) => void;
  onExportProducts: (values: IExportProductCsvParams) => void;
}

const Table = ({
  listProduct,
  initialPagingValues,
  initialSortValues,
  recordTotal,
  onGetListProduct,
  onDeleteProducts,
  onExportProducts,
}: Props) => {
  const [sortValues, setSortValues] = useState<IGetProductSortParams>(initialSortValues);
  const [pagingValues, setPagingValues] = useState<IGetProductPagingParams>(initialPagingValues);
  const [productsToRemove, setProductsToRemove] = useState<IDeleteProductParams['params']>([]);
  const [productsToExportCsv, setProductsToExportCsv] = useState<IExportProductCsvParams['id']>([]);
  const [isOpenDeleteProductConfirmModal, setIsOpenDeleteProductConfirmModal] = useState(false);
  const [isOpenExportProductConfirmModal, setIsOpenExportProductConfirmModal] = useState(false);
  const firstRenderRef = useRef(true);

  //Do response recordTotal thi thoảng trả về 0 dù vẫn có kết quả nên phải chuyển qua length userList nếu recordTotal = 0
  const totalTablePage = useMemo(
    () => Math.ceil((recordTotal || listProduct.length) / pagingValues.count),
    [listProduct.length, pagingValues.count, recordTotal],
  );

  const haveProductsToRemove = useMemo(() => !!productsToRemove.length, [productsToRemove]);

  const totalTableItem = useMemo(() => recordTotal || listProduct.length, [listProduct.length, recordTotal]);

  const isAllProductsCheckedToExport = useMemo(
    () => productsToExportCsv.length === listProduct.length,
    [productsToExportCsv, listProduct],
  );

  const haveProductsToExport = useMemo(() => !!productsToExportCsv.length, [productsToExportCsv]);

  const isProductCheckedToExport = useCallback(
    (id: string) => {
      return productsToExportCsv.some((productId) => productId === id);
    },
    [productsToExportCsv],
  );

  const onPageChange = useCallback((activePage: number) => {
    setPagingValues((prevPagingValues) => ({
      ...prevPagingValues,
      page: activePage,
    }));
  }, []);

  const onSelectNumberOfItemPerPage = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagingValues((pagingValues) => ({ ...pagingValues, count: +e.target.value }));
  }, []);

  const onSort = (sortValue: IGetProductSortParams['sort']) => {
    setSortValues({ order_by: sortValues.order_by === 'ASC' ? 'DESC' : 'ASC', sort: sortValue });
  };

  const isProductSelectedToRemove = useCallback(
    (productId: IProduct['id']): boolean => {
      return productsToRemove.some((productToRemove) => productToRemove.id === productId);
    },
    [productsToRemove],
  );

  const onToggleRemoveProduct = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const productId = e.currentTarget.getAttribute('data-product-id')!;

      if (isProductSelectedToRemove(productId)) {
        setProductsToRemove((productsToRemove) =>
          productsToRemove.filter((productToRemove) => productToRemove.id != productId),
        );
      } else {
        setProductsToRemove((productsToRemove) => [...productsToRemove, { id: productId, delete: 1 }]);
      }
    },
    [isProductSelectedToRemove],
  );

  const onToggleProductToExport = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (productsToExportCsv.indexOf(e.target.value) !== -1) {
        setProductsToExportCsv((productsToExportCsv) =>
          productsToExportCsv.filter((productId) => productId !== e.target.value),
        );
      } else {
        setProductsToExportCsv((productsToExportCsv) => [...productsToExportCsv, e.target.value]);
      }
    },
    [productsToExportCsv],
  );

  const onToggleAllProductsToExport = useCallback(() => {
    if (isAllProductsCheckedToExport) {
      setProductsToExportCsv([]);
    } else {
      setProductsToExportCsv(listProduct.map((product) => product.id));
    }
  }, [isAllProductsCheckedToExport, listProduct]);

  const getSortingArrowIcon = (sortValue: IGetProductSortParams['sort']): JSX.Element | null => {
    return sortValues.sort === sortValue ? (
      sortValues.order_by === 'ASC' ? (
        <ArrowUpwardIcon className="text-base" />
      ) : (
        <ArrowDownwardIcon className="text-base" />
      )
    ) : null;
  };

  const onClickRemoveProductsButton = useCallback(() => {
    setIsOpenDeleteProductConfirmModal(true);
  }, []);

  const onCancelRemoveProductsModal = useCallback(() => {
    setIsOpenDeleteProductConfirmModal(false);
  }, []);

  const onConfirmRemoveProductsModal = useCallback(() => {
    onDeleteProducts({
      params: productsToRemove,
    });
    setIsOpenDeleteProductConfirmModal(false);
  }, [productsToRemove, onDeleteProducts]);

  const onClickExportProductsButton = useCallback(() => {
    setIsOpenExportProductConfirmModal(true);
  }, []);

  const onCancelExportProductsModal = useCallback(() => {
    setIsOpenExportProductConfirmModal(false);
  }, []);

  const onConfirmExportProductsModal = useCallback(() => {
    onExportProducts({
      id: productsToExportCsv,
    });
    setIsOpenExportProductConfirmModal(false);
  }, [onExportProducts, productsToExportCsv]);

  useEffect(() => {
    //Tránh call api first render
    if (!firstRenderRef.current) onGetListProduct(pagingValues);
    else firstRenderRef.current = false;
  }, [onGetListProduct, pagingValues]);

  useEffect(() => {
    //Tránh call api first render
    if (!firstRenderRef.current) onGetListProduct(sortValues);
    else firstRenderRef.current = false;
  }, [onGetListProduct, sortValues]);

  useEffect(() => {
    setProductsToRemove([]);
  }, [listProduct]);

  return (
    <>
      <div className="bg-color-primary border border-color-border mb-10 scrollbar-primary">
        <table className="whitespace-nowrap w-full [&_td]:px-5 [&_th]:px-5 [&_td]:py-3 [&_th]:py-3 [&_tr]:border-b [&_tr]:border-color-border">
          <thead>
            <tr className="text-left">
              <th className="w-[20px] pr-[20px]">
                <input
                  type="checkbox"
                  name="export-all"
                  checked={isAllProductsCheckedToExport}
                  onChange={onToggleAllProductsToExport}
                />
              </th>
              <th className="cursor-pointer" onClick={() => onSort('sku')}>
                SKU
                {getSortingArrowIcon('sku')}
              </th>
              <th className="cursor-pointer" onClick={() => onSort('name')}>
                Name
                {getSortingArrowIcon('name')}
              </th>
              <th>Category</th>
              <th className="cursor-pointer" onClick={() => onSort('price')}>
                Price
                {getSortingArrowIcon('price')}
              </th>
              <th className="cursor-pointer" onClick={() => onSort('amount')}>
                In stock
                {getSortingArrowIcon('amount')}
              </th>
              <th className="cursor-pointer" onClick={() => onSort('vendor')}>
                Vendor
                {getSortingArrowIcon('vendor')}
              </th>
              <th className="cursor-pointer" onClick={() => onSort('arrivalDate')}>
                Arrival Date
                {getSortingArrowIcon('arrivalDate')}
              </th>
            </tr>
          </thead>
          <tbody>
            {listProduct.map((product) => (
              <tr key={product.id} className={isProductSelectedToRemove(product.id) ? 'brightness-50' : ''}>
                <td>
                  <input
                    type="checkbox"
                    name="export-csv"
                    value={product.id}
                    checked={isProductCheckedToExport(product.id)}
                    onChange={onToggleProductToExport}
                  />
                </td>
                <td>{product.sku}</td>
                <td>
                  <Link
                    to={`${ROUTES.catalogProductDetail}/${product.id}`}
                    className="text-color-blue w-[250px] pr-3 overflow-hidden text-ellipsis hover:underline"
                    title={product.name}
                  >
                    {product.name}
                  </Link>
                </td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td className="text-center">{product.amount}</td>
                <td>
                  <Link to={`${ROUTES.userUserDetail}/${product.vendorID}`}>
                    <p className="text-color-blue w-[200px] pr-3 overflow-hidden text-ellipsis hover:underline">
                      {product.vendor}
                    </p>
                  </Link>
                </td>
                <td>{formatUnixTimestamp(product.arrivalDate)}</td>
                <td>
                  <div
                    className="button-primary flex justify-center items-center"
                    data-product-id={product.id}
                    onClick={onToggleRemoveProduct}
                  >
                    <DeleteIcon />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex p-5">
          <div className="flex items-center mr-5">
            <Pagination
              className="button-paging"
              totalPages={totalTablePage}
              activeClassName="button-paging button-paging-active"
              onPageChange={onPageChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <p>
              <span className="font-bold">{totalTableItem}</span> items
            </p>
            <div className="flex items-center gap-2">
              <select
                className="button-paging bg-color-purple w-[60px] pl-[5px]"
                onChange={onSelectNumberOfItemPerPage}
                value={pagingValues.count}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
              </select>
              <p>per page</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-color-primary sticky z-50 bottom-0 p-3 border border-color-border shadow-primary shadow-color-purple">
        <button
          className={`button-primary mr-3 ${haveProductsToRemove ? 'bg-color-orange' : 'bg-color-orange-dark'}`}
          onClick={onClickRemoveProductsButton}
          disabled={!haveProductsToRemove}
        >
          Remove selected
        </button>
        <button
          className={`button-primary ${haveProductsToExport ? 'bg-color-orange' : 'bg-color-orange-dark'}`}
          onClick={onClickExportProductsButton}
          disabled={!haveProductsToExport}
        >
          Export CSV
        </button>
      </div>
      {isOpenDeleteProductConfirmModal && (
        <ConfirmModal
          title="Confirm Delete"
          message="Do you want to delete selected product?"
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
          onCancel={onCancelRemoveProductsModal}
          onConfirm={onConfirmRemoveProductsModal}
        />
      )}
      {isOpenExportProductConfirmModal && (
        <ConfirmModal
          title="Confirm Export"
          message="Do you want to export this product ?"
          confirmButtonText="Yes"
          cancelButtonText="No"
          onCancel={onCancelExportProductsModal}
          onConfirm={onConfirmExportProductsModal}
        />
      )}
    </>
  );
};

export default Table;

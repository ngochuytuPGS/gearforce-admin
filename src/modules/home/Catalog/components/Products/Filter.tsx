import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Collapse } from '@mui/material';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { IGetProductFilterParams } from '../../../../../models/product';
import MultiSelectCheckboxes from '../../../../common/components/MultiSelectCheckboxes/MultiSelectCheckboxes';
import { ListCheckboxesGroupType, SelectedValuesType } from '../../../../common/components/MultiSelectCheckboxes/types';
import { IGetVendorListParams, IVendor } from '../../../../../models/vendor';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../../../../redux/reducer';
import { Action } from 'typesafe-actions';
import { fetchThunk } from '../../../../common/redux/thunk';
import { API_PATHS } from '../../../../../configs/api';
import { ThunkDispatch } from 'redux-thunk';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PRODUCT_AVAILABILITY, PRODUCT_SEARCH_IN, PRODUCT_STOCKS } from '../../utils/constants';

interface Props {
  initialFilterValues: IGetProductFilterParams;
  onGetListProduct: (values: IGetProductFilterParams) => void;
}

const Filter = ({ initialFilterValues, onGetListProduct }: Props) => {
  const { categories } = useSelector((state: IAppState) => state.categories);
  const dispatch = useDispatch<ThunkDispatch<IAppState, unknown, Action<string>>>();
  const [isExpandFilterMenu, setIsExpandFilterMenu] = useState(false);
  const [filterValues, setFilterValues] = useState<IGetProductFilterParams>(initialFilterValues);
  const [listVendor, setListVendor] = useState<Array<IVendor>>([]);
  const [filterVendorText, setFilterVendorText] = useState<IGetProductFilterParams['vendor']>('');
  const [loadingVendor, setLoadingVendor] = useState(false);
  const vendorSearchTimeoutRef = useRef<number>();

  const onGetListVendor = useCallback(
    async (values: IGetVendorListParams) => {
      setLoadingVendor(true);

      const json = await dispatch(fetchThunk(API_PATHS.listVendor, 'post', values));
      if (json.success) {
        setListVendor(json.data);
      }

      setLoadingVendor(false);
    },
    [dispatch],
  );

  const onTypeVendorSearch = useCallback(
    (values: string) => {
      if (vendorSearchTimeoutRef.current) {
        clearTimeout(vendorSearchTimeoutRef.current);
      }

      if (values) {
        vendorSearchTimeoutRef.current = window.setTimeout(() => {
          onGetListVendor({ search: values });
        }, 750);
      } else {
        setListVendor([]);
      }
    },
    [onGetListVendor],
  );

  const listSearchInCheckboxes = useMemo((): ListCheckboxesGroupType => {
    const list: ListCheckboxesGroupType = [
      {
        checkboxes: PRODUCT_SEARCH_IN.map((searchIn) => ({
          text: searchIn.name,
          value: searchIn.id,
          select: false,
        })),
      },
    ];

    return list;
  }, []);

  const renderCategories = useCallback((): Array<JSX.Element> => {
    const options: Array<JSX.Element> = [
      <option key="" value="">
        Any category
      </option>,
    ];

    categories?.map((category) => {
      options.push(
        <option key={category.id} value={category.id}>
          {category.name}
        </option>,
      );
    });

    return options;
  }, [categories]);

  const renderStocks = useCallback((): Array<JSX.Element> => {
    const options = [
      <option key="" value="">
        Any stock status
      </option>,
    ];

    PRODUCT_STOCKS.map((stock) => {
      options.push(
        <option key={stock.id} value={stock.id}>
          {stock.name}
        </option>,
      );
    });

    return options;
  }, []);

  const renderAvailability = useCallback((): Array<JSX.Element> => {
    const options: Array<JSX.Element> = [];

    PRODUCT_AVAILABILITY.map((availability) => {
      options.push(
        <option key={availability.id} value={availability.id}>
          {availability.name}
        </option>,
      );
    });

    return options;
  }, []);

  const onSearchKeywordsChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValues((filterValues) => ({ ...filterValues, search: e.target.value }));
  }, []);

  const onCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValues((filterValues) => ({ ...filterValues, category: e.target.value }));
  }, []);

  const onStockStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValues((filterValues) => ({ ...filterValues, stock_status: e.target.value }));
  }, []);

  const onSearchInChange = useCallback((selectedValues: SelectedValuesType) => {
    setFilterValues((filterValues) => ({ ...filterValues, search_type: selectedValues.join() }));
  }, []);

  const onAvailabilityChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValues((filterValues) => ({ ...filterValues, availability: e.target.value }));
  }, []);

  const onVendorChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterValues((filterValues) => ({ ...filterValues, vendor: e.target.value }));
      setFilterVendorText(e.target.value);
      onTypeVendorSearch(e.target.value);
    },
    [onTypeVendorSearch],
  );

  const onVendorSearchResultClick = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const vendorId = e.currentTarget.getAttribute('data-value')!;
    const vendorName = e.currentTarget.getAttribute('data-name')!;

    setFilterValues((filterValues) => ({ ...filterValues, vendor: vendorId }));
    setFilterVendorText(vendorName);
    setListVendor([]);
  }, []);

  const onToggleFilterMenu = useCallback(() => {
    setIsExpandFilterMenu((isExpandFilterMenu) => !isExpandFilterMenu);
  }, []);

  const onSearch = useCallback(() => {
    onGetListProduct(filterValues);
  }, [filterValues, onGetListProduct]);

  return (
    <div>
      <h1 className="text-4xl mb-5">Products</h1>
      <div className="bg-color-primary relative border border-color-border mb-10">
        <div className="flex flex-wrap justify-between items-start gap-5 p-5 border-b border-color-border">
          <input
            className="input-primary flex-1"
            name="keywords"
            placeholder="Search keywords"
            value={filterValues.search}
            onChange={onSearchKeywordsChange}
          />

          <select
            className="input-primary flex-1 max-w-[300px]"
            name="category"
            value={filterValues.category}
            onChange={onCategoryChange}
          >
            {renderCategories()}
          </select>

          <select
            className="input-primary flex-1"
            name="stock_status"
            value={filterValues.stock_status}
            onChange={onStockStatusChange}
          >
            {renderStocks()}
          </select>
          <button className="button-primary" onClick={onSearch}>
            Search
          </button>
        </div>

        <Collapse in={isExpandFilterMenu}>
          <div className="flex flex-wrap gap-12 px-5 py-4">
            <div className="flex-1">
              <MultiSelectCheckboxes
                placeholder="Search in"
                list={listSearchInCheckboxes}
                onSelectedValuesChanged={onSearchInChange}
              />
            </div>
            <div className="flex-1 flex items-center gap-3">
              <p>Availability</p>
              <select
                className="input-primary flex-1"
                value={filterValues.availability}
                onChange={onAvailabilityChange}
              >
                {renderAvailability()}
              </select>
            </div>
            <div className="flex-1 flex items-center gap-3 relative">
              <p>Vendor</p>
              <input
                className="input-primary flex-1 pr-8 text-ellipsis"
                value={filterVendorText}
                onChange={onVendorChange}
              />

              {listVendor.length ? (
                <div className="input-primary absolute z-50 left-0 top-[calc(100%+10px)] w-full max-h-[250px] p-0 overflow-auto">
                  {listVendor.map((vendor) => (
                    <div
                      key={vendor.id}
                      data-value={vendor.id}
                      data-name={vendor.name}
                      className="hover:bg-color-purple p-3 cursor-pointer"
                      onClick={onVendorSearchResultClick}
                    >
                      {vendor.name}
                    </div>
                  ))}
                </div>
              ) : null}

              {loadingVendor && <MoreHorizIcon className="absolute right-2 animate-bounce" />}
            </div>
          </div>
        </Collapse>

        <div
          className="bg-color-primary absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%-1px)] px-4 border border-color-border border-t-0 rounded-bl rounded-br cursor-pointer"
          onClick={onToggleFilterMenu}
        >
          {isExpandFilterMenu ? (
            <ArrowDropUpOutlinedIcon className="text-[25px]" />
          ) : (
            <ArrowDropDownOutlinedIcon className="text-[25px]" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Filter;

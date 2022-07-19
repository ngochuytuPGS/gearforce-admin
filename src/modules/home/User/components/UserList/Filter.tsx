import React, { useCallback, useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import 'react-datepicker/dist/react-datepicker.css';
import { Collapse } from '@mui/material';
import MultiSelectCheckboxes from '../../../../common/components/MultiSelectCheckboxes/MultiSelectCheckboxes';
import { IGetUserFilterParams } from '../../../../../models/user';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../../../redux/reducer';
import { ListCheckboxesGroupType, SelectedValuesType } from '../../../../common/components/MultiSelectCheckboxes/types';
import { USER_FILTER_MEMBERSHIPS, USER_STATUS } from '../../utils/constant';
import { formatDateToYYYYMMDD } from '../../../utils/functions';

interface Props {
  initialFilterValues: IGetUserFilterParams;
  onGetUserList: (values: IGetUserFilterParams) => void;
}

const Filter = ({ onGetUserList, initialFilterValues }: Props) => {
  const {
    countries: { countries },
    roles: { roles },
  } = useSelector((state: IAppState) => state);

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [filterValues, setFilterValues] = useState<IGetUserFilterParams>(initialFilterValues);
  const [isExpandFilterMenu, setIsExpandFilterMenu] = useState(false);
  const [startDate, endDate] = dateRange;

  const listRoleCheckboxes = useMemo((): ListCheckboxesGroupType => {
    const list: ListCheckboxesGroupType = [];

    for (const key in roles) {
      list.push({
        groupLabel: key[0].toUpperCase() + key.slice(1), //To uppercase first letter
        checkboxes: roles[key]?.map((role) => ({
          value: role.id,
          text: role.name,
          select: false,
        })),
      });
    }

    return list;
  }, [roles]);

  const listMembershipCheckboxes = useMemo((): ListCheckboxesGroupType => {
    const list: ListCheckboxesGroupType = [];

    for (const key in USER_FILTER_MEMBERSHIPS) {
      list.push({
        groupLabel: key[0].toUpperCase() + key.slice(1), //To uppercase first letter
        checkboxes: USER_FILTER_MEMBERSHIPS[key]?.map((membership) => ({
          value: membership.id,
          text: membership.name,
          select: false,
        })),
      });
    }

    return list;
  }, []);

  const renderCountries = useCallback((): Array<JSX.Element> => {
    const options = [
      <option key="" value="">
        Select country
      </option>,
    ];

    countries?.map((country) => {
      options.push(
        <option key={country.id} value={country.code}>
          {country.country}
        </option>,
      );
    });

    return options;
  }, [countries]);

  const renderStatus = useCallback((): Array<JSX.Element> => {
    const options: Array<JSX.Element> = [
      <option key="" value="">
        Any status
      </option>,
    ];

    for (const key in USER_STATUS) {
      options.push(
        <option key={key} value={key}>
          {USER_STATUS[key]}
        </option>,
      );
    }

    return options;
  }, []);

  const onSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValues((filterValues) => ({ ...filterValues, search: e.target.value }));
  }, []);

  const onMembershipsChange = useCallback((values: SelectedValuesType) => {
    setFilterValues((filterValues) => ({ ...filterValues, memberships: values }));
  }, []);

  const onUserTypesChange = useCallback((values: SelectedValuesType) => {
    setFilterValues((filterValues) => ({ ...filterValues, types: values }));
  }, []);

  const onStatusChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValues((filterValues) => ({ ...filterValues, status: [e.target.value] }));
  }, []);

  const onCountryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValues((filterValues) => ({ ...filterValues, country: e.target.value }));
  }, []);

  const onStateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValues((filterValues) => ({ ...filterValues, state: e.target.value }));
  }, []);

  const onAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValues((filterValues) => ({ ...filterValues, address: e.target.value }));
  }, []);

  const onPhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValues((filterValues) => ({ ...filterValues, phone: e.target.value }));
  }, []);

  const onDateTypeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValues((filterValues) => ({ ...filterValues, date_type: e.target.value }));
  }, []);

  const onChangeDateRange = useCallback((date: [Date | null, Date | null]) => {
    setDateRange(date);
    const startDate = date[0] ? formatDateToYYYYMMDD(date[0]) : '';
    const endDate = date[1] ? formatDateToYYYYMMDD(date[1]) : startDate;
    setFilterValues((filterValues) => ({
      ...filterValues,
      date_range: [startDate, endDate],
    }));
  }, []);

  const onToggleFilterMenu = useCallback(() => {
    setIsExpandFilterMenu((isExpandFilterMenu) => !isExpandFilterMenu);
  }, []);

  const onSearch = useCallback(() => {
    onGetUserList(filterValues);
  }, [filterValues, onGetUserList]);

  return (
    <div>
      <h1 className="text-4xl mb-5">Search for users</h1>
      <div className="bg-color-primary relative border border-color-border mb-10">
        <div className="flex flex-wrap justify-between items-start gap-5 p-5 border-b border-color-border">
          <input
            className="input-primary flex-1"
            name="search"
            placeholder="Search keywords"
            value={filterValues.search}
            onChange={onSearchChange}
          />

          <MultiSelectCheckboxes
            list={listMembershipCheckboxes}
            placeholder="All memberships"
            onSelectedValuesChanged={onMembershipsChange}
          />

          <MultiSelectCheckboxes
            list={listRoleCheckboxes}
            placeholder="All user types"
            onSelectedValuesChanged={onUserTypesChange}
          />

          <select className="input-primary flex-1" name="status" onChange={onStatusChange}>
            {renderStatus()}
          </select>
          <button className="button-primary" onClick={onSearch}>
            Search
          </button>
        </div>

        <Collapse in={isExpandFilterMenu}>
          <div className="flex flex-wrap gap-12 px-10 py-4">
            <div className="basis-1/3 flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <p className="text-sm min-w-[100px]">Country</p>
                <select
                  className="input-primary flex-grow"
                  name="country"
                  value={filterValues.country}
                  onChange={onCountryChange}
                >
                  {renderCountries()}
                </select>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm min-w-[100px]">State</p>
                <input
                  className="input-primary flex-grow"
                  name="state"
                  value={filterValues.state}
                  onChange={onStateChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm min-w-[100px]">Address</p>
                <input
                  className="input-primary flex-grow"
                  name="address"
                  value={filterValues.address}
                  onChange={onAddressChange}
                />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm min-w-[100px]">Phone</p>
                <input
                  className="input-primary flex-grow"
                  name="phone"
                  value={filterValues.phone}
                  onChange={onPhoneChange}
                />
              </div>
            </div>
            <div>
              <div className="flex gap-4">
                <p>User activity</p>
                <div>
                  <div className="flex gap-5 mb-4">
                    <div className="flex gap-1">
                      <input
                        className="outline-none"
                        type="radio"
                        name="date_type"
                        id="register"
                        value="R"
                        checked={filterValues.date_type === 'R'}
                        onChange={onDateTypeChange}
                      />
                      <label htmlFor="register">Register</label>
                    </div>
                    <div className="flex gap-1">
                      <input
                        className="outline-none"
                        type="radio"
                        name="date_type"
                        id="last-logged"
                        value="L"
                        checked={filterValues.date_type === 'L'}
                        onChange={onDateTypeChange}
                      />
                      <label htmlFor="last-logged">Last logged in</label>
                    </div>
                  </div>
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={onChangeDateRange}
                    isClearable={true}
                    className="input-primary"
                    placeholderText="Enter date range"
                  />
                </div>
              </div>
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

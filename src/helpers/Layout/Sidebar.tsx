import React, { useCallback, useMemo } from 'react';
import NestedListItem from '../../modules/common/components/NestedListItem/NestedListItem';
import { NestedListItemType } from '../../modules/common/components/NestedListItem/types';
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { ROUTES } from '../../configs/routes';
import { useLocation } from 'react-router';

interface Props {
  isSidebarExpand: boolean;
  onToggleSidebarExpand: () => void;
}

const Sidebar = ({ isSidebarExpand, onToggleSidebarExpand }: Props) => {
  const location = useLocation();
  const isSubListItemActive = useCallback((path: string) => path === location.pathname, [location.pathname]);

  const list: Array<NestedListItemType> = useMemo(
    () => [
      {
        listHeader: 'Orders',
        listIcon: MoveToInboxOutlinedIcon,
        subList: [
          {
            header: 'Orders list',
            path: ROUTES.home,
            active: false,
          },
          {
            header: 'Abandoned carts',
            path: ROUTES.home,
            active: false,
          },
          {
            header: 'Accounting',
            path: ROUTES.home,
            active: false,
          },
          {
            header: 'Payment transactions',
            path: ROUTES.home,
            active: false,
          },
          {
            header: 'Vendor statistics',
            path: ROUTES.home,
            active: false,
          },
          {
            header: 'Vendor transactions',
            path: ROUTES.home,
            active: false,
          },
          {
            header: 'Returns',
            path: ROUTES.home,
            active: false,
          },
          {
            header: 'Messages',
            path: ROUTES.home,
            active: false,
          },
        ],
      },
      {
        listHeader: 'Catalog',
        listIcon: SellOutlinedIcon,
        subList: [
          {
            header: 'Products',
            path: ROUTES.catalogProducts,
            active: isSubListItemActive(ROUTES.catalogProducts),
          },
          {
            header: 'Reviews',
            path: ROUTES.home,
            active: false,
          },
          {
            header: 'Product tabs',
            path: ROUTES.home,
            active: false,
          },
          {
            header: 'Brand',
            path: ROUTES.home,
            active: false,
          },
          {
            header: 'Import',
            path: ROUTES.home,
            active: false,
          },
          {
            header: 'Export',
            path: ROUTES.home,
            active: false,
          },
          {
            header: 'Watched products',
            path: ROUTES.home,
            active: false,
          },
        ],
      },
      {
        listHeader: 'User',
        listIcon: GroupOutlinedIcon,
        subList: [
          {
            header: 'User list',
            path: ROUTES.userUserList,
            active: isSubListItemActive(ROUTES.userUserList),
          },
        ],
      },
      {
        listHeader: 'Sales channels',
        listIcon: LanguageOutlinedIcon,
        subList: [
          {
            header: 'Google product feed',
            path: ROUTES.home,
            active: false,
          },
          {
            header: 'Facebook Ads & Instagram Ads',
            path: ROUTES.home,
            active: false,
          },
        ],
      },
    ],
    [isSubListItemActive],
  );

  return (
    <div
      className={`font-medium bg-color-primary sticky top-[75px] left-0 ${
        isSidebarExpand ? 'basis-1/5 min-w-[200px] max-w-[400px]' : 'basis-[80px]'
      } pt-2 scrollbar-secondary`}
      onClick={() => !isSidebarExpand && onToggleSidebarExpand()}
    >
      {list.map((listItem, index) => (
        <NestedListItem
          key={index}
          listHeader={listItem.listHeader}
          listIcon={listItem.listIcon}
          subList={listItem.subList}
          options={{
            expand: isSidebarExpand,
          }}
        />
      ))}
    </div>
  );
};

export default Sidebar;

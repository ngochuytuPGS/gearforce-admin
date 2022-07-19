import React, { useMemo, useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Collapse } from '@mui/material';
import { Link } from 'react-router-dom';
import { NestedListItemType } from './types';

const DEFAULT_OPTIONS: NestedListItemType['options'] = {
  expand: false,
};

interface Props extends NestedListItemType {}

const NestedListItem = ({
  listHeader,
  listIcon: MuiIconComponent,
  subList,
  options: { expand } = DEFAULT_OPTIONS,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  //Nếu item bên trong list active thì header active
  const isGroupActive = useMemo(() => subList.some((subListItem) => subListItem.active), [subList]);

  return (
    <ul className="border-b text-sm border-color-border pl-5 pr-2">
      <li
        className={`${
          isGroupActive && 'text-color-purple'
        } flex items-center py-4 hover:text-color-sidebar-active cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <MuiIconComponent className="text-[20px] mr-[8px]" />
        </div>
        {expand && <p className="flex-1">{listHeader}</p>}
        {isOpen ? <ExpandMoreIcon className="text-[24px]" /> : <ArrowBackIosIcon className="text-[16px]" />}
      </li>

      <Collapse in={isOpen} orientation="vertical" component="li">
        {expand && (
          <ul>
            {subList.map((subListItem, index) => (
              <li
                key={index}
                className={`${
                  subListItem.active && 'text-color-purple'
                } border-t border-color-border pl-[28px] pr-[18px] py-3 mr-[18px] overflow-hidden overflow-ellipsis whitespace-nowrap hover:text-color-sidebar-active cursor-pointer`}
              >
                <Link to={subListItem.path}>{subListItem.header}</Link>
              </li>
            ))}
          </ul>
        )}
      </Collapse>
    </ul>
  );
};

export default NestedListItem;

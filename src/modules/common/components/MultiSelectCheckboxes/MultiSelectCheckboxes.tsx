import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { MultiSelectCheckboxesPropsType, SelectedValuesType } from './types';

const DEFAULT_PROPS = {
  placeholder: 'Selected values',
};

interface Props extends MultiSelectCheckboxesPropsType {}

const MultiSelectCheckboxes = (props: Props) => {
  const { list, placeholder, onSelectedValuesChanged } = {
    ...DEFAULT_PROPS,
    ...props,
  };
  const firstRenderRef = useRef(true);

  const defaultSelectedValues = useMemo(() => {
    const defaultSelectedValues: SelectedValuesType = [];

    for (const group of list) {
      for (const checkbox of group.checkboxes) {
        if (checkbox.select) {
          defaultSelectedValues.push(checkbox.value);
        }
      }
    }

    return defaultSelectedValues;
  }, [list]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<SelectedValuesType>(defaultSelectedValues);

  const onChange = useCallback(
    (e: React.MouseEvent) => {
      const value = e.currentTarget.getAttribute('data-value')!;

      if (selectedValues.includes(value)) {
        setSelectedValues(selectedValues.filter((selectedValue) => selectedValue !== value));
      } else {
        setSelectedValues([...selectedValues, value]);
      }
    },
    [selectedValues],
  );

  const getSelectedText = useCallback((): string => {
    const selectedText: Array<string> = [];

    for (const group of list) {
      for (const checkbox of group.checkboxes) {
        if (selectedValues.includes(checkbox.value)) {
          selectedText.push(checkbox.text);
        }
      }
    }

    return selectedText.join(', ');
  }, [list, selectedValues]);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      if (onSelectedValuesChanged) {
        onSelectedValuesChanged(selectedValues);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValues]);

  return (
    <div className="input-primary flex-1 relative pr-0">
      <div className="flex justify-between items-center select-none" onClick={() => setIsOpen(!isOpen)}>
        <p className="mr-2">{selectedValues.length ? getSelectedText() : placeholder}</p>
        {!isOpen ? <ArrowDropDownOutlinedIcon /> : <ArrowDropUpOutlinedIcon />}
      </div>
      {isOpen && (
        <div className="bg-inherit absolute left-0 top-[calc(100%+10px)] z-50 w-full max-h-[250px] overflow-y-auto border border-color-border rounded py-3 scrollbar-primary [&>div:not(:last-of-type)]:mb-3">
          {list.map((group, index) => (
            <div key={group.groupLabel || index}>
              {group.groupLabel && <p className="px-3 mb-2">{group.groupLabel}</p>}
              {group.checkboxes.map((checkbox) => (
                <div
                  key={checkbox.value}
                  className="flex items-center px-3 py-2 cursor-pointer hover:bg-color-purple"
                  data-value={checkbox.value}
                  onClick={onChange}
                >
                  <div className="bg-color-primary shrink-0 flex justify-center items-center h-[30px] w-[30px] border border-color-border rounded mr-3">
                    {selectedValues.includes(checkbox.value) && <CheckIcon />}
                  </div>
                  <p>{checkbox.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelectCheckboxes;

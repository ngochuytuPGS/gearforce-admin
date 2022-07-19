export type CheckboxType = {
  text: string;
  value: string;
  select: boolean;
};

export type CheckboxesGroupType = {
  groupLabel?: string;
  checkboxes: Array<CheckboxType>;
};

export type ListCheckboxesGroupType = Array<CheckboxesGroupType>;

export type SelectedValuesType = Array<CheckboxType['value']>;

export type MultiSelectCheckboxesPropsType = {
  /**(Required) Array of options will be render. Every value in list must be unique*/
  list: ListCheckboxesGroupType;
  /**(Optional) Placeholder for selected values. The default value is "Selected values"*/
  placeholder?: string;
  /**(Optional) onChange handler, receive array of selected values as argument */
  onSelectedValuesChanged?: (selectedValues: SelectedValuesType) => any;
};

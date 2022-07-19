type PaginationPropsType = {
  /** (Required) The total number of pages */
  totalPages: number;
  /** (Optional) The initial active page. The default value is 1. This value is uncontrolled, activePage then will be controlled by component's state */
  activePage?: number;
  /** (Optional) Range of pages displayed, exclude 2 navigation button to first and last page. The default value is 7 */
  pageRange?: number;
  /** (Optional) ClassName of button */
  className?: string;
  /** (Optional) ClassName of active button */
  activeClassName?: string;
  /**(Optional) Page change handler, receive activePage as an argument */
  onPageChange?: (activePage: number) => any;
};

export type { PaginationPropsType };

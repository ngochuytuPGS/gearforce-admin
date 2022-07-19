import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { PaginationPropsType } from './types';
import './style.css';

const DEFAULT_PROPS = {
  activePage: 1,
  pageRange: 7,
  className: 'pagination-button',
  activeClassName: 'pagination-button pagination-button-active',
};

/** Render a pagination */
const Pagination = (props: PaginationPropsType) => {
  // eslint-disable-next-line prefer-const
  let { totalPages, activePage, pageRange, className, activeClassName, onPageChange } = {
    ...DEFAULT_PROPS,
    ...props,
  };
  totalPages = useMemo(() => Math.abs(totalPages), [totalPages]);
  activePage = useMemo(() => Math.abs(activePage), [activePage]);
  pageRange = useMemo(() => Math.abs(pageRange), [pageRange]);

  const [currentPage, setCurrentPage] = useState<number>(activePage);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      if (onPageChange) onPageChange(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const generatePaginationButton = useCallback(
    (key: string | number, text: string | number, className: string, onClick: () => any): JSX.Element => {
      return (
        <div key={key} className={className} onClick={onClick}>
          {text}
        </div>
      );
    },
    [],
  );

  const jumpToFirstPageButton = generatePaginationButton('first-page', '<<', className, () => setCurrentPage(1));
  const jumpToLastPageButton = generatePaginationButton('last-page', '>>', className, () => setCurrentPage(totalPages));
  const firstPageButton = generatePaginationButton(1, 1, className, () => setCurrentPage(1));
  const lastPageButton = generatePaginationButton(totalPages, totalPages, className, () => setCurrentPage(totalPages));
  const backTwoPageButton = generatePaginationButton('back-two-page', '...', className, () =>
    setCurrentPage(currentPage - 2),
  );
  const nextTwoPageButton = generatePaginationButton('next-two-page', '...', className, () =>
    setCurrentPage(currentPage + 2),
  );
  const pageNumberButton = (pageNumber: number): JSX.Element => {
    if (pageNumber === currentPage)
      return generatePaginationButton(pageNumber, pageNumber, activeClassName, () => setCurrentPage(pageNumber));

    return generatePaginationButton(pageNumber, pageNumber, className, () => setCurrentPage(pageNumber));
  };

  const renderTotalPage = (): Array<JSX.Element> => {
    const pagination: Array<JSX.Element> = [];

    //3 Stages:
    //First: 2 last buttons is dots and totalPages
    //Middle: 2 first button is dots, firstPage and 2 last buttons is dots, totalPages
    //Last: 2 first buttons is dots and totalPages

    const firstStageRemainingButtons = pageRange - 2;
    const middleStageRemainingButtons = pageRange - 4;
    const lastStageRemainingButtons = pageRange - 2;

    if (totalPages <= pageRange) {
      for (let i = 1; i <= totalPages; ++i) {
        pagination.push(pageNumberButton(i));
      }
    } else {
      //First Stage
      //If currentPage is not the last buttons (exclude 2 last buttons)
      if (currentPage < firstStageRemainingButtons) {
        for (let i = 1; i <= firstStageRemainingButtons && i <= totalPages; ++i) {
          pagination.push(pageNumberButton(i));
        }

        pagination.push(nextTwoPageButton);
        pagination.push(lastPageButton);
      }
      //Last Stage
      //Counting from the end so the first button index is totalPages - lastStageRemainingButtons, plus 1 so that the current button start from the second position, not the first position and not able to navigate backwards
      else if (currentPage > totalPages - lastStageRemainingButtons + 1) {
        pagination.push(firstPageButton);
        pagination.push(backTwoPageButton);

        for (let i = totalPages - lastStageRemainingButtons + 1; i <= totalPages; i++) {
          pagination.push(pageNumberButton(i));
        }
      }
      //Middle stage
      else {
        const start =
          middleStageRemainingButtons % 2 === 0
            ? currentPage - middleStageRemainingButtons / 2 + 1
            : currentPage - Math.floor(middleStageRemainingButtons / 2);
        const end = currentPage + Math.floor(middleStageRemainingButtons / 2);

        pagination.push(firstPageButton);
        pagination.push(backTwoPageButton);

        for (let i = start; i <= end; i++) {
          pagination.push(pageNumberButton(i));
        }

        pagination.push(nextTwoPageButton);
        pagination.push(lastPageButton);
      }
    }

    return [jumpToFirstPageButton, ...pagination, jumpToLastPageButton];
  };

  return <>{renderTotalPage()}</>;
};

export default Pagination;

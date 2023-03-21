import React ,{ useState } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss'

function Pagination({ onChangePage }) {

    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            previousLabel="<"
            onPageChange={(e) => onChangePage(e.selected + 1) }
            pageRangeDisplayed={4}
            pageCount={3}
            nextLabel=">"
            renderOnZeroPageCount={null}
        />
    );
}

export default Pagination;
import React, { useState } from 'react'
import styles from './Paginate.module.css'

const Pagination = ({ data, RenderComponent, pageLimit, dataLimit }) => {
    const [pages] = useState(Math.round(data.length / dataLimit));
    const [currentPage, setCurrentPage] = useState(1);

    const goToNextPage = () => {
        setCurrentPage((page) => page + 1);
    }

    const goToPreviousPage = () => {
        setCurrentPage((page) => page - 1);
    }

    const changePage = (event) => {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    return (
        <>
            <div className={styles.listContainer}>
                {getPaginatedData().map((d, idx) => (
                    <RenderComponent key={idx} product={d} />
                ))}
            </div>

            <div className={styles.pagination}>
                <button
                    onClick={goToPreviousPage}
                    className={`${styles.nextPrev} ${currentPage === 1 ? 'disabled' : ''}`}
                >
                    &#60; prev
                </button>

                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={`${styles.paginationItem} ${currentPage === item ? styles.active : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                <button
                    onClick={goToNextPage}
                    className={`${styles.nextPrev} ${currentPage === pages ? 'disabled' : ''}`}
                >
                    next &#62;
                </button>
            </div>
        </>
    );
}
export default Pagination

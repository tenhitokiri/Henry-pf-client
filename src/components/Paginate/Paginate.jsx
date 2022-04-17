import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Paginate.module.css'
import ProductCard from '../Products/ProductCard'


// Example items, to simulate fetching from another resources.

function Items({ currentProducts }) {
  return (
    <>
      {currentProducts &&
        currentProducts.map((item, index) => (
          <div>
            <h3><div id={item.index}>{item.title}</div></h3>
          </div>
        ))}
    </>
  );
}

function Paginate({ itemsPerPage, totalItems, items, currentProducts, setCurrentProducts }) {
  // We start with an empty list of items.
  //const [currentProducts, setCurrentProducts] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentProducts(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const productMarkup = currentProducts.length ? (
    currentProducts.map(product => (
      <ProductCard key={product.id} product={product} />
    ))
  ) : (
    <div>No products found</div>
  )

  return (
    <div>
      <div className={styles.listContainer}>
        {productMarkup}
      </div>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        pageCount={15}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  )
}

export default Paginate

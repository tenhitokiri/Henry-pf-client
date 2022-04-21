import React from 'react'
import styles from './ItemsOrdered.module.css'

const ItemsOrdered = () => {
    return (
        <>
            <div className={styles.orderStatusWrap}>
                <div className={styles.orderInfoWrap}>
                    <div>
                        <div className={styles.orderId}>Order # 11000000071</div>
                        <div className={styles.orderDate}>
                            <span>Order Date: </span> 
                            <span>April 19, 2022</span>
                        </div>
                    </div>
                </div>
                <div className={styles.orderStatusInner}>
                    <span className={styles.orderStatus}>Pending</span>
                </div>
            </div>
            <div className={styles.orderDetailsItems}>
                <div className={styles.tableWrapper}>
                    <table className={styles.tableOrderItems}>
                        <thead>
                            <tr>
                                <th>&nbsp;</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th className={styles.qty}>Qty</th>
                                <th className={styles.qty}>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* START - BLOCK FOR EACH PRODUCT /////////////*/}
                            <tr>
                                <td>&nbsp;</td>
                                <td>
                                    <strong className={styles.productItemName}>Laptop Lenovo IdeaPad 3 15"</strong>
                                </td>
                                <td className={styles.price}>
                                    $240.00
                                </td>
                                <td className={styles.qty}>
                                    <ul className={styles.itemsQty}>
                                        Ordered 1
                                    </ul>
                                </td>
                                <td className={styles.subtotal}>
                                    <span className={styles.priceExcludingTax}>
                                        <span className={styles.price}>$240.00</span>
                                    </span>
                                </td>
                            </tr> 
                            {/* END - BLOCK FOR EACH PRODUCT ///////////////*/}
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="4" className={styles.mark} scope="row"> Subtotal </th>
                                <td className={styles.amount}>
                                    <span className={styles.price}>240.00</span> 
                                </td>
                            </tr>
                            <tr>
                                <th colspan="4" className={styles.mark} scope="row"> Shipping & Handling </th>
                                <td className={styles.amount}>
                                    <span className={styles.price}>$10.00</span>
                                </td>
                            </tr>
                            <tr>
                                <th colspan="4" className={styles.mark} scope="row">
                                    <strong>Grand Total</strong>
                                </th>
                                <td className={styles.amount}> 
                                    <strong>
                                        <span className={styles.price}>$250.00</span>
                                    </strong> 
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ItemsOrdered
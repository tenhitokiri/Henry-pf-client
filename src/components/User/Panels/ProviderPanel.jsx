import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import ItemsOrdered from './ItemsOrdered/ItemsOrdered';
import styles from './Panels.module.css'

const ProviderPanel = () => {
    const [info, setInfo] = useState('myAccountInfo')

    const updateInfo = (e) => {
        setInfo(e.target.name);
    }

    return (
        <>
            <div className={styles.pageTitleWrapper}>
                {
                    info === 'myAccountInfo' ? (
                        <h1 className={styles.pageTitle}>My Account</h1>
                    ) : info === 'mySalesInfo' || info === 'itemsOrdered' ? (
                        <h1 className={styles.pageTitle}>My Sales</h1>
                    ) : info === 'publishedProducts' ? (
                        <h1 className={styles.pageTitle}>Published Products</h1>
                    ) : null 
                }
            </div>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <div className={styles.menuWrapper}>
                        <ul>
                            <li>
                                {info === 'myAccountInfo' ? (
                                    <strong>My Account</strong>
                                ) : (
                                    <a name='myAccountInfo' onClick={e => updateInfo(e)}>My Account</a>
                                )}
                            </li>
                            <li>
                                {info === 'mySalesInfo' ? (
                                    <strong>My Sales</strong>
                                ) : (
                                    <a name='mySalesInfo' onClick={e => updateInfo(e)}>My Sales</a>
                                )}
                            </li>
                            <li>
                                {info === 'publishedProducts' ? (
                                    <strong>Published Products</strong>
                                ) : (
                                    <a name='publishedProducts' onClick={e => updateInfo(e)}>Published Products</a>
                                )}
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    info === 'myAccountInfo' ? (
                        <div className={styles.info}>
                            <div className={styles.blockDashboardInfo}>
                                <div className={styles.blockTitle}>
                                    Account Information
                                </div>
                                <div className={styles.blockContent}>
                                    <div className={styles.boxInformation}>
                                        <span className={styles.boxTitle}>
                                            <span>Contact Information</span>
                                        </span> 
                                        <div className={styles.blockContent}>
                                            <p>Jon Doe<br/> jondoe@gmail.com<br/></p>
                                        </div>
                                    </div>
                                    <div className={styles.boxUserType}>
                                        <span className={styles.boxTitle}>
                                            <span>Provider user</span>
                                        </span> 
                                        <div className={styles.blockContent}>
                                            <p><Link to='/add-product'>Public a new product</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : info === 'mySalesInfo' ? (
                        <div className={styles.info}>
                            <div className={styles.tableWrapper}>
                                <table className={styles.tableOrderItems}>
                                    <thead>
                                        <tr>
                                            <th>Order #</th>
                                            <th>Date</th> 
                                            <th>Ship To</th>
                                            <th>Order Total</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody> 
                                        {/* START - BLOCK FOR EACH ORDER /////////////*/}
                                        <tr>
                                            <td>
                                                <span>Order: </span>
                                                <a href='#' name='itemsOrdered' onClick={e => updateInfo(e)}>
                                                    11000000071
                                                </a>
                                            </td>
                                            <td><span>Date: </span>4/19/22</td>     
                                            <td><span>Ship To: </span>Jon Doe</td>
                                            <td><span>Order Total: </span><span className={styles.price}>$550.00</span></td>
                                            <td>
                                            <span>Status: </span><a href='#' name='itemsOrdered' onClick={e => updateInfo(e)}>Pending</a>
                                            </td>
                                        </tr>
                                        {/* END - BLOCK FOR EACH ORDER /////////////*/}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : info === 'itemsOrdered' ? (
                        <div className={styles.info}>
                            <ItemsOrdered />
                            <div>
                                <a href='#' name='mySalesInfo' onClick={e => updateInfo(e)}>Back to My Sales</a>
                            </div>
                        </div>
                        ) : info === 'publishedProducts' ? (
                        <div className={styles.info}>
                            Published Products info
                        </div>
                    ) : null
                }
            </div>
        </>
    );
}

export default ProviderPanel
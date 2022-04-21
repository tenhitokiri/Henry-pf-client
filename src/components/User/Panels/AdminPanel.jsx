import React, {useState} from 'react';
import ItemsOrdered from './ItemsOrdered/ItemsOrdered';
import styles from './Panels.module.css'

const AdminPanel = () => {
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
                    ) : info === 'publishedProducts' ? (
                        <h1 className={styles.pageTitle}>Published Products</h1>
                    ) : info === 'createdOrders' || info === 'itemsOrdered' ? (
                        <h1 className={styles.pageTitle}>Created Orders</h1>
                    ) : info === 'users' ? (
                        <h1 className={styles.pageTitle}>Users</h1>
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
                                {info === 'publishedProducts' ? (
                                    <strong>Published Products</strong>
                                ) : (
                                    <a name='publishedProducts' onClick={e => updateInfo(e)}>Published Products</a>
                                )}
                            </li>
                            <li>
                                {info === 'createdOrders' ? (
                                    <strong>Created Orders</strong>
                                ) : (
                                    <a name='createdOrders' onClick={e => updateInfo(e)}>Created Orders</a>
                                )}
                            </li>
                            <li>
                                {info === 'users' ? (
                                    <strong>Users</strong>
                                ) : (
                                    <a name='users' onClick={e => updateInfo(e)}>Users</a>
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
                                            <span>Admin user</span>
                                        </span> 
                                        <div className={styles.blockContent}>
                                            <p><a href='#'>Do you want to Sell?</a></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : info === 'publishedProducts' ? (
                        <div className={styles.info}>
                            <div className={styles.tableWrapper}>
                                <form>
                                    <div className={styles.filters}>
                                        Filter by status: &nbsp; 
                                        <select>
                                            <option>Published</option>
                                            <option>Waiting approve</option>
                                            <option>Waiting correction</option>
                                        </select>
                                    </div>
                                    <table className={styles.tableOrderItems}>
                                        <thead>
                                            <tr>
                                                <th>Product Title</th>
                                                <th>Date Created</th> 
                                                <th>&nbsp;</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody> 
                                            {/* START - BLOCK FOR EACH PRODUCT /////////////*/}
                                            <tr>
                                                <td>
                                                    <span>Product Title: </span>
                                                    <a href='#' name='itemsOrdered' onClick={e => updateInfo(e)}>
                                                        Laptop Lenovo IdeaPad 3 15"
                                                    </a>
                                                </td>
                                                <td><span>Date: </span>4/19/22</td>     
                                                <td><span>&nbsp;</span>&nbsp;</td>
                                                <td><span>Price: </span><span className={styles.price}>$550.00</span></td>
                                                <td>
                                                    <span>Status: </span>
                                                    <select>
                                                        <option>Published</option>
                                                        <option>Waiting approve</option>
                                                        <option>Waiting correction</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            {/* END - BLOCK FOR EACH PRODUCT /////////////*/}
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    ) : info === 'createdOrders' ? (
                        <div className={styles.info}>
                            <form>
                                <div className={styles.filters}>
                                    Filter by status: &nbsp; 
                                    <select>
                                        <option>Created</option>
                                        <option>Processing</option>
                                        <option>Cancelled</option>
                                        <option>Completed</option>
                                    </select>
                                </div>
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
                                                <span>Status: </span>
                                                <a href='#' name='itemsOrdered' onClick={e => updateInfo(e)}>Processing</a>
                                                </td>
                                            </tr>
                                            {/* END - BLOCK FOR EACH ORDER /////////////*/}
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    ) : info === 'itemsOrdered' ? (
                        <div className={styles.info}>
                            <ItemsOrdered />
                            <div>
                                <a href='#' name='createdOrders' onClick={e => updateInfo(e)}>Back to Created Orders</a>
                            </div>
                        </div>
                        ) : info === 'users' ? (
                            <div className={styles.info}>
                            <form>
                                <div className={styles.filters}>
                                    Filter by type: &nbsp; 
                                    <select>
                                        <option>User</option>
                                        <option>Provider</option>
                                        <option>Admin</option>
                                    </select>
                                </div>
                                <div className={styles.tableWrapper}>
                                    <table className={styles.tableOrderItems}>
                                        <thead>
                                            <tr>
                                                <th>Username</th>
                                                <th>Status</th> 
                                                <th>Admin?</th>
                                                <th>Reset Password</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* START - BLOCK FOR EACH USER /////////////*/}
                                            <tr>
                                                <td><span>Username: </span>Jon Doe</td>
                                                <td><span>Status: </span>
                                                    <select>
                                                        <option>Active</option>
                                                        <option>Inactive</option>
                                                    </select>
                                                </td>     
                                                <td><span>Admin?: </span>
                                                    <input type='checkbox' value='isAdmin' />
                                                </td>
                                                <td><span>Reset Password: </span><button>Reset</button></td>
                                                <td>
                                                <span>Status: </span>
                                                <a href='#' name='itemsOrdered' onClick={e => updateInfo(e)}>Processing</a>
                                                </td>
                                            </tr>
                                            {/* END - BLOCK FOR EACH USER /////////////*/}
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    ) : null
                }
            </div>
        </>
    );
}

export default AdminPanel
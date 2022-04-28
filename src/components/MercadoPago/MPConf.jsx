// import axios from 'axios';
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { checkOutCart } from '../../redux'


export default function MPConf() {
    const query = useLocation().search;
    const collection_id = new URLSearchParams(query).get("collection_id");
    const collection_status = new URLSearchParams(query).get("collection_status");
    const status = new URLSearchParams(query).get("status");
    const external_reference = new URLSearchParams(query).get("external_reference");

    const navigate = useNavigate();

    useEffect(() => {
        checkOutCart();

        /* const deleteCart = async () => {

            //await axios.post(`http://localhost:5000/mp_confirmation/?external_reference=${external_reference}`)

            await axios.delete(`http://localhost:5000/cart/all/${external_reference}`, { body: { id: external_reference } })
                .then((data) => {
                    console.log("RESPONSE: ", data)
                })
        }

        deleteCart()
            .then()
            .catch(console.log)
 */

        setTimeout(() => {
            navigate('/')
        }, 5000)
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>


            <div>Youll be redirected...</div>

            <p>X{collection_id}D</p>
            <p>{status}</p>
            <p>{collection_status}</p>
            <p>buyer id  : {external_reference}</p>


        </>
    )
}
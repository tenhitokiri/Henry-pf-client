import React from 'react'
import useCounter from '../../hooks/UseCounter';
import { useDispatch } from 'react-redux'
import { updateCartItem, removeFromCart } from '../../redux'
import { FormatMoney } from 'format-money-js';

function Product({ product, size }) {
    const {
        handle, title,
        variantInventoryQty,
        variantPrice, imageSrc, itemsToBuy
    } = product

    const formatMoney = new FormatMoney({ decimals: 2, symbol: '$', grouping: true })
    const prodPrice = formatMoney.from(parseInt(variantPrice)) || variantPrice

    let newCount = itemsToBuy
    const dispatch = useDispatch()
    const updateCart = () => {
        const payload = {
            handle,
            variantPrice,
            itemsToBuy: newCount
        }
        dispatch(updateCartItem(payload))
    }
    const removeCartItem = () => {
        const payload = {
            handle
        }
        dispatch(removeFromCart(payload))
    }

    const Buttons = ({ initialCount, value, max }) => {
        const [count, increment, decrement, reset] = useCounter(initialCount, value, max)
        const add = () => {
            increment()
            newCount = count + value > max ? max : count + value
        }
        const remove = () => {
            decrement()
            newCount = count - value < 0 ? 0 : count - value
        }
        const resetCount = () => {
            reset()
            newCount = 0
        }
        return (
            <div className="ButtonGroup">
                <button className="Button ButtonRegular" onClick={add} >+</button>
                <div className="Button">
                    <span className="Badge" >{count}</span>
                </div>
                <button className="Button ButtonRegular" onClick={remove} >-</button>
                <button className="Button ButtonReset" onClick={resetCount} >reset</button>
            </div >
        )
    }

    return (
        <div className={size === "medium" ? "Card2 Card2Medium" : "Card2 Card2Small"} key={handle} >
            <div className="CardHeader"><h1>{title}</h1></div>
            <div className="CardImage">
                <img src={imageSrc} alt={handle} />
            </div>
            <div className="CardBody">
                <p>
                    Existencia: <span>{variantInventoryQty} Item(s)</span><br />
                </p>
                <div className="CardButton">
                    <div className="CardPrice ">
                        Precio: <span> {prodPrice} </span>
                    </div>
                    <button className="Button ButtonSuccess" onClick={updateCart}>cart</button>
                    <Buttons initialCount={itemsToBuy} value={1} max={variantInventoryQty} />
                    <button className="Button ButtonReset" onClick={removeCartItem}>rem</button>
                </div>
            </div>
        </div>
    )
}
export default Product

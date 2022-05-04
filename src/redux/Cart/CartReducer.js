import CATEGORY_ACTIONS from '../Categories/categoryTypes'
import CART_ACTIONS from './cartTypes'

const initCartState = {
  isLoading: false,
  error: null,
  cartItems: [],
  numberOfItems: 0,
  savedOnDB: false,
  totalPrice: 0.0,
  discountCoupon: '',
  discountAmount: 0.0
}

const cartReducer = (state = initCartState, action) => {
  const { type, payload } = action
  switch (type) {
    //logged get cart
    case CART_ACTIONS.LOAD_CART:

      const total = payload.map(e => {
        return parseFloat(e.unit_price) * parseInt(e.quantity)
      })
      return {
        ...state,
        cartItems: payload,
        numberOfItems: payload.length,
        totalPrice: total.reduce((a, b) => { return a + b })
      }

    case CART_ACTIONS.ADD_TO_CART:
      {
        console.log(payload, "<--- payload from add to cart action>")
        if (payload.itemsToBuy === 0) return state
        if (state.cartItems.length === 0) {
          localStorage.setItem('cart', JSON.stringify([payload]));
          localStorage.setItem('savedCartItems', true);
          return {
            ...state,
            savedOnDB: false,
            cartItems: [payload],
            numberOfItems: parseInt(payload.itemsToBuy),
            totalPrice: parseFloat(payload.price) * parseInt(payload.itemsToBuy)
          }
        }
        let oldQty = 0
        let oldPrice = 0.0
        let newPrice = parseFloat(payload.price) * parseFloat(payload.itemsToBuy)
        let found = false
        let updatedCartItems = state.cartItems.map(cartItem => {
          if (cartItem.product_id === payload.product_id && cartItem.seller_id === payload.seller_id) {
            console.log(cartItem, "<--- item found>")
            oldQty = parseInt(payload.itemsToBuy)
            oldPrice = parseFloat(payload.price) * parseFloat(oldQty)
            found = true
            return {
              ...cartItem,
              itemsToBuy: (parseInt(payload.itemsToBuy) + parseInt(cartItem.itemsToBuy)) > parseInt(payload.stock) ?
                parseInt(payload.stock) :
                (parseInt(payload.itemsToBuy) + parseInt(cartItem.itemsToBuy)),
              unit_price: parseFloat(payload.price)
            }
          }
          return cartItem
        })

        if (!found) {
          console.log("no cart items found")
          updatedCartItems = [...state.cartItems, payload]
        }
        const newTotal = parseFloat(state.totalPrice) + parseFloat(newPrice) - parseFloat(oldPrice)
        const newQuantity = parseInt(state.numberOfItems) + parseInt(payload.itemsToBuy) - parseInt(oldQty)
        /* 
                if (oldQty === 0) {
                  localStorage.setItem('cart', JSON.stringify([...updatedCartItems, payload]));
                  localStorage.setItem('savedCartItems', true);
                  return {
                    ...state,
                    savedOnDB: false,
                    cartItems: [...updatedCartItems, payload],
                    numberOfItems: newQuantity,
                    totalPrice: newTotal
                  }
                }
        
         */
        localStorage.setItem('cart', JSON.stringify([...updatedCartItems]));
        localStorage.setItem('savedCartItems', true);
        return {
          ...state,
          savedOnDB: false,
          cartItems: updatedCartItems,
          numberOfItems: newQuantity,
          totalPrice: newTotal
        }
      }

    case CART_ACTIONS.UPDATE_TO_CART:
      {
        let oldQty = 0
        let oldPrice = 0.0
        let newPrice = parseFloat(payload.price) * parseFloat(payload.itemsToBuy)
        let updatedCartItems = state.cartItems.map(e => {
          if (e.product_id === payload.product_id && e.seller_id === payload.seller_id) {
            oldQty = parseInt(payload.itemsToBuy)
            oldPrice = parseFloat(payload.price) * parseFloat(oldQty)
            return {
              ...e,
              itemsToBuy: (parseInt(payload.itemsToBuy) + parseInt(e.itemsToBuy)) > parseInt(payload.stock) ?
                parseInt(payload.stock) :
                (parseInt(payload.itemsToBuy) + parseInt(payload.itemsToBuy)),
              unit_price: parseFloat(payload.price)
            }
          }
          return e
        })

        const newTotal = parseFloat(state.totalPrice) + parseFloat(newPrice) - parseFloat(oldPrice)
        const newQuantity = parseInt(state.numberOfItems) + parseInt(payload.itemsToBuy) - parseInt(oldQty)
        if (oldQty === 0) {
          localStorage.setItem('cart', JSON.stringify([...updatedCartItems, payload]));
          localStorage.setItem('savedDBCartItems', true);
          return {
            ...state,
            savedOnDB: false,
            cartItems: [...updatedCartItems, payload],
            numberOfItems: newQuantity,
            totalPrice: newTotal
          }
        }
        localStorage.setItem('cart', JSON.stringify([...updatedCartItems]));
        localStorage.setItem('savedCartItems', true);
        return {
          ...state,
          savedOnDB: false,
          cartItems: updatedCartItems,
          numberOfItems: newQuantity,
          totalPrice: newTotal
        }
      }

    case CART_ACTIONS.REMOVE_FROM_CART:
      {
        const productToRemove = state.cartItems.find(product => product.product_id === payload.product_id && product.seller_id === payload.seller_id)
        const { itemsToBuy, price } = productToRemove
        const newTotal = parseFloat(state.totalPrice) - parseFloat(itemsToBuy) * parseFloat(price)
        const updatedCartItems = state.cartItems.filter(product => product.product_id === payload && product.seller_id === payload.seller_id)
        const newQuantity = parseInt(state.numberOfItems) - parseInt(itemsToBuy)
        localStorage.setItem('cart', JSON.stringify([...updatedCartItems]));
        localStorage.setItem('savedCartItems', true);
        return {
          ...state,
          savedOnDB: false,
          numberOfItems: newQuantity,
          cartItems: updatedCartItems,
          totalPrice: newTotal
        }
      }

    case CART_ACTIONS.EMPTY_CART:
      {
        localStorage.setItem('cart', JSON.stringify([]));
        localStorage.setItem('savedCartItems', false);
        return {
          ...state,
          savedOnDB: false,
          cartItems: [],
          numberOfItems: 0
        }
      }

    case CART_ACTIONS.SET_CART_ITEMS: {
      let numberOfItems = 0;
      let totalPrice = 0.0;
      let cartItems = [];
      if (payload?.length > 0) {
        payload.forEach(product => {
          numberOfItems += parseInt(product.itemsToBuy)
          totalPrice += parseFloat(product.price) * parseFloat(product.itemsToBuy)
          cartItems.push(product)
        })
      }
      return {
        ...state,
        savedOnDB: false,
        cartItems: payload,
        numberOfItems,
        totalPrice
      }
    }

    case CART_ACTIONS.SET_DB_CART_ITEMS: {
      let numberOfItems = 0;
      let totalPrice = 0.0;
      let cartItems = [];
      if (payload.length > 0) {
        payload.forEach(product => {
          numberOfItems += parseInt(product.itemsToBuy)
          totalPrice += parseFloat(product.price) * parseFloat(product.itemsToBuy)
          cartItems.push(product)
        })
      }
      return {
        ...state,
        cartItems: payload,
        numberOfItems,
        savedOnDB: true,
        totalPrice
      }
    }

    case CART_ACTIONS.SAVE_DB_CART_ITEMS: {
      return {
        ...state,
        savedOnDB: true
      }
    }

    case CART_ACTIONS.ACTION_CART_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }

    case CART_ACTIONS.ACTION_CART_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    }
    case CART_ACTIONS.CHECKOUT_REQUEST:
      {
        return {
          ...state,
          isLoading: true
        }
      }
    case CART_ACTIONS.CHECKOUT_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: payload
      }
    case CART_ACTIONS.CHECKOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: '',
        cartItems: [],
        totalPrice: 0.0
      }
    default: return state
  }
}

export default cartReducer
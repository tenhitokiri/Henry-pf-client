import CART_ACTIONS from './cartTypes'

const initCartState = {
  cartItems: [],
  numberOfItems: 0,
  totalPrice: 0.0,
  discountCoupon: '',
  discountAmount: 0.0
}

const cartReducer = (state = initCartState, action) => {
  const { type, payload } = action
  switch (type) {
    case CART_ACTIONS.ADD_TO_CART:
      {
        const {
          price,
          itemsToBuy
        } = payload;

        if (itemsToBuy === 0) return state
        if (state.cartItems.length === 0) {
          localStorage.setItem('cart', JSON.stringify([payload]));
          localStorage.setItem('savedCartItems', true);

          return {
            ...state,
            cartItems: [payload],
            numberOfItems: parseInt(itemsToBuy),
            totalPrice: parseFloat(price) * parseInt(itemsToBuy)
          }
        }
        let oldQty = 0
        let oldPrice = 0.0
        let newPrice = parseFloat(price) * parseFloat(itemsToBuy)
        const updatedCartItems = state.cartItems.map(product => {
          const {
            product_id, name,
            price, image, itemsToBuy
          } = product
          if (product_id === payload.product_id) {
            oldQty = parseInt(itemsToBuy)
            oldPrice = parseFloat(price) * parseFloat(oldQty)
            const updatedProd = {
              product_id, name,
              inventoryQty: payload.inventoryQty,
              price, image, itemsToBuy: payload.itemsToBuy
            }
            return updatedProd
          }
          return product
        }
        )
        const newTotal = parseFloat(state.totalPrice) + parseFloat(newPrice) - parseFloat(oldPrice)
        const newQuantity = parseInt(state.numberOfItems) + parseInt(payload.itemsToBuy) - parseInt(oldQty)
        if (oldQty === 0) {
          localStorage.setItem('cart', JSON.stringify([...updatedCartItems, payload]));
          localStorage.setItem('savedCartItems', true);

          return {
            ...state,
            cartItems: [...updatedCartItems, payload],
            numberOfItems: newQuantity,
            totalPrice: newTotal
          }
        }
        localStorage.setItem('cart', JSON.stringify([...updatedCartItems]));
        localStorage.setItem('savedCartItems', true);

        return {
          ...state,
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
        const updatedCartItems = state.cartItems.map(product => {
          const {
            product_id, name,
            inventoryQty,
            price, image, itemsToBuy
          } = product
          if (product_id === payload.product_id) {
            oldQty = parseInt(itemsToBuy)
            oldPrice = parseFloat(price) * parseFloat(oldQty)
            const updatedProd = {
              product_id, name,
              inventoryQty,
              price, image, itemsToBuy: payload.itemsToBuy
            }
            return updatedProd
          }
          return product
        }
        )
        const newTotal = parseFloat(state.totalPrice) + parseFloat(newPrice) - parseFloat(oldPrice)
        const newQuantity = parseInt(state.numberOfItems) + parseInt(payload.itemsToBuy) - parseInt(oldQty)
        if (oldQty === 0) {
          localStorage.setItem('cart', JSON.stringify([...updatedCartItems, payload]));
          localStorage.setItem('savedCartItems', true);
          return {
            ...state,
            cartItems: [...updatedCartItems, payload],
            numberOfItems: newQuantity,
            totalPrice: newTotal
          }
        }
        localStorage.setItem('cart', JSON.stringify([...updatedCartItems]));
        localStorage.setItem('savedCartItems', true);
        return {
          ...state,
          cartItems: updatedCartItems,
          numberOfItems: newQuantity,
          totalPrice: newTotal
        }
      }

    case CART_ACTIONS.REMOVE_FROM_CART:
      {
        const productToRemove = state.cartItems.find(product => product.product_id === payload.product_id)
        const { itemsToBuy, price } = productToRemove

        const newTotal = parseFloat(state.totalPrice) - parseFloat(itemsToBuy) * parseFloat(price)
        const updatedCartItems = state.cartItems.filter(product => product.product_id !== payload.product_id)
        const newQuantity = parseInt(state.numberOfItems) - parseInt(itemsToBuy)
        localStorage.setItem('cart', JSON.stringify([...updatedCartItems]));
        localStorage.setItem('savedCartItems', true);
        return {
          ...state,
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
          cartItems: [],
          numberOfItems: 0
        }

      }
    case CART_ACTIONS.SET_CART_ITEMS: {
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
        totalPrice
      }
    }
    default: return state
  }
}

export default cartReducer
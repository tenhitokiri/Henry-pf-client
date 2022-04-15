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
        console.log("add to cart")
        console.log(payload)

        if (itemsToBuy === 0) return state
        if (state.cartItems.length === 0) {
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
            id, title,
            price, image, itemsToBuy
          } = product
          if (id === payload.id) {
            oldQty = parseInt(itemsToBuy)
            oldPrice = parseFloat(price) * parseFloat(oldQty)
            const updatedProd = {
              id, title,
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
          return {
            ...state,
            cartItems: [...updatedCartItems, payload],
            numberOfItems: newQuantity,
            totalPrice: newTotal
          }
        }
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
            id, title,
            inventoryQty,
            price, image, itemsToBuy
          } = product
          if (id === payload.id) {
            oldQty = parseInt(itemsToBuy)
            oldPrice = parseFloat(price) * parseFloat(oldQty)
            const updatedProd = {
              id, title,
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
          return {
            ...state,
            cartItems: [...updatedCartItems, payload],
            numberOfItems: newQuantity,
            totalPrice: newTotal
          }
        }
        return {
          ...state,
          cartItems: updatedCartItems,
          numberOfItems: newQuantity,
          totalPrice: newTotal
        }
      }

    case CART_ACTIONS.REMOVE_FROM_CART:
      {
        const productToRemove = state.cartItems.find(product => product.id === payload.id)
        const { itemsToBuy, price } = productToRemove

        const newTotal = parseFloat(state.totalPrice) - parseFloat(itemsToBuy) * parseFloat(price)
        const updatedCartItems = state.cartItems.filter(product => product.id !== payload.id)
        const newQuantity = parseInt(state.numberOfItems) - parseInt(itemsToBuy)

        return {
          ...state,
          numberOfItems: newQuantity,
          cartItems: updatedCartItems,
          totalPrice: newTotal
        }
      }

    case CART_ACTIONS.EMPTY_CART:
      return {
        ...state,
        cartItems: [],
        numberOfItems: 0
      }
    default: return state
  }
}

export default cartReducer
import CART_ACTIONS from './cartTypes'

const initCartState = {
  cartItems: [],
  numberOfItems: 0,
  totalPrice: 0.0
}

const cartReducer = (state = initCartState, action) => {
  console.log(action)
  const { type, payload } = action
  switch (type) {
    case CART_ACTIONS.ADD_TO_CART:
      {
        if (payload.itemsToBuy === 0) return state
        if (state.cartItems.length === 0) {
          return {
            ...state,
            cartItems: [payload],
            numberOfItems: parseInt(payload.itemsToBuy),
            totalPrice: parseFloat(payload.variantPrice) * parseInt(payload.itemsToBuy)
          }
        }
        let oldQty = 0
        let oldPrice = 0.0
        let newPrice = parseFloat(payload.variantPrice) * parseFloat(payload.itemsToBuy)
        const updatedcartItems = state.cartItems.map(product => {
          const {
            handle, title,
            variantInventoryQty,
            variantPrice, imageSrc, itemsToBuy
          } = product
          if (handle === payload.handle) {
            oldQty = parseInt(itemsToBuy)
            oldPrice = parseFloat(variantPrice) * parseFloat(oldQty)
            const updatedProd = {
              handle, title,
              variantInventoryQty,
              variantPrice, imageSrc, itemsToBuy: payload.itemsToBuy
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
            cartItems: [...updatedcartItems, payload],
            numberOfItems: newQuantity,
            totalPrice: newTotal
          }
        }
        return {
          ...state,
          cartItems: updatedcartItems,
          numberOfItems: newQuantity,
          totalPrice: newTotal
        }
      }
    case CART_ACTIONS.UPDATE_TO_CART:
      {
        let oldQty = 0
        let oldPrice = 0.0
        let newPrice = parseFloat(payload.variantPrice) * parseFloat(payload.itemsToBuy)
        const updatedcartItems = state.cartItems.map(product => {
          const {
            handle, title,
            variantInventoryQty,
            variantPrice, imageSrc, itemsToBuy
          } = product
          if (handle === payload.handle) {
            oldQty = parseInt(itemsToBuy)
            oldPrice = parseFloat(variantPrice) * parseFloat(oldQty)
            const updatedProd = {
              handle, title,
              variantInventoryQty,
              variantPrice, imageSrc, itemsToBuy: payload.itemsToBuy
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
            cartItems: [...updatedcartItems, payload],
            numberOfItems: newQuantity,
            totalPrice: newTotal
          }
        }
        return {
          ...state,
          cartItems: updatedcartItems,
          numberOfItems: newQuantity,
          totalPrice: newTotal
        }
      }

    case CART_ACTIONS.REMOVE_FROM_CART:
      {
        const productToRemove = state.cartItems.find(product => product.handle === payload.handle)
        const { itemsToBuy, variantPrice } = productToRemove

        const newTotal = parseFloat(state.totalPrice) - parseFloat(itemsToBuy) * parseFloat(variantPrice)
        const updatedcartItems = state.cartItems.filter(product => product.handle !== payload.handle)
        const newQuantity = parseInt(state.numberOfItems) - parseInt(itemsToBuy)

        return {
          ...state,
          numberOfItems: newQuantity,
          cartItems: updatedcartItems,
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
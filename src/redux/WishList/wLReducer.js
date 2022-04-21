import WISH_LIST_ACTIONS from './wLTypes'


/* 
{
    ADD_TO_WISH_LIST: 'ADD_TO_WISH_LIST',
    UPDATE_TO_WISH_LIST: 'UPDATE_TO_WISH_LIST',
    REMOVE_FROM_WISH_LIST: 'REMOVE_FROM_WISH_LIST',
    EMPTY_WISH_LIST: 'EMPTY_WISH_LIST',
    ACTION_WISH_LIST_SUCCESS: 'ACTION_WISH_LIST_SUCCESS',
    ACTION_WISH_LIST_FAILURE: 'ACTION_WISH_LIST_FAILURE',
    ACTION_WISH_LIST_REQUEST: 'ACTION_WISH_LIST_REQUEST',
    FETCH_WISH_LIST_ITEMS: 'FETCH_WISH_LIST_ITEMS',
    SET_WISH_LIST_ITEMS: 'SET_WISH_LIST_ITEMS',
}

 */

const initWishListState = {
    wishListItems: [],
    numberOfItems: 0,
    isLoading: false,
    error: null,
}

const wishListReducer = (state = initWishListState, action) => {
    const { type, payload } = action
    switch (type) {
        case WISH_LIST_ACTIONS.ADD_TO_WISH_LIST:
            {
                if (state.wishListItems.length === 0) {
                    localStorage.setItem('wishList', JSON.stringify([payload]));
                    localStorage.setItem('savedWishListItems', true);
                    return {
                        ...state,
                        wishListItems: [payload],
                        numberOfItems: 1,
                    }
                }
                const foundWishListItem = state.wishListItems.find(item => item.product_id === payload.product_id);

                if (foundWishListItem) {
                    return state
                }
                localStorage.setItem('wishList', JSON.stringify([...state.wishListItems, payload]));
                localStorage.setItem('savedWishListItems', true);
                return {
                    ...state,
                    wishListItems: [...state.wishListItems, payload],
                    numberOfItems: state.numberOfItems + 1,
                }
            }

        case WISH_LIST_ACTIONS.UPDATE_TO_WISH_LIST:
            {
                const updatedWishListItems = state.wishListItems.map(product => {
                    const {
                        product_id, name,
                        inventoryQty,
                        price, image,
                    } = product
                    if (product_id === payload.product_id) {
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
                localStorage.setItem('wishList', JSON.stringify([...updatedWishListItems]));
                localStorage.setItem('savedWishListItems', true);
                return {
                    ...state,
                    wishListItems: updatedWishListItems,
                }
            }

        case WISH_LIST_ACTIONS.REMOVE_FROM_WISH_LIST:
            {
                const updatedWishListItems = state.wishListItems.filter(product => product.product_id !== payload.product_id)
                localStorage.setItem('wishList', JSON.stringify([...updatedWishListItems]));
                localStorage.setItem('savedWishListItems', true);
                return {
                    ...state,
                    numberOfItems: state.numberOfItems - 1,
                    wishListItems: updatedWishListItems,
                }
            }

        case WISH_LIST_ACTIONS.EMPTY_WISH_LIST:
            {
                localStorage.setItem('wishList', JSON.stringify([]));
                localStorage.setItem('savedWishListItems', false);
                return {
                    ...state,
                    wishListItems: [],
                    numberOfItems: 0
                }

            }
        case WISH_LIST_ACTIONS.SET_CART_ITEMS: {
            let numberOfItems = 0;
            let wishListItems = [];
            if (payload.length > 0) {
                payload.forEach(product => {
                    numberOfItems += 1
                    wishListItems.push(product)
                })
            }

            return {
                ...state,
                wishListItems: payload,
                numberOfItems,
            }
        }
        default: return state
    }
}

export default wishListReducer
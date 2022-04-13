import RECIPE_ACTIONS from './recipeTypes'
import axios from 'axios';
import { API } from '../../env.jsx';
/* 
const RECIPE_ACTIONS = {
    ACTION_RECIPES_REQUEST: 'ACTION_RECIPES_REQUEST',
    ACTION_RECIPES_FAILURE: 'ACTION_RECIPES_FAILURE',
    ADD_RECIPE_SUCCESS: 'ADD_RECIPE_SUCCESS',
    FETCH_ALL_RECIPES_SUCCESS: 'FETCH_ALL_RECIPES_SUCCESS',
    FETCH_A_RECIPE_SUCCESS: 'FETCH_A_RECIPE_SUCCESS',
    FETCH_RECIPE_ID_SUCCESS: 'FETCH_RECIPE_ID_SUCCESS',
    UPDATE_RECIPE_SUCCESS: 'UPDATE_RECIPE_SUCCESS',
    DELETE_RECIPE_SUCCESS: 'DELETE_RECIPE_SUCCESS',
    CLEAR_RECIPE_SUCCESS: 'CLEAR_RECIPE_SUCCESS',
} */

//Request for action
const actionRecipesRequest = () => {
    return {
        type: RECIPE_ACTIONS.ACTION_RECIPES_REQUEST
    }
}

//Failure for action
const actionRecipesFailure = (error) => {
    return {
        type: RECIPE_ACTIONS.ACTION_RECIPES_FAILURE,
        payload: error
    }
}

//success for fetching all recipes
const fetchAllRecipesSuccess = (recipes) => {
    return {
        type: RECIPE_ACTIONS.FETCH_ALL_RECIPES_SUCCESS,
        payload: recipes
    }
}

//Fetch all recipes
export const fetchRecipes = () => {
    return (dispatch) => {
        dispatch(actionRecipesRequest())
        let api = API + 'recipes'
        axios.get(api)
            .then(response => {
                const recipes = response.data
                dispatch(fetchAllRecipesSuccess(recipes))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionRecipesFailure(msg))
            })
    }
}

//success for fetching some recipes
const fetchRecipesByNameSuccess = (recipes) => {
    return {
        type: RECIPE_ACTIONS.FETCH_A_RECIPE_SUCCESS,
        payload: recipes
    }
}
//success for fetching a recipe by id
const fetchRecipeByIdSuccess = (recipe) => {
    return {
        type: RECIPE_ACTIONS.FETCH_RECIPE_ID_SUCCESS,
        payload: recipe
    }
}

//Fetch one  recipes by ID
export const fetchRecipeById = (id) => {
    return (dispatch) => {
        dispatch(actionRecipesRequest())
        let api = API + 'recipes/' + id
        axios.get(api)
            .then(response => {
                const recipes = response.data
                dispatch(fetchRecipeByIdSuccess(recipes))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionRecipesFailure(msg))
            })
    }
}
//Fetch one  recipes by ID
export const fetchRecipeByName = (id) => {
    return (dispatch) => {
        dispatch(actionRecipesRequest())
        let api = API + 'recipes/name/'
        axios.get(api)
            .then(response => {
                const recipes = response.data
                dispatch(fetchRecipesByNameSuccess(recipes))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionRecipesFailure(msg))
            })
    }
}

//add the recipe
const addRecipeSuccess = (recipes) => {
    return {
        type: RECIPE_ACTIONS.ADD_RECIPE_SUCCESS,
        payload: recipes
    }
}

export const addRecipe = (recipe) => {
    return (dispatch) => {
        dispatch(actionRecipesRequest())
        let api = API + 'recipes/'
        console.log(`Adding Recipe to: ${api}`)
        axios.post(api, recipe)
            .then(response => {
                dispatch(addRecipeSuccess(recipe.id))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionRecipesFailure(msg))
            })
    }
}

//Remove the recipe
const deleteRecipeSuccess = (recipes) => {
    return {
        type: RECIPE_ACTIONS.DELETE_RECIPE_SUCCESS,
        payload: recipes
    }
}

export const deleteRecipe = (recipe) => {
    return (dispatch) => {
        dispatch(actionRecipesRequest())
        let api = API + 'recipes/' + recipe.id
        console.log(`deleting Diet with id ${recipe.id} to: ${api}`)
        axios.delete(api, recipe)
            .then(response => {
                dispatch(deleteRecipeSuccess(recipe.id))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionRecipesFailure(msg))
            })
    }
}

//Update the recipe
const updateRecipeSuccess = (recipes) => {
    return {
        type: RECIPE_ACTIONS.UPDATE_RECIPE_SUCCESS,
        payload: recipes
    }
}

export const updateRecipe = (recipe) => {
    return (dispatch) => {
        dispatch(actionRecipesRequest())
        let api = API + 'recipes/'
        console.log(`updating Recipe with id ${recipe.id} to: ${api}`)
        axios.put(api, recipe)
            .then(response => {
                dispatch(updateRecipeSuccess(recipe.id))
            })
            .catch(error => {
                const msg = error.message
                dispatch(actionRecipesFailure(msg))
            })
    }
}

export const clearSearchedRecipes = () => {
    return {
        type: RECIPE_ACTIONS.CLEAR_RECIPE_SUCCESS
    }
}
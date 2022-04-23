require("dotenv").config();

export const backendUrl = process.env.REACT_APP_API || "http://localhost:5000/"
export const PRODUCTS_PER_PAGE = 6

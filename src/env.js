export const backendUrl = process.env.NODE_ENV === "production" ? "https://hubazar.herokuapp.com/" : 'http://localhost:5000/'
//export const backendUrl = "https://hubazar.herokuapp.com/"
export const mainPage = process.env.NODE_ENV === "production" ? "https://hubazar.vercel.app/" : 'http://localhost:3000/'
export const PRODUCTS_PER_PAGE = 6
export const CLIENT_ID_GOOGLE = "780609260322-p4kck5h06qul2rnsfrhql4r03ueoh7lk.apps.googleusercontent.com"
// src/authapi/franchiseApi.js
// export const FRANCHISE_BASE_URL = "https://seediest-brynlee-nondefensive.ngrok-free.dev/api/v1/franchise";
export const FRANCHISE_BASE_URL = "http://localhost:8002/api/v1/franchise";

export const FRANCHISE_API_ENDPOINTS = {


        // 1. POST request to create a new car
    CREATE_SELF_LISTING: `${FRANCHISE_BASE_URL}/self-car-list`,

    // 2. GET request to fetch the list of cars
    GET_MY_LISTINGS: `${FRANCHISE_BASE_URL}/selfcars/list`, 

     // 3. PUT request to edit a car (ID बाद में सर्विस में जुड़ेगा)
    EDIT_LISTING: (id) => `${FRANCHISE_BASE_URL}/edit/${id}`,

    // 4. DELETE request to delete a car (ID बाद में सर्विस में जुड़ेगा)
    DELETE_LISTING: (id) => `${FRANCHISE_BASE_URL}/delete/${id}`,



     // ✅ NEW: GET INQUIRIES
  GET_INQUIRIES: `${FRANCHISE_BASE_URL}/inquiries`,



    // ✅ DEAL APIs
  START_DEAL: `${FRANCHISE_BASE_URL}/deal/create`,
  UPDATE_DEAL: `${FRANCHISE_BASE_URL}/deal/update`,
  FINALIZE_DEAL: `${FRANCHISE_BASE_URL}/deal/finalize`,

}; 


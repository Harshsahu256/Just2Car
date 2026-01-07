// src/authapi/franchiseApi.js
// export const FRANCHISE_BASE_URL = "https://seediest-brynlee-nondefensive.ngrok-free.dev/api/v1/franchise";
export const FRANCHISE_BASE_URL = "http://localhost:3010/api/v1/franchise";
// export const FRANCHISE_BASE_URL = "https://justapp.aasmo.in/api/v1/franchise";

export const FRANCHISE_API_ENDPOINTS = {
  DASHBOARD_REPORTS: `${FRANCHISE_BASE_URL}/dashboard`,

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
  
  // ✅ UPDATE INQUIRY STATUS
UPDATE_INQUIRY_STATUS: (inquiryId) =>
  `${FRANCHISE_BASE_URL}/inquiries/${inquiryId}/status`,


   // ✅ DELETE INQUIRY
  DELETE_INQUIRY: (id) => `${FRANCHISE_BASE_URL}/inquiry/${id}`,

// ✅ CAR WISE INQUIRIES
GET_CAR_INQUIRIES: (carId) =>
  `${FRANCHISE_BASE_URL}/car-inquiries/${carId}`,

    // ✅ DEAL APIs
  START_DEAL: `${FRANCHISE_BASE_URL}/deal/create`,
  UPDATE_DEAL: `${FRANCHISE_BASE_URL}/deal/update`,
  FINALIZE_DEAL: `${FRANCHISE_BASE_URL}/deal/finalize`,


    // ✅ LISTING VERIFICATION APIs
  GET_FRANCHISE_CAR_LISTINGS: `${FRANCHISE_BASE_URL}/franchise-car-listings`,



  EDIT_CAR_LISTING: (carId) => `${FRANCHISE_BASE_URL}/listings/edit/${carId}`,

  REJECT_CAR_LISTING: (carId) =>`${FRANCHISE_BASE_URL}/listings/reject/${carId}`,



  // ================= PROFILE APIs =================

GET_PROFILE: `${FRANCHISE_BASE_URL}/profile`,

UPDATE_PROFILE: `${FRANCHISE_BASE_URL}/profile`,

CHANGE_PASSWORD: `${FRANCHISE_BASE_URL}/profile/password`,

DELETE_PROFILE: `${FRANCHISE_BASE_URL}/profile`,

  GET_DEAL_DETAILS: (id) => `${FRANCHISE_BASE_URL}/deal/${id}`, // Ye line add karein

 GET_ANALYTICS: (range) => `${FRANCHISE_BASE_URL}/franchise-analytics?range=${range}`,

  GET_LISTING_PACKAGES: `${FRANCHISE_BASE_URL}/getAllCarListingPackages`,
  CREATE_PACKAGE_ORDER: `${FRANCHISE_BASE_URL}/payment/packageorder`,
  GET_CAR_LISTING_STATS: `${FRANCHISE_BASE_URL}/listing-stats`,

// 👇 NEW: DEAL TRACKING (Kanban/List & Status Update)
  GET_ALL_DEALS: `${FRANCHISE_BASE_URL}/deals`, 
  UPDATE_DEAL_STATUS: (dealId) => `${FRANCHISE_BASE_URL}/deals/${dealId}/status`,

 // Territory Management
  REQUEST_TERRITORY_UPDATE: `${FRANCHISE_BASE_URL}/territory/request`,
  GET_TERRITORY_HISTORY: `${FRANCHISE_BASE_URL}/territory/history`,


  // ================= INSPECTION APIs =================

  GET_INSPECTORS: `${FRANCHISE_BASE_URL}/inspectors/all`,

   CREATE_INSPECTORS:`${FRANCHISE_BASE_URL}/inspectors/create`,

  UPDATE_INSPECTOR: (id) => `${FRANCHISE_BASE_URL}/inspectors/${id}`, // Changed 'inspector' to 'inspectors'
  DELETE_INSPECTOR: (id) => `${FRANCHISE_BASE_URL}/inspectors/${id}`, // Changed 'inspector' to 'inspectors'

SCHEDULE_INSPECTION: `${FRANCHISE_BASE_URL}/inspection/schedule`,

ASSIGN_INSPECTOR: `${FRANCHISE_BASE_URL}/inspection/assign`,

  GET_COMPLETED_INSPECTION_BY_CAR:`${FRANCHISE_BASE_URL}/inspection/completed`, // carId later
 

APPROVE_CAR_LISTING:`${FRANCHISE_BASE_URL}/inspection/make-live`,




}; 


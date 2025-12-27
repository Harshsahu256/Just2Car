// src/services/franchiseService.js
import axios from "axios";
import { FRANCHISE_API_ENDPOINTS } from "../authapi/franchiseApi";


// Function to get the auth token (aap ise apne auth context/storage se lein)
const getAuthToken = () => {
    return localStorage.getItem("token"); // Example: Token localStorage se le rahe hain
};

// 1. Service to create a new car listing
export const createFranchiseCar = async (formData) => {
    const token = getAuthToken();
    if (!token) throw new Error("No auth token found. Please login again.");

    const response = await axios.post(
        FRANCHISE_API_ENDPOINTS.CREATE_SELF_LISTING,
        formData, // FormData object for file uploads
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data;
};

// 2. Service to fetch franchise's own car listings
export const getMyFranchiseListings = async () => {
    const token = getAuthToken();
    if (!token) throw new Error("No auth token found. Please login again.");

    const response = await axios.get(
        FRANCHISE_API_ENDPOINTS.GET_MY_LISTINGS,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data.data; // Backend se 'data' array return hoga
};



// 3. EDIT CAR LISTING (New)
export const editFranchiseCar = async (id, formData) => {
    const token = getAuthToken();
    if (!token) throw new Error("No auth token found.");

    const response = await axios.put(
        FRANCHISE_API_ENDPOINTS.EDIT_LISTING(id),
        formData, // Isme images/docs ho sakte hain isliye multipart use hoga
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
            
            },
        }
    );
    return response.data;
};

// 4. DELETE CAR LISTING (New)
export const deleteFranchiseCar = async (id) => {
    const token = getAuthToken();
    if (!token) throw new Error("No auth token found.");

    const response = await axios.delete(
        FRANCHISE_API_ENDPOINTS.DELETE_LISTING(id),
        {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        }
    );
    return response.data;
};


// 5. GET FRANCHISE INQUIRIES
export const getFranchiseInquiries = async () => {
    const token = getAuthToken();
    if (!token) throw new Error("No auth token found. Please login again.");

    const response = await axios.get(
        FRANCHISE_API_ENDPOINTS.GET_INQUIRIES,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    // Backend response:
    // { success, count, data }
    return response.data;
};





// ================= DEAL SERVICES =================

// 6. START DEAL (Inquiry → Deal)
export const startDeal = async (payload) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const response = await axios.post(
    FRANCHISE_API_ENDPOINTS.START_DEAL,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// 7. MAKE / UPDATE OFFER (Negotiation)
export const makeOffer = async (payload) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const response = await axios.put(
    FRANCHISE_API_ENDPOINTS.UPDATE_DEAL,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// 8. FINALIZE DEAL (Sold)
export const finalizeDeal = async (payload) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const response = await axios.put(
    FRANCHISE_API_ENDPOINTS.FINALIZE_DEAL,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



// ✅ DELETE FRANCHISE INQUIRY
export const deleteFranchiseInquiry = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const response = await axios.delete(
    FRANCHISE_API_ENDPOINTS.DELETE_INQUIRY(id),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// 9. GET FRANCHISE CAR LISTINGS (For Verification)
export const getFranchiseCarListings = async (status) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const response = await axios.get(
    FRANCHISE_API_ENDPOINTS.GET_FRANCHISE_CAR_LISTINGS,
    {
      params: { status }, // ?status=pending_verification
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // { success, data }
};


// 10. REJECT CAR LISTING
export const rejectCarListing = async (carId, reason) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const response = await axios.put(
    FRANCHISE_API_ENDPOINTS.REJECT_CAR_LISTING(carId),
    { reason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



// 1️⃣ GET USER PROFILE
export const getUserProfile = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const response = await axios.get(
    FRANCHISE_API_ENDPOINTS.GET_PROFILE,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// 2️⃣ UPDATE PROFILE (with image)
export const updateUserProfile = async (formData) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const response = await axios.put(
    FRANCHISE_API_ENDPOINTS.UPDATE_PROFILE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// 3️⃣ CHANGE PASSWORD
export const changeUserPassword = async (payload) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const response = await axios.put(
    FRANCHISE_API_ENDPOINTS.CHANGE_PASSWORD,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// 4️⃣ DELETE PROFILE
export const deleteUserProfile = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const response = await axios.delete(
    FRANCHISE_API_ENDPOINTS.DELETE_PROFILE,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// src/services/franchiseService.js
export const getFranchiseDashboardReports = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");
 
  const response = await axios.get(
    FRANCHISE_API_ENDPOINTS.DASHBOARD_REPORTS,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
 
  return response.data.stats;
};
 

// 9. GET DEAL DETAILS (New)
export const getDealDetails = async (dealId) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");
 
  const response = await axios.get(
    FRANCHISE_API_ENDPOINTS.GET_DEAL_DETAILS(dealId),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
 
  return response.data;
};
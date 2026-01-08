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

export const updateInquiryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: user not found"
      });
    }

    const inquiry = await Inquiry.findById(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found"
      });
    }

    // 🔐 Ownership check
    if (inquiry.franchiseId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied"
      });
    }

    inquiry.status = status;
    await inquiry.save();

    res.json({
      success: true,
      message: "Inquiry status updated",
      data: inquiry
    });

  } catch (error) {
    console.error("Update Inquiry Status Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
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




export const editFranchiseListing = async (carId, data) => {
  const token = getAuthToken();
  const response = await axios.put(
    FRANCHISE_API_ENDPOINTS.EDIT_CAR_LISTING(carId),
    data,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
  return response.data;
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


export const getFranchiseAnalytics = async (range) => {
    const token = getAuthToken();
    if (!token) throw new Error("No auth token found.");

    const response = await axios.get(
        FRANCHISE_API_ENDPOINTS.GET_ANALYTICS(range),
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );
    return response.data; // { success, monthlyData, leadConversionData, kpiData }
};


export const getListingPackages = async () => {
    const token = getAuthToken();
    const response = await axios.get(
        FRANCHISE_API_ENDPOINTS.GET_LISTING_PACKAGES,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return response.data; // { success: true, data: [...] }
};
 
 
 
 
export const createListingPackageOrder = async (packageId) => {
  const token = getAuthToken();
  const response = await axios.post(
    FRANCHISE_API_ENDPOINTS.CREATE_PACKAGE_ORDER,
    { packageId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
 
export const getFranchiseListingStats = async () => {
  const token = getAuthToken();
  const response = await axios.get(
     FRANCHISE_API_ENDPOINTS.GET_CAR_LISTING_STATS,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};


export const getFranchiseDeals = async () => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const response = await axios.get(
    FRANCHISE_API_ENDPOINTS.GET_ALL_DEALS,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // { success: true, data: [...] }
};

// 11. UPDATE DEAL STATUS (Sold / Cancelled / Negotiating)
export const updateDealStatus = async (dealId, payload) => {
  // Payload example: { status: "sold", finalPrice: 500000, note: "Done" }
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const response = await axios.put(
    FRANCHISE_API_ENDPOINTS.UPDATE_DEAL_STATUS(dealId),
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};



// Request New Territory
export const submitTerritoryRequest = async (payload) => {
  // Payload: { requestedPincodes: ["123", "456"], reason: "Growth" }
  const token = getAuthToken();
  const response = await axios.post(
    FRANCHISE_API_ENDPOINTS.REQUEST_TERRITORY_UPDATE,
    payload,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// Get Request History
export const getTerritoryHistory = async () => {
  const token = getAuthToken();
  const response = await axios.get(
    FRANCHISE_API_ENDPOINTS.GET_TERRITORY_HISTORY,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.data;
};





export const getMyinspections = async () => {
  const token = getAuthToken();
  const res = await axios.get(
    FRANCHISE_API_ENDPOINTS.GET_inspectionS,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
 
export const createFranchiseinspection = async (payload) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");
 
  const res = await axios.post(
    FRANCHISE_API_ENDPOINTS.CREATE_inspectionS,
    payload,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};


export const scheduleInspection = async (payload) => {
 
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const res = await axios.post(
    FRANCHISE_API_ENDPOINTS.SCHEDULE_INSPECTION,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const approveCarListing = async (carId, qualityRating) => {
  const token = getAuthToken();
 
  const response = await axios.put(
    FRANCHISE_API_ENDPOINTS.APPROVE_CAR_LISTING,
    {
      carId,
      qualityRating
    },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
 
  return response.data;
};
 

export const assigninspection = async (payload) => {
  
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const res = await axios.put(
    FRANCHISE_API_ENDPOINTS.ASSIGN_inspection,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getCompletedInspectionByCarId = async (carId) => {
  const token = getAuthToken();
 
  const res = await axios.get(
    `${FRANCHISE_API_ENDPOINTS.GET_COMPLETED_INSPECTION_BY_CAR}/${carId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
 
  return res.data;
};


export const updateFranchiseinspection = async (id, formData) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const res = await axios.put(
    FRANCHISE_API_ENDPOINTS.UPDATE_inspection(id),
    formData, // FormData (name, phone, pincode, profileImage)
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};


export const deleteFranchiseinspection = async (id) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const res = await axios.delete(
    FRANCHISE_API_ENDPOINTS.DELETE_inspection(id),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};


export const updateFranchiseInquiryStatus = async (inquiryId, status) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const response = await axios.put(
    FRANCHISE_API_ENDPOINTS.UPDATE_INQUIRY_STATUS(inquiryId),
    { status }, // body
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ✅ GET CAR WISE INQUIRIES
export const getCarInquiries = async (carId) => {
  const token = getAuthToken();
  if (!token) throw new Error("No auth token found.");

  const response = await axios.get(
    FRANCHISE_API_ENDPOINTS.GET_CAR_INQUIRIES(carId),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // { success, data }
};
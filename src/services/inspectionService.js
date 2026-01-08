import axios from "axios";
import { INSPECTION_API_ENDPOINTS } from "../authapi/InspectionApi";


export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};



export const getinspectionDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(INSPECTION_API_ENDPOINTS.DASHBOARD_STATS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

// 🔹 Get Assigned Tasks
export const getinspectionTasks = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(INSPECTION_API_ENDPOINTS.MY_TASKS, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

// 🔹 Get Completed Inspections
export const getCompletedInspections = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(INSPECTION_API_ENDPOINTS.COMPLETED, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

// 🔹 Submit Inspection Report (with photos)
export const submitInspectionReport = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(INSPECTION_API_ENDPOINTS.SUBMIT_REPORT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
};
import api from "@/services/api";
import { UserData } from "@/types";

export const login = (userData: UserData): any => {
  return async () => {
    try {
      const response = await api.post("/Login", userData);
      if (response.data) {
        if (!response.data.isOK) {
          return;
        }
        return response.data;
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);
      throw error;
    }
  };
};

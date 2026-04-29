import type { RequestDto } from '../models/Dtos/requestDto';
import type { ResponseDto } from '../models/Dtos/responseDto';
import type { ErrorDto } from '../models/Dtos/errorDto';

const API_URL = 'http://localhost:8000/predict';
const API_URL_V1 = 'http://localhost:8000/predictv1';
const API_URL_OVERFIT = 'http://localhost:8000/predictOverfit';

export const mlService = {

  predictImage: async (data: RequestDto): Promise<ResponseDto> => {
    const formData = new FormData();
    formData.append("image", data.image);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorMsg = `Erreur serveur (statut: ${response.status})`;
        try {
          const errorData: ErrorDto = await response.json();
          if (errorData.error) errorMsg = errorData.error;
        } catch {
        }
        throw new Error(errorMsg);
      }

      const result: ResponseDto = await response.json();
      return result;
    } catch (error) {
      console.error("Erreur lors de la prédiction V3 :", error);
      throw error;
    }
  },

  predictImageV1: async (data: RequestDto): Promise<ResponseDto> => {
    const formData = new FormData();
    formData.append("image", data.image);

    try {
      const response = await fetch(API_URL_V1, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorMsg = `Erreur serveur (statut: ${response.status})`;
        try {
          const errorData: ErrorDto = await response.json();
          if (errorData.error) errorMsg = errorData.error;
        } catch {
        }
        throw new Error(errorMsg);
      }

      const result: ResponseDto = await response.json();
      return result;
    } catch (error) {
      console.error("Erreur lors de la prédiction V1 :", error);
      throw error;
    }
  },

  predictImageOverfit: async (data: RequestDto): Promise<ResponseDto> => {
    const formData = new FormData();
    formData.append("image", data.image);

    try {
      const response = await fetch(API_URL_OVERFIT, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorMsg = `Erreur serveur (statut: ${response.status})`;
        try {
          const errorData: ErrorDto = await response.json();
          if (errorData.error) errorMsg = errorData.error;
        } catch {
        }
        throw new Error(errorMsg);
      }

      const result: ResponseDto = await response.json();
      return result;
    } catch (error) {
      console.error("Erreur lors de la prédiction Overfit :", error);
      throw error;
    }
  }
};


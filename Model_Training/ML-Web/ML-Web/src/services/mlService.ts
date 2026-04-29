import type { RequestDto } from '../models/Dtos/requestDto';
import type { ResponseDto } from '../models/Dtos/responseDto';
import type { ErrorDto } from '../models/Dtos/errorDto';

const rawBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

const API_URL = `${BASE_URL}/predict`;
const API_URL_V1 = `${BASE_URL}/predictv1`;
const API_URL_OVERFIT = `${BASE_URL}/predictOverfit`;

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


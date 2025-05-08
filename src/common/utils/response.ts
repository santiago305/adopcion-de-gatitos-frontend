
import {
  SuccessResponse,
  ErrorResponse,
  WarningResponse,
  InfoResponse,
  InvalidResponse,
} from "../interfaces/response.interface";
import { statusMessage } from "../interfaces/statusMesage";

export const successResponse = (message: any): SuccessResponse => ({
  type: statusMessage.SUCCESS, // debería ser 'success'
  message,
});

export const errorResponse = (message: any): ErrorResponse => ({
  type: statusMessage.ERROR, 
  message,
});

export const warningResponse = (message: any): WarningResponse => ({
  type: statusMessage.WARNING,
  message,
});

export const infoResponse = (message: any): InfoResponse => ({
  type: statusMessage.INFO,
  message,
});

export const invalidResponse = (message: any): InvalidResponse => ({
  type: statusMessage.INVALID,
  message,
});

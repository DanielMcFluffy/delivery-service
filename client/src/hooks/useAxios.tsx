/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Api_DELETE, Api_GET, Api_POST } from "../models/Api";
import { log } from "../utils";
import React from "react";
import { BaseContext } from "../contexts/baseContext";
import { BaseResponse, ErrorResponse } from "../models/Response";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_BASE_URL;

export const useAxios = () => {
  
  const setShowLoading = React.useContext(BaseContext)!.setShowLoading;

  const AxiosGET = async<
  TResponse,
  TApi extends Api_GET
  >(
    url: TApi,
  ): Promise<BaseResponse<TResponse> | ErrorResponse > => {
    try {
      log('[REQUEST][GET]', url);
      setShowLoading(true);
      const response = await axios.get(url, {baseURL, withCredentials: true})
      response.data ? log('[RESPONSE][GET]', url, response.data) : undefined;
      return response.data as BaseResponse<TResponse>;
    } catch (error) {
      console.error('Error:', (error as any).response.data);
      toast.error((error as any).response.data.message);
      return (error as any).response.data as ErrorResponse;
    } finally {
      setShowLoading(false);
    }
  };
  
  const AxiosPOST = async<
  TRequest,
  TResponse,
  TApi extends Api_POST
  >(
    url: TApi, 
    request: TRequest,
  ): Promise<BaseResponse<TResponse> | ErrorResponse> => {
    try {
      log('[REQUEST][POST]', url);
      setShowLoading(true);
      const response = await axios.post(url, request, {baseURL, withCredentials: true})
      response.data ? log('[RESPONSE][POST]', url, response.data) : undefined;
      return response.data as BaseResponse<TResponse>
    } catch (error) {
      console.error('Error:', (error as any).response.data);
      toast.error((error as any).response.data.message);
      return (error as any).response.data as ErrorResponse;
    } finally {
      setShowLoading(false);
    }
  }
  
  const AxiosDELETE = async<
  TResponse,
  TApi extends Api_DELETE
  >(
    url: TApi,
  ): Promise<BaseResponse<TResponse> | ErrorResponse> => {
    try {
      log('[REQUEST][DELETE]', url);
      setShowLoading(true);
      const response = await axios.delete(url, {baseURL, withCredentials: true})
      response.data ? log('[RESPONSE][DELETE]', url, response.data) : undefined;
      return response.data as BaseResponse<TResponse>
    } catch (error) {
      console.error('Error:', (error as any).response.data);
      toast.error((error as any).response.data.message);
      return (error as any).response.data as ErrorResponse;
    } finally {
      setShowLoading(false);
    }
  }
    
  return {AxiosGET, AxiosPOST, AxiosDELETE}

}


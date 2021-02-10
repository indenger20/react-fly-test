import axios from 'axios';
import { API_PATH } from 'config';
import { StatusCode, MESSAGE } from 'const';
import { showMessage } from 'helpers';

interface IPayload extends IRequestData {
  partUrl: string;
  baseURL?: string;
}

interface HttpError {
  error: boolean;
  status: any;
  description: string;
}

export type HttpResp<T> = T & HttpError;

interface IRequestData {
  data: any | null;
  method: string;
  signal?: AbortSignal;
}

const prepareRequestData = (payload: IPayload): IRequestData => {
  const { method = 'GET', data = {}, signal } = payload;

  return {
    data,
    method,
    signal,
  };
};

export async function httpApi(payload: IPayload | any) {
  const { partUrl, baseURL = API_PATH, headers = {} } = payload;
  try {
    // REQUEST
    const response = await fetch(`${baseURL}${partUrl}`, {
      ...prepareRequestData(payload),
      headers,
    });
    const { status } = response;

    const data = await response.json();

    return status >= StatusCode.OK && status < StatusCode.MULTIPLY_CHOICE
      ? data || {}
      : {};
  } catch ({ response = {} }) {
    const { status = StatusCode.OFFLINE, data = {} } = response;

    const err: HttpError = {
      status,
      error: true,
      description: data.error_description || MESSAGE.ERROR_DEFAULT,
    };

    if (status === StatusCode.OFFLINE && !window.navigator.onLine) {
      err.description = MESSAGE.NO_NETWORK;
      showMessage.error(MESSAGE.NO_NETWORK);
    }

    console.error('API ERROR ==>', { err, response });
    return err;
  }
}

// Encode data to x-www-form-urlencoded type
export const encodeDataToUrl = (
  params: { [key: string]: any },
  isSkipNull: boolean = true,
) =>
  Object.keys(params)
    .filter((key) => !isSkipNull || (isSkipNull && params[key]))
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`,
    )
    .join('&');

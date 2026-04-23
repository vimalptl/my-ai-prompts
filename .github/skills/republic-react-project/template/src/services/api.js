import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { ProgressBar } from 'primereact/progressbar';
import { ProgressSpinner } from 'primereact/progressspinner';
import { getCookie } from '../utils/utils';

let indicatorElement = null;

function ensureIndicatorElement(id) {
  if (!indicatorElement) {
    indicatorElement = document.createElement('div');
    indicatorElement.id = id;
    document.body.appendChild(indicatorElement);
  }

  return indicatorElement;
}

function clearIndicator() {
  if (indicatorElement) {
    ReactDOM.unmountComponentAtNode(indicatorElement);
    document.body.removeChild(indicatorElement);
    indicatorElement = null;
  }
}

export function applyDefaultHeaders({
  bearerToken,
  tokenCookieName = 'token',
  clientSessionCookieName = 'clientSession',
  includeClientSession = true,
  disableCache = false
} = {}) {
  const token = bearerToken || getCookie(tokenCookieName);
  const clientSession = getCookie(clientSessionCookieName);

  if (token) {
    axios.defaults.headers.common.Authorization = token.startsWith('Bearer ')
      ? token
      : `Bearer ${token}`;
  }

  if (includeClientSession && clientSession) {
    axios.defaults.headers.common.clientSession = clientSession;
  }

  if (disableCache) {
    axios.defaults.headers.get.Pragma = 'no-cache';
  }
}

export function normalizeServiceError(error) {
  const normalizedError = {};

  try {
    if (typeof error.response?.data === 'string') {
      Object.assign(normalizedError, JSON.parse(error.response.data));
    } else if (error.response?.data) {
      Object.assign(normalizedError, error.response.data);
    } else {
      normalizedError.message = error.message || String(error);
      normalizedError.error = error.request?.statusText || 'Network Error';
      normalizedError.status = error.request?.status || 0;
    }
  } catch (parseError) {
    normalizedError.message = error.message || String(error);
    normalizedError.error = error.request?.statusText || 'Unexpected Error';
    normalizedError.status = error.request?.status || 0;
  }

  return normalizedError;
}

export function registerRequestLifecycle({
  indicator = 'spinner',
  indicatorId = indicator === 'bar' ? 'progress-bar' : 'progress-spinner',
  logRequests = false,
  logResponses = false,
  unauthorizedMessage = 'Your token is not valid or is expired, you will be redirected to login page.'
} = {}) {
  axios.interceptors.request.use((config) => {
    const element = ensureIndicatorElement(indicatorId);

    if (indicator === 'bar') {
      ReactDOM.render(<ProgressBar mode="indeterminate" />, element);
    } else {
      ReactDOM.render(<ProgressSpinner />, element);
    }

    if (logRequests) {
      console.log('Request URL:', config.url);
      console.log('Request Params:', config.params);
    }

    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      clearIndicator();

      if (logResponses) {
        console.log('Response Data:', response.data);
      }

      return response;
    },
    (error) => {
      clearIndicator();

      const status = error.response?.status || error.request?.status;

      if (String(status) === '403') {
        alert(unauthorizedMessage);
      }

      if (logResponses) {
        console.error('Response Error:', error);
      }

      return Promise.reject(normalizeServiceError(error));
    }
  );
}

export function getJson(url, config = {}) {
  return axios.get(url, config).then((response) => response.data);
}

export function postJson(url, payload, config = {}) {
  return axios.post(url, payload, config).then((response) => response.data);
}

export function putJson(url, payload, config = {}) {
  return axios.put(url, payload, config).then((response) => response.data);
}

export function deleteJson(url, config = {}) {
  return axios.delete(url, config).then((response) => response.data);
}

export function createJsonRpcId(prefix = 'request') {
  return `${prefix}_${Date.now()}`;
}
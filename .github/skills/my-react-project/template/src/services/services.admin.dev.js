import {
  applyDefaultHeaders,
  createJsonRpcId,
  deleteJson,
  getJson,
  postJson,
  putJson,
  registerRequestLifecycle
} from './api';

const developmentBearerToken = 'replace-with-development-bearer-token';
const serverUrl = 'http://localhost:8888';
const serverUrl2 = 'https://securedev.republicindemnity.com';
const serverUrl3 = 'https://securedev.republicindemnity.com';

applyDefaultHeaders({
  bearerToken: developmentBearerToken,
  includeClientSession: true
});

registerRequestLifecycle({
  indicator: 'bar',
  indicatorId: 'progress-bar',
  logRequests: true,
  logResponses: true
});

export const endpoints = {
  policySearchByBillNo: `${serverUrl2}/ripolicy/pcods/v1/policies/billnbr/search`,
  policySearch: `${serverUrl2}/ripolicy/pcods/v1/policies/search`,
  policyByUser: `${serverUrl2}/ripolicy/pcods/v1/policy/user/authcode`,
  myPolicies: `${serverUrl2}/ripolicy/policyholder/mypolicies`,
  managePolicyholderUser: `${serverUrl}/ri-rest-services/api/ph/v1/ldap-user`,
  forgotPassword: `${serverUrl}/ri-rest-services/api/public/ph/forgotPassword`,
  pcForgotPassword: `${serverUrl3}/account-management/resetpassword`,
  currentUserInfo: `${serverUrl}/ri-rest-services/api/ph/v1/insured-user`,
  managePolicyAuth: `${serverUrl}/ri-rest-services/api/ph/v1/ldap-user/policy`
};

export function CurrentUser() {
  return getJson(endpoints.currentUserInfo);
}

export function GetMyPolicies(params = {}) {
  return getJson(endpoints.myPolicies, { params });
}

export function AddPhUser(data) {
  return postJson(endpoints.managePolicyholderUser, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function EditPhUser(data) {
  return putJson(endpoints.managePolicyholderUser, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function DeletePhUser(id) {
  return deleteJson(`${endpoints.managePolicyholderUser}/${encodeURIComponent(id)}`);
}

export function ResetPhPassword(param) {
  return postJson(
    endpoints.pcForgotPassword,
    {
      jsonrpc: '2.0',
      id: createJsonRpcId('password'),
      method: 'sendPasswordToken',
      params: [param]
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
}

export function DefaultPolicy(data) {
  return putJson(endpoints.managePolicyAuth, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export default {
  endpoints,
  CurrentUser,
  GetMyPolicies,
  AddPhUser,
  EditPhUser,
  DeletePhUser,
  ResetPhPassword,
  DefaultPolicy
};
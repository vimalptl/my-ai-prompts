import {
  applyDefaultHeaders,
  deleteJson,
  getJson,
  postJson,
  putJson,
  registerRequestLifecycle
} from './api';

applyDefaultHeaders({
  includeClientSession: true,
  disableCache: true
});

registerRequestLifecycle({
  indicator: 'spinner',
  indicatorId: 'progress-spinner',
  logRequests: false,
  logResponses: false
});

export const endpoints = {
  policySearchByBillNo: '/account-management/ripolicy/pcods/v1/policies/billnbr/search',
  policySearch: '/account-management/ripolicy/pcods/v1/policies/search',
  policyByUser: '/account-management/ripolicy/pcods/v1/policy/user/authcode',
  myPolicies: '/account-management/ripolicy/policyholder/mypolicies',
  managePolicyholderUser: '/account-management/ri-rest-services/api/ph/v1/ldap-user',
  forgotPassword: '/account-management/ri-rest-services/api/public/ph/forgotPassword',
  pcForgotPassword: '/account-management/resetpassword',
  currentUserInfo: '/account-management/ri-rest-services/api/ph/v1/insured-user',
  managePolicyAuth: '/account-management/ri-rest-services/api/ph/v1/ldap-user/policy'
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
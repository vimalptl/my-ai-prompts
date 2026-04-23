import serviceModule from 'services/services.admin';

export default serviceModule;

export const {
  endpoints,
  CurrentUser,
  GetMyPolicies,
  AddPhUser,
  EditPhUser,
  DeletePhUser,
  ResetPhPassword,
  DefaultPolicy
} = serviceModule;
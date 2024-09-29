import rolesConfig from '../config/roles.json';

export const getUserRole = () => {
  return rolesConfig.user.role;
};

export const getUserPreferences = () => {
  return rolesConfig.user.preferences;
};

const API_AUTH = '/auth';

export const API_AUTH_GROUP = {
    authentication: `${API_AUTH}/login`,
    register: `${API_AUTH}/register`,  
    logout: `${API_AUTH}/logout`, 
    refreshToken: `${API_AUTH}/refresh`,
    validateToken: `${API_AUTH}/validate-token`
  };

const API_USERS = '/users';

export const API_USERS_GROUP = {
  createUser : `${API_USERS}/create`,
  findAll : `${API_USERS}/findAll`,
  findActives : `${API_USERS}/actives`,
  findOwnUser: `${API_USERS}/me`,
  findById: (id: string) => `${API_USERS}/search/${id}`,
  findByEmail: (email: string) => `${API_USERS}/email/${email}`,
  updateUser: (id: string) => `${API_USERS}/update/${id}`,
  deleteUser: (id: string) => `${API_USERS}/delete/${id}`,
  restoreUser: (id: string) => `${API_USERS}/restore/${id}`,
}
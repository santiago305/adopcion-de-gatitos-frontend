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

const API_CLIENTS = '/clients'
export const API_CLIENTS_GROUP = {
  createClients : `${API_CLIENTS}/create`,
  findAll : `${API_CLIENTS}/findAll`,
  findActives : `${API_CLIENTS}/actives`,
  findOwnUser: `${API_CLIENTS}/client-me`,
  checkExistingClient: `${API_CLIENTS}/check-existing-clients/me`,
  findById: (id: string) => `${API_CLIENTS}/search/${id}`,
  findByEmail: (email: string) => `${API_CLIENTS}/email/${email}`,
  updateUser: (id: string) => `${API_CLIENTS}/update/${id}`,
  deleteUser: (id: string) => `${API_CLIENTS}/delete/${id}`,

}
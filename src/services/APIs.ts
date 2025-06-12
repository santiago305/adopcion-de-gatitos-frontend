/**
 * Grupo de rutas para la autenticación.
 */
export const API_AUTH_GROUP = {
  authentication: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  refreshToken: '/auth/refresh',
  validateToken: '/auth/validate-token'
};

/**
 * Grupo de rutas para la gestión de usuarios.
 */
export const API_USERS_GROUP = {
  createUser: '/users/create',
  findAll: '/users/findAll',
  findActives: '/users/actives',
  findOwnUser: '/users/me',
  findById: (id: string) => `/users/search/${id}`,
  findByEmail: (email: string) => `/users/email/${email}`,
  updateUser: (id: string) => `/users/update/${id}`,
  deleteUser: (id: string) => `/users/delete/${id}`,
  restoreUser: (id: string) => `/users/restore/${id}`,
};

/**
 * Grupo de rutas para la gestión de clientes.
 */
export const API_CLIENTS_GROUP = {
  createClients: '/clients/create',
  findAll: '/clients/findAll',
  findActives: '/clients/actives',
  findOwnUser: '/clients/client-me',
  checkExistingClient: '/clients/check-existing-clients/me',
  findById: (id: string) => `/clients/search/${id}`,
  findByEmail: (email: string) => `/clients/email/${email}`,
  updateUser: (id: string) => `/clients/update/${id}`,
  deleteUser: (id: string) => `/clients/delete/${id}`,
};


export const API_DISEASES_GROUP = {
  create: '/diseases/create',
  findAll: '/diseases/findAll',
  findById: (id: string) => `/diseases/search/${id}`,
  update: (id: string) => `/diseases/update/${id}`,
  remove: (id: string) => `/diseases/remove/${id}`,
  restore: (id: string) => `/diseases/restore/${id}`,
};

export const API_SPECIES_GROUP = {
  create: '/species/create',
  findAll: '/species/findAll',
  findById: (id: string) => `/species/search/${id}`,
  update: (id: string) => `/species/update/${id}`,
  remove: (id: string) => `/species/delete/${id}`,
  restore: (id: string) => `/species/restore/${id}`,
  searchByName: '/species/searchByName',
};

export const API_BREED_GROUP = {
  create: '/breed/create',
  findAll: '/breed/findAll',
  findById: (id: string) => `/breed/search/${id}`,
  update: (id: string) => `/breed/update/${id}`,
  remove: (id: string) => `/breed/delete/${id}`,
  restore: (id: string) => `/breed/restore/${id}`,
  searchByName: '/breed/searchByName',
};
import api from './api';

export default {
  index() { return api.get('/categories'); },
  show(id) { return api.get(`/categories/${id}`); },
  store(payload) { return api.post('/categories', payload); },
  update(id, payload) { return api.put(`/categories/${id}`, payload); },
  destroy(id) { return api.delete(`/categories/${id}`); },
};

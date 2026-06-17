import api from './api';

export default {
  index() { return api.get('/products'); },
  show(id) { return api.get(`/products/${id}`); },
  store(formData) { return api.post('/products', formData, { headers: { 'Content-Type': 'multipart/form-data' } }); },
  update(id, formData) {
    if (formData instanceof FormData) {
      formData.append('_method', 'PUT');
      return api.post(`/products/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    }
    return api.put(`/products/${id}`, formData);
  },
  destroy(id) { return api.delete(`/products/${id}`); },
};

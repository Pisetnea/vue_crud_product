import { defineStore } from 'pinia';
import { ref } from 'vue';
import productService from '../service/productService';

export const useProductStore = defineStore('product', () => {
  const products = ref([]);
  const loading = ref(false);
  const errors = ref(null);

  async function fetchAll() {
    loading.value = true;
    try {
      const res = await productService.index();
      products.value = res.data.data || res.data;
    } catch (e) {
      console.error(e);
    } finally { loading.value = false; }
  }

  async function fetchOne(id) {
    loading.value = true;
    try {
      const res = await productService.show(id);
      return res.data.data || res.data;
    } catch (e) {
      console.error(e);
      return null;
    } finally { loading.value = false; }
  }

  async function create(formData) {
    loading.value = true;
    errors.value = null;
    try {
      const res = await productService.store(formData);
      products.value.push(res.data.data);
      return res.data;
    } catch (e) {
      errors.value = e.response?.data || e;
      throw e;
    } finally { loading.value = false; }
  }

  async function update(id, formData) {
    loading.value = true;
    errors.value = null;
    try {
      const res = await productService.update(id, formData);
      const updated = res.data.data;
      const idx = products.value.findIndex(p => p.id === updated.id);
      if (idx !== -1) products.value[idx] = updated;
      return res.data;
    } catch (e) {
      errors.value = e.response?.data || e;
      throw e;
    } finally { loading.value = false; }
  }

  async function remove(id) {
    loading.value = true;
    try {
      await productService.destroy(id);
      products.value = products.value.filter(p => p.id !== id);
    } catch (e) {
      console.error(e);
      throw e;
    } finally { loading.value = false; }
  }

  return { products, loading, errors, fetchAll, fetchOne, create, update, remove };
});

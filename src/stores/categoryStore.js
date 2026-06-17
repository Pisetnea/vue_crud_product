import { defineStore } from 'pinia';
import { ref } from 'vue';
import categoryService from '../service/categoryService';

export const useCategoryStore = defineStore('category', () => {
  const categories = ref([]);
  const loading = ref(false);

  async function fetchAll() {
    loading.value = true;
    try {
      const res = await categoryService.index();
      categories.value = res.data.data || res.data;
    } catch (e) { console.error(e); } finally { loading.value = false; }
  }

  async function create(payload) {
    loading.value = true;
    try {
      const res = await categoryService.store(payload);
      categories.value.push(res.data.data);
      return res.data;
    } catch (e) { console.error(e); throw e; } finally { loading.value = false; }
  }

  async function update(id, payload) {
    loading.value = true;
    try {
      const res = await categoryService.update(id, payload);
      const updated = res.data.data;
      const idx = categories.value.findIndex(c => c.id === updated.id);
      if (idx !== -1) categories.value[idx] = updated;
      return res.data;
    } catch (e) { console.error(e); throw e; } finally { loading.value = false; }
  }

  async function remove(id) {
    loading.value = true;
    try {
      await categoryService.destroy(id);
      categories.value = categories.value.filter(c => c.id !== id);
    } catch (e) { console.error(e); throw e; } finally { loading.value = false; }
  }

  return { categories, loading, fetchAll, create, update, remove };
});

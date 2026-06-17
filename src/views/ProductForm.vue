<template>
  <div class="form-container">
    <div class="form-header">
      <h1>{{ isEdit ? 'Edit Product' : 'Create New Product' }}</h1>
      <router-link to="/products" class="back-link">← Back to Products</router-link>
    </div>

    <form @submit.prevent="submit" class="product-form">
      <div class="form-card">
        <div class="form-section">
          <h2>Product Information</h2>
          
          <div class="form-group">
            <label class="form-label">Category *</label>
            <select v-model="form.category_id" class="form-select" required>
              <option value="">-- Choose a category --</option>
              <option v-for="c in categories" :value="c.id" :key="c.id">{{ c.name }}</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Product Name *</label>
            <input v-model="form.name" class="form-input" placeholder="Enter product name" required />
          </div>

          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea v-model="form.description" class="form-textarea" placeholder="Enter product description" rows="4"></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Product Image</label>
            <div class="file-input-wrapper">
              <input type="file" @change="onFile" class="file-input" accept="image/*" />
              <span v-if="file" class="file-name">✓ {{ file.name }}</span>
              <span v-else class="file-placeholder">Choose an image file</span>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>Pricing & Stock</h2>
          
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Price (USD) *</label>
              <div class="input-with-prefix">
                <span class="prefix">$</span>
                <input type="number" step="0.01" v-model.number="form.price" class="form-input" placeholder="0.00" required />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Quantity *</label>
              <input type="number" v-model.number="form.quantity" class="form-input" placeholder="0" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Stock *</label>
              <input type="number" v-model.number="form.stock" class="form-input" placeholder="0" required />
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" v-model="form.is_active" class="form-checkbox" />
                <span>Mark as Active</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div v-if="errors" class="error-box">
        <h3>Validation Errors</h3>
        <pre>{{ JSON.stringify(errors, null, 2) }}</pre>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update Product' : 'Create Product' }}</button>
        <router-link to="/products" class="btn btn-secondary">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';
import { useCategoryStore } from '../stores/categoryStore';

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const categoryStore = useCategoryStore();

const isEdit = !!route.params.id;
const form = ref({ category_id: '', name: '', description: '', image: null, price: 0, quantity: 0, stock: 0, is_active: true });
const file = ref(null);
const errors = ref(null);

onMounted(async () => {
  await categoryStore.fetchAll();
  if (isEdit) {
    const data = await productStore.fetchOne(route.params.id);
    if (data) {
      form.value = {
        category_id: data.category_id,
        name: data.name,
        description: data.description || '',
        price: data.price,
        quantity: data.quantity,
        stock: data.stock,
        is_active: data.is_active,
        image: null,
      };
    }
  }
});

function onFile(e) { file.value = e.target.files[0]; }

async function submit() {
  errors.value = null;
  try {
    const fd = new FormData();
    fd.append('category_id', form.value.category_id);
    fd.append('name', form.value.name);
    fd.append('description', form.value.description);
    if (file.value) fd.append('image', file.value);
    fd.append('price', form.value.price);
    fd.append('quantity', form.value.quantity);
    fd.append('stock', form.value.stock);
    fd.append('is_active', form.value.is_active ? '1' : '0');

    if (isEdit) {
      await productStore.update(route.params.id, fd);
    } else {
      await productStore.create(fd);
    }
    router.push({ name: 'Products' });
  } catch (e) {
    errors.value = e.response?.data || e;
  }
}

const categories = categoryStore.categories;
</script>

<style scoped>
.form-container {
  padding: 20px 0;
  max-width: 700px;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  gap: 20px;
}

.form-header h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.back-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #764ba2;
}

.form-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 30px;
  margin-bottom: 20px;
}

.form-section {
  margin-bottom: 30px;
}

.form-section:last-child {
  margin-bottom: 0;
}

.form-section h2 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e5e7eb;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #1f2937;
  font-size: 14px;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.3s ease;
  background: white;
  color: #1f2937;
}

.form-input:hover,
.form-select:hover,
.form-textarea:hover {
  border-color: #9ca3af;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: white;
}

.form-input::placeholder,
.form-textarea::placeholder {
  color: #9ca3af;
}

.form-textarea {
  resize: vertical;
}

.file-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  background: #f9fafb;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.file-input-wrapper:hover {
  border-color: #667eea;
  background: #f3f4f6;
}

.file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  left: 0;
  top: 0;
}

.file-placeholder,
.file-name {
  font-size: 14px;
  font-weight: 500;
}

.file-placeholder {
  color: #9ca3af;
}

.file-name {
  color: #059669;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.input-with-prefix {
  position: relative;
  display: flex;
  align-items: center;
}

.prefix {
  position: absolute;
  left: 14px;
  font-weight: 600;
  color: #6b7280;
  pointer-events: none;
}

.input-with-prefix .form-input {
  padding-left: 28px;
}

.checkbox-group {
  display: flex;
  align-items: flex-end;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #1f2937;
  cursor: pointer;
}

.form-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #667eea;
}

.error-box {
  background: #fecaca;
  border: 1px solid #f87171;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
  color: #7f1d1d;
}

.error-box h3 {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.error-box pre {
  margin: 0;
  font-size: 12px;
  max-height: 200px;
  overflow-y: auto;
}

.form-actions {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.btn-secondary {
  background: #f3f4f6;
  color: #1f2937;
  border: 1px solid #e5e7eb;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

@media (max-width: 768px) {
  .form-container {
    max-width: 100%;
  }

  .form-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .form-card {
    padding: 20px;
  }

  .form-header h1 {
    font-size: 22px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>

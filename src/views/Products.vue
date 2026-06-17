<template>
  <div class="products-container">
    <div class="header-section">
      <h1>Products Catalog</h1>
      <div class="action-buttons">
        <router-link to="/products/create" class="btn btn-primary">+ New Product</router-link>
        <router-link to="/categories" class="btn btn-secondary">Manage Categories</router-link>
        <button @click="load" class="btn btn-outline">Refresh</button>
      </div>
    </div>

    <div v-if="store.loading" class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>

    <div v-else class="table-wrapper">
      <table class="products-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in store.products" :key="p.id" class="table-row">
            <td class="id-cell">{{ p.id }}</td>
            <td class="name-cell">
              <router-link :to="{ name: 'ProductDetail', params: { id: p.id } }" class="product-link">
                {{ p.name }}
              </router-link>
            </td>
            <td class="category-cell">
              <span class="badge">{{ p.category?.name || '-' }}</span>
            </td>
            <td class="price-cell">${{ parseFloat(p.price).toFixed(2) }}</td>
            <td class="stock-cell">
              <span :class="['stock-badge', p.stock > 20 ? 'in-stock' : 'low-stock']">
                {{ p.stock }} units
              </span>
            </td>
            <td class="actions-cell">
              <router-link :to="{ name: 'ProductEdit', params: { id: p.id } }" class="btn-icon edit">✎</router-link>
              <button @click="del(p.id)" class="btn-icon delete">✕</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProductStore } from '../stores/productStore';

const store = useProductStore();

function load() { store.fetchAll(); }
function del(id) { if(confirm('Delete product?')) store.remove(id); }

onMounted(() => { load(); });
</script>

<style scoped>
.products-container {
  padding: 20px 0;
}

.header-section {
  margin-bottom: 40px;
}

.header-section h1 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1f2937;
}

.action-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
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
  color: #667eea;
  border: 1px solid #e5e7eb;
}

.btn-secondary:hover {
  background: #e5e7eb;
  border-color: #667eea;
}

.btn-outline {
  background: transparent;
  color: #667eea;
  border: 1px solid #667eea;
}

.btn-outline:hover {
  background: #667eea;
  color: white;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.table-wrapper {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.products-table {
  width: 100%;
  border-collapse: collapse;
}

.products-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.products-table thead th {
  padding: 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
}

.table-row {
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.3s ease;
}

.table-row:hover {
  background-color: #f9fafb;
}

.products-table td {
  padding: 16px;
  font-size: 14px;
}

.id-cell {
  font-weight: 600;
  color: #667eea;
  width: 60px;
}

.name-cell {
  font-weight: 500;
}

.product-link {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

.product-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

.category-cell {
  width: 120px;
}

.badge {
  display: inline-block;
  background: #dbeafe;
  color: #0369a1;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.price-cell {
  font-weight: 600;
  color: #059669;
  font-size: 15px;
  width: 100px;
}

.stock-cell {
  width: 120px;
}

.stock-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.stock-badge.in-stock {
  background: #d1fae5;
  color: #065f46;
}

.stock-badge.low-stock {
  background: #fee2e2;
  color: #7f1d1d;
}

.actions-cell {
  display: flex;
  gap: 8px;
  width: 100px;
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  text-decoration: none;
  color: white;
}

.btn-icon.edit {
  background: #3b82f6;
}

.btn-icon.edit:hover {
  background: #2563eb;
  transform: scale(1.1);
}

.btn-icon.delete {
  background: #ef4444;
}

.btn-icon.delete:hover {
  background: #dc2626;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .header-section h1 {
    font-size: 24px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    text-align: center;
  }

  .products-table td {
    padding: 12px;
    font-size: 13px;
  }

  .products-table thead th {
    padding: 12px;
    font-size: 12px;
  }
}
</style>

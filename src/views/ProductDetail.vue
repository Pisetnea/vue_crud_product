<template>
  <div class="detail-container">
    <router-link to="/products" class="back-link">← Back to Products</router-link>
    
    <div v-if="product" class="product-detail-card">
      <div class="detail-grid">
        <div class="image-section">
          <img v-if="product.image" :src="imageUrl(product.image)" :alt="product.name" class="product-image" />
          <div v-else class="image-placeholder">No Image</div>
        </div>

        <div class="info-section">
          <h1>{{ product.name }}</h1>
          
          <div class="detail-item">
            <span class="label">Category</span>
            <span class="badge">{{ product.category?.name || '-' }}</span>
          </div>

          <div class="detail-item">
            <span class="label">Price</span>
            <span class="price">${{ parseFloat(product.price).toFixed(2) }}</span>
          </div>

          <div class="detail-item">
            <span class="label">Stock</span>
            <span :class="['stock-badge', product.stock > 20 ? 'in-stock' : 'low-stock']">
              {{ product.stock }} units available
            </span>
          </div>

          <div class="detail-item" v-if="product.description">
            <span class="label">Description</span>
            <p class="description">{{ product.description }}</p>
          </div>

          <div class="action-buttons">
            <router-link :to="{ name: 'ProductEdit', params: { id: product.id } }" class="btn btn-primary">
              Edit Product
            </router-link>
            <button @click="deleteProduct" class="btn btn-danger">Delete Product</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading product details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '../stores/productStore';

const route = useRoute();
const router = useRouter();
const store = useProductStore();
const product = ref(null);

onMounted(async () => {
  product.value = await store.fetchOne(route.params.id);
});

function imageUrl(path) {
  return path.startsWith('http') ? path : `/storage/${path}`;
}

function deleteProduct() {
  if (confirm('Are you sure you want to delete this product?')) {
    store.remove(product.value.id).then(() => {
      router.push('/products');
    });
  }
}
</script>

<style scoped>
.detail-container {
  padding: 20px 0;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.back-link:hover {
  color: #764ba2;
}

.product-detail-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 40px;
}

.detail-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
}

.image-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.image-placeholder {
  width: 100%;
  height: 300px;
  background: #f3f4f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-weight: 500;
  border: 2px dashed #d1d5db;
}

.info-section h1 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #1f2937;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.label {
  font-weight: 600;
  color: #6b7280;
  min-width: 100px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-item:last-of-type {
  border-bottom: none;
}

.badge {
  display: inline-block;
  background: #dbeafe;
  color: #0369a1;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.price {
  font-size: 24px;
  font-weight: 700;
  color: #059669;
}

.stock-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
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

.description {
  color: #4b5563;
  line-height: 1.6;
  margin: 0;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #e5e7eb;
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

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
  transform: translateY(-2px);
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

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .product-detail-card {
    padding: 20px;
  }

  .info-section h1 {
    font-size: 22px;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>

<template>
  <div class="categories-container">
    <div class="header-section">
      <h1>Categories</h1>
      <router-link to="/categories/create" class="btn btn-primary">+ New Category</router-link>
    </div>

    <div class="table-wrapper">
      <table class="categories-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="c in store.categories" :key="c.id" class="table-row">
            <td class="id-cell">{{ c.id }}</td>
            <td class="name-cell">{{ c.name }}</td>
            <td class="actions-cell">
              <router-link :to="{ name: 'CategoryEdit', params: { id: c.id } }" class="btn-icon edit">✎</router-link>
              <button @click="del(c.id)" class="btn-icon delete">✕</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useCategoryStore } from '../stores/categoryStore';

const store = useCategoryStore();
function load(){ store.fetchAll(); }
function del(id){ if(confirm('Delete category?')) store.remove(id); }
onMounted(()=>{ load(); });
</script>

<style scoped>
.categories-container {
  padding: 20px 0;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
}

.header-section h1 {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
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

.table-wrapper {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.categories-table {
  width: 100%;
  border-collapse: collapse;
}

.categories-table thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.categories-table thead th {
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

.categories-table td {
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
  color: #1f2937;
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
  .header-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-section h1 {
    font-size: 24px;
  }

  .btn {
    width: 100%;
    text-align: center;
  }

  .categories-table td {
    padding: 12px;
    font-size: 13px;
  }

  .categories-table thead th {
    padding: 12px;
    font-size: 12px;
  }
}
</style>

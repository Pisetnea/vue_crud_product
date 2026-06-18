import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', redirect: '/products' },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue'),
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: () => import('../views/ProductDetail.vue'),
  },
  {
    path: '/products/create',
    name: 'ProductCreate',
    component: () => import('../views/ProductForm.vue'),
  },
  {
    path: '/products/:id/edit',
    name: 'ProductEdit',
    component: () => import('../views/ProductForm.vue'),
  },

  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/Categories.vue'),
  },
  {
    path: '/categories/create',
    name: 'CategoryCreate',
    component: () => import('../views/CategoryForm.vue'),
  },
  {
    path: '/categories/:id/edit',
    name: 'CategoryEdit',
    component: () => import('../views/CategoryForm.vue'),
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

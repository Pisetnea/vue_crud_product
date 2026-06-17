import { createRouter, createWebHistory } from 'vue-router';
import Products from '../views/Products.vue';
import ProductForm from '../views/ProductForm.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Categories from '../views/Categories.vue';
import CategoryForm from '../views/CategoryForm.vue';
import productService from '../service/productService';
import categoryService from '../service/categoryService';

const routes = [
  { path: '/', redirect: '/products' },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    props: (route) => ({ prefetched: route.params.prefetched }),
    beforeEnter: async (to, from, next) => {
      try {
        const res = await productService.index();
        to.params.prefetched = res.data.data || res.data;
      } catch (e) {
        console.error('Failed prefetch products', e);
      }
      next();
    }
  },
  {
    path: '/products/create',
    name: 'ProductCreate',
    component: ProductForm,
    props: (route) => ({ categories: route.params.categories }),
    beforeEnter: async (to, from, next) => {
      try {
        const res = await categoryService.index();
        to.params.categories = res.data.data || res.data;
      } catch (e) {
        console.error('Failed prefetch categories', e);
      }
      next();
    }
  },
  {
    path: '/products/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: (route) => ({ prefetched: route.params.prefetched }),
    beforeEnter: async (to, from, next) => {
      try {
        const res = await productService.show(to.params.id);
        to.params.prefetched = res.data.data || res.data;
      } catch (e) {
        console.error('Failed prefetch product detail', e);
      }
      next();
    }
  },
  {
    path: '/products/:id/edit',
    name: 'ProductEdit',
    component: ProductForm,
    props: (route) => ({ prefetched: route.params.prefetched, categories: route.params.categories }),
    beforeEnter: async (to, from, next) => {
      try {
        const [pRes, cRes] = await Promise.all([
          productService.show(to.params.id),
          categoryService.index()
        ]);
        to.params.prefetched = pRes.data.data || pRes.data;
        to.params.categories = cRes.data.data || cRes.data;
      } catch (e) {
        console.error('Failed prefetch product edit data', e);
      }
      next();
    }
  },

  {
    path: '/categories',
    name: 'Categories',
    component: Categories,
    props: (route) => ({ prefetched: route.params.prefetched }),
    beforeEnter: async (to, from, next) => {
      try {
        const res = await categoryService.index();
        to.params.prefetched = res.data.data || res.data;
      } catch (e) {
        console.error('Failed prefetch categories list', e);
      }
      next();
    }
  },
  {
    path: '/categories/create',
    name: 'CategoryCreate',
    component: CategoryForm
  },
  {
    path: '/categories/:id/edit',
    name: 'CategoryEdit',
    component: CategoryForm,
    props: (route) => ({ prefetched: route.params.prefetched }),
    beforeEnter: async (to, from, next) => {
      try {
        const res = await categoryService.show(to.params.id);
        to.params.prefetched = res.data.data || res.data;
      } catch (e) {
        console.error('Failed prefetch category detail', e);
      }
      next();
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

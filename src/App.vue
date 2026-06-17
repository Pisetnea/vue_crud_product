<template>
  <div id="app">
    <header class="app-header">
      <nav>
        <router-link to="/products">Products</router-link>
        <router-link to="/products/create">New Product</router-link>
        <router-link to="/categories">Categories</router-link>
      </nav>
    </header>

    <main class="app-main">
      <router-view />
    </main>

    <footer class="app-footer">© {{ year }} My Shop</footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const year = new Date().getFullYear();
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }

#app { 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
  color: #1f2937; 
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
}

.app-header { 
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
}

.app-header nav { 
  display: flex; 
  gap: 8px; 
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.app-header a {
  padding: 10px 20px;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 15px;
}

.app-header a:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.app-header a.router-link-exact-active {
  background: rgba(255, 255, 255, 0.3);
  border-bottom: 3px solid white;
}

.app-main { 
  min-height: 60vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.app-footer { 
  margin-top: 60px; 
  padding: 30px 20px;
  color: #6b7280;
  font-size: 14px;
  text-align: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.5);
}

a { color: #667eea; text-decoration: none; transition: color 0.3s ease; }
a:hover { color: #764ba2; }
</style>

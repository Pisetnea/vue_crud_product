<template>
  <button @click="confirmClick" class="confirm-btn"><slot>Delete</slot></button>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({ message: { type: String, default: 'Are you sure?' } });

function confirmClick(){ if(confirm(props.message)) $emit('confirmed'); }
</script>

<style scoped>
.confirm-btn {
  padding: 10px 20px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.confirm-btn:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.confirm-btn:active {
  transform: translateY(0);
}
</style>

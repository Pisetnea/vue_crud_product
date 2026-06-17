<template>
  <div class="input-group">
    <label v-if="label" class="input-label">{{ label }}</label>
    <input 
      v-bind="$attrs" 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)"
      class="input-field"
    />
  </div>
</template>

<script setup>
defineProps({ label: String, modelValue: [String, Number] });
</script>

<style scoped>
.input-group {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #1f2937;
  font-size: 14px;
}

.input-field {
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

.input-field:hover {
  border-color: #9ca3af;
}

.input-field:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: white;
}

.input-field::placeholder {
  color: #9ca3af;
}

.input-field:disabled {
  background: #f3f4f6;
  color: #9ca3af;
  cursor: not-allowed;
}
</style>

<template>
  <div>
    <h1>{{ isEdit ? 'Edit' : 'Create' }} Category</h1>
    <form @submit.prevent="submit">
      <div>
        <label>Name</label>
        <input v-model="form.name" />
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCategoryStore } from '../stores/categoryStore';

const route = useRoute();
const router = useRouter();
const store = useCategoryStore();
const isEdit = !!route.params.id;
const form = ref({ name: '' });

onMounted(async ()=>{
  await store.fetchAll();
  if (isEdit) {
    const c = store.categories.find(x => x.id == route.params.id);
    if (c) form.value = { name: c.name };
  }
});

async function submit(){
  if (isEdit) await store.update(route.params.id, form.value);
  else await store.create(form.value);
  router.push({ name: 'Categories' });
}
</script>

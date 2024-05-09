<script setup lang="ts">
import { ref } from 'vue';
import DateInput from './components/DateInput.vue';

const dateValue = ref('2024-05-09');
</script>

<template>
  <div>
    <DateInput
      v-model="dateValue"
    />
  </div>
</template>

<style scoped>
</style>

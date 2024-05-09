<template>
  <h1>Browser Locale: {{ browserLocale }}</h1>
  <input
    :placeholder="datePlaceholder"
    v-model="displayValue"
    @blur="updateModelValue"
  />
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits(['update:modelValue']);

const browserLocale = navigator.language;

const datePlaceholder = computed(() => {
  return browserLocale === 'en-US' ? 'MM/DD/YYYY' : 'DD/MM/YYYY';
});

const displayValue = ref(dayjs(props.modelValue).format(datePlaceholder.value.replace(/YYYY/g, 'YYYY')));

watch(displayValue, (newValue) => {
  const format = datePlaceholder.value;
  if (dayjs(newValue, format, true).isValid()) {
    const newModelValue = dayjs(newValue, format).format('YYYY-MM-DD');
    if (newModelValue !== props.modelValue) {
      emit('update:modelValue', newModelValue);
    }
  }
});

function updateModelValue() {
  displayValue.value = dayjs(props.modelValue).format(datePlaceholder.value.replace(/YYYY/g, 'YYYY'));
}
</script>
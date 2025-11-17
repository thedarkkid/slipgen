<script setup>
import { onMounted, ref } from 'vue';

defineProps({
    type: {
        type: String,
        required: false,
        default: 'text'
    }
});
const model = defineModel({
    required: true
});

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});

defineExpose({ focus: () => input.value.focus() });
</script>

<template>
    <input
        class="input rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        v-model="model"
        :type="type"
        ref="input"
    />
</template>
<style>
.input::before {
    content: '%';
    font-weight: bold;
    font-size: 2rem;
}
</style>

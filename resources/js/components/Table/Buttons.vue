<script setup>
defineProps({
    name: String,
});
</script>

<template>
    <button onclick="popuphandler(true)" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
        <p class="text-sm font-medium leading-none text-white">
            {{ name }}
        </p>
    </button>
</template>


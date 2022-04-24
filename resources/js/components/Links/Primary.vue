<script setup>
import {Link} from '@inertiajs/inertia-vue3';

defineProps({
    link: String,
});
</script>

<template>
    <Link :href="link">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            <slot />
        </button>
    </Link>

</template>

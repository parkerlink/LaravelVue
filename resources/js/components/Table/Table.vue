<script setup>
defineProps({
    title: String,
    // type: {
    //     type: String,
    //     default: 'submit',
    // },
});
</script>
<template>
    <div class="mx-10 relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="p-4">
            <div class="flex flex-row justify-items-auto">
                <div><slot name="filters" /></div>
                <div><slot name="buttons" /></div>
            </div>
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <slot name="headers" />
                </tr>
            </thead>
            <tbody>
                <slot name="body" />
            </tbody>
        </table>
    </div>


    <!-- <slot name="header" /> -->
</template>
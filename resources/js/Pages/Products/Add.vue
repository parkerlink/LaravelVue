<template>
    <AppLayout title="Create Product">
        <div class="text-xl font-bold ml-4 pt-4"> 
            Create Product
        </div>
        <div class="mx-4">
            <Form @submit.prevent="form.post('/products/store')" v-model="form">
                <Input v-model="form.title" label="Product Title" :error="errors.title"/>
                <Textarea v-model="form.body" label="Tell us more about this product"  :error="errors.body" />
                <Submit />
            </Form>
        </div>
    </AppLayout>
</template>

<script>
import { useForm } from "@inertiajs/inertia-vue3";

export default {    
    props: {
        errors: Object,
    },    
    setup () {
        const form = useForm({
            title: null,
            body: null,
        })

        return { form }
    }
}
</script>

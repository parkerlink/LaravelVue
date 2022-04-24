<template>
    <AppLayout title="Editing Product">
        <div class="text-xl font-bold ml-4 pt-4"> 
            Editing {{ product.title }}
        </div>
        <div class="mx-4">
            <Form @submit.prevent="update" v-model="form">
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
        product: Object,
    },
    
    data() {
    return {
      form: this.$inertia.form({
        title: this.product.title,
        body: this.product.body,
      }),
    }
  },
  methods: {
      update () {
        this.form.put(`/products/${this.product.id}/update`)
      }
  }
}
</script>

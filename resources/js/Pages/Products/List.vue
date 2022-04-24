<script>
import AppLayout from '@/Layouts/AppLayout.vue';
import JetSectionBorder from '@/Jetstream/SectionBorder.vue';
import PrimaryLink from '@/components/Links/Primary.vue';
import { Head, Link } from '@inertiajs/inertia-vue3';
import Table from '@/components/Table/Table.vue';
import Row from '@/components/Table/Row.vue';
import Column from '@/components/Table/Column.vue';
import TableHeader from '@/components/Table/Header.vue';
// import DataTable from "@/components/Datatable/DataTable.vue";

export default {
    components: {
        AppLayout,
        JetSectionBorder,
        PrimaryLink,
        Head,
        Link,
        Table,
        Row,
        Column,
        TableHeader,
    },
    name:"products",
    props: {
        products: Object,
    },
    data(){
        return {}
    },
    mounted(){
    },
    methods:{
        
    }
}
</script>
<template>
    <AppLayout title="List">
        <!-- <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Products
            </h2>
        </template> -->
        <div>
            <div class="pt-2">
                <Table :title="'Products'">
                    <template #buttons>
                        <PrimaryLink :link="route('products-create')">
                            Create Product
                        </PrimaryLink>
                    </template>

                    <template #headers>
                        <TableHeader>
                            ID
                        </TableHeader>
                        <TableHeader>
                            Title
                        </TableHeader>
                        <TableHeader>
                            Body
                        </TableHeader>
                        <TableHeader>
                            Actions
                        </TableHeader>
                    </template>
                    <template #body>
                            <Row v-for="(product,key) in products" :key="key"> 
                                <Column> 
                                    {{ product.id }}
                                </Column>
                                <Column> 
                                    {{ product.title }}
                                </Column>
                                <Column> 
                                    {{ product.body }}
                                </Column>
                                <Column> 
                                    <PrimaryLink :link="route('products-edit', product)"> 
                                        Edit
                                    </PrimaryLink>
                                </Column>
                            </Row>
                    </template>
                </Table>
            </div>
        </div>
    </AppLayout>    
</template>

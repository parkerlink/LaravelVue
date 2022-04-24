import ProductList from './Pages/Products/List.vue';
import ProductCreate from './Pages/Products/Add.vue';
import ProductEdit from './Pages/Products/Edit.vue';

export const routes = [
    {
        name: 'productList',
        path: '/products',
        component: ProductList
    },
    {
        name: 'productEdit',
        path: '/products/:id/edit',
        component: ProductEdit
    },
    {
        name: 'productAdd',
        path: '/products/add',
        component: ProductCreate
    }
]

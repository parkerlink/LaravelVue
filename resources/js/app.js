require('./bootstrap');

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/inertia-vue3';
import { InertiaProgress } from '@inertiajs/progress';
import * as VueRouter from 'vue-router';
import { routes } from './routes';
import AppLayout from '@/Layouts/AppLayout.vue';

import {
    Checkbox,
    Form,
    File,
    Group,
    Input,
    Radio,
    Select,
    Submit,
    Textarea,
  } from "@protonemedia/form-components-pro-vue3-tailwind3-simple";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
  });

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}.vue`),
    setup({ el, app, props, plugin }) {
        return createApp({ render: () => h(app, props) })
            .use(plugin)
            .use(router)
            .mixin({ methods: { route } })
            .component('AppLayout', AppLayout)
            .component('Checkbox', Checkbox)
            .component('Form', Form)
            .component('File', File)
            .component('Group', Group)
            .component('Input', Input)
            .component('Radio', Radio)
            .component('Select', Select)
            .component('Submit', Submit)
            .component('Textarea', Textarea)
            .mount(el);
    },
});

InertiaProgress.init({ color: '#4B5563' });

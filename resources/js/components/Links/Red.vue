<script>
import {Link} from '@inertiajs/inertia-vue3';

var showModal = false;

// defineProps({
//     link: String,
// });

// function toggleModal() {
//     showModal = !showModal;
//     console.log(showModal)
// }

// defineExpose({
//   showModal,
// })

export default {
    components: {
        Link,
    },
    name:"delete-confirmation",
    props: {
        link: String,
    },
    data(){
        return {
        showModal: false
        }
    },
    mounted(){
    },
    methods:{
        toggleModal: function(){
        this.showModal = !this.showModal;
        }
    }
}
</script>

<template>
    <div>
    <button class="bg-red-500 text-white border border-red-700 active:bg-red-600 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:bg-red-700 hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
      <slot name="button" />
    </button>
    <div v-if="this.showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
        asdf
      <div class="relative w-auto my-6 mx-auto max-w-3xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 class="text-3xl font-semibold">
                <slot name="modaltitle" />
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none" v-on:click="toggleModal()">
              <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <p class="my-4 text-slate-500 text-lg leading-relaxed">
                <slot name="modalbody" />
            </p>
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()">
              Cancel
            </button>
            <Link :href="link">
                <button class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" v-on:click="toggleModal()" >
                Confirm Delete
                </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </div>
</template>

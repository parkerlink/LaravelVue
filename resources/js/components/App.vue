<template>
    <main>
        <div>
            <navbar></navbar>
            <div class="container mt-3">
                <router-view></router-view>
            </div>
        </div>
    </main>
</template>
 
<script>
import Navbar from './Layout/Navbar.vue'
    export default {
  components: { Navbar },
  }
</script>
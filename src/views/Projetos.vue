<template>
    <div class="projetos">
        <h1 class="title">Projetos</h1>
        <!--Indica onde deve ser renderizada as rotas filhas-->
        <router-view></router-view>
    </div>
</template>

<script>

import {defineComponent} from 'vue'

export default defineComponent({
    name: 'ProjetosVue'
})
</script>

<style scoped>
.projetos{
    padding: 1.25rem;
}
</style>
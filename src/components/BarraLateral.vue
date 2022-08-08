<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Alura Tracker">
        </h1>
    </header>
</template>

<script lang="ts">
//Exporta o componente, como no ReactJS
import { defineComponent } from "vue";

export default defineComponent({
    name: 'BarraLateral'
})

</script>

<style scoped>
header{
    background: #0d3b66;
    height: 100vh;
    padding: 1rem;
    display: flex;
    justify-content: center;
}
@media only screen and (max-width: 768px){
    header{
        padding: 2.5rem;
        height: auto;
    }
}
</style>
<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Alura Tracker">
        </h1>
        <button class="button" @click="alterarTema">{{textoBotao}}</button>
    </header>
</template>

<script lang="ts">
//Exporta o componente, como no ReactJS
import { defineComponent } from "vue";

export default defineComponent({
    name: 'BarraLateral',
    emits: ['aoTemaAlterado'],
    data(){
        return {
            modoEscuroAtivo: false
        }
    },
    computed:{
        textoBotao(){
            if (this.modoEscuroAtivo){
                return 'Desativar modo escuro'
            }
            return 'Ativar modo escuro'
        }
    },
    methods: {
        alterarTema(){
            this.modoEscuroAtivo = !this.modoEscuroAtivo
            //Passa o evento + parametro para o componente pai
            this.$emit('aoTemaAlterado', this.modoEscuroAtivo)

        }
    }
})

</script>

<style scoped>
header{
    background: #0d3b66;
    height: 100vh;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-content: center;
}
header h1{
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
}

@media only screen and (max-width: 768px){
    header{
        padding: 2.5rem;
        height: auto;
    }
}
</style>
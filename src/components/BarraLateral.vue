<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Alura Tracker">
        </h1>
        <button class="button" @click="alterarTema">{{textoBotao}}</button>
        <nav class="panel mt-5">
            <ul>
                <li>
                    <!--Componente específico para trabalhar com rotas-->
                    <router-link to="/" class="link">
                        <i class="fas fa-tasks"></i>
                        Tarefas
                    </router-link>
                </li>
                <li>
                    <!--Componente específico para trabalhar com rotas-->
                    <router-link to="/projetos"  class="link">
                        <i class="fas fa-project-diagram"></i>
                        Projetos
                    </router-link>
                </li>
            </ul>
        </nav>
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
.panel li {
    margin: 8px 0;
}
.link {
    color: #fff;
}
.link:hover {
    color: #FAF0CA;
}
.link.router-link-active {
    color: #FAF0CA;
}
</style>
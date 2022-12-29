<template>
    <section class="projetos">
        <h1 class="title">Projetos</h1>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome do Projeto
                </label>
                <input type="text" v-model="nomeDoProjeto" class="input" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                </tr>
            </thead>
            <tbody>
                <!--Para cada projeto na lista de projetos...-->
                <tr v-for="projeto in projetos" :key="projeto.id">
                    <td>{{projeto.id}}</td>
                    <td>{{projeto.nome}}</td>
                </tr>
            </tbody>

        </table>
    </section>
</template>

<script lang="ts">
import {useStore} from '@/store'
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'ProjetosVue',
    data(){
        return {
            nomeDoProjeto: '',
        };
    },
    methods:{
        //Método que preenche as informações de um projeto de acordo com a interface (id e nome)
        salvar(){
            //Faz o uso da mutation que criamos na store
            this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto)
            this.nomeDoProjeto = ''
        }
    },
    setup(){
        const store = useStore()
        return {
            store,
            //Fica de olho quando a lista de projetos mudar
            projetos: computed(() => store.state.projetos)
        }
    }
})

</script>

<style scoped>
.projetos{
    padding: 1.25rem;
}
</style>
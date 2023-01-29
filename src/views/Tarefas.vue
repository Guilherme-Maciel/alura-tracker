<template>
    <Formulario @aoSalvarTarefa="salvarTarefa"/>
    <div class="lista">
        <!--v-for = para cada tarefa-->
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="listaEstaVazia">
            <span class="">Você não está muito produtivo hoje :(</span>
        </Box>
    </div>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent } from 'vue';
  import Formulario from '../components/Formulario.vue';
  import Tarefa from '../components/Tarefa.vue';
  import Box from '../components/Box.vue';
  import { OBTER_TAREFAS } from '@/store/tipo-acoes';
  import { useStore } from '@/store';
  
  export default defineComponent({
    name: 'TarefasVue',
    components:{
      Formulario,
      Tarefa,
      Box
    },
    data(){
      return {
        //Tipo da lista
        modoEscuroAtivo: false
      }
    },
    computed:{
      listaEstaVazia(): boolean{
        return this.tarefas.length === 0
      }
    },
    setup(){
        const store = useStore()
        store.dispatch(OBTER_TAREFAS)

        return {
            store,
            tarefas: computed(() => store.state.tarefas)
        }
    },
    methods:{
      salvarTarefa(){
        this.tarefas.push()
      },
      trocarTema(modoEscuroAtivo: boolean){
        this.modoEscuroAtivo = modoEscuroAtivo
      }
    }
  });
  </script>
  
  <style>
  .lista{
    padding: 2em;
  }
  main{
    --bg-primario: #fff;
    --texto-primario: #000;
  }
  main.modo-escuro{
    --bg-primario: #2b2d42;
    --texto-primario: #ddd;
  }
  .conteudo{
    background-color: var(--bg-primario);
  }
  </style>
  
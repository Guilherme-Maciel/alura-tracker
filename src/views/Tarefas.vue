<template>
    <Formulario @aoSalvarTarefa="salvarTarefa"/>
    <div class="lista">
        <!--v-for = para cada tarefa-->
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa"/>
        <Box v-if="listaEstaVazia">
            <span class="">Você não está muito produtivo hoje :(</span>
        </Box>
      <div class="modal" :class="{'is-active': tarefaSelecionada}" v-if="tarefaSelecionada">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Editar Tarefa</p>
            <button @click="fecharModal" class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
                <label for="descricaoDaTarefa" class="label">
                    Descrição
                </label>
                <input type="text" v-model="tarefaSelecionada.descricao" class="input" id="descricaoDaTarefa">
            </div>
          </section>
          <footer class="modal-card-foot">
            <button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
            <button @click="fecharModal" class="button">Cancelar</button>
          </footer>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { computed, defineComponent } from 'vue';
  import Formulario from '../components/Formulario.vue';
  import Tarefa from '../components/Tarefa.vue';
  import Box from '../components/Box.vue';
  import { OBTER_TAREFAS, CADASTRAR_TAREFA, OBTER_PROJETOS, ALTERAR_TAREFA } from '@/store/tipo-acoes';
  import { useStore } from '@/store';
import ITarefa from '@/interfaces/ITarefa';
  
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
        modoEscuroAtivo: false,
        tarefaSelecionada: null as ITarefa | null
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
        store.dispatch(OBTER_PROJETOS)


        return {
            store,
            tarefas: computed(() => store.state.tarefas)
        }
    },
    methods:{
      salvarTarefa(tarefa:ITarefa){
        this.store.dispatch(CADASTRAR_TAREFA, tarefa)
      },
      trocarTema(modoEscuroAtivo: boolean){
        this.modoEscuroAtivo = modoEscuroAtivo
      },
      selecionarTarefa(tarefa: ITarefa){
        this.tarefaSelecionada = tarefa
      },
      fecharModal(){
        this.tarefaSelecionada = null;

      },
      alterarTarefa(){
        this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal())
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
  
<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <!--v-for = para cada tarefa-->
    <div class="field">
      <p class="control has-icons-left">
        <input class="input" type="email" placeholder="Digite para filtrar" v-model="filtro">
        <span class="icon is-small is-left">
          <i class="fas fa-envelope"></i>
        </span>
        <span class="icon is-small is-right">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
    <Box v-if="listaEstaVazia">
      <span class="">Você não está muito produtivo hoje :(</span>
    </Box>
    <Modal :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editar Tarefa</p>
        <button @click="fecharModal" class="delete" aria-label="close"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="descricaoDaTarefa" class="label">
            Descrição
          </label>
          <input v-if="tarefaSelecionada" type="text" v-model="tarefaSelecionada.descricao" class="input" id="descricaoDaTarefa">
        </div>
      </template>
      <template v-slot:rodape>
        <button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
        <button @click="fecharModal" class="button">Cancelar</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';
import Modal from '@/components/Modal.vue';
import { OBTER_TAREFAS, CADASTRAR_TAREFA, OBTER_PROJETOS, ALTERAR_TAREFA } from '@/store/tipo-acoes';
import { useStore } from '@/store';
import ITarefa from '@/interfaces/ITarefa';

export default defineComponent({
  name: 'TarefasVue',
  components: {
    Formulario,
    Tarefa,
    Box,
    Modal
  },
  data() {
    return {
      //Tipo da lista
      modoEscuroAtivo: false,
      tarefaSelecionada: null as ITarefa | null
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)

    const filtro = ref("")
    //const tarefas = computed(() => store.state.tarefa.tarefas.filter(t => !filtro.value || t.descricao.includes(filtro.value)))

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value)
    })


    return {
      store,
      tarefas: computed(() => store.state.tarefa.tarefas),
      filtro
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    trocarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa
    },
    fecharModal() {
      this.tarefaSelecionada = null;

    },
    alterarTarefa() {
      this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
        .then(() => this.fecharModal())
    }
  }
});
</script>

<style>
.lista {
  padding: 2em;
}

main {
  --bg-primario: #fff;
  --texto-primario: #000;
}

main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #ddd;
}

.conteudo {
  background-color: var(--bg-primario);
}
</style>

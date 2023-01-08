<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <!--Capturar texto do input-->
                <input type="text" class="input" placeholder="Qual tarefa deseja iniciar?" v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                <select v-model="idProjeto">
                    <option value="">Selecione o projeto</option>
                    <option
                    :value="projeto.id"
                    v-for="projeto in projetos"
                    :key="projeto.id"
                    >
                    {{ projeto.nome }}
                    </option>
                </select>
                </div>
            </div>
            <div class="column">
                <!--@ = ouvir um evento.!-->
               <Temporizador @aoTemporizadorFinalizado="finalizarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { TipoDeNotificacao } from "@/interfaces/INotificacao";
import { key } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Temporizador from "./Temporizador.vue";

export default defineComponent({
    name: "FormularioVue",
    emit:['aoSalvarTarefa'],
    //Define o estado do componente
    components: { 
        Temporizador 
    },
    data(){
        return {
            //modelo que recebe o valor do input
            descricao: '',
            idProjeto: ''
        }
    },
    methods:{
        finalizarTarefa(tempoDecorrido: number) : void{
            const projeto = this.projetos.find((p) => p.id == this.idProjeto); // primeiro, buscamos pelo projeto
            if(!projeto) { // se o projeto não existe...
                this.store.commit(NOTIFICAR, {
                    titulo: 'Ops!',
                    texto: "Selecione um projeto antes de finalizar a tarefa!",
                    tipo: TipoDeNotificacao.FALHA,
                }); // notificamos o usuário
                return; // ao fazer return aqui, o restante do método salvarTarefa não será executado. chamamos essa técnica de early return :)
            }
            this.$emit('aoSalvarTarefa', {
                duracaoEmSegundos: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
            })
            this.descricao = ''

        }
    },
    setup(){
        const store = useStore(key)

        return{
            store,
            projetos: computed(() => store.state.projetos)
        }
    }
})
</script>
<style>
.formulario{
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
</style>
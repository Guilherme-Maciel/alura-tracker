import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";
import { Estado } from "@/store";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "@/store/tipo-acoes";
import { DEFINIR_TAREFAS, ADICIONA_TAREFA, ALTERA_TAREFA } from "@/store/tipo-mutacoes";
import { Module } from "vuex";

export interface EstadoDaTarefa{
    tarefas: ITarefa[]
}

export const tarefa: Module<EstadoDaTarefa, Estado> = {
    actions: {
         //Faz uma promessa e devolve a lista de projetos da API, chamando a mutation para adicionar à lista de projetos.
        [OBTER_TAREFAS] ({ commit }, filtro: string) {
            let url = 'tarefas'
            if(filtro){
                url += '?descricao=' + filtro
            }
            http.get(url)
                .then(resposta => commit(DEFINIR_TAREFAS, resposta.data))
        },
        [CADASTRAR_TAREFA] ({commit}, tarefa: ITarefa){
            return http.post('/tarefas', tarefa)
                .then(resp =>commit(ADICIONA_TAREFA, resp.data) )
        },
        [ALTERAR_TAREFA] ({commit}, tarefa: ITarefa){
            return http.put(`/tarefas/${tarefa.id}`, tarefa)
                .then(() =>commit(ALTERA_TAREFA, tarefa) )
        },

    },
    mutations:{
        [ADICIONA_TAREFA](state,tarefa: ITarefa) {
            state.tarefas.push(tarefa)
        },
        [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
            state.tarefas = tarefas
        },
        [ALTERA_TAREFA](state, tarefa: ITarefa) {
            const index = state.tarefas.findIndex(t => t.id == tarefa.id)
            state.tarefas[index] = tarefa
        },
    }
}
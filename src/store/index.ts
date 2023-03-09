import { INotificacao } from "@/interfaces/INotificacao";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_TAREFAS, NOTIFICAR } from "./tipo-mutacoes";
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from "./tipo-acoes";
import http from '@/http';
import { EstadoDoProjeto, projeto } from './modulos/projeto'
import { EstadoDaTarefa, tarefa } from './modulos/tarefas'

export interface Estado {
    notificacoes: INotificacao[],
    tarefa: EstadoDaTarefa,
    projeto: EstadoDoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projeto: {
            projetos: []
        },
        notificacoes: [],
        tarefa: {
            tarefas: []
        }
    },
    mutations: {
        [NOTIFICAR](state, novaNotificacao: INotificacao){
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(()=>{
                state.notificacoes = state.notificacoes.filter(not => not.id != novaNotificacao.id)

            }, 3000)
        }
    },
    actions:{

    },
    modules: {
        projeto,
        tarefa
    }
})

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}
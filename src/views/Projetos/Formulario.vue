<template>
    <section>
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

    </section>
</template>

<script lang="ts">
import { TipoDeNotificacao } from '@/interfaces/INotificacao';
import {useStore} from '@/store'
import { ADICIONA_PROJETO, ALTERA_PROJETO, NOTIFICAR } from '@/store/tipo-mutacoes';
import { defineComponent} from 'vue';

export default defineComponent({
    name: 'FormularioVue',
    props:{
        id:{
            type: String
        }
    },
    //Quando o componente for montado
    mounted(){
        if(this.id){
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            //? indica que se não houver projeto não tentar pegar o nome de undefined
            this.nomeDoProjeto = projeto?.nome || ''
        }
    },
    data(){
        return {
            nomeDoProjeto: '',
        };
    },
    methods:{
        //Método que preenche as informações de um projeto de acordo com a interface (id e nome)
        salvar(){
            if(this.id){
                //Editar
                this.store.commit(ALTERA_PROJETO, {
                    id: this.id,
                    nome: this.nomeDoProjeto
                })
            }
            else{
                //Faz o uso da mutation que criamos na store
                this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
            }
            
            this.nomeDoProjeto = '';
            //Notifica com uma mensagem de sucesso
            this.store.commit(NOTIFICAR, {
                titulo: 'Novo projeto foi salvo',
                texto: 'Prontinho ;) Seu projeto já está disponível',
                tipo: TipoDeNotificacao.SUCESSO
            })
            //Redirecionar o usuário para a listagem
            this.$router.push('/projetos')
        }
    },
    setup(){
        const store = useStore()
        return {
            store
        }
    }
})

</script>

<style scoped>
</style>
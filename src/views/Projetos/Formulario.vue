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
import {  } from '@/store/tipo-mutacoes';
import { defineComponent, ref } from 'vue';
import useNotificador from '@/hooks/notificador';
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/tipo-acoes';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'FormularioVue',
    props:{
        id:{
            type: String
        }
    },
    //Quando o componente for montado
    // mounted(){
    //     if(this.id){
    //         const projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.id)
    //         //? indica que se não houver projeto não tentar pegar o nome de undefined
    //         this.nomeDoProjeto = projeto?.nome || ''
    //     }
    // },
    // data(){
    //     return {
    //         nomeDoProjeto: '',
    //     };
    // },
    //Quando a variável precisa ser monitorada, utilizamos o método ref (transforma uma função em reativa)
    //Não temos acesso ao this dentro do setup.
    //O template já olha para o valor da variável, não precisando do .value
    setup(props){

        const router = useRouter()
        const store = useStore()
        const {notificar} = useNotificador()

        const nomeDoProjeto = ref("")

        if(props.id){
            const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id)
            //? indica que se não houver projeto não tentar pegar o nome de undefined
            nomeDoProjeto.value = projeto?.nome || ''
        }
        
        const lidarComSucesso = () => {
            nomeDoProjeto.value = '';
            notificar(TipoDeNotificacao.SUCESSO, 'Excelente', 'O projeto foi cadastrado com sucesso!!')
            //Redirecionar o usuário para a listagem
            router.push('/projetos')
        }

                //Método que preenche as informações de um projeto de acordo com a interface (id e nome)
        const salvar = () => {
            if(props.id){
                //Editar
                store.dispatch(ALTERAR_PROJETO, {
                    id: props.id,
                    nome: nomeDoProjeto.value
                }).then(()=>{lidarComSucesso()})
            }
            else{
                //Faz o uso da mutation que criamos na store
                store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
                    .then(()=>{lidarComSucesso()})
            }
        }

        return {
            nomeDoProjeto,
            salvar
        }
    }
})

</script>

<style scoped>
</style>
<template>
    <div class="box has-text-weight-bold">
        <div class="columns">
            <div class="column is-7">
                {{tarefa.descricao}}
            </div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import Cronometro from './Cronometro.vue';
import ITarefa from '../interfaces/ITarefa';

export default defineComponent({
    name:"TarefaVue",
    components:{
        Cronometro,
    },
    props:{
        tarefa:{
            type: Object as PropType<ITarefa>,
            required: true
        }
    }
})
</script>

<!--scoped: só será aplicado para esse componente ou para os filhos-->
<style scoped>
.box{
    background:#faf0ca;
}
</style>

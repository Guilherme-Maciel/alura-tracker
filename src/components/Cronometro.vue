<template>
    <section>
        <strong>{{tempoDecorrido}}</strong>
    </section>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name: 'CronometroVue',
    //Propriedades que vamos receber do componente pai;
    props: {
        tempoEmSegundos:{
            type: Number,
            default: 0
        }
    },
    computed:{
    //Retorna o formato de cronômetro de acordo com o tempo em segundos convertido para milisegundos
    tempoDecorrido() : string{
        return new Date(this.tempoEmSegundos * 1000).toISOString().substr(11,8)
    }

},
})
</script>

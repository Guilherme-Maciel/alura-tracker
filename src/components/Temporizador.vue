<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempoEmSegundos="tempoEmSegundos"/>
        <Botao text="play" @clicado="iniciar" iconClass="fas fa-play"
            :desabilitado="cronometroRunning"/>
        <Botao text="stop" @clicado="finalizar" iconClass="fas fa-stop"
            :desabilitado="!cronometroRunning"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";
import Botao from "./Botao.vue";

export default defineComponent({
    name: "TemporizadorVue",
    emits: [
        //Quando temporizador for finalizado, algo vai acontecer
        'aoTemporizadorFinalizado'
    ],
    //Define o estado do componente
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRunning: false
        };
    },
    methods: {
        iniciar() {
            this.cronometroRunning = true
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1;
            }, 1000);
        },
        finalizar() {
            this.cronometroRunning = false
            clearInterval(this.cronometro);
            //Temporizador avisa ao pai que o componente foi emitido.
            this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
            this.tempoEmSegundos = 0
        }
    },
    components: { 
        Cronometro,
        Botao
    }
})
</script>
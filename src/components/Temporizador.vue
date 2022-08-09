<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempoEmSegundos="tempoEmSegundos"/>
        <button class="button" @click="iniciar" :disabled="cronometroRunning">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finalizar" :disabled="!cronometroRunning">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Cronometro from "./Cronometro.vue";

export default defineComponent({
    name: "TemporizadorVue",
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
        }
    },
    components: { Cronometro }
})
</script>
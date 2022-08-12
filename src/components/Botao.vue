<template>
    <button class="button" @click="clicado" :disabled="desabilitado">
        <span class="icon">
            <i :class="iconClass"></i>
        </span>
        <span>{{text}}</span>
    </button>
</template>

<script lang="ts">
    import {defineComponent} from 'vue'

    export default defineComponent({
        name: 'BotaoVue',
        emits: ['clicado'],
        props:{
            desabilitado:{
                type: Boolean,
            },
            iconClass:{
                type: String
            },
            text:{
                type: String
            }
        },
        methods: {
            clicado() : void{
                this.$emit('clicado')
            }
        }
    })
        

</script>
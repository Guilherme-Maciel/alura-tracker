<template>
    <div class="box has-text-weight-bold" :style="estilos">
        <!--Todos os filhos do <Box> serão carregados dentro da tag slot-->
        <slot></slot>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name:"BoxVue",
    data(){
        return{
            estilos:{
                background: '#faf0ca'
                //'background-color': '#faf0ca'
                //backgroundColor: '#faf0ca'

            }
        }
    }
})
</script>
<!--scoped: só será aplicado para esse componente ou para os filhos-->

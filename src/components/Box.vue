<template>
    <div class="box has-text-weight-bold">
        <!--Todos os filhos do <Box> serão carregados dentro da tag slot-->
        <slot></slot>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    name:"BoxVue"
})
</script>
<!--scoped: só será aplicado para esse componente ou para os filhos-->
<style scoped>
.box{
    background:#faf0ca;
}
</style>

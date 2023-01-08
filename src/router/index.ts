import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Tarefas from '../views/Tarefas.vue'
import Projetos from '../views/Projetos.vue'
import Formulario from '../views/Projetos/Formulario.vue'
import Lista from '../views/Projetos/Lista.vue'
//Aqui entra as rotas
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tarefas',
        component: Tarefas
    },{
        path: '/projetos',
        component: Projetos,
        //recebe uma lista de rotas internas, filhas de projetos
        children: [
            {
                path: '',
                name: 'Projetos',
                component: Lista
            },
            {
                path: 'novo',
                name: 'Novo projeto',
                component: Formulario
            },
            //Rota para edição. Necessário receber o Id e deixar disponível no componente
            //: = indica que é um segmento dinâmico.
            {
                path: ':id',
                name: 'Editar projeto',
                component: Formulario,
                //Ligar o segmento à propriedade Id
                props: true
                
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router;
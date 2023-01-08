import { TipoDeNotificacao } from "@/interfaces/INotificacao"
import { store } from "@/store"
import { NOTIFICAR } from "@/store/tipo-mutacoes"

type Notificador = {
    notificar: (tipo: TipoDeNotificacao, título: string, texto: string) => void
}

export default () : Notificador => {
    const notificar = (tipo: TipoDeNotificacao, titulo: string, texto: string): void => {
        //Notifica com uma mensagem de sucesso
        store.commit(NOTIFICAR, {
            titulo: titulo,
            texto: texto,
            tipo: tipo
        })
    }

    return {
        notificar
    }
}
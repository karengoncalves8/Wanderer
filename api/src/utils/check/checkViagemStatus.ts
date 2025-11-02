import { ViagemStatus } from "../../enums/ViagemStatus";

export const checkViagemStatus = (dataIda: Date, dataVolta: Date) => {
    let dataAtual = new Date();
    if(dataIda > dataAtual && dataVolta > dataAtual){
        return ViagemStatus.FUTURA;
    }else if(dataIda < dataAtual && dataVolta < dataAtual){
        return ViagemStatus.HISTORICO;
    }else{
        return ViagemStatus.ATUAL;
    }
}
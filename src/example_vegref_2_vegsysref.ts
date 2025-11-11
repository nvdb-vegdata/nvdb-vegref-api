import {fetchHistoricVegreferanse} from "./nvdbClient.ts";
import {MapperClass} from "./MapperClass.ts";
import {Vegreferanse} from "./Vegreferanse.ts";
import type {VegobjektResponse} from "./nvdbTypes.ts";

const run = async () => {
    try {
        let vegreferanse = Vegreferanse.createFromString("0800ev18hp1m200");
        const response : VegobjektResponse  = await fetchHistoricVegreferanse(vegreferanse);

        response.objekter?.forEach(objekt => {
                let vegref = MapperClass.toVegreferanse(objekt);
                console.log(`Objekt id: ${objekt.id},`
                + ` versjon:  ${objekt.metadata.versjon}, `
                + ` startdato: ${objekt.metadata.startdato}, `
                + ` sluttdato: ${objekt.metadata.sluttdato}, `
                + ` Vegreferanse: ${vegref} `);
            });
    } catch (error) {
        console.error("Noe gikk galt:", error);
    }
};

run();

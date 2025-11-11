import {UtilClass} from "../src/utilClass.ts";
import {Vegreferanse} from "../src/vegreferanse.ts";
import {VegreferanseService} from "../src/vegrefService.ts";

const run = async () => {
    try {
        const service = new VegreferanseService();
        let vegreferanse = Vegreferanse.createFromString("0800ev18hp1m200");
        service.searchForVegreferanse(vegreferanse)
            .then(async response => {
                response.objekter?.forEach(objekt => {
                    let vegref = UtilClass.toVegreferanse(objekt);
                    console.log(`Objekt id: ${objekt.id},`
                        + ` versjon:  ${objekt.metadata.versjon}, `
                        + ` startdato: ${objekt.metadata.startdato}, `
                        + ` sluttdato: ${objekt.metadata.sluttdato}, `
                        + ` Vegreferanse: ${vegref} `);
                });
        });
    } catch (error) {
        console.error("Noe gikk galt:", error);
    }
};

run();

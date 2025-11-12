import {UtilClass} from "../src/utilClass.ts";
import {VegreferanseService} from "../src/vegrefService.ts";

const run = async () => {
    try {
        const service = new VegreferanseService();
        let promise = service.findPosisjonForVegsystemreferanse("ev18s1d1m200");

        promise.then(async posisjon => {
            const vegobjektResponse = await service.findHistoricVegreferanseByLenkeposisjon(posisjon.veglenkesekvens.veglenkesekvensid, posisjon.veglenkesekvens.relativPosisjon);
            vegobjektResponse.objekter?.forEach(objekt => {
                const vegref = UtilClass.toVegreferanse(objekt);
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
import {UtilClass} from "../src/utilClass.ts";
import {VegreferanseService} from "../src/vegrefService.ts";

const run = async () => {
    try {
        const service = new VegreferanseService();
        service.findPosisjonByNordOst(6560102.44, 205060.17)
            .then(async posisjoner => {
                posisjoner.forEach((posisjon) => {
                    service.findHistoricVegreferanseByLenkeposisjon(posisjon.veglenkesekvens.veglenkesekvensid, posisjon.veglenkesekvens.relativPosisjon).
                    then(vegobjektResponse => {
                        vegobjektResponse.objekter?.forEach(objekt => {
                            const vegref = UtilClass.toVegreferanse(objekt);
                            console.log(`Objekt id: ${objekt.id},`
                                + ` versjon:  ${objekt.metadata.versjon}, `
                                + ` startdato: ${objekt.metadata.startdato}, `
                                + ` sluttdato: ${objekt.metadata.sluttdato}, `
                                + ` Vegreferanse: ${vegref} `);
                        });
                    });
                });
        });
    } catch (error) {
        console.error("Noe gikk galt:", error);
    }
};

run();
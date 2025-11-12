import {Vegreferanse} from "../src/vegreferanse.ts";
import {UtilClass} from "../src/utilClass.ts";
import {VegreferanseService} from "../src/vegrefService.ts";

const run = async () => {
    try {
        const service = new VegreferanseService();
        let vegreferanse = Vegreferanse.createFromString("0800ev18hp1m200");

        service.findVegreferanse(vegreferanse)
            .then(async response => {
                response.objekter?.forEach(objekt => {
                    const relPos = UtilClass.finnRelativPosisjon(objekt, vegreferanse.meter);
                    if (relPos !== undefined) {
                        service.findVegsystemReferanseByLenkeposisjon(relPos.lokasjon.veglenkesekvensid, relPos.position)
                            .then(posisjon => {
                                console.log("Posisjon:", posisjon.veglenkesekvens.kortform + "   " + posisjon.vegsystemreferanse.kortform);
                            });
                    }
                });
            });
    } catch (error) {
        console.error("Noe gikk galt:", error);
    }
};

run();

import {fetchHistoricVegreferanse, fetchVegsystemReferanse} from "./nvdbClient";
import {MapperClass} from "./MapperClass.ts";
import {Vegreferanse} from "./Vegreferanse.ts";
import {finnRelativPosisjon} from "./finnRelativPosisjon.ts";
import type {VegobjektResponse} from "./nvdbTypes.ts";

const run = async () => {
    try {
        let vegreferanse = Vegreferanse.createFromString("0800ev18hp1m200");
        const response : VegobjektResponse  = await fetchHistoricVegreferanse(vegreferanse);

        for (const objekt of response.objekter) {
            let relativPosisjon = finnRelativPosisjon(objekt, vegreferanse.meter);
            if (relativPosisjon === undefined) {
                console.log("Fant ingen stedfesting for vegobjekt:", objekt.id);
                continue;
            }
            let posisjon = await fetchVegsystemReferanse(relativPosisjon.lokasjon?.veglenkesekvensid, relativPosisjon.position);
            if (posisjon === undefined) {
                console.log("Fant ingen posisjon for veglenkesekvensid:", relativPosisjon.lokasjon.veglenkesekvensid, "og posisjon:", relativPosisjon.position);
            } else {
                console.log("Vegreferanse: " + MapperClass.toVegreferanse(objekt)
                 + "   Posisjon:", posisjon.veglenkesekvens.kortform + "   " +  posisjon.vegsystemreferanse.kortform);
            }
        }

    } catch (error) {
        console.error("Noe gikk galt:", error);
    }
};

run();

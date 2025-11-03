import {fetchHistoricVegreferanse, fetchVegsystemReferanse} from "./nvdbClient";
import {calculateCustomRelativePosition} from "./calculatePosition.ts";
import {MapperClass} from "./MapperClass.ts";
import {Vegreferanse} from "./Vegreferanse.ts";
import type {Vegobjekt, VegobjektResponse} from "./nvdbTypes.ts";

function finnRelativPosisjon(vegobjekt: Vegobjekt, currentMeter: number = 150) {

    const fra = vegobjekt.egenskaper.find(e => e.id === 4571);
    const til = vegobjekt.egenskaper.find(e => e.id === 4572);
    const position = calculateCustomRelativePosition(
        typeof fra?.verdi === "number" ? fra.verdi : 0,
        typeof til?.verdi === "number" ? til.verdi : 0,
        vegobjekt.lokasjon.stedfestinger[0].startposisjon,
        vegobjekt.lokasjon.stedfestinger[0].sluttposisjon,
        currentMeter);

    return {position, lokasjon: vegobjekt.lokasjon.stedfestinger[0]};
}


const run = async () => {
    try {
        // const response = await fetchHistoricVegreferanse("5000ev6hp18m100");
        let vegreferanse = Vegreferanse.createFromString("0800ev18hp1m0");
        // const response = await fetchHistoricVegreferanse(vegreferanse, new Date(2010, 1, 1));
        const response : VegobjektResponse  = await fetchHistoricVegreferanse(vegreferanse);
        // console.log(response);

        response.objekter.forEach(async objekt => {
            let relativPosisjon = finnRelativPosisjon(objekt, vegreferanse.meter);
            let posisjon = await fetchVegsystemReferanse(relativPosisjon.lokasjon.veglenkesekvensid, relativPosisjon.position);
            if (posisjon === null) {
                console.log("Fant ingen posisjon for veglenkesekvensid:", relativPosisjon.lokasjon.veglenkesekvensid, "og posisjon:", relativPosisjon.position);
            } else {
                console.log("Vegreferanse: " + MapperClass.toVegreferanse(objekt)
                 + "   Posisjon:", posisjon.veglenkesekvens.kortform + "   " +  posisjon.vegsystemreferanse.kortform);
            }
        });

    } catch (error) {
        console.error("Noe gikk galt:", error);
    }
};

run();

import { fetchHistoricVegreferanse, fetchVegsystemReferanse } from "./nvdbClient";
import {calculateCustomRelativePosition} from "./calculatePosition.ts";

function finnRelativPosisjon(vegrefElement, currentMeter: number = 150) {
    const fraMeter = vegrefElement.egenskaper.find((egenskap: any) => egenskap.id === 4571).verdi;
    const tilMeter = vegrefElement.egenskaper.find((egenskap: any) => egenskap.id === 4572).verdi;
    const lokasjon = vegrefElement.lokasjon.stedfestinger[0];
    const position = calculateCustomRelativePosition(
        fraMeter,
        tilMeter,
        lokasjon.startposisjon,
        lokasjon.sluttposisjon,
        currentMeter);

    return {position, lokasjon, currentMeter};
}


const run = async () => {
    try {
        // const data = await fetchHistoricVegreferanse("5000ev6hp18m100");
        const data = await fetchHistoricVegreferanse("0700ev18hp6m100");

        let objekterElement = data.objekter[0];
        let relativPosisjon = finnRelativPosisjon(objekterElement, 200);
        console.log(relativPosisjon.position + "@" + relativPosisjon.lokasjon.veglenkesekvensid);

        let vegsystemReferanse = await fetchVegsystemReferanse(relativPosisjon.lokasjon.veglenkesekvensid, relativPosisjon.position);
        console.log("Vegsystem referanse:", vegsystemReferanse);

    } catch (error) {
        console.error("Noe gikk galt:", error);
    }
};

run();

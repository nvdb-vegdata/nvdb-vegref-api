import {fetchHistoricVegreferanseFromPosition, fetchPosisjon} from "./nvdbClient.ts";
import {MapperClass} from "./MapperClass.ts";

const run = async () => {
    try {
        let posisjon = await fetchPosisjon("ev18S1D1m200");
        if (posisjon === undefined) {
            console.log("Fant ingen posisjon for vegsystemreferanse:", "ev18S1D1m200");
        } else {
            console.log("Vegreferanse: " + "   Posisjon:", posisjon.veglenkesekvens.kortform + "   " +  posisjon.vegsystemreferanse.kortform);

            let vegobjektResponse = await fetchHistoricVegreferanseFromPosition(posisjon.veglenkesekvens.veglenkesekvensid, posisjon.veglenkesekvens.relativPosisjon);
            vegobjektResponse.objekter
                .sort((a, b) => new Date(a.metadata.startdato).getTime() - new Date(b.metadata.startdato).getTime())
                .forEach(objekt => {
                    let vegreferanse = MapperClass.toVegreferanse(objekt);
                    console.log(`Objekt id: ${objekt.id},`
                        + ` startdato: ${objekt.metadata.startdato}, `
                        + ` sluttdato: ${objekt.metadata.sluttdato}, `
                        + ` vegreferanse: ${vegreferanse} `);
                });

        }
    } catch (error) {
        console.error("Noe gikk galt:", error);
    }
};

run();
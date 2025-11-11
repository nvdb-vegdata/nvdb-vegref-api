import {fetchHistoricVegreferanseFromPosition, fetchPosisjon} from "./nvdbClient.ts";
import {MapperClass} from "./MapperClass.ts";

const run = async () => {
    try {
        let vegsystemreferanse = "ev18S1D1m200";
        let posisjon = await fetchPosisjon(vegsystemreferanse);
        if (posisjon === undefined) {
            console.log("Fant ingen posisjon for vegsystemreferanse:", vegsystemreferanse);
        } else {
            console.log("Vegreferanse: " + "   Posisjon:", posisjon.veglenkesekvens.kortform + "   " +  posisjon.vegsystemreferanse.kortform);

            let vegobjektResponsePromise = await fetchHistoricVegreferanseFromPosition(
                posisjon.veglenkesekvens.veglenkesekvensid,
                posisjon.veglenkesekvens.relativPosisjon);

            console.log("Vegreferanse: " + vegobjektResponsePromise);

            vegobjektResponsePromise.objekter
                .sort((a, b) => new Date(a.metadata.startdato).getTime() - new Date(b.metadata.startdato).getTime())
                .forEach(objekt => {
                    let vegreferanse = MapperClass.toVegreferanse(objekt);
                    console.log(`Vegreferanse for objekt id ${objekt.id}`
                        + ` startdato: ${objekt.metadata.startdato} `
                        + ` sluttdato: ${objekt.metadata.sluttdato} `
                        + ` er: ${vegreferanse} `);
                });

        }
    } catch (error) {
        console.error("Noe gikk galt:", error);
    }
};

run();
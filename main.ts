import { fetchHistoricVegreferanse } from "./nvdbClient";

const run = async () => {
    try {
        // const data = await fetchHistoricVegreferanse("5000ev6hp18m100");
        const data = await fetchHistoricVegreferanse("0700ev18hp6m100");

        if (data.objekter.length === 1) {
            data.objekter[0].egenskaper.forEach((egenskap: any) => {
                console.log(`Egenskap id: ${egenskap.id}, Navn ${egenskap.navn}, Verdi: ${egenskap.verdi}`);
            });
            const fraMeter = data.objekter[0].egenskaper.find((egenskap: any) => egenskap.id === 4571).verdi;
            const tilMeter = data.objekter[0].egenskaper.find((egenskap: any) => egenskap.id === 4572).verdi;
            const lokasjon = data.objekter[0].lokasjon.stedfestinger[0];
            console.log("start posisjon: lokasjon.startposisjon:", lokasjon.startposisjon);
            console.log("slutt posisjon: lokasjon.sluttposisjon:", lokasjon.sluttposisjon);
            console.log("frameter: ", fraMeter);
            console.log("tilmeter: ", tilMeter);
        }

        console.log("Vegobjekter:", data);
    } catch (error) {
        console.error("Noe gikk galt:", error);
    }
};

run();

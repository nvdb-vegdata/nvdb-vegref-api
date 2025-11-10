import type {Vegobjekt} from "./nvdbTypes.ts";
import {calculateCustomRelativePosition} from "./calculatePosition.ts";

/**
 * Beregner relativ posisjon for et `Vegobjekt` basert på en gitt meterverdi.
 * Finner start- og sluttmeter-egenskapene (id 4571 og 4572) og bruker første stedfesting.
 * Returnerer `undefined` hvis nødvendig data mangler, ellers returneres relativ posisjon og lokasjon.
 *
 * @param vegobjekt Vegobjektet det skal beregnes posisjon for.
 * @param currentMeter Meterverdien det skal beregnes relativ posisjon for.
 * @returns Et objekt med `position` og `lokasjon`, eller `undefined` hvis data mangler.
 */
export function finnRelativPosisjon(vegobjekt: Vegobjekt, currentMeter: number) {

    const fra = vegobjekt.egenskaper.find(e => e.id === 4571);
    const til = vegobjekt.egenskaper.find(e => e.id === 4572);
    const stedfesting = vegobjekt.lokasjon.stedfestinger[0];

    if (!stedfesting || !fra || !til) {
        return undefined;
    } else {
        const position = calculateCustomRelativePosition(
            typeof fra.verdi === "number" ? fra.verdi : 0,
            typeof til.verdi === "number" ? til.verdi : 0,
            stedfesting.startposisjon,
            stedfesting.sluttposisjon,
            currentMeter);

        return {position, lokasjon: stedfesting};
    }
}
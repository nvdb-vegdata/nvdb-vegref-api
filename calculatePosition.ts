
/**
 * Beregner den nye relative posisjonen basert på meterverdier og egendefinerte relative grenser.
 *
 * @param startMeter Startpunktet for det absolutte meterområdet.
 * @param endMeter Sluttpunktet for det absolutte meterområdet.
 * @param relativeStart Den egendefinerte relative startposisjonen (0-1).
 * @param relativeEnd Den egendefinerte relative sluttposisjonen (0-1).
 * @param currentMeter Den aktuelle meterverdien som skal konverteres.
 * @returns Den nye relative posisjonen innenfor det egendefinerte området.
 */
export function calculateCustomRelativePosition(
    startMeter: number,
    endMeter: number,
    relativeStart: number,
    relativeEnd: number,
    currentMeter: number
): number {

    // Sjekk for å unngå deling på null hvis startMeter og endMeter er like
    if (startMeter === endMeter) {
        return relativeStart;
    }

    // Formel for omskalering av currentMeter til det nye relative området
    const customPosition =  Math.abs(relativeStart + (currentMeter - startMeter) * (relativeEnd - relativeStart) / (endMeter - startMeter));

    if (customPosition < relativeStart) return relativeStart;
    if (customPosition > relativeEnd) return relativeEnd;

    return customPosition;
}
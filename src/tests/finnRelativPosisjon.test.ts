import {expect, test} from 'bun:test';
import {Vegreferanse} from "../vegreferanse";
import {UtilClass} from "../utilClass";
import * as fs from 'fs';


// Read test data from file
const data = fs.readFileSync('tests-data/vegreferanse_532.json', 'utf-8');
const response = JSON.parse(data);



test('processes vegobjekter from test data with meter 200', async () => {
    let vegreferanse = Vegreferanse.createFromString("0800ev18hp1m200");

    for (const objekt of response.objekter) {
        let relativPosisjon = UtilClass.finnRelativPosisjon(objekt, vegreferanse.meter, false);
        expect(relativPosisjon?.lokasjon.veglenkesekvensid).toBeDefined();
        expect(relativPosisjon?.position).toBeGreaterThan(0);
    }
});


test('processes vegobjekter from test data with meter 0', async () => {
    let vegreferanse = Vegreferanse.createFromString("0800ev18hp1m0");

    for (const objekt of response.objekter) {
        let relativPosisjon = UtilClass.finnRelativPosisjon(objekt, vegreferanse.meter, false);
        expect(relativPosisjon?.lokasjon.veglenkesekvensid).toBeDefined();
        expect(relativPosisjon?.position).toBeGreaterThanOrEqual(0);
    }
});

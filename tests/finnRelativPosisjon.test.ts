import {expect, test} from 'bun:test';
import {Vegreferanse} from "../src/vegreferanse.ts";
import {UtilClass} from "../src/utilClass.ts";
import * as fs from 'fs';


// Read test data from file
const data = fs.readFileSync('tests-data/vegreferanse_532.json', 'utf-8');
const response = JSON.parse(data);



test('processes vegobjekter from test data with meter 200', async () => {
    let vegreferanse = Vegreferanse.createFromString("0800ev18hp1m200");

    for (const objekt of response.objekter) {
        let relativPosisjon = UtilClass.finnRelativPosisjon(objekt, vegreferanse.meter);
        expect(relativPosisjon?.lokasjon.veglenkesekvensid).toBeDefined();
        expect(relativPosisjon?.position).toBeGreaterThan(0);
    }
});


test('processes vegobjekter from test data with meter 0', async () => {
    let vegreferanse = Vegreferanse.createFromString("0800ev18hp1m0");

    for (const objekt of response.objekter) {
        let relativPosisjon = UtilClass.finnRelativPosisjon(objekt, vegreferanse.meter);
        expect(relativPosisjon?.lokasjon.veglenkesekvensid).toBeDefined();
        expect(relativPosisjon?.position).toBeGreaterThanOrEqual(0);
    }
});

test('Vegobjekt har retning MOT', async () => {
    let vegreferanse = Vegreferanse.createFromString("0800ev18hp1m8379");
    const feature = JSON.parse(fs.readFileSync('tests-data/vegreferanse_mot_532.json', 'utf-8'));
    let finnRelativPosisjon = UtilClass.finnRelativPosisjon(feature, vegreferanse.meter);
    expect(finnRelativPosisjon?.position == 1.0).toBe(true);
});


/**
 *  let vegreferanse = Vegreferanse.createFromString("0800ev18hp1m8379");
 *
 *     let feature: Vegobjekt = {
 *         "id": 12345,
 *         "href": "/vegobjekter/532/12345",
 *         "metadata": {
 *             "versjon": 1,
 *             "startdato": "2020-01-01",
 *             "sluttdato": null
 *         },
 *         "egenskaper": [
 *             {   id: 4571,
 *                 navn: 'FraMeter',
 *                 verdi: 8379.0,
 *                 egenskapstype: 'Heltall'
 *             },
 *             {   id: 4572,
 *                 navn: 'TilMeter',
 *                 verdi: 10240.0,
 *                 egenskapstype: 'Heltall'
 *             }
 *         ],
 *         "lokasjon": {
 *             fylker: [40],
 *             kommuner: [4001],
 *             geometri: {
 *                 srid: 5973,
 *                 wkt: "Point 10.12345, 63.12345"
 *             },
 *             vegsystemreferanser: [],
 *             stedfestinger: [{
 *                 "type": "linje",
 *                 "veglenkesekvensid": 67890,
 *                 "startposisjon": 0.0,
 *                 "sluttposisjon": 1.0,
 *                 "retning": "MOT"
 *             }]
 *         }
 *     };
 */
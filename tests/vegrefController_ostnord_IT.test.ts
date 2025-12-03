import {expect, test} from 'bun:test';
import {VegrefController} from "../src/vegrefController.ts";
import {Vegreferanse} from "../src/vegreferanse.ts";

var vegrefcontroller = new VegrefController();


test("Verify lookup of 0.86004074@521066", async () => {

    const posisjon = await vegrefcontroller.findPosisjonerByCoordinates(6560102.44, 205060.17);
    posisjon.sort((a, b) => {
        if (a.veglenkeid !== b.veglenkeid) {
            return a.veglenkeid - b.veglenkeid;
        }
        const dateA = new Date(a.fraDato).getTime();
        const dateB = new Date(b.fraDato).getTime();
        return dateA - dateB;
    })

    expect(posisjon.length).toBe(5);

    expect(posisjon[0]?.beregnetVegreferanse).toBe( "0700 EV18 hp17 m7920");
    expect(posisjon[0]?.vegsystemreferanse).toBe("FV2962 S1D1 m7415");
    expect(posisjon[0]?.relativPosisjon).toBeCloseTo(1) ;
    expect(posisjon[0]?.veglenkeid).toBe(1175374) ;
    expect(posisjon[0]?.fraDato).toBe("1950-01-01") ;

    expect(posisjon[1]?.beregnetVegreferanse).toBe( "0700 ET18 hp17 m7920");
    expect(posisjon[1]?.vegsystemreferanse).toBe("FV2962 S1D1 m7415");
    expect(posisjon[1]?.relativPosisjon).toBeCloseTo(1);
    expect(posisjon[1]?.veglenkeid).toBe(1175374) ;
    expect(posisjon[1]?.fraDato).toBe("2012-06-06") ;

    expect(posisjon[2]?.beregnetVegreferanse).toBe( "0700 FV30 hp1 m7447");
    expect(posisjon[2]?.vegsystemreferanse).toBe("FV2962 S1D1 m7415");
    expect(posisjon[2]?.relativPosisjon).toBeCloseTo(1);
    expect(posisjon[2]?.veglenkeid).toBe(1175374) ;
    expect(posisjon[2]?.fraDato).toBe("2015-08-01") ;

    expect(posisjon[3]?.beregnetVegreferanse).toBe( "0700 FV30 hp1 m7415");
    expect(posisjon[3]?.vegsystemreferanse).toBe("FV2962 S1D1 m7415");
    expect(posisjon[3]?.relativPosisjon).toBeCloseTo(1);
    expect(posisjon[3]?.veglenkeid).toBe(1175374) ;
    expect(posisjon[3]?.fraDato).toBe("2017-07-01") ;

    expect(posisjon[4]?.beregnetVegreferanse).toBe( "0700 FV2962 hp1 m7415");
    expect(posisjon[4]?.vegsystemreferanse).toBe("FV2962 S1D1 m7415");
    expect(posisjon[4]?.relativPosisjon).toBeCloseTo(1);
    expect(posisjon[4]?.veglenkeid).toBe(1175374) ;
    expect(posisjon[4]?.fraDato).toBe("2019-06-11") ;

},  { timeout: 15000 })

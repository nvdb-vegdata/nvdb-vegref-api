import {expect, test} from 'bun:test';
import {VegrefController} from "../src/vegrefController.ts";
import {Vegreferanse} from "../src/vegreferanse.ts";

var vegrefcontroller = new VegrefController();


test("Verify lookup of 0.86004074@521066", async () => {

    const posisjon = await vegrefcontroller.findPosisjonerByLenkesekvens(521066, 0.86004074);
    posisjon.sort((a, b) => {
        if (a.veglenkeid !== b.veglenkeid) {
            return a.veglenkeid - b.veglenkeid;
        }
        const dateA = new Date(a.fraDato).getTime();
        const dateB = new Date(b.fraDato).getTime();
        return dateA - dateB;
    })

    expect(posisjon.length).toBe(4);

    expect(posisjon[0]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m6236");
    expect(posisjon[0]?.vegsystemreferanse).toBe("EV18 S22D1 m1000");
    expect(posisjon[0]?.relativPosisjon).toBe(0.86004074) ;
    expect(posisjon[0]?.veglenkeid).toBe(521066) ;
    expect(posisjon[0]?.fraDato).toBe("1950-01-01") ;


    expect(posisjon[1]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m6236");
    expect(posisjon[1]?.vegsystemreferanse).toBe("EV18 S22D1 m1000");
    expect(posisjon[1]?.relativPosisjon).toBe(0.86004074);
    expect(posisjon[1]?.veglenkeid).toBe(521066) ;
    expect(posisjon[1]?.fraDato).toBe("2015-10-15") ;

    expect(posisjon[2]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m6237");
    expect(posisjon[2]?.vegsystemreferanse).toBe("EV18 S22D1 m1000");
    expect(posisjon[2]?.relativPosisjon).toBe(0.86004074);
    expect(posisjon[2]?.veglenkeid).toBe(521066) ;
    expect(posisjon[2]?.fraDato).toBe("2016-06-30") ;

    expect(posisjon[3]?.beregnetVegreferanse).toBe( "0800 EV18 hp1 m1000");
    expect(posisjon[3]?.vegsystemreferanse).toBe("EV18 S22D1 m1000");
    expect(posisjon[3]?.relativPosisjon).toBe(0.86004074);
    expect(posisjon[3]?.veglenkeid).toBe(521066) ;
    expect(posisjon[3]?.fraDato).toBe("2019-10-10") ;

},  { timeout: 15000 })

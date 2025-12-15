import {expect, test} from 'bun:test';
import {VegrefController} from "../src/vegrefController.ts";
import {Vegreferanse} from "../src/vegreferanse.ts";

var vegrefcontroller = new VegrefController();


test("Verify lookup of ev18hp1m200", async () => {

    const posisjon = await vegrefcontroller.findPosisjonerByVegreferanse(Vegreferanse.createFromString("0800ev18hp1m5000"));
    posisjon.sort((a, b) => {
        if (a.veglenkeid !== b.veglenkeid) {
            return a.veglenkeid - b.veglenkeid;
        }
        const dateA = new Date(a.fraDato).getTime();
        const dateB = new Date(b.fraDato).getTime();
        return dateA - dateB;
    })

    expect(posisjon.length).toBe(3);

    expect(posisjon[0]?.beregnetVegreferanse).toBe( "0800 EV18 hp1 m5000");
    expect(posisjon[0]?.vegsystemreferanse).toBe("Ukjent vegsystemreferanse");
    expect(posisjon[0]?.relativPosisjon).toBeCloseTo(0.50240, 4) ;
    expect(posisjon[0]?.veglenkeid).toBe(521064) ;
    expect(posisjon[0]?.fraDato).toBe("1950-01-01") ;

    expect(posisjon[1]?.beregnetVegreferanse).toBe( "0800 EV18 hp1 m5000");
    expect(posisjon[1]?.vegsystemreferanse).toBe("Ukjent vegsystemreferanse");
    expect(posisjon[1]?.relativPosisjon).toBeCloseTo(0.52306, 4) ;
    expect(posisjon[1]?.veglenkeid).toBe(521064) ;
    expect(posisjon[1]?.fraDato).toBe("2012-06-06") ;

    expect(posisjon[2]?.beregnetVegreferanse).toBe( "0800 EV18 hp1 m5000");
    expect(posisjon[2]?.vegsystemreferanse).toBe("EV18 S22D1 m5000");
    expect(posisjon[2]?.relativPosisjon).toBeCloseTo(0.30001, 4) ;
    expect(posisjon[2]?.veglenkeid).toBe(521066) ;
    expect(posisjon[2]?.fraDato).toBe("2019-10-10") ;


},  { timeout: 20000 });
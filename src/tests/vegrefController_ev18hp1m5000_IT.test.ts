import {expect, test} from 'bun:test';
import {VegrefController} from "../vegrefController";
import {Vegreferanse} from "../vegreferanse";
import {TestUtil} from "./TestUtil";

var vegrefcontroller = new VegrefController();


test("Verify lookup of ev18hp1m200", async () => {

    const posisjon = await vegrefcontroller.findPosisjonerByVegreferanse(Vegreferanse.createFromString("0800ev18hp1m5000"));
    posisjon.sort(TestUtil.sortPosisjonByVeglenkeidAndFraDato);

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
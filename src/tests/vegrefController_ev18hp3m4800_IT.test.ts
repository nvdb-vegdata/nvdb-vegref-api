import {expect, test} from 'bun:test';
import {VegrefController} from "../vegrefController";
import {Vegreferanse} from "../vegreferanse";
import {TestUtil} from "./TestUtil";

var vegrefcontroller = new VegrefController();


test("Verify lookup of 0800 ev18 hp3 m4800", async () => {

    const posisjon = await vegrefcontroller
        .findPosisjonerByVegreferanse(Vegreferanse.createFromString("0800ev18hp3m4800"));

    posisjon.sort(TestUtil.sortPosisjonByVeglenkeidAndFraDato);

    expect(posisjon.length).toBe(3);

    expect(posisjon[0]?.beregnetVegreferanse).toBe( "0800 EV18 hp3 m4800");
    expect(posisjon[0]?.vegsystemreferanse).toBe("EV18 S26D1 m2702");
    expect(posisjon[0]?.relativPosisjon).toBeCloseTo(0.8625, 4) ;
    expect(posisjon[0]?.veglenkeid).toBe(521376) ;
    expect(posisjon[0]?.fraDato).toBe("1996-08-19") ;

    expect(posisjon[1]?.beregnetVegreferanse).toBe( "0800 EV18 hp3 m4799");
    expect(posisjon[1]?.vegsystemreferanse).toBe("FV363 S2D1 m5548");
    expect(posisjon[1]?.relativPosisjon).toBeCloseTo(0.272, 3) ;
    expect(posisjon[1]?.veglenkeid).toBe(521378) ;
    expect(posisjon[1]?.fraDato).toBe("2019-10-10") ;

    expect(posisjon[2]?.beregnetVegreferanse).toBe( "0800 EV18 hp3 m4800");
    expect(posisjon[2]?.vegsystemreferanse).toBe("EV18 S25D1 m4800");
    expect(posisjon[2]?.relativPosisjon).toBeCloseTo(0.05576, 4) ;
    expect(posisjon[2]?.veglenkeid).toBe(2982042) ;
    expect(posisjon[2]?.fraDato).toBe("2019-12-02") ;


},  { timeout: 20000 });
import {expect, test} from 'bun:test';
import {VegrefController} from "../vegrefController";
import {Vegreferanse} from "../vegreferanse";
import {TestUtil} from "./TestUtil";

var vegrefcontroller = new VegrefController();


test("Verify lookup of 0800 ev18 hp3 m2000", async () => {

    const posisjon = await vegrefcontroller.findPosisjonerByVegreferanse(Vegreferanse.createFromString("0800ev18hp3m2000"));
    posisjon.sort(TestUtil.sortPosisjonByVeglenkeidAndFraDato);

    expect(posisjon.length).toBe(5);

    expect(posisjon[0]?.beregnetVegreferanse).toBe( "0800 EV18 hp3 m2000");
    expect(posisjon[0]?.vegsystemreferanse).toBe("Ukjent vegsystemreferanse");
    expect(posisjon[0]?.relativPosisjon).toBeCloseTo(0.5951, 4) ;
    expect(posisjon[0]?.veglenkeid).toBe(521376) ;
    expect(posisjon[0]?.fraDato).toBe("1992-10-20") ;

    expect(posisjon[1]?.beregnetVegreferanse).toBe( "0800 EV18 hp3 m2000");
    expect(posisjon[1]?.vegsystemreferanse).toBe("Ukjent vegsystemreferanse");
    expect(posisjon[1]?.relativPosisjon).toBeCloseTo(0.5951, 4) ;
    expect(posisjon[1]?.veglenkeid).toBe(521376) ;
    expect(posisjon[1]?.fraDato).toBe("1996-08-19") ;

    expect(posisjon[2]?.beregnetVegreferanse).toBe( "0800 EV18 hp3 m1109");
    expect(posisjon[2]?.vegsystemreferanse).toBe("FV363 S2D1 m9280");
    expect(posisjon[2]?.relativPosisjon).toBeCloseTo(0.65442, 4) ;
    expect(posisjon[2]?.veglenkeid).toBe(521378) ;
    expect(posisjon[2]?.fraDato).toBe("2019-10-10") ;

    expect(posisjon[3]?.beregnetVegreferanse).toBe( "0800 EV18 hp3 m2000");
    expect(posisjon[3]?.vegsystemreferanse).toBe("FV3260 S2D1 m2078");
    expect(posisjon[3]?.relativPosisjon).toBeCloseTo(0.7655, 4) ;
    expect(posisjon[3]?.veglenkeid).toBe(521463) ;
    expect(posisjon[3]?.fraDato).toBe("1950-01-01") ;

    expect(posisjon[4]?.beregnetVegreferanse).toBe( "0800 EV18 hp3 m2000");
    expect(posisjon[4]?.vegsystemreferanse).toBe("EV18 S25D1 m2000");
    expect(posisjon[4]?.relativPosisjon).toBeCloseTo(0.52728, 4) ;
    expect(posisjon[4]?.veglenkeid).toBe(2982043) ;
    expect(posisjon[4]?.fraDato).toBe("2019-12-02") ;


},  { timeout: 20000 });
import {expect, test} from 'bun:test';
import {VegrefController} from "../src/vegrefController.ts";
import {Vegreferanse} from "../src/vegreferanse.ts";
import {TestUtil} from "./TestUtil.ts";

var vegrefcontroller = new VegrefController();


test("Verify lookup of ev18hp1m200", async () => {

    const posisjon = await vegrefcontroller.findPosisjonerByVegreferanserAdvanced(Vegreferanse.createFromString("0800ev18hp1m200"));
    posisjon.sort(TestUtil.sortPosisjonByVeglenkeidAndFraDato);

    expect(posisjon.length).toBe(12);

    expect(posisjon[0]?.beregnetVegreferanse).toBe( "0800 EV18 hp1 m200");
    expect(posisjon[0]?.vegsystemreferanse).toBe("FV2962 S2D1 m200");
    expect(posisjon[0]?.relativPosisjon).toBeCloseTo(0.02011, 4) ;
    expect(posisjon[0]?.veglenkeid).toBe(521064) ;
    expect(posisjon[0]?.fraDato).toBe("1950-01-01") ;

    expect(posisjon[1]?.beregnetVegreferanse).toBe( "0800 ET18 hp1 m200");
    expect(posisjon[1]?.vegsystemreferanse).toBe("FV2962 S2D1 m200");
    expect(posisjon[1]?.relativPosisjon).toBeCloseTo(0.02011, 4) ;
    expect(posisjon[1]?.veglenkeid).toBe(521064) ;
    expect(posisjon[1]?.fraDato).toBe("2012-06-06") ;

    expect(posisjon[2]?.beregnetVegreferanse).toBe( "0800 FV30 hp1 m200");
    expect(posisjon[2]?.vegsystemreferanse).toBe("FV2962 S2D1 m200");
    expect(posisjon[2]?.relativPosisjon).toBeCloseTo(0.02011, 4) ;
    expect(posisjon[2]?.veglenkeid).toBe(521064) ;
    expect(posisjon[2]?.fraDato).toBe("2013-10-28") ;

    expect(posisjon[3]?.beregnetVegreferanse).toBe( "0800 FV30 hp1 m200");
    expect(posisjon[3]?.vegsystemreferanse).toBe("FV2962 S2D1 m200");
    expect(posisjon[3]?.relativPosisjon).toBeCloseTo(0.02011, 4) ;
    expect(posisjon[3]?.veglenkeid).toBe(521064) ;
    expect(posisjon[3]?.fraDato).toBe("2013-11-19") ;

    expect(posisjon[4]?.beregnetVegreferanse).toBe( "0800 FV2962 hp2 m200");
    expect(posisjon[4]?.vegsystemreferanse).toBe("FV2962 S2D1 m200");
    expect(posisjon[4]?.relativPosisjon).toBeCloseTo(0.02011, 4) ;
    expect(posisjon[4]?.veglenkeid).toBe(521064) ;
    expect(posisjon[4]?.fraDato).toBe("2019-05-08");

    expect(posisjon[5]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m7036");
    expect(posisjon[5]?.vegsystemreferanse).toBe("EV18 S22D1 m200");
    expect(posisjon[5]?.relativPosisjon).toBeCloseTo(0.9720, 4);
    expect(posisjon[5]?.veglenkeid).toBe(521066) ;
    expect(posisjon[5]?.fraDato).toBe("1950-01-01") ;

    expect(posisjon[6]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m7036");
    expect(posisjon[6]?.vegsystemreferanse).toBe("EV18 S22D1 m200");
    expect(posisjon[6]?.relativPosisjon).toBeCloseTo(0.9720, 4);
    expect(posisjon[6]?.veglenkeid).toBe(521066) ;
    expect(posisjon[6]?.fraDato).toBe("2015-10-15") ;

    expect(posisjon[7]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m7037");
    expect(posisjon[7]?.vegsystemreferanse).toBe("EV18 S22D1 m200");
    expect(posisjon[7]?.relativPosisjon).toBeCloseTo(0.9720, 4);
    expect(posisjon[7]?.veglenkeid).toBe(521066) ;
    expect(posisjon[7]?.fraDato).toBe("2016-06-30") ;

    expect(posisjon[8]?.beregnetVegreferanse).toBe( "0800 EV18 hp1 m200");
    expect(posisjon[8]?.vegsystemreferanse).toBe("EV18 S22D1 m200");
    expect(posisjon[8]?.relativPosisjon).toBeCloseTo(0.9720, 4);
    expect(posisjon[8]?.veglenkeid).toBe(521066) ;
    expect(posisjon[8]?.fraDato).toBe("2019-10-10") ;

    expect(posisjon[9]?.beregnetVegreferanse).toBe( "0800 EA18 hp1 m200");
    expect(posisjon[9]?.vegsystemreferanse).toBe("EV18 S28D1 m10043");
    expect(posisjon[9]?.relativPosisjon).toBeCloseTo(0.1075, 4);
    expect(posisjon[9]?.veglenkeid).toBe(2014346) ;
    expect(posisjon[9]?.fraDato).toBe("2009-08-05");

    expect(posisjon[10]?.beregnetVegreferanse).toBe( "0800 EV18 hp1 m200");
    expect(posisjon[10]?.vegsystemreferanse).toBe("EV18 S28D1 m10043");
    expect(posisjon[10]?.relativPosisjon).toBeCloseTo(0.1075, 4);
    expect(posisjon[10]?.veglenkeid).toBe(2014346) ;
    expect(posisjon[10]?.fraDato).toBe("2012-06-06");

    expect(posisjon[11]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m10040");
    expect(posisjon[11]?.vegsystemreferanse).toBe("EV18 S28D1 m10043");
    expect(posisjon[11]?.relativPosisjon).toBeCloseTo(0.1075, 4);
    expect(posisjon[11]?.veglenkeid).toBe(2014346) ;
    expect(posisjon[11]?.fraDato).toBe("2019-10-10");
},  { timeout: 20000 })
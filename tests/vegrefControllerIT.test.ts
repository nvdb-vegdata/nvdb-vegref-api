import {expect, test} from 'bun:test';
import {VegrefController} from "../src/vegrefController.ts";
import {Vegreferanse} from "../src/vegreferanse.ts";

var vegrefcontroller = new VegrefController();

test("Verify lookup of 0.86004074@521066", async () => {
    const posisjon = await vegrefcontroller.findPosisjonerByLenkesekvens(521066, 0.86004074);
    posisjon.sort((a, b) => new Date(a.fraDato).getTime() - new Date(b.fraDato).getTime());

    expect(posisjon.length).toBe(4);

    posisjon.forEach(p => expect(p.relativPosisjon).toBeCloseTo(0.86004074, 8));
    posisjon.forEach(p => expect(p.veglenkeid).toBe(521066));
    posisjon.forEach(p => expect(p.vegsystemreferanse).toBe("EV18 S22D1 m1000"));

    expect(posisjon[0]?.beregnetVegreferanse).toBe("0800 EV18 hp9 m6236");
    expect(posisjon[0]?.fraDato).toBe("1950-01-01");

    expect(posisjon[1]?.beregnetVegreferanse).toBe("0800 EV18 hp9 m6236");
    expect(posisjon[1]?.fraDato).toBe("2015-10-15");

    expect(posisjon[2]?.beregnetVegreferanse).toBe("0800 EV18 hp9 m6237");
    expect(posisjon[2]?.fraDato).toBe("2016-06-30");

    expect(posisjon[3]?.beregnetVegreferanse).toBe("0800 EV18 hp1 m1000");
    expect(posisjon[3]?.fraDato).toBe("2019-10-10");
});


test("Verify lookup of 0.97171054113006394@1060716 ", async () => {
    const posisjon = await vegrefcontroller.findPosisjonerByLenkesekvens(1060716, 0.97171054113006394);
    posisjon.sort((a, b) => new Date(a.fraDato).getTime() - new Date(b.fraDato).getTime());

    expect(posisjon.length).toBe(3);

    posisjon.forEach(p => expect(p.relativPosisjon).toBeCloseTo(0.97171054, 8));
    posisjon.forEach(p => expect(p.veglenkeid).toBe(1060716));
    posisjon.forEach(p => expect(p.vegsystemreferanse).toBe("FV2388 S2D1 m7949"));

    expect(posisjon[0]?.beregnetVegreferanse).toBe( "0500 FV132 hp2 m7947");
    expect(posisjon[0]?.fraDato).toBe("1950-01-01");

    expect(posisjon[1]?.beregnetVegreferanse).toBe( "0500 FV132 hp2 m7952");
    expect(posisjon[1]?.fraDato).toBe("2019-01-01");

    expect(posisjon[2]?.beregnetVegreferanse).toBe("0500 FV2388 hp2 m7952");
    expect(posisjon[2]?.fraDato).toBe("2019-06-19");
});


test("Verify lookup position east=205060.17 and north=6560102.44", async () => {
    const posisjon = await vegrefcontroller.findPosisjonerByCoordinates(6560102.44, 205060.17);
    posisjon.sort((a, b) => new Date(a.fraDato).getTime() - new Date(b.fraDato).getTime());

    expect(posisjon.length).toBe(5);

    posisjon.forEach(p => expect(p.relativPosisjon).toBeCloseTo(0.99999776, 8));
    posisjon.forEach(p => expect(p.veglenkeid).toBe(1175374));
    posisjon.forEach(p => expect(p.vegsystemreferanse).toBe("FV2962 S1D1 m7415"));

    expect(posisjon[0]?.beregnetVegreferanse).toBe( "0700 EV18 hp17 m7920");
    expect(posisjon[0]?.fraDato).toBe("1950-01-01");

    expect(posisjon[1]?.beregnetVegreferanse).toBe( "0700 ET18 hp17 m7920");
    expect(posisjon[1]?.fraDato).toBe("2012-06-06");

    expect(posisjon[2]?.beregnetVegreferanse).toBe("0700 FV30 hp1 m7447");
    expect(posisjon[2]?.fraDato).toBe("2015-08-01");

    expect(posisjon[3]?.beregnetVegreferanse).toBe("0700 FV30 hp1 m7415");
    expect(posisjon[3]?.fraDato).toBe("2017-07-01");

    expect(posisjon[4]?.beregnetVegreferanse).toBe("0700 FV2962 hp1 m7415");
    expect(posisjon[4]?.fraDato).toBe("2019-06-11");
});


test("Verify lookup position east=164956.5264286567 and north=6540946.932919496", async () => {
    const posisjon = await vegrefcontroller.findPosisjonerByCoordinates(6540946.932919496, 164956.5264286567);
    posisjon.sort((a, b) => new Date(a.fraDato).getTime() - new Date(b.fraDato).getTime());

    expect(posisjon.length).toBe(4);

    posisjon.forEach(p => expect(p.veglenkeid).toBe(521066));
    posisjon.forEach(p => expect(p.relativPosisjon).toBeCloseTo(0.86003, 4));
    posisjon.forEach(p => expect(p.vegsystemreferanse).toBe("EV18 S22D1 m1000"));

    expect(posisjon[0]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m6236");
    expect(posisjon[0]?.fraDato).toBe("1950-01-01");

    expect(posisjon[1]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m6236");
    expect(posisjon[1]?.fraDato).toBe("2015-10-15");

    expect(posisjon[2]?.beregnetVegreferanse).toBe("0800 EV18 hp9 m6237");
    expect(posisjon[2]?.fraDato).toBe("2016-06-30");

    expect(posisjon[3]?.beregnetVegreferanse).toBe("0800 EV18 hp1 m1000");
    expect(posisjon[3]?.fraDato).toBe("2019-10-10");
});


test("Verify lookup of ev18hp1m0", async () => {

    const posisjon = await vegrefcontroller.findPosisjonerByVegreferanse(Vegreferanse.createFromString("0800ev18hp1m0"));
    posisjon.sort((a, b) => {
        if (a.veglenkeid !== b.veglenkeid) {
            return a.veglenkeid - b.veglenkeid;
        }
        const dateA = new Date(a.fraDato).getTime();
        const dateB = new Date(b.fraDato).getTime();
        return dateA - dateB;
    })

    expect(posisjon.length).toBe(12);

    expect(posisjon[0]?.beregnetVegreferanse).toBe( "0800 EV18 hp1 m0");
    expect(posisjon[0]?.vegsystemreferanse).toBe("FV2962 S2D1 m0");
    expect(posisjon[0]?.relativPosisjon).toBe(0) ;
    expect(posisjon[0]?.veglenkeid).toBe(521064) ;

    expect(posisjon[1]?.beregnetVegreferanse).toBe( "0800 ET18 hp1 m0");
    expect(posisjon[1]?.vegsystemreferanse).toBe("FV2962 S2D1 m0");
    expect(posisjon[1]?.relativPosisjon).toBe(0);
    expect(posisjon[1]?.veglenkeid).toBe(521064) ;

    expect(posisjon[2]?.beregnetVegreferanse).toBe( "0800 FV30 hp1 m0");
    expect(posisjon[2]?.vegsystemreferanse).toBe("FV2962 S2D1 m0");
    expect(posisjon[2]?.relativPosisjon).toBe(0);
    expect(posisjon[2]?.veglenkeid).toBe(521064) ;

    expect(posisjon[3]?.beregnetVegreferanse).toBe( "0800 FV30 hp1 m0");
    expect(posisjon[3]?.vegsystemreferanse).toBe("FV2962 S2D1 m0");
    expect(posisjon[3]?.relativPosisjon).toBe(0);
    expect(posisjon[3]?.veglenkeid).toBe(521064) ;

    expect(posisjon[4]?.beregnetVegreferanse).toBe( "0800 FV2962 hp2 m0");
    expect(posisjon[4]?.vegsystemreferanse).toBe("FV2962 S2D1 m0");
    expect(posisjon[4]?.relativPosisjon).toBe(0);
    expect(posisjon[4]?.veglenkeid).toBe(521064) ;

    expect(posisjon[5]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m7235");
    expect(posisjon[5]?.vegsystemreferanse).toBe("EV18 S22D1 m0");
    expect(posisjon[5]?.relativPosisjon).toBe(1);
    expect(posisjon[5]?.veglenkeid).toBe(521066) ;

    expect(posisjon[6]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m7235");
    expect(posisjon[6]?.vegsystemreferanse).toBe("EV18 S22D1 m0");
    expect(posisjon[6]?.relativPosisjon).toBe(1);
    expect(posisjon[6]?.veglenkeid).toBe(521066) ;

    expect(posisjon[7]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m7237");
    expect(posisjon[7]?.vegsystemreferanse).toBe("EV18 S22D1 m0");
    expect(posisjon[7]?.relativPosisjon).toBe(1);
    expect(posisjon[7]?.veglenkeid).toBe(521066) ;

    expect(posisjon[8]?.beregnetVegreferanse).toBe( "0800 EV18 hp1 m0");
    expect(posisjon[8]?.vegsystemreferanse).toBe("EV18 S22D1 m0");
    expect(posisjon[8]?.relativPosisjon).toBe(1);
    expect(posisjon[8]?.veglenkeid).toBe(521066) ;

    expect(posisjon[9]?.beregnetVegreferanse).toBe( "0800 EA18 hp1 m0");
    expect(posisjon[9]?.vegsystemreferanse).toBe("EV18 S28D1 m10243");
    expect(posisjon[9]?.relativPosisjon).toBe(0);
    expect(posisjon[9]?.veglenkeid).toBe(2014346) ;

    expect(posisjon[10]?.beregnetVegreferanse).toBe( "0800 EV18 hp1 m0");
    expect(posisjon[10]?.vegsystemreferanse).toBe("EV18 S28D1 m10243");
    expect(posisjon[10]?.relativPosisjon).toBe(0);
    expect(posisjon[10]?.veglenkeid).toBe(2014346) ;

    expect(posisjon[11]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m10240");
    expect(posisjon[11]?.vegsystemreferanse).toBe("EV18 S28D1 m10243");
    expect(posisjon[11]?.relativPosisjon).toBe(0);
    expect(posisjon[11]?.veglenkeid).toBe(2014346) ;
},  { timeout: 15000 })


test("Verify lookup of ev18hp1m200", async () => {

    const posisjon = await vegrefcontroller.findPosisjonerByVegreferanse(Vegreferanse.createFromString("0800ev18hp1m200"));
    posisjon.sort((a, b) => {
        if (a.veglenkeid !== b.veglenkeid) {
            return a.veglenkeid - b.veglenkeid;
        }
        const dateA = new Date(a.fraDato).getTime();
        const dateB = new Date(b.fraDato).getTime();
        return dateA - dateB;
    })

    expect(posisjon.length).toBe(12);

    expect(posisjon[0]?.beregnetVegreferanse).toBe( "0800 EV18 hp1 m200");
    expect(posisjon[0]?.vegsystemreferanse).toBe("FV2962 S2D1 m200");
    expect(posisjon[0]?.relativPosisjon).toBeCloseTo(0.02011, 3) ;
    expect(posisjon[0]?.veglenkeid).toBe(521064) ;

    expect(posisjon[1]?.beregnetVegreferanse).toBe( "0800 ET18 hp1 m200");
    expect(posisjon[1]?.vegsystemreferanse).toBe("FV2962 S2D1 m200");
    expect(posisjon[1]?.relativPosisjon).toBeCloseTo(0.02011, 3) ;
    expect(posisjon[1]?.veglenkeid).toBe(521064) ;

    expect(posisjon[2]?.beregnetVegreferanse).toBe( "0800 FV30 hp1 m200");
    expect(posisjon[2]?.vegsystemreferanse).toBe("FV2962 S2D1 m200");
    expect(posisjon[2]?.relativPosisjon).toBeCloseTo(0.02011, 3) ;
    expect(posisjon[2]?.veglenkeid).toBe(521064) ;

    expect(posisjon[3]?.beregnetVegreferanse).toBe( "0800 FV30 hp1 m200");
    expect(posisjon[3]?.vegsystemreferanse).toBe("FV2962 S2D1 m200");
    expect(posisjon[3]?.relativPosisjon).toBeCloseTo(0.02011, 3) ;
    expect(posisjon[3]?.veglenkeid).toBe(521064) ;

    expect(posisjon[4]?.beregnetVegreferanse).toBe( "0800 FV2962 hp2 m200");
    expect(posisjon[4]?.vegsystemreferanse).toBe("FV2962 S2D1 m200");
    expect(posisjon[4]?.relativPosisjon).toBeCloseTo(0.02011, 3) ;
    expect(posisjon[4]?.veglenkeid).toBe(521064) ;

    expect(posisjon[5]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m7235");
    expect(posisjon[5]?.vegsystemreferanse).toBe("EV18 S22D1 m0");
    expect(posisjon[5]?.relativPosisjon).toBeCloseTo(0.972, 2);
    expect(posisjon[5]?.veglenkeid).toBe(521066) ;

    expect(posisjon[6]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m7235");
    expect(posisjon[6]?.vegsystemreferanse).toBe("EV18 S22D1 m0");
    expect(posisjon[6]?.relativPosisjon).toBeCloseTo(0.972, 2);
    expect(posisjon[6]?.veglenkeid).toBe(521066) ;

    expect(posisjon[7]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m7237");
    expect(posisjon[7]?.vegsystemreferanse).toBe("EV18 S22D1 m0");
    expect(posisjon[7]?.relativPosisjon).toBeCloseTo(0.972, 2);
    expect(posisjon[7]?.veglenkeid).toBe(521066) ;

    expect(posisjon[8]?.beregnetVegreferanse).toBe( "0800 EV18 hp1 m200");
    expect(posisjon[8]?.vegsystemreferanse).toBe("EV18 S22D1 m200");
    expect(posisjon[8]?.relativPosisjon).toBeCloseTo(0.972, 2);
    expect(posisjon[8]?.veglenkeid).toBe(521066) ;

    expect(posisjon[9]?.beregnetVegreferanse).toBe( "0800 EA18 hp1 m10043");
    expect(posisjon[9]?.vegsystemreferanse).toBe("EV18 S28D1 m10043");
    expect(posisjon[9]?.relativPosisjon).toBeCloseTo(0.1075, 4);
    expect(posisjon[9]?.veglenkeid).toBe(2014346) ;

    expect(posisjon[10]?.beregnetVegreferanse).toBe( "0800 EV18 hp1 m10043");
    expect(posisjon[10]?.vegsystemreferanse).toBe("EV18 S28D1 m10043");
    expect(posisjon[10]?.relativPosisjon).toBeCloseTo(0.1075, 4);
    expect(posisjon[10]?.veglenkeid).toBe(2014346) ;

    expect(posisjon[11]?.beregnetVegreferanse).toBe( "0800 EV18 hp9 m10043");
    expect(posisjon[11]?.vegsystemreferanse).toBe("EV18 S28D1 m10043");
    expect(posisjon[11]?.relativPosisjon).toBeCloseTo(0.1075, 4);
    expect(posisjon[11]?.veglenkeid).toBe(2014346) ;
},  { timeout: 15000 })
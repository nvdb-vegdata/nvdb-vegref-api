import {expect, test} from 'bun:test';
import {VegrefController} from "../src/vegrefController.ts";

var vegrefcontroller = new VegrefController();

test("Verify correct response link lookup of 0.86004074@521066", async () => {
    const posisjon = await vegrefcontroller.findPosisjonerByLenkesekvens(521066, 0.86004074);
    posisjon.sort((a, b) => new Date(a.fraDato).getTime() - new Date(b.fraDato).getTime());

    expect(posisjon.length).toBe(4);
    expect(posisjon[0]?.beregnetVegreferanse).toBe("0800 EV18 hp9 m6236");
    expect(posisjon[0]?.fraDato).toBe("1950-01-01");
    expect(posisjon[0]?.relativPosisjon).toBe("0.86004074@521066")

    expect(posisjon[1]?.beregnetVegreferanse).toBe("0800 EV18 hp9 m6236");
    expect(posisjon[1]?.fraDato).toBe("2015-10-15");
    expect(posisjon[1]?.relativPosisjon).toBe("0.86004074@521066")

    expect(posisjon[2]?.beregnetVegreferanse).toBe("0800 EV18 hp9 m6237");
    expect(posisjon[2]?.fraDato).toBe("2016-06-30");
    expect(posisjon[2]?.relativPosisjon).toBe("0.86004074@521066")

    expect(posisjon[3]?.beregnetVegreferanse).toBe("0800 EV18 hp1 m1000");
    expect(posisjon[3]?.fraDato).toBe("2019-10-10");
    expect(posisjon[3]?.relativPosisjon).toBe("0.86004074@521066")

});



test("Verify correct response link lookup of 0.97171054113006394@1060716 ", async () => {
    const posisjon = await vegrefcontroller.findPosisjonerByLenkesekvens(1060716, 0.97171054113006394);
    posisjon.sort((a, b) => new Date(a.fraDato).getTime() - new Date(b.fraDato).getTime());

    expect(posisjon.length).toBe(3);
    expect(posisjon[0]?.beregnetVegreferanse).toBe( "0500 FV132 hp2 m7947");
    expect(posisjon[0]?.fraDato).toBe("1950-01-01");
    expect(posisjon[0]?.relativPosisjon).toBe("0.97171054@1060716")

    expect(posisjon[1]?.beregnetVegreferanse).toBe( "0500 FV132 hp2 m7952");
    expect(posisjon[1]?.fraDato).toBe("2019-01-01");
    expect(posisjon[1]?.relativPosisjon).toBe("0.97171054@1060716")

    expect(posisjon[2]?.beregnetVegreferanse).toBe("0500 FV2388 hp2 m7952");
    expect(posisjon[2]?.fraDato).toBe("2019-06-19");
    expect(posisjon[2]?.relativPosisjon).toBe("0.97171054@1060716")

});

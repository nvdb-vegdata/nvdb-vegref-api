import {test, expect} from 'bun:test';
import {VegrefController} from "../src/vegrefController.ts";
import {VegreferanseService} from "../src/vegrefService.ts";

const vegrefservice = new VegreferanseService();
vegrefservice.setBaseUrl("https://ugyldigurl.com/vegref/v2");

var vegrefcontroller = new VegrefController();

test("Verify lookup of ev18s1d1m0", async () => {
    try {
        await vegrefcontroller.findPosisjonerByVegsystemreferanse("ev18s1d1m0");
        throw new Error("Expected error was not thrown");
    } catch (error) {
        expect(error).toBeDefined();
    }
});


test("Verify lookup of 0.8@123", async () => {
    try {
        await vegrefcontroller.findPosisjonerByLenkesekvens(123, 0.8);
        throw new Error("Expected error was not thrown");
    } catch (error) {
        expect(error).toBeDefined();
    }
});


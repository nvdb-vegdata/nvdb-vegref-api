import {expect, test} from 'bun:test';
import type {Posisjon} from "../nvdbTypes.ts";
import * as fs from "node:fs";

test("integration with lenkesekvens.json", async () => {
    const posisjon: Posisjon = JSON.parse(fs.readFileSync("tests-data/posisjon-vegsystemreferanse.json", "utf-8"));

    expect(posisjon.veglenkesekvens.kortform).toBeDefined();
    expect(posisjon.vegsystemreferanse.kortform).toBeDefined();

});
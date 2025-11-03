import type {Vegobjekt} from "./nvdbTypes.ts";
import {Vegkategori, Vegstatus} from "./vegreferanseEnums.ts";

export class MapperClass {
    static toVegreferanse(vegobjekt: Vegobjekt) {
        const vegkategori = vegobjekt.egenskaper.find(e => e.id === 4566);
        const vegstatus = vegobjekt.egenskaper.find(e => e.id === 4567);
        const vegnummer = vegobjekt.egenskaper.find(e => e.id === 4568);
        const parsell = vegobjekt.egenskaper.find(e => e.id === 4569);
        const fylke = vegobjekt.egenskaper.find(e => e.id === 4591);
        const kommune = vegobjekt.egenskaper.find(e => e.id === 4592);
        const meter = vegobjekt.egenskaper.find(e => e.id === 4571);


        return ""
            + fylke?.verdi?.toString().padStart(2, "0")
            + kommune?.verdi?.toString().padStart(2, "0")
            + (vegkategori?.enum_id === undefined ? "" : Vegkategori[vegkategori.enum_id])
            + (vegstatus?.enum_id === undefined ? "" : Vegstatus[vegstatus.enum_id])
            + vegnummer?.verdi
            + " hp" + parsell?.verdi + " m" + meter?.verdi;
    }
}
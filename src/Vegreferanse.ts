import { Vegkategori, Vegstatus } from './vegreferanseEnums.ts';

export class Vegreferanse {
    vegkategori: Vegkategori;
    vegstatus: Vegstatus;
    vegnummer: number;
    fylke: number;
    kommune: number;
    meter: number;
    parsell: number;  /* 1-49 (hovedparsell), 50-69 (Armer), 70-199 (Ramper), 400-599 (Rundkjøringer),
                         600-699 (Skjøteparsell), 800-998 (Trafikklommer, rasteplasser) */

    static createFromString(vegreferanse: String) {
        const vegrefMatch = vegreferanse.match(/^(\d{4})([a-zA-Z])([a-zA-Z])(\d+)hp(\d+)m(\d+)$/);
        if (vegrefMatch === null
            || vegrefMatch[1] === undefined
            || vegrefMatch[2] === undefined
            || vegrefMatch[3] === undefined
            || vegrefMatch[4] === undefined
            || vegrefMatch[5] === undefined
            || vegrefMatch[6] === undefined
        ) {
            throw new Error(`Unknown vegref match: ${vegreferanse}`);
        }
        return new Vegreferanse(
            Number(vegrefMatch[1].substring(0, 2)),
            Number(vegrefMatch[1].substring(2, 4)),
            Vegkategori[vegrefMatch[2].toUpperCase() as keyof typeof Vegkategori],
            Vegstatus[vegrefMatch[3].toUpperCase() as keyof typeof Vegstatus],
            Number(vegrefMatch[4]),
            Number(vegrefMatch[5]),
            Number(vegrefMatch[6]));
    }


    private constructor(
        fylke: number,
        kommune: number,
        vegkategori: Vegkategori,
        status: Vegstatus,
        vegnummer: number,
        hp: number,
        meter: number
    ) {
        this.fylke = fylke;
        this.kommune = kommune;
        this.vegkategori = vegkategori;
        this.vegstatus = status;
        this.vegnummer = vegnummer;
        this.parsell = hp;
        this.meter = meter;
        this.meter = meter;
    }
}
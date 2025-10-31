import { Vegkategori, Vegstatus } from './vegreferanseEnums';

const url = "https://nvdbapiles.atlas.vegvesen.no/vegobjekter/532";


class Vegreferanse {
    vegkategori: Vegkategori;
    vegstatus: Vegstatus;
    vegnummer: number;
    fylke: number;
    kommune: number;
    parsell: number;  /* 1-49 (hovedparsell), 50-69 (Armer), 70-199 (Ramper), 400-599 (Rundkjøringer),
                         600-699 (Skjøteparsell), 800-998 (Trafikklommer, rasteplasser) */
    meter: number;

    constructor(vegreferanse: String) {
        const vegrefMatch = vegreferanse.match(/^(\d{4})([a-zA-Z])([a-zA-Z])(\d+)hp(\d+)m(\d+)$/);
        if (vegrefMatch === null) {
            throw new Error(`Unknown vegref match: ${vegreferanse}`);
        }
        this.fylke = Number(vegrefMatch[1].substring(0, 2));
        this.kommune = Number(vegrefMatch[1].substring(2, 4));
        this.vegkategori = Vegkategori[vegrefMatch[2].toUpperCase() as keyof typeof Vegkategori];
        this.vegstatus = Vegstatus[vegrefMatch[3].toUpperCase() as keyof typeof Vegstatus];
        this.vegnummer = Number(vegrefMatch[4]);
        this.parsell = Number(vegrefMatch[5]);
        this.meter = Number(vegrefMatch[6]);
    }
}


export const fetchHistoricVegreferanse = async (vegreferanse: String): Promise<any> => {

    const vegref = new Vegreferanse(vegreferanse);

    const params = new URLSearchParams({
        segmentering: "true",
        tidspunkt: "2010-01-01",
        inkluder: "egenskaper,lokasjon",
        egenskap:
            `(4566=${vegref.vegkategori})`
            + `AND(4567=${vegref.vegstatus})`
            + `AND(4568=${vegref.vegnummer})`
            + `AND(4569=${vegref.parsell})`
            + `AND(4571<${vegref.meter})AND(4572>${vegref.meter})`
            + `AND(4591=${vegref.fylke})`
            + `AND(4592=${vegref.kommune})`
    });

    console.log(`Fetching vegreferanse vegobjekter for URL: ${url}?${params}`);
    try {
        const response = await fetch(`${url}?${params.toString()}`, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Error fetching vegobjekter:", error);
        throw error;
    }
};

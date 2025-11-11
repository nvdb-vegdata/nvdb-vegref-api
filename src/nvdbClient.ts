import {Vegreferanse} from "./Vegreferanse.ts";
import type {Posisjon, VegobjektResponse} from "./nvdbTypes.ts";

// const baseUrl = "https://nvdbapiles.utv.atlas.vegvesen.no"
const baseUrl = "http://localhost:8080";

export const fetchHistoricVegreferanse = async (vegreferanse: Vegreferanse, tidspunkt?: Date): Promise<VegobjektResponse> => {
    const url = baseUrl + "/vegobjekter/532";

    const params = new URLSearchParams({
        segmentering: "true",
        inkluder: "egenskaper,lokasjon",
        ...(tidspunkt
            ? {tidspunkt: tidspunkt.toISOString().slice(0, 10)}
            : {alle_versjoner: "true"}),
        egenskap:
            `(4566=${vegreferanse.vegkategori})`
            + `AND(4567=${vegreferanse.vegstatus})`
            + `AND(4568=${vegreferanse.vegnummer})`
            + `AND(4569=${vegreferanse.parsell})`
            + `AND(4571<${vegreferanse.meter + 1})`
            + `AND(4572>${vegreferanse.meter - 1})`
            + `AND(4591=${vegreferanse.fylke})`
            + `AND(4592=${vegreferanse.kommune})`
    });

    console.log(`Fetching historic road object (typeid=532) from: ${url}?${params}`);

    const response = await fetch(`${url}?${params.toString()}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if (!response.ok) {
        console.log("Response not ok:", response.status, response.statusText);
        return {
            objekter: [],
            metadata: {
                antallTreffTotalt: 0,
                antallTreffPerSide: 0,
                side: 0,
                antallSider: 0
            },
        } as VegobjektResponse;
    }

    return await response.json() as VegobjektResponse;
};

export const fetchVegsystemReferanse = async (veglenkesekvensid: number, position: number) => {

    const url = baseUrl + "/veg";

    const params = new URLSearchParams({
        veglenkesekvens: `${position}@${veglenkesekvensid}`
    });

    console.log(`Fetching current road position (vegsystemreferanse) from: ${url}?${params}`);

    const response = await fetch(`${url}?${params.toString()}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if (!response.ok) {
        console.log("Response not ok:", response.status, response.statusText);
        return undefined;
    }
    return await response.json() as Posisjon;
};


export const fetchPosisjon = async (vegsystemreferanse: String) => {

    const url = baseUrl + "/veg";

    const params = new URLSearchParams({
        vegsystemreferanse: `${vegsystemreferanse}`
    });

    console.log(`Fetching current road position (vegsystemreferanse) from: ${url}?${params}`);

    const response = await fetch(`${url}?${params.toString()}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if (!response.ok) {
        console.log("Response not ok:", response.status, response.statusText);
        return undefined;
    }
    return await response.json() as Posisjon;
};


export const fetchHistoricVegreferanseFromPosition = async (veglenksekvensId : number, posisjon: number, tidspunkt?: Date) : Promise<VegobjektResponse> => {
    const url = baseUrl + "/vegobjekter/532";

    const params = new URLSearchParams({
        segmentering: "true",
        inkluder: "egenskaper,lokasjon,metadata",
        veglenkesekvens: `${posisjon}@${veglenksekvensId}`,
        ...(tidspunkt
            ? {tidspunkt: tidspunkt.toISOString().slice(0, 10)}
            : {alle_versjoner: "true"})
    });

    console.log(`Fetching historic road object (typeid=532) from: ${url}?${params} for veglenkesekvensId=${veglenksekvensId} at posisjon=${posisjon}`);

    const response = await fetch(`${url}?${params.toString()}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });

    if (!response.ok) {
        console.log("Response not ok:", response.status, response.statusText);
    }
    return await response.json() as VegobjektResponse;
}

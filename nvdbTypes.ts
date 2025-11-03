export type Egenskap = {
    egenskapstype: string;
    id: number;
    navn: string;
    verdi: string | number;
    enum_id?: number;
};

export type Geometri = {
    srid: number;
    wkt: string;
};

export type Veglenkesekvens = {
    veglenkesekvensid: number;
    relativPosisjon: number;
    kortform: string;
};

export type Strekning = {
    strekning: number;
    delstrekning: number;
    arm: boolean;
    adskilte_løp: string;
    trafikantgruppe: string;
    retning: string;
    meter: number;
}

export type Vegsystem = {
    vegkategori: string;
    fase: string;
    nummer: number;
}

export type Vegsystemreferanse = {
    vegsystem: Vegsystem;
    strekning?: Strekning;
    kortform?: string;
};

export type Posisjon = {
    vegsystemreferanse: Vegsystemreferanse;
    veglenkesekvens: Veglenkesekvens;
    geometri: Geometri;
    kommune: number;
}

export type Lokasjon = {
    kommuner: number[];
    fylker: number[];
    geometri: Geometri;
    vegsystemreferanser: Vegsystemreferanse[];
    stedfestinger: any[]; // Kan spesifiseres mer hvis ønskelig
};

export type Vegobjekt = {
    id: number;
    href: string;
    egenskaper: Egenskap[];
    lokasjon: Lokasjon;
};

export type Metadata = {
    antallTreffTotalt: number;
    antallTreffPerSide: number;
    side: number;
    antallSider: number;
}
export type VegobjektResponse = {
    objekter: Vegobjekt[];
    metadata: Metadata;
};



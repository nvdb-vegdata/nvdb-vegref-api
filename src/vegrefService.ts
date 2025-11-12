import {Vegreferanse} from './vegreferanse.ts'; // Hypothetical library for Vegreferanse handling
import {
    fetchHistoricVegreferanse,
    fetchHistoricVegreferanseByPosition,
    fetchPosisjonByVegsystemreferanse,
    fetchPositionByLenkeposisjon, fetchPositionByNordOst
} from './nvdbClient.ts';
import type {Posisjon, VegobjektResponse} from './nvdbTypes.ts';

export class VegreferanseService {

    /**
     * Service class for handling operations related to Vegreferanse.
     */
    async findVegreferanse(vegreferanse: Vegreferanse, tidspunkt?: Date): Promise<VegobjektResponse> {
        return await fetchHistoricVegreferanse(vegreferanse, tidspunkt);
    }

    async findPosisjonForVegsystemreferanse(vegsystemreferanse: string): Promise<Posisjon> {
        return fetchPosisjonByVegsystemreferanse(vegsystemreferanse)
    }

    async findHistoricVegreferanseByLenkeposisjon(veglenkeskvensid: number, posisjon: number, tidspunkt?: Date): Promise<VegobjektResponse> {
        return fetchHistoricVegreferanseByPosition(veglenkeskvensid, posisjon, tidspunkt);
    }

    async findVegsystemReferanseByLenkeposisjon(veglenkesekvensid: number, position: number): Promise<Posisjon> {
        return fetchPositionByLenkeposisjon(veglenkesekvensid, position);
    }

    async findPosisjonByNordOst(nord: number, ost: number): Promise<Posisjon[]> {
        return fetchPositionByNordOst(nord, ost);
    }
}


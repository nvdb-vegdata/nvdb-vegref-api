import {Vegreferanse} from './vegreferanse.ts'; // Hypothetical library for Vegreferanse handling
import {
    fetchHistoricVegreferanse,
    fetchHistoricVegreferanseByPosition,
    fetchPosisjonByVegsystemreferanse,
    fetchPositionByLenkeposisjon
} from './nvdbClient.ts';
import type {Posisjon, VegobjektResponse} from './nvdbTypes.ts';

export class VegreferanseService {

    /**
     * Service class for handling operations related to Vegreferanse.
     */
    async searchForVegreferanse(vegreferanse: Vegreferanse, tidspunkt?: Date): Promise<VegobjektResponse> {
        return await fetchHistoricVegreferanse(vegreferanse, tidspunkt);
    }

    async getPosisjonForVegsystemreferanse(vegsystemreferanse: string): Promise<Posisjon> {
        return fetchPosisjonByVegsystemreferanse(vegsystemreferanse)
    }

    async fetchHistoricVegreferanseByLenkeposisjon(veglenkeskvensid: number, posisjon: number, tidspunkt?: Date): Promise<VegobjektResponse> {
        return fetchHistoricVegreferanseByPosition(veglenkeskvensid, posisjon, tidspunkt);
    }

    async fetchVegsystemReferanseByLenkeposisjon(veglenkesekvensid: number, position: number): Promise<Posisjon> {
        return fetchPositionByLenkeposisjon(veglenkesekvensid, position);
    }
}


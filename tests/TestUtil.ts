export class TestUtil {

    // Sort function to order positions by veglenkeid and fraDato
    static sortPosisjonByVeglenkeidAndFraDato(a: any, b: any) {
        if (a.veglenkeid !== b.veglenkeid) {
            return a.veglenkeid - b.veglenkeid;
        }
        const dateA = new Date(a.fraDato).getTime();
        const dateB = new Date(b.fraDato).getTime();
        return dateA - dateB;
    }
}






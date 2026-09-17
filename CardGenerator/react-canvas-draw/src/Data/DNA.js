

// Adir Doe stats DNA: "AhBgSkXiVhRdbc"

const codeMap = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25,
    a: 26,
    b: 27,
    c: 28,
    d: 29,
    e: 30,
    f: 31,
    g: 32,
    h: 33,
    i: 34,
    j: 35,
    k: 36,
    l: 37,
    m: 38,
    n: 39,
    o: 40,
    p: 41,
    q: 42,
    r: 43,
    s: 44,
    t: 45,
    u: 46,
    v: 47,
    w: 48,
    x: 49,
    y: 50,
    z: 51,
    0: 52,
    1: 53,
    2: 54,
    3: 55,
    4: 56,
    5: 57,
    6: 58,
    7: 59,
    8: 60,
    9: 61,
    "-": 62,
    "_": 63,
};

const mapCodonToValue = {
    AAA: 0,
    AAT: 1,
    AAC: 2,
    AAG: 3,
    ATA: 4,
    ATT: 5,
    ATC: 6,
    ATG: 7,
    ACA: 8,
    ACT: 9,
    ACC: 10,
    ACG: 11,
    AGA: 12,
    AGT: 13,
    AGC: 14,
    AGG: 15,
    TAA: 16,
    TAT: 17,
    TAC: 18,
    TAG: 19,
    TTA: 20,
    TTT: 21,
    TTC: 22,
    TTG: 23,
    TCA: 24,
    TCT: 25,
    TCC: 26,
    TCG: 27,
    TGA: 28,
    TGT: 29,
    TGC: 30,
    TGG: 31,
    CAA: 32,
    CAT: 33,
    CAC: 34,
    CAG: 35,
    CTA: 36,
    CTT: 37,
    CTC: 38,
    CTG: 39,
    CCA: 40,
    CCT: 41,
    CCC: 42,
    CCG: 43,
    CGA: 44,
    CGT: 45,
    CGC: 46,
    CGG: 47,
    GAA: 48,
    GAT: 49,
    GAC: 50,
    GAG: 51,
    GTA: 52,
    GTT: 53,
    GTC: 54,
    GTG: 55,
    GCA: 56,
    GCT: 57,
    GCC: 58,
    GCG: 59,
    GGA: 60,
    GGT: 61,
    GGC: 62,
    GGG: 63,
}
const mapCodonToValueInt = {
    AAA: -31,
    AAT: -30,
    AAC: -29,
    AAG: -28,
    ATA: -27,
    ATT: -26,
    ATC: -25,
    ATG: -24,
    ACA: -23,
    ACT: -22,
    ACC: -21,
    ACG: -20,
    AGA: -19,
    AGT: -18,
    AGC: -17,
    AGG: -16,
    TAA: -15,
    TAT: -14,
    TAC: -13,
    TAG: -12,
    TTA: -11,
    TTT: -10,
    TTC: -9,
    TTG: -8,
    TCA: -7,
    TCT: -6,
    TCC: -5,
    TCG: -4,
    TGA: -3,
    TGT: -2,
    TGC: -1,
    TGG: 0,
    CAA: 1,
    CAT: 2,
    CAC: 3,
    CAG: 4,
    CTA: 5,
    CTT: 6,
    CTC: 7,
    CTG: 8,
    CCA: 9,
    CCT: 10,
    CCC: 11,
    CCG: 12,
    CGA: 13,
    CGT: 14,
    CGC: 15,
    CGG: 16,
    GAA: 17,
    GAT: 18,
    GAC: 19,
    GAG: 20,
    GTA: 21,
    GTT: 22,
    GTC: 23,
    GTG: 24,
    GCA: 25,
    GCT: 26,
    GCC: 27,
    GCG: 28,
    GGA: 29,
    GGT: 30,
    GGC: 31,
    GGG: 32,
}

const mapCodonToInstruction = {
    //base power
    AAA: (codon, data) => {
        data.incr("basePower", mapCodonToValueInt[codon]);
    },
    //rest cost
    AAT: (codon, data) => {
        data.incr("restCost", mapCodonToValueInt[codon]);
    },
    //biome bonus
    TAA: (codon, data) => {        
        data.incr("bm_Cloud", mapCodonToValueInt[codon]);
    },
    TAT: (codon, data) => {        
        data.incr("bm_Desert", mapCodonToValueInt[codon]);
    },
    TAC: (codon, data) => {        
        data.incr("bm_Forest", mapCodonToValueInt[codon]);
    },
    TAG: (codon, data) => {        
        data.incr("bm_Jungle", mapCodonToValueInt[codon]);
    },
    TTA: (codon, data) => {        
        data.incr("bm_Lake", mapCodonToValueInt[codon]);
    },
    TTT: (codon, data) => {        
        data.incr("bm_Mountain", mapCodonToValueInt[codon]);
    },
    TTC: (codon, data) => {        
        data.incr("bm_Ocean", mapCodonToValueInt[codon]);
    },
    TTG: (codon, data) => {        
        data.incr("bm_Plain", mapCodonToValueInt[codon]);
    },
    TCA: (codon, data) => {        
        data.incr("bm_Swamp", mapCodonToValueInt[codon]);
    },
    TCT: (codon, data) => {        
        data.incr("bm_Tundra", mapCodonToValueInt[codon]);
    },
    TCC: (codon, data) => {        
        data.incr("bm_Volcano", mapCodonToValueInt[codon]);
    },
    TCG: (codon, data) => {        
        data.incr("bm_Wasteland", mapCodonToValueInt[codon]);
    },

}


export class DNA {
    constructor() {
        this.code = "";
    }
}


    /**
     * Reads the DNA and returns a struct with info
     */
export function readDNA(code) {
    let data = {};
    data.init = (varName) => {
        if (data[varName] == undefined) {
            data[varName] = 0;
        }
    };
    data.incr = (varName, val) => {
        data.init(varName);
        if (val != undefined) {
            data[varName] += val;
        }
    };
        
    const numberCode = displayCodeToNumberCode(code);

    for (let i = 0; i < numberCode.length; i++) {
        const codon = numberCode[i];
        let instruction = mapCodonToInstruction[codon];
        if (instruction) {
            let valCodon = numberCode[i + 1];
            i++;
            instruction(valCodon, data);
            console.log(codon, "-- codon processed");
        }
        else {
            console.log(codon, "!! codon NOT found!");
        }
    }

    delete data.init;
    delete data.incr;
    return data;
}

function displayCodeToNumberCode(code) {
    let arrCodon = [];
    const mapBinToCodon = {
        "00": "A",
        "01": "T",
        "10": "C",
        "11": "G",
    }
    for (let i = 0; i < code.length; i++) {
        let char = code[i];
        let dec = codeMap[char];
        let bin = "" + Number(dec).toString(2);
        while (bin.length < 6) {
            bin = "0" + bin;
        }
        console.log("bin", bin);
        let codon = "";
        for (let j = 0; j < 3*2; j+=2) {
            codon += mapBinToCodon[bin[j] + bin[j+1]];
        }
        arrCodon.push(codon);
    }
    return arrCodon;
}
window.readDNA = readDNA;

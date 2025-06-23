export type QuestionId =
    | 'start'
    | 'rki'
    | 'products'
    | 'monthlyPrice'
    | 'importance'
    | 'possibleDelivery'
    | 'damages'
    | 'partnerS'
    | 'partnerL'
    | 'declined'
    | 'checkup';

export interface Option {
    text: string;
    next: QuestionId | null;
}

export interface Question {
    id: QuestionId;
    type: 'question' | 'result';
    question?: string;          // present only for 'question' type
    options?: Option[];         // present only for 'question' type
    title?: string;             // present only for 'result' type
    message?: string;           // present only for 'result' type
    buttonText?: string;        // present only for 'result' type
    next?: QuestionId | null;   // next step for results
}

export const questions: Record<QuestionId, Question> = {
    start: {
        id: 'start',
        type: 'question',
        question: 'Hvor længe har du været i dit nuværende forsikringsselskab?',
        options: [
            { text: 'Under 9 måneder', next: 'checkup' },
            { text: 'Over 9 måneder', next: 'rki' },
        ],
    },
    rki: {
        id: 'rki',
        type: 'question',
        question: 'Er du registreret i RKI?',
        options: [
            { text: 'Nej', next: 'products' },
            { text: 'Ja', next: 'declined' },
        ],
    },
    products: {
        id: 'products',
        type: 'question',
        question: 'Hvor mange forsikringsprodukter har du? (f.eks. bil, indbo, rejse, ulykke, ervherv mv.)',
        options: [
            { text: '1 produkt', next: 'partnerS' },
            { text: '2 eller flere', next: 'monthlyPrice' },
        ],
    },
    monthlyPrice: {
        id: 'monthlyPrice',
        type: 'question',
        question: 'Betaler du samlet mere end 1.000 kr. om måneden for dine forsikringer?',
        options: [
            { text: 'Under 1.000 kr.', next: 'partnerS' },
            { text: 'Over 1.000 kr.', next: 'importance' },
        ],
    },
    importance: {
        id: 'importance',
        type: 'question',
        question: 'Hvad er vigtigst for dig?',
        options: [
            { text: 'Billigere pris', next: 'possibleDelivery' },
            { text: 'Bedre dækning', next: 'possibleDelivery' },
        ],
    },
    possibleDelivery: {
        id: 'possibleDelivery',
        type: 'question',
        question: 'Hvis vi kan give dig hvad du prioriterer er du så villig til at skifte forsikring?',
        options: [
            { text: 'Nej', next: 'partnerS' },
            { text: 'Ja', next: 'damages' },
        ],
    },
    damages: {
        id: 'damages',
        type: 'question',
        question: 'Hvor mange skader har du haft pr. forsikringsprodukt de sidste 3 år?',
        options: [
            { text: '0 skader', next: 'partnerL' },
            { text: '1-2 skader', next: 'partnerL' },
            { text: '3 eller flere', next: 'partnerS' },
        ],
    },


    partnerS: {
        id: 'partnerS',
        type: 'result', // custom field so your UI knows it's not a question
        title: 'Vi har fundet et tilbud til dig!',
        message: 'Vi matcher dig med en af vores partnere baseret på dine svar.',
        buttonText: 'Kom i kontakt',
        next: null,
    },
    partnerL: {
        id: 'partnerL',
        type: 'result',
        title: 'Du er en perfekt kandidat!',
        message: 'Vi har en stærk løsning klar til dig hos en af vores hovedpartnere.',
        buttonText: 'Kom i kontakt',
        next: null,
    },
    declined: {
        id: 'declined',
        type: 'result',
        title: 'Tak for din interesse!',
        message: 'Du opfylder desværre ikke vores kriterier lige nu.',
        buttonText: 'Afslut',
        next: null,
    },
    checkup: {
        id: 'checkup',
        type: 'result',
        title: 'Tak for din interesse!',
        message: 'Du bedes venligst om at kontakte dit forsikringsselskab og tjekke op på om du er bundet og vende tilbage til os efterføglende.',
        buttonText: 'Afslut',
        next: null,
    },
};
export type QuestionId =
    | 'name'
    | 'rki'
    | 'duration'
    | 'whenChanged'
    | 'carInsurance'
    | 'livingCondition'
    | 'damages'
    | 'monthlyPrice'
    | 'importance'
    | 'currentInsurance'
    | 'age1' | 'age2' | 'age3'
    | 'phoneS' | 'phoneL'
    | 'additionalS' | 'additionalL'
    | 'partnerS' | 'partnerL'
    | 'declined'
    | 'checkup';

export interface Option {
    text: string;
    next: QuestionId | null;
}

export interface Question {
    id: QuestionId;
    type: 'question' | 'questionTextInput' | 'result' | 'form';
    question?: string;            // present only for 'question' type
    options?: Option[];           // present only for 'question' type
    textInputOption?: string  // present only for 'questionTextInput' type
    textInputNext?: QuestionId;  // present only for 'questionTextInput' type
    title?: string;               // present only for 'result' type
    message?: string;             // present only for 'result' type
    buttonText?: string;          // present only for 'result' type
    next?: QuestionId | null;    // next step for results
}

export const questions: Record<QuestionId, Question> = {
    name: {
        id: 'name',
        type: 'form',
        question: 'Hvad er dit Navn?',
        textInputNext: 'rki'
    },
    rki: {
        id: 'rki',
        type: 'question',
        question: 'Er du registreret i RKI?',
        options: [
            { text: 'Nej', next: 'duration' },
            { text: 'Ja', next: 'declined' },
        ],
    },
    duration: {
        id: 'duration',
        type: 'question',
        question: 'Hvor længe har du været i dit nuværende forsikringsselskab?',
        options: [
            { text: 'Over 9 måneder', next: 'carInsurance' },
            { text: 'Under 9 måneder', next: 'whenChanged' },
        ],
    },
    whenChanged: {
        id: 'whenChanged',
        type: 'question',
        question: 'Hvornår skiftede du forsikringsselskab?',
        options: [
            { text: '0-1 måned (Jeg har ikke nået at betale min første regning endnu)', next: 'carInsurance' },
            { text: '2-5 måneder', next: 'carInsurance' },
            { text: '6-9 måneder', next: 'carInsurance' },
        ],
    },

    carInsurance: {
        id: 'carInsurance',
        type: 'questionTextInput',
        question: 'Har du en bilforsikring?',
        options: [
            { text: 'Nej', next: 'livingCondition' },
        ],
        textInputOption: 'Ja',
        textInputNext: 'livingCondition'
    },
    livingCondition: {
        id: 'livingCondition',
        type: 'question',
        question: 'Hvordan bor du?',
        options: [
            { text: 'Hus', next: 'damages' },
            { text: 'Lejlighed', next: 'damages' },
            { text: 'Andet', next: 'damages' },
        ],
    },

    damages: {
        id: 'damages',
        type: 'question',
        question: 'Hvor mange skader har du haft de sidste 3 år?',
        options: [
            { text: '0', next: 'monthlyPrice' },
            { text: '1-2', next: 'monthlyPrice' },
            { text: '3+', next: 'monthlyPrice' },
        ],
    },
    monthlyPrice: {
        id: 'monthlyPrice',
        type: 'question',
        question: 'Hvor meget betaler du månedligt?',
        options: [
            { text: 'Under 1.000 kr.', next: 'importance' },
            { text: 'Over 1.000 kr.', next: 'importance' },
        ],
    },
    importance: {
        id: 'importance',
        type: 'question',
        question: 'Hvad er vigtigst for dig?',
        options: [
            { text: 'Pris', next: 'currentInsurance' },
            { text: 'Dækning', next: 'currentInsurance' },
        ],
    },
    currentInsurance: {
        id: 'currentInsurance',
        type: 'questionTextInput',
        question: 'Hvilket forsikringsselskab har du i dag?',
        options: [
            {
                text: `IF
                Topdanmark`, next: 'age1'
            },

            {
                text: `Alm. brand
                 Codan`, next: 'age2'
            },

            {
                text: `TRYG
                Alka
                FDM`, next: 'age3'
            },
            {
                text: `Forsia
                Gjensidige`, next: 'age3'
            },

        ],
        textInputOption: 'Øvrige',
        textInputNext: 'age3'

    },
    age1: {
        id: 'age1',
        type: 'question',
        question: 'Hvor gammel er du?',
        options: [
            { text: '18-22', next: 'phoneS' },
            { text: '23+', next: 'phoneS' },
        ],
    },
    age2: {
        id: 'age2',
        type: 'question',
        question: 'Hvor gammel er du?',
        options: [
            { text: '18-22', next: 'phoneL' },
            { text: '23+', next: 'phoneL' },
        ],
    },
    age3: {
        id: 'age3',
        type: 'question',
        question: 'Hvor gammel er du?',
        options: [
            { text: '18-22', next: 'phoneS' },
            { text: '23+', next: 'phoneL' },
        ],
    },
    phoneS: {
        id: 'phoneS',
        type: 'form',
        question: 'Hvad er dit Telefonnummer?',
        textInputNext: 'additionalS'
    },
    phoneL: {
        id: 'phoneL',
        type: 'form',
        question: 'Hvad er dit Telefonnummer?',
        textInputNext: 'additionalL'
    },
    additionalS: {
        id: 'additionalS',
        type: 'form',
        question: 'Øvrig info (f.eks. har du erhvervsforsikring)',
        textInputNext: 'partnerS'
    },
    additionalL: {
        id: 'additionalL',
        type: 'form',
        question: 'Øvrig info (f.eks. har du erhvervsforsikring)',
        textInputNext: 'partnerL'
    },



    partnerS: {
        id: 'partnerS',
        type: 'result', // custom field so your UI knows it's not a question
        title: 'Du er en perfekt kandidat!',
        message: 'Vi har en stærk løsning klar til dig i vores netværk.',
        buttonText: 'Kom i kontakt',
        next: null,
    },
    partnerL: {
        id: 'partnerL',
        type: 'result',
        title: 'Du er en perfekt kandidat!',
        message: 'Vi har en stærk løsning klar til dig i vores netværk.',
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
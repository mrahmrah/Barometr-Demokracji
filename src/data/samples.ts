export interface Sample {
    id: string;
    title: string;
    tag: string;
    text: string;
}

export const samples: Sample[] = [
    {
        id: "populism-1",
        title: "Przemówienie Populistyczne",
        tag: "Populizm",
        text: "Wszyscy ci zdrajcy narodu muszą zostać rozliczeni! Tylko my dbamy o prawdziwych Polaków, a reszta to marionetki obcych mocarstw. Czas skończyć z dyktatem Brukseli i oddać władzę w ręce ludu!"
    },
    {
        id: "human-rights-1",
        title: "Artykuł o Prawach Człowieka",
        tag: "Inkluzywność",
        text: "Demokracja to nie tylko rządy większości, ale przede wszystkim ochrona mniejszości. Każdy człowiek, bez względu na pochodzenie czy orientację, zasługuje na pełnię praw obywatelskich i szacunek w debacie publicznej."
    },
    {
        id: "economy-1",
        title: "Debata o Gospodarce",
        tag: "Logika/Erystyka",
        text: "Jeżeli nie wprowadzimy tych podatków dzisiaj, to jutro całe państwo zbankrutuje. Kto twierdzi inaczej, ten po prostu nie rozumie podstaw ekonomii i działa na szkodę własnej rodziny."
    }
];

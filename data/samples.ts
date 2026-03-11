export interface AnalysisSample {
  id: string;
  category: 'populism' | 'eristic' | 'hate_speech' | 'neutral' | 'democracy_manifesto' | 'nuanced_manipulation';
  title: string;
  content: string;
  description: string;
}

export const samples: AnalysisSample[] = [
  {
    id: "sample-1",
    category: "populism",
    title: "Głos Prawdziwego Narodu",
    content: "Drodzy rodacy, dość już dyktatu elit! Oni piją szampana w luksusowych restauracjach, podczas gdy my każdego dnia martwimy się o rosnące rachunki. Obiecuję wam: jak tylko dojdziemy do władzy, zlikwidujemy wszystkie te zbędne podatki, które idą na astronomiczne pensje urzędników z zagranicy. To my jesteśmy prawdziwym narodem i my wiemy, co dla nas najlepsze, a nie jacyś samozwańczy mędrcy z dalekich stolic, którzy od lat nas okradają.",
    description: "Klasyczny przykład narracji populistycznej: podział na 'my' (lud) i 'oni' (złe elity), obietnica prostych rozwiązań skomplikowanych problemów oraz silny ładunek emocjonalny."
  },
  {
    id: "sample-2",
    category: "eristic",
    title: "Debata o Zieleni Miejskiej",
    content: "Mój oponent twierdzi, że powinniśmy zwiększyć nakłady na zieleń miejską. To typowe dla kogoś, kto chce, żeby całe miasto zarosło chwastami i stało się siedliskiem komarów! Zamiast dbać o drogi, on woli sadzić kwiatki. Czy naprawdę chcecie, żeby wasze ciężko zarobione pieniądze szły na dżunglę zamiast na bezpieczne chodniki? Poza tym, co on może wiedzieć o urbanistyce, skoro sam mieszka w luksusowym apartamentowcu ogrodzonym płotem?",
    description: "Tekst nasycony błędami logicznymi: 'strawman' (przeinaczenie argumentu o zieleni w wizję zachwaszczonego miasta) oraz 'ad hominem' (atak na styl życia oponenta zamiast merytorycznej dyskusji)."
  },
  {
    id: "sample-3",
    category: "hate_speech",
    title: "Ostrzeżenie przed Obcymi",
    content: "Ci ludzie to nie są goście, to pasożyty, które chcą wyssać z naszego kraju ostatnie soki. Przynoszą tylko choroby, nieporządek i prymitywne zwyczaje. Musimy ich wszystkich natychmiast wyrzucić, zanim całkowicie zniszczą naszą kulturę i tradycje, na które pracowały pokolenia. Dla takich istot nie ma miejsca w naszym cywilizowanym, czystym społeczeństwie. Albo oni, albo my!",
    description: "Mowa nienawiści wykorzystująca dehumanizację (porównanie do pasożytów), straszenie chorobami i upadkiem kultury. Zawiera również fałszywą dychotomię."
  },
  {
    id: "sample-4",
    category: "neutral",
    title: "Kwartalny Raport Gospodarczy",
    content: "W dzisiejszym raporcie urzędu statystycznego odnotowano wzrost stopy bezrobocia o 0,2 punktu procentowego w skali miesiąca. Według analityków, główną przyczyną tego zjawiska jest sezonowe spowolnienie w sektorze budowlanym oraz turystycznym, co jest zjawiskiem cyklicznym. Jednocześnie inflacja pozostała na poziomie zbliżonym do ubiegłego kwartału, wynosząc 2,5% rok do roku, co mieści się w celu inflacyjnym banku centralnego.",
    description: "Tekst neutralny, oparty na twardych danych i faktach. Brak przymiotników wartościujących, obiektywny ton i przywołanie opinii ekspertów bez zabarwienia emocjonalnego."
  },
  {
    id: "sample-5",
    category: "democracy_manifesto",
    title: "Manifest Wspólnego Państwa",
    content: "Fundamentem naszego społeczeństwa jest wzajemny szacunek i bezwzględne poszanowanie praw każdego obywatela, niezależnie od jego poglądów, wyznania czy pochodzenia. Wolne media, niezależne sądy i pełna przejrzystość działań władzy to nie przywileje polityków, ale bezpieczniki naszej wspólnej wolności. Demokracja to nie tylko rządy większości; to przede wszystkim ochrona mniejszości i prawo do konstruktywnego sprzeciwu, który jest motorem postępu.",
    description: "Tekst promujący wartości demokratyczne: pluralizm, trójpodział władzy i ochronę praw mniejszości. Definiuje demokrację jako system ochrony wolności jednostki."
  },
  {
    id: "sample-6",
    category: "nuanced_manipulation",
    title: "Bezpieczeństwo Ponad Wszystko",
    content: "Wszyscy pragniemy bezpieczeństwa dla naszych dzieci i rodzin, prawda? To potrzeba fundamentalna. Dlatego też wprowadzenie nowego państwowego systemu nadzoru elektronicznego wydaje się jedyną rozsądną i odpowiedzialną drogą w tych niepewnych czasach pełnych zagrożeń. Oczywiście wolność słowa i prywatność są ważne, ale co nam po wolności, gdy nie możemy czuć się bezpiecznie we własnych domach? Każdy uczciwy obywatel, który nie ma nic do ukrycia, z pewnością nie powinien obawiać się tych zmian.",
    description: "Subtelna manipulacja oparta na fałszywej alternatywie (bezpieczeństwo albo wolność) i wywoływaniu presji społecznej ('każdy uczciwy człowiek nie ma się czego bać'). Atakuje emocjonalną potrzebę bezpieczeństwa."
  }
];

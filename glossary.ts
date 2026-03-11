export interface GlossaryTerm {
    term: string;
    definition: string;
    example: string;
    category: 'demokracja' | 'manipulacja' | 'prawa_czlowieka' | 'erystyka';
}

export const glossary: GlossaryTerm[] = [
    {
        term: 'Dychotomia',
        definition: 'Podział na dwie, zazwyczaj wzajemnie wykluczające się części. W manipulacji często używana do budowania narracji "my vs oni".',
        example: '"Albo jesteś z nami, albo jesteś wrogiem narodu."',
        category: 'manipulacja'
    },
    {
        term: 'Erystyka',
        definition: 'Sztuka prowadzenia sporów w taki sposób, aby wygrać bez względu na to, po czyjej stronie leży prawda.',
        example: 'Stosowanie chwytów retorycznych zamiast merytorycznych argumentów podczas debaty.',
        category: 'erystyka'
    },
    {
        term: 'Populizm',
        definition: 'Zjawisko polityczne polegające na odwoływaniu się do woli "zwykłych ludzi", często przeciwstawianych rzekomo skorumpowanym elitom.',
        example: '"Odbierzemy przywileje kastom i oddamy pieniądze ciężko pracującym rodzinom!"',
        category: 'demokracja'
    },
    {
        term: 'Język inkluzywny',
        definition: 'Sposób komunikacji, który dąży do włączenia wszystkich grup społecznych i unikania wykluczania kogokolwiek.',
        example: 'Używanie form "osoby studiujące" zamiast tylko "studenci".',
        category: 'prawa_czlowieka'
    },
    {
        term: 'Prawa człowieka',
        definition: 'Zbiór praw i wolności przysługujących każdemu człowiekowi od urodzenia.',
        example: 'Prawo do życia, wolność od tortur, prawo do rzetelnego procesu.',
        category: 'prawa_czlowieka'
    },
    {
        term: 'Demagogia',
        definition: 'Wpływanie na opinię publiczną przez odwoływanie się do emocji, lęków i uprzedzeń.',
        example: 'Straszenie wybuchem wojny domowej w przypadku przegranej w wyborach.',
        category: 'manipulacja'
    },
    {
        term: 'Argumentum ad personam',
        definition: 'Atakowanie cech osobistych rozmówcy zamiast jego argumentów.',
        example: '"Jak możesz mówić o gospodarce, skoro nie potrafisz nawet zadbać o własny wygląd?"',
        category: 'erystyka'
    },
    {
        term: 'Równia pochyła (Slippery slope)',
        definition: 'Sugestia, że jeden krok nieuchronnie doprowadzi do serii negatywnych zdarzeń.',
        example: '"Jeśli pozwolimy na budowę tej ścieżki rowerowej, to zaraz zakażą nam wjazdu samochodami do całego miasta!"',
        category: 'erystyka'
    },
    {
        term: 'Pluralizm',
        definition: 'Sytuacja, w której w społeczeństwie współistnieją różne grupy o różnych poglądach i interesach.',
        example: 'Obecność przedstawicieli wielu partii o odmiennych programach w parlamencie.',
        category: 'demokracja'
    },
    {
        term: 'Praworządność',
        definition: 'Zasada, zgodnie z którą władza działa na podstawie i w granicach prawa.',
        example: 'Niezależność sądów od nacisków politycznych rządu.',
        category: 'demokracja'
    },
    {
        term: 'Eufemizm',
        definition: 'Słowo lub zwrot użyty zamiast innego, o silniejszym lub bardziej dosadnym znaczeniu, w celu złagodzenia przekazu.',
        example: 'Mówienie o "optymalizacji zatrudnienia" zamiast o "masowych zwolnieniach".',
        category: 'manipulacja'
    },
    {
        term: 'Cherry picking',
        definition: 'Wybieranie tylko tych faktów, które pasują do założonej tezy, przy ignorowaniu dowodów jej przeczących.',
        example: 'Cytowanie jednej korzystnej statystyki gospodarczej przy pominięciu dziesięciu wskazujących na kryzys.',
        category: 'manipulacja'
    },
    {
        term: 'Straw man (Chochoł)',
        definition: 'Atakowanie zniekształconej, uproszczonej wersji argumentu przeciwnika.',
        example: 'Przeciwnik mówi: "Powinniśmy dofinansować edukację". Atakujący odpowiada: "Mój oponent chce zabrać pieniądze chorym dzieciom i wydać je na kredki!"',
        category: 'erystyka'
    },
    {
        term: 'Wolność słowa',
        definition: 'Prawo do publicznego wyrażania własnych poglądów oraz ich rozpowszechniania.',
        example: 'Możliwość legalnego udziału w demonstracji przeciwko nowej ustawie.',
        category: 'prawa_czlowieka'
    },
    {
        term: 'Mowa nienawiści',
        definition: 'Wypowiedzi szerzące, propagujące lub usprawiedliwiające nienawiść do określonych grup osób.',
        example: 'Podżeganie do przemocy wobec mniejszości religijnej w mediach społecznościowych.',
        category: 'prawa_czlowieka'
    },
    {
        term: 'Społeczeństwo obywatelskie',
        definition: 'Zbiorowość osób wykazujących się aktywnością oraz umiejętnością samoorganizacji bez udziału władzy państwowej.',
        example: 'Działalność fundacji pomagającej bezdomnym zwierzętom.',
        category: 'demokracja'
    },
    {
        term: 'Argumentum ad populum',
        definition: 'Odwoływanie się do powszechnego przekonania lub "woli ludu" jako ostatecznego argumentu.',
        example: '"Wszyscy wiedzą, że to złe rozwiązanie, więc nie mamy o czym dyskutować."',
        category: 'erystyka'
    },
    {
        term: 'Gaslighting',
        definition: 'Forma manipulacji psychologicznej polegająca na podważaniu percepcji rzeczywistości ofiary.',
        example: '"Nigdy czegoś takiego nie powiedziałem, to tylko twoja wyobraźnia."',
        category: 'manipulacja'
    },
    {
        term: 'Astroturfing',
        definition: 'Tworzenie złudzenia oddolnego ruchu społecznego, podczas gdy jest on finansowany przez korporację lub polityków.',
        example: 'Kupowanie tysięcy komentarzy w sieci udających głosy zachwyconych pasażerów po podwyżce cen biletów.',
        category: 'manipulacja'
    },
    {
        term: 'Whataboutism',
        definition: 'Odpowiadanie na zarzut lub trudne pytanie uderzeniem w drugą stronę ("A co z...").',
        example: 'Pytanie: "Dlaczego rośnie deficyt?". Odpowiedź: "A co robili wasi poprzednicy siedem lat temu?"',
        category: 'erystyka'
    },
    {
        term: 'Gerrymandering',
        definition: 'Manipulowanie granicami okręgów wyborczych w celu uzyskania korzyści dla konkretnej partii.',
        example: 'Wytyczanie granic tak, by rozbić elektorat opozycji na wiele okręgów.',
        category: 'demokracja'
    },
    {
        term: 'Niezawisłość sędziowska',
        definition: 'Zasada, zgodnie z którą sędzia rozstrzyga sprawy wyłącznie na podstawie prawa i własnego sumienia.',
        example: 'Sędzia wydający wyrok uniewinniający opozycjonistę mimo nacisków ze strony prokuratury.',
        category: 'demokracja'
    },
    {
        term: 'Polaryzacja',
        definition: 'Zjawisko narastania różnic i wrogości między dwiema grupami społecznymi.',
        example: 'Sytuacja, w której członkowie dwóch obozów politycznych nie potrafią przeprowadzić spokojnej rozmowy przy rodzinnym stole.',
        category: 'manipulacja'
    },
    {
        term: 'Argumentum ad baculum',
        definition: 'Odwoływanie się do siły lub groźby jej użycia zamiast do argumentów.',
        example: '"Jeśli nie poprzesz tej ustawy, to twój region straci wszystkie dotacje z budżetu."',
        category: 'erystyka'
    },
    {
        term: 'Prawa wyborcze',
        definition: 'Prawa obywateli do udziału (czynnego i biernego) w wyborach.',
        example: 'Możliwość oddania głosu w wyborach prezydenckich przez każdego pełnoletniego obywatela.',
        category: 'prawa_czlowieka'
    },
    {
        term: 'Wiktymizacja',
        definition: 'Proces czynienia z kogoś ofiary lub przypisywania danej grupie roli wiecznej ofiary.',
        example: '"Wszystkie nieszczęścia, które nas spotykają, są winą sąsiadów zza miedzy."',
        category: 'manipulacja'
    },
    {
        term: 'Dogmatyzm',
        definition: 'Bezkrytyczne przyjmowanie założeń i twierdzeń bez sprawdzania ich zgodności z faktami.',
        example: '"Nasza ideologia jest jedyną słuszną i każde podważenie jej zasad jest zdradą."',
        category: 'manipulacja'
    },
    {
        term: 'Argumentum ad verecundiam',
        definition: 'Odwoływanie się do autorytetu w dziedzinie, w której nie posiada on kompetencji.',
        example: 'Cytowanie opinii popularnego aktora na temat skomplikowanych reform systemu bankowego.',
        category: 'erystyka'
    },
    {
        term: 'Sekularyzm',
        definition: 'Zasada rozdziału instytucji państwowych od religijnych.',
        example: 'Brak finansowania konkretnej grupy wyznaniowej bezpośrednio z budżetu państwa.',
        category: 'demokracja'
    },
    {
        term: 'Cenzura prewencyjna',
        definition: 'Kontrola publikacji lub widowisk przed ich rozpowszechnieniem przez organy państwowe.',
        example: 'Konieczność uzyskania zgody urzędnika na publikację każdego artykułu w gazecie.',
        category: 'prawa_czlowieka'
    },
    {
        term: 'Argumentum ad ignorantiam',
        definition: 'Dowodzenie, że teza jest prawdziwa tylko dlatego, że nie udowodniono jej fałszywości (lub odwrotnie).',
        example: '"Nikt nie udowodnił, że te leśne skrzaty nie istnieją, więc z pewnością tam są."',
        category: 'erystyka'
    },
    {
        term: 'Framing (Ramowanie)',
        definition: 'Prezentowanie informacji w taki sposób, by ukierunkować ich interpretację przez odbiorcę.',
        example: 'Mówienie o "walce o wolność" zamiast o "udarach zbrojnych".',
        category: 'manipulacja'
    },
    {
        term: 'Transparency (Przejrzystość)',
        definition: 'Zasada jawności działań organów władzy publicznej.',
        example: 'Obowiązek publikowania rejestru wydatków z kart służbowych ministrów.',
        category: 'demokracja'
    },
    {
        term: 'Godność ludzka',
        definition: 'Przyrodzona i niezbywalna cecha każdego człowieka jako podmiotu praw.',
        example: 'Zakaz nieludzkiego traktowania osadzonych w zakładach karnych.',
        category: 'prawa_czlowieka'
    },
    {
        term: 'Postprawda',
        definition: 'Sytuacja, w której fakty mają mniejszy wpływ na opinię publiczną niż odwoływanie się do emocji i osobistych przekonań.',
        example: 'Utrzymywanie narracji o sukcesie gospodarczym mimo obiektywnych wskaźników wskazujących na recesję.',
        category: 'manipulacja'
    },
    {
        term: 'Non sequitur',
        definition: 'Błąd logiczny polegający na tym, że wniosek nie wynika z przesłanek.',
        example: '"Lubię jabłka, więc jutro będzie padać deszcz."',
        category: 'erystyka'
    },
    {
        term: 'Suwerenność narodu',
        definition: 'Zasada, że najwyższa władza w państwie należy do obywateli.',
        example: 'Przekonanie, że parlament jest związany wolą wyrażoną przez obywateli w referendum.',
        category: 'demokracja'
    },
    {
        term: 'Domniemanie niewinności',
        definition: 'Zasada, według której każdą osobę uważa się za niewinną, dopóki jej wina nie zostanie stwierdzona prawomocnym wyrokiem.',
        example: 'Zakaz nazywania podejrzanego "mordercą" przed zakończeniem procesu w sądzie.',
        category: 'prawa_czlowieka'
    },
    {
        term: 'Dog whistle (Psia gwizdka)',
        definition: 'Używanie języka kodowanego, który brzmi neutralnie dla ogółu, ale ma ukryte znaczenie dla specyficznej grupy.',
        example: 'Mówienie o "kosmopolitycznych elitach" jako ukryta forma ataku na mniejszości narodowe.',
        category: 'manipulacja'
    },
    {
        term: 'Fałszywa analogia',
        definition: 'Stosowanie porównania dwóch rzekomo podobnych rzeczy, które w istotnych punktach się różnią.',
        example: '"Państwo jest jak firma, więc prezydent powinien móc zwolnić każdego obywatela."',
        category: 'erystyka'
    },
    {
        term: 'Inicjatywa ustawodawcza',
        definition: 'Prawo do zgłaszania projektów ustaw do laski marszałkowskiej.',
        example: 'Złożenie projektu ustawy przez grupę 100 tysięcy obywateli.',
        category: 'demokracja'
    },
    {
        term: 'Wolność wyznania',
        definition: 'Prawo do wyznawania dowolnej religii lub niewyznawania żadnej.',
        example: 'Otwarcie nowej świątyni mniejszości religijnej bez przeszkód prawnych.',
        category: 'prawa_czlowieka'
    },
    {
        term: 'Stygmatyzacja',
        definition: 'Nadawanie negatywnego znaczenia i etykietowanie osób lub grup społecznych.',
        example: 'Nazywanie wszystkich bezrobotnych "leniami" i "pasożytami".',
        category: 'manipulacja'
    },
    {
        term: 'Argumentum ad misericordiam',
        definition: 'Odwoływanie się do litości w celu ominięcia racjonalnej dyskusji.',
        example: '"Nie pytajcie mnie o te brakujące miliony, spójrzcie na moje zniszczone zdrowie i smutne oczy dzieci."',
        category: 'erystyka'
    },
    {
        term: 'Trójpodział władzy',
        definition: 'Podział na władzę ustawodawczą, wykonawczą i sądowniczą w celu zapobieżenia tyranii.',
        example: 'Rząd (wykonawcza) nie może nakazać sędziom (sądownicza), jak mają orzekać.',
        category: 'demokracja'
    },
    {
        term: 'Prawo do prywatności',
        definition: 'Prawo do ochrony życia prywatnego, rodzinnego i tajemnicy korespondencji.',
        example: 'Zakaz podsłuchiwania rozmów obywateli bez zgody sądu.',
        category: 'prawa_czlowieka'
    },
    {
        term: 'Spin doctoring',
        definition: 'Technika manipulacji wizerunkiem, mająca na celu nadanie faktom pożądanej interpretacji.',
        example: 'Przedstawienie kompromitującej wpadki premiera jako "ludzkiego odruchu zbliżającego go do obywateli".',
        category: 'manipulacja'
    },
    {
        term: 'Tu quoque',
        definition: 'Odpieranie ataku poprzez stwierdzenie, że przeciwnik zachowuje się tak samo (odmiana whataboutismu).',
        example: '"Mówisz, że kłamię? A sam ostatnio nie dopowiedziałeś prawdy o swoich dochodach!"',
        category: 'erystyka'
    },
    {
        term: 'Wybory wolne i uczciwe',
        definition: 'Standard wyborczy zakładający brak przymusu, równość szans i rzetelne liczenie głosów.',
        example: 'Poddanie procesu wyborczego kontroli przez niezależnych obserwatorów międzynarodowych.',
        category: 'demokracja'
    },
    {
        term: 'Wolność zrzeszania się',
        definition: 'Prawo do tworzenia stowarzyszeń, partii politycznych i związków zawodowych.',
        example: 'Założenie przez lokalnych mieszkańców stowarzyszenia na rzecz ochrony zabytkowego parku.',
        category: 'prawa_czlowieka'
    }
];

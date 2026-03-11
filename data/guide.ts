export interface GuideSection {
  id: string;
  title: string;
  content: string;
  icon: string;
}

export const citizenGuide: GuideSection[] = [
  {
    id: "intro",
    title: "Wprowadzenie: Laboratorium Świadomego Obywatela",
    icon: "🔬",
    content: "Witaj w Laboratorium! Demokracja to nie tylko system głosowania, to codzienny wysiłek zrozumienia i poszanowania innych. W erze dezinformacji i polaryzacji, kluczową umiejętnością jest krytyczne myślenie. Ten przewodnik pomoże Ci zrozumieć, jak analizować teksty, wykrywać manipulacje i bronić standardów debaty publicznej."
  },
  {
    id: "weasel_words",
    title: "Słowa-Wytrychy (Weasel Words)",
    icon: "🔤",
    content: "To nieostre zwroty, które sprawiają wrażenie konkretnych stwierdzeń, a w rzeczywistości nie niosą żadnej mierzalnej treści. Przykłady to 'prawdziwi Polacy', 'elity', 'większość ekspertów twierdzi'. Służą one do przemycania opinii i budowania podziałów 'my' kontra 'oni'. Kiedy je widzisz, pytaj: 'Kto konkretnie?' lub 'Na jakiej podstawie?'"
  },
  {
    id: "strawman",
    title: "Argumentum ad Metum (Straszenie) i Chochoł (Strawman)",
    icon: "🔥",
    content: "Zamiast dyskutować z prawdziwymi poglądami oponenta, łatwiej jest stworzyć ich przerysowaną, błędną wersję (Chochoła) i ją atakować. Z kolei straszenie (odwoływanie się do lęku) służy wyłączeniu logicznego myślenia. Retoryka typu 'albo my, albo chaos' to klasyczna fałszywa dechotomia połączona ze wzbudzaniem strachu."
  },
  {
    id: "pluralism",
    title: "Zasada Pluralizmu i Inkluzywności",
    icon: "🤝",
    content: "Język w demokracji powinien zapraszać do dialogu, a nie go zamykać. Zwracaj uwagę na dehumanizację (określanie przeciwników mianem 'pasożytów' lub 'zarazy') - to pierwszy krok do wykluczenia danej grupy ze społeczeństwa. Zdrowa debata opiera się na szacunku do godności każdego człowieka, niezależnie od różnic."
  },
  {
    id: "institutions",
    title: "Zaufanie do Instytucji i Faktów",
    icon: "🏛️",
    content: "Populizm często atakuje instytucje demokratyczne i ekspertów, podkopując ich autorytet słowami takimi jak 'kadra oderwana od rzeczywistości'. Silna demokracja wymaga niezależnych sądów, wolnych mediów oraz poszanowania dla naukowej, opartej na dowodach debaty."
  }
];

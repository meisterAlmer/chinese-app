# Chinese Language App

[link to Github repository](https://github.com/meisterAlmer/chinese-app)

1. Inleiding
2. De applicatie starten
3. Testen
4. Backend

## 1. Inleiding

Leer Mandarijn Chinees met deze webapplicatie! Elke les bestaat uit een fictieve conversatie tussen twee personen. Ook bevat elke les een lijst van nieuwe woorden weergeven in Chinese karakters, pinyin en een Engelse vertaling.

De applicatie heeft een handige flashcard tool waarmee de studenten per les alle nieuwe karakters kunnen oefenen. Elke les heeft ook een quiz van alle nieuwe woorden, waarbij een score wordt bijgehouden. Daarnaast is er ook een practice pagina waar het mogelijk is om de woorden uit alle lessen te oefenen. Hierbij kan de gebruiker de lijst filteren en sorteren.

Op de practice pagina is het ook mogelijk om flashcards en een quiz te doen met alle woorden of te filteren op geselecteerde lessen.

![Chinese Language App](src/assets/screenshot.png)

## 2. De applicatie starten

Na het clonen van het project naar de locale machine, installeer je eerst de node_modules door het volgende commando in de terminal te runnen:

`npm install`

Wanneer dit klaar is, kun je de applicatie in developer mode starten met behulp van:

`npm start`

Open [http://localhost:3000](http://localhost:3000) om de applicatie in de browser te weergeven.

## 3. Testen

Om de tests voor de helper functions te starten moet je het volgende commando in de terminal runnen:

`npm test`

## 4. Backend

De applicatie maakt voor de authentication en database gebruik van Firebase. De configuratie is te vinden in:
`src/modules/firebase.js`

De inloggegevens voor Firebase worden los verstrekt.

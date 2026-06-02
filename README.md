# Projektuppgift – Frontend (DT207G Backend-baserad webbutveckling)

**Genomförd av: joha2102**

Länk till applikationens publika sida: https://bbw-projektuppgift-lazycat.netlify.app/home
Länk till inloggningssidan: https://bbw-projektuppgift-lazycat.netlify.app/login

## Projektbeskrivning

Detta projekt är frontend-delen av slutuppgiften i kursen "Backend-baserad webbutveckling" vid Mittuniversitetet. 

Den andra delen, backend, finns här: https://github.com/JohannaHannahoJ/bbw-projektuppgift-jh

Uppgiften går ut på att skapa en webbplats för en restaurang. Projektet är en Angular-applikation som konsumerar ett REST API som visar meny på en publik sida och hanterar meny och andra funktioner på en adminsida som ligger bakom inlogg.

Applikationen innehåller:
- Publik sida som presenterar restaurangen och visar meny och kontaktformulär som hanteras via ett API.
- Adminsida som skyddas av inloggning med olika behörighetsnivåer. Inloggade användare kan redigera meny och hantera inkomna frågor som inkommit via kontaktformulär. Användare med särskild admin-behörighet kan dessutom lägga till och ta bort andra användare.

## Projektstruktur
Applikationen är uppdelad i core (guards, models och services), components och pages för att separera logik, återanvändbara komponenter och sidrelaterad funktionalitet.

## Tekniker
- Angular
- TypeScript
- Signals
- HttpClient
- Angular Router
- JWT authentication
- LocalStorage

## Kör projektet lokalt
Klona repot och installera dependencies:
```bash
npm install
```
Kör projektet:

```bash
ng serve
```
Gå sedan till: http://localhost:4200. Sidan laddas om vid uppdateringar i koden.

## Bygg projektet

```bash
ng build
```
Detta kompilerar projektet och placerar de färdiga filerna i mappen `dist/`. 
# Java/Spring Boot REST API FlashCards Project

![Status](https://img.shields.io/badge/Status-In--Development-orange?style=flat-square)
![Java](https://img.shields.io/badge/Java-21-blue?style=flat-square&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.3-brightgreen?style=flat-square&logo=spring-boot)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=flat-square&logo=react&logoColor=black)

## Duel Study modes

### Cram mode ("lazy update weight logic")
- **Study at own pace:** Unlike spaced repetition, Cram Mode allows users to study for as little or as long as they like, with the weighted algorithm adjusting mid-session to prioritize harder cards. Making cram mode perfect for preperation for upcoming exams where you don't have enough time for spaced repetition.
For short-term exam preparation, endless cramming mode.
- **User Feedback:** after card has been flipped, user can score from 1-4 based if the got the card correct and how difficult it was for them to retain. This score is used to give the card an updated weight.
- **Weighted lottery:** next cards are randomised, where cards struggled with are mathmatically more probable to appear.

### Spaced repetition (FSRS algorithm) - COMING SOON
For long-term retention, with a FCFS algorithm.

## Technology Stack
### Backend
* **Language:** Java 21
* **Framework:** Spring Boot 3.5.3 (Web, Data JPA, Security)
* **Database:** PostgreSQL / H2 (Testing)
* **Build Tool:** Maven

### Frontend
* **Language:** JavaScript
* **Libraries** React 19.2.0, React Router 7.13.0
* **Styling** Tailwind CSS 4.1.18
* **Build Tool:** Vite

## Core API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/decks/{deckId}/flashcards` | C reates a new flashcard in deck with deckId |
| **POST** | `/api/flashcard/{id}/score` | Uses score to update the weight for the flashcard with id |
| **GET** | `/api/flashcards` | Fetches all flashcards for a user |
| **GET** | `/api/decks/{deckId}/flashcards` | Retrieve all flashcards for deck with deckId |
| **GET** | `/api/folders/{folderId}/flashcards` | Retrieve all flashcards for deck with folderId |
| **GET** | `/api/cram/deck/{deckId}` | For cram mode, retrieve 5 random cards (with influence from card weights) from deck with deckId |
| **GET** | `/api/cram/folder/{folderId}` | For cram mode, retrieve 5 random cards (with influence from card weights) from folder with foldrId |
| **GET** | `/api/cram/tag/{tagId}` | For cram mode, retrieve 5 random cards (with influence from card weights) from tag with tagId |
| **GET** | `/api/cram` | For cram mode, retrieve 5 random cards (with influence from card weights) from user. Endpoint used for cram mode at the root folder |
| **GET** | `/api/content/{folderId}` | For file explorer, gets all content (folders and decks) for parent folder with folderId |
| **GET** | `/api/content` | For file explorer, gets all content (folders and decks) for root folder |
| **GET** | `/api/tags` | Get all tags for user |
| **PUT** | `/flashcards/{flashCardId}` | Updates flashcard with flashcardId |
| **DELETE** | `/flashcards/{flashCardId}` | Deletes flashcard with flashcardId |

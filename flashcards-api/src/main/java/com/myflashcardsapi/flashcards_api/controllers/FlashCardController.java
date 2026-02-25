package com.myflashcardsapi.flashcards_api.controllers;

import com.myflashcardsapi.flashcards_api.domain.dto.FlashCardDto;
import com.myflashcardsapi.flashcards_api.security.SecurityUser;
import com.myflashcardsapi.flashcards_api.services.FlashCardService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class FlashCardController {
    private FlashCardService flashCardService;

    public FlashCardController(FlashCardService flashCardService) {

        this.flashCardService = flashCardService;
    }

    // --- CREATE ---
    @PostMapping("/decks/{deckId}/flashcards")
    public ResponseEntity<FlashCardDto> createFlashCard(@RequestBody FlashCardDto flashCardDto, @PathVariable Long deckId, @AuthenticationPrincipal SecurityUser user) throws BadRequestException {
        FlashCardDto flashCard = flashCardService.createFlashCard(user.getId(),deckId,flashCardDto);
        return new ResponseEntity<>(flashCard, HttpStatus.CREATED);
    }

    @PostMapping("/flashcard/{id}/score")
    public ResponseEntity<Void> submitScore(@PathVariable Long id, @RequestBody int score, @AuthenticationPrincipal SecurityUser user) {
        flashCardService.updateWeight(id,user.getId(),score);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // --- GET ---
    @GetMapping("/flashcards")
    public List<FlashCardDto> getAllUserFlashCards(@AuthenticationPrincipal SecurityUser user) {
        return flashCardService.getAllFlashCardsForUser(user.getId());
    }


    @GetMapping("/decks/{deckId}/flashcards")
    public List<FlashCardDto> getAllDeckFlashCards(@PathVariable Long deckId, @AuthenticationPrincipal SecurityUser user) {
        return flashCardService.getFlashCardsByDeckIdAndUser(deckId, user.getId());
    }

    @GetMapping("/flashcards/{flashCardId}")
    public ResponseEntity<FlashCardDto> getFlashCardById(@PathVariable Long flashCardId, @AuthenticationPrincipal SecurityUser user) {
        try {
            FlashCardDto flashCard = flashCardService.getFlashCardByIdAndUser(flashCardId, user.getId()).get();
            return new ResponseEntity<>(flashCard,HttpStatus.OK);
        } catch(NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/flashcards/tags")
    public List<FlashCardDto> getFlashCardsByTags(@AuthenticationPrincipal SecurityUser user, @RequestParam List<Long> tagIds) throws BadRequestException {
        return flashCardService.getFlashCardsByTagsIdAndUser(tagIds, user.getId());
    }

    @GetMapping("/folders/{folderId}/flashcards")
    public List<FlashCardDto> getFlashCardsByFolderId(@AuthenticationPrincipal SecurityUser user, @PathVariable Long folderId) {
        return  flashCardService.getFlashCardsInFolder(folderId, user.getId());
    }

    @GetMapping("/cram/deck/{deckId}")
    public List<FlashCardDto> getCramByDeckId(@AuthenticationPrincipal SecurityUser user, @PathVariable Long deckId) {
        return flashCardService.getFlashCardsForCramByDeckId(user.getId(),deckId);
    }


    @GetMapping("/cram/folder/{folderId}")
    public List<FlashCardDto> getCramByFolderId(@AuthenticationPrincipal SecurityUser user, @PathVariable Long folderId) {
        return flashCardService.getFlashCardsForCramByFolderId(user.getId(),folderId);
    }


    @GetMapping("/cram/tag/{tagId}")
    public List<FlashCardDto> getCramByTagId(@AuthenticationPrincipal SecurityUser user, @PathVariable Long tagId) throws BadRequestException {
        return flashCardService.getFlashCardsForCramByTagId(user.getId(),tagId);
    }

    @GetMapping("/cram")
    public List<FlashCardDto> getCramByUserId(@AuthenticationPrincipal SecurityUser user) throws BadRequestException {
        return flashCardService.getFlashCardsForCramByUserId(user.getId());
    }

    // --- UPDATE ---
    @PutMapping("/flashcards/{flashCardId}")
    public ResponseEntity<FlashCardDto> updateFlashCard(@RequestBody FlashCardDto flashCardDto, @AuthenticationPrincipal SecurityUser user, @PathVariable Long flashCardId) throws BadRequestException {
        FlashCardDto flashcard = flashCardService.updateFlashCard(user.getId(),flashCardId,flashCardDto);
        return new ResponseEntity<>(flashcard,HttpStatus.OK);
    }

    // --- DELETE ---
    @DeleteMapping("/flashcards/{flashCardId}")
    public ResponseEntity<Void> deleteFlashCard(@AuthenticationPrincipal SecurityUser user,
                                                        @PathVariable Long flashCardId) {
        flashCardService.deleteFlashCard(user.getId(),flashCardId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

package com.myflashcardsapi.flashcards_api.controllers;

import com.myflashcardsapi.flashcards_api.domain.dto.DeckDto;
import com.myflashcardsapi.flashcards_api.security.SecurityUser;
import com.myflashcardsapi.flashcards_api.services.DeckService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequestMapping("/api")

public class DeckController {
    private DeckService deckService;

    public DeckController(DeckService deckService) {

        this.deckService = deckService;
    }

    // --- CREATE ---
    @PostMapping("/decks")
    public ResponseEntity<DeckDto> createDeck(@RequestBody DeckDto deckDto, @AuthenticationPrincipal SecurityUser user) throws BadRequestException {
        DeckDto deck = deckService.createDeck(user.getId(),deckDto);
        return new ResponseEntity<>(deck, HttpStatus.CREATED);
    }

    // --- READ ---
    @GetMapping("/decks/{deckId}")
    public ResponseEntity<DeckDto> getDeckById(@AuthenticationPrincipal SecurityUser user, @PathVariable Long deckId) {
        try {
            DeckDto deck = deckService.getDeckDtoByIdAndUser(deckId,user.getId()).get();
            return new ResponseEntity<>(deck,HttpStatus.OK);
        } catch(NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/decks")
    public List<DeckDto> getAllDecksForUserId(@AuthenticationPrincipal SecurityUser user) {
        return  deckService.getAllDeckDtosForUser(user.getId());
    }

    @GetMapping("/folders/{folderId}/decks")
    public List<DeckDto> getAllDecksForFolderId(@AuthenticationPrincipal SecurityUser user, @PathVariable Long folderId) {
        return deckService.getAllDeckDtosByFolderIdAndUser(folderId,user.getId());
    }

    //--- UPDATE ---
    @PutMapping("/decks/{deckId}")
    public ResponseEntity<DeckDto> updateDeckById(@RequestBody DeckDto deckDto, @PathVariable Long deckId, @AuthenticationPrincipal SecurityUser user) throws BadRequestException {
        DeckDto deck = deckService.updateDeck(user.getId(),deckId,deckDto);
        return new ResponseEntity<>(deck,HttpStatus.OK);
    }

    @DeleteMapping("/decks/{deckId}")
    public ResponseEntity<Void> deleteDeckById(@PathVariable Long deckId, @AuthenticationPrincipal SecurityUser user) {
        deckService.deleteDeck(user.getId(),deckId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

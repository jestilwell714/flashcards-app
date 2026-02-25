package com.myflashcardsapi.flashcards_api.controllers;

import com.myflashcardsapi.flashcards_api.domain.dto.FolderDto;
import com.myflashcardsapi.flashcards_api.domain.dto.ItemDto;
import com.myflashcardsapi.flashcards_api.security.SecurityUser;
import com.myflashcardsapi.flashcards_api.services.FolderService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class FolderController {
    private FolderService folderService;

    public FolderController(FolderService folderService) {
        this.folderService = folderService;
    }

    // --- CREATE ---
    @PostMapping("/folders")
    public ResponseEntity<FolderDto> createFolder(@RequestBody FolderDto folderDto, @AuthenticationPrincipal SecurityUser user) throws BadRequestException {
        FolderDto folder = folderService.createFolder(user.getId(),folderDto);
        return new ResponseEntity<>(folder, HttpStatus.CREATED);
    }

    // --- READ ---
    @GetMapping("/folders")
    public List<FolderDto> getAllRootFolders(@AuthenticationPrincipal SecurityUser user) {
        return folderService.getRootFoldersForUser(user.getId());
    }

    @GetMapping("/folders/{parentFolderId}/subfolders")
    public List<FolderDto> getAllfoldersByParentFolderId(@AuthenticationPrincipal SecurityUser user, @PathVariable Long parentFolderId) {
        return folderService.getAllForParentFolderAndUser(parentFolderId,user.getId());
    }

    @GetMapping("/folders/{folderId}")
    public ResponseEntity<FolderDto> getFolderByFolderId(@PathVariable Long folderId, @AuthenticationPrincipal SecurityUser user) {
        try {
            FolderDto folder = folderService.getFolderByIdAndUser(user.getId(), folderId).get();
            return new ResponseEntity<>(folder,HttpStatus.OK);
        } catch(NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/content")
    public List<ItemDto> getContentsByRoot(@AuthenticationPrincipal SecurityUser user) {
        return folderService.getRootContents(user.getId());
    }

    @GetMapping("/content/{folderId}")
    public List<ItemDto> getContentsByFolderId(@PathVariable Long folderId, @AuthenticationPrincipal SecurityUser user) {
        return folderService.getFolderContents(folderId,user.getId());
    }

    // --- UPDATE ---
    @PutMapping("/folders/{folderId}")
    public ResponseEntity<FolderDto> updateFolder(@PathVariable Long folderId, @AuthenticationPrincipal SecurityUser user, @RequestBody FolderDto folderDto) throws BadRequestException {
        FolderDto folder = folderService.updateFolder(user.getId(),folderId,folderDto);
        return new ResponseEntity<>(folder,HttpStatus.OK);
    }

    // --- DELETE ---
    @DeleteMapping("/folders/{folderId}")
    public ResponseEntity<Void> deleteFolder(@PathVariable Long folderId, @AuthenticationPrincipal SecurityUser user) {
        folderService.deleteFolder(user.getId(),folderId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

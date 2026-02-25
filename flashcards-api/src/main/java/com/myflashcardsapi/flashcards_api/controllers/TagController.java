package com.myflashcardsapi.flashcards_api.controllers;

import com.myflashcardsapi.flashcards_api.domain.dto.TagDto;
import com.myflashcardsapi.flashcards_api.security.SecurityUser;
import com.myflashcardsapi.flashcards_api.services.TagService;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class TagController {
    private TagService tagService;

    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    // --- CREATE ---

    @PostMapping("/tags")
    public ResponseEntity<TagDto> createTag(@RequestBody TagDto tagDto, @AuthenticationPrincipal SecurityUser user) throws BadRequestException {
        TagDto tag = tagService.createTag(user.getId(),tagDto);
        return new ResponseEntity<>(tag, HttpStatus.CREATED);
    }

    // --- READ ---
    @GetMapping("/tags/{tagId}")
    public ResponseEntity<TagDto> getTagByTagId(@PathVariable Long tagId, @AuthenticationPrincipal SecurityUser user) {
        try {
            TagDto tag = tagService.getTagByIdAndUser(tagId,user.getId()).get();
            return new ResponseEntity<>(tag,HttpStatus.OK);
        } catch(NoSuchElementException ex) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/tags")
    public List<TagDto> getTagsByuserId(@AuthenticationPrincipal SecurityUser user) {
        return tagService.getAllTagsForUser(user.getId());
    }

    // --- UPDATE ---
    @PutMapping("/tags/{tagId}")
    public ResponseEntity<TagDto> updateTag(@RequestBody TagDto tagDto, @PathVariable Long tagId, @AuthenticationPrincipal SecurityUser user) throws BadRequestException {
        TagDto tag = tagService.updateTag(user.getId(),tagId,tagDto);
        return new ResponseEntity<>(tag,HttpStatus.OK);
    }

    @DeleteMapping("/tags/{tagId}")
    public ResponseEntity<Void> deleteTag(@AuthenticationPrincipal SecurityUser user, @PathVariable Long tagId) {
        tagService.deleteTag(user.getId(),tagId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}

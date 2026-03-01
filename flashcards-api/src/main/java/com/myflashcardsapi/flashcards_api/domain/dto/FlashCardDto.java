package com.myflashcardsapi.flashcards_api.domain.dto;

import com.myflashcardsapi.flashcards_api.domain.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FlashCardDto {

    private Long id;

    private String question;

    private String answer;

    private List<Long> tagIds = new ArrayList<>();

    private Long deckId;

    private double weight = 100.0;

    public void addTagId(Long tagId) {
        this.tagIds.add(tagId);
    }
}

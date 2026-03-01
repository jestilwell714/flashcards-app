package com.myflashcardsapi.flashcards_api.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FlashCardDto {

    private Long id;

    private String question;

    private String answer;

    private Set<Long> tagIds;

    private Long deckId;

    private double weight = 100.0;
}

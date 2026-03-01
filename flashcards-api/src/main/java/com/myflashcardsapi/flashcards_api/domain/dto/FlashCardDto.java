package com.myflashcardsapi.flashcards_api.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FlashCardDto {

    private Long id;

    private String question;

    private String answer;

    private List<Long> tagIds;

    private Long deckId;

    private double weight = 100.0;
}

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
public class TagDto {

    private Long id;

    private String name;

    private Long userId;

    private List<Long> flashCardIds;
}

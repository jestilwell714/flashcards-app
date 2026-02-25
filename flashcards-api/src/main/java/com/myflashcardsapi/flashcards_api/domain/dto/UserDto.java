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
public class UserDto {
    private Long id;


    private String firstName;

    private String lastName;

    private String username;


    private String password;

    private List<Long> deckIds;

    private Set<Long> tagIds;
}

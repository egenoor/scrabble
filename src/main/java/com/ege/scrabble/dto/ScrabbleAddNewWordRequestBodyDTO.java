package com.ege.scrabble.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class ScrabbleAddNewWordRequestBodyDTO {
    @NotBlank(message = "Word can't be empty")
    @Pattern(regexp = "^[a-zA-Z_]+$", message = "String may only contain letters")
    private String word;
}

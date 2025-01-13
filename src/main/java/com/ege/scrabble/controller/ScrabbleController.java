package com.ege.scrabble.controller;

import com.ege.scrabble.dto.ScrabbleAddNewWordRequestBodyDTO;
import com.ege.scrabble.dto.ScrabbleCalculateScoreRequestBodyDTO;
import com.ege.scrabble.exception.DuplicateException;
import com.ege.scrabble.exception.NotFoundException;
import com.ege.scrabble.service.WordService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ScrabbleController {
    @Autowired
    WordService wordService;

    @PostMapping("/api/scrabble/calculate-score")
    public int calculateScore(@RequestBody @Valid ScrabbleCalculateScoreRequestBodyDTO body) throws NotFoundException {
        return wordService.calculateScore(body.getWord());
    }

    @PostMapping("/api/scrabble/word")
    public void addNewWord(@RequestBody @Valid ScrabbleAddNewWordRequestBodyDTO body) throws DuplicateException {
        wordService.addNewWord(body.getWord());
    }
}

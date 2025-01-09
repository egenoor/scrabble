package com.ege.scrabble.controller;

import com.ege.scrabble.exception.DuplicateException;
import com.ege.scrabble.exception.NotFoundException;
import com.ege.scrabble.service.GameService;
import com.ege.scrabble.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {
    @Autowired
    GameService gameService;

    @Autowired
    WordService wordService;

    @PostMapping("/api/scrabble/calculate")
    public int calculateWord(@RequestParam String word) throws NotFoundException {
        gameService.initLetterValues();
        return gameService.calculateWord(word);
    }

    @PostMapping("/api/scrabble/add")
    public void addWordToDictionary(@RequestParam String word) throws DuplicateException {
        wordService.addWordToDictionary(word);
    }
}

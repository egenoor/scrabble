package com.ege.scrabble.controller;

import com.ege.scrabble.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {
    @Autowired
    GameService gameService;

    @PostMapping("/api/scrabble/calculate")
    public int calculateWord(@RequestParam String word) {
        gameService.addLetterValues();
        return gameService.calculateWord(word);
    }
}

package com.ege.scrabble.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;


@Service
public class GameService {
    Map<String, Integer> letterValues;

    public void addLetterValues() {
        letterValues = new HashMap<>() {{
            put("E", 1);
            put("A", 1);
            put("I", 1);
            put("O", 1);
            put("N", 1);
            put("R", 1);
            put("T", 1);
            put("L", 1);
            put("S", 1);
            put("U", 1);
            put("D", 2);
            put("G", 2);
            put("B", 3);
            put("C", 3);
            put("M", 3);
            put("P", 3);
            put("F", 4);
            put("H", 4);
            put("V", 4);
            put("W", 4);
            put("Y", 4);
            put("K", 5);
            put("J", 8);
            put("X", 8);
            put("Q", 10);
            put("Z", 10);
        }};
    }

    public int calculateWord(String word) {
        int score = 0;
        String[] splitWord = word.split("");

        for(String c : splitWord) {
            //TODO: check if word exists in dictionary
            if (letterValues.containsKey(c.toUpperCase())) {
                score += letterValues.get(c.toUpperCase());
            }
        }

        return score;
    }
}

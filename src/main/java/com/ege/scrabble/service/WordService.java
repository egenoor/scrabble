package com.ege.scrabble.service;

import com.ege.scrabble.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordService {
    @Autowired
    static WordRepository wordRepository;

    public static void addDictionaryWordsToDb(List<String> wordList) {
        for (String word : wordList) {
            wordRepository.save(word);
        }
    }
}

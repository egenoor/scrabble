package com.ege.scrabble.service;

import com.ege.scrabble.entity.Word;
import com.ege.scrabble.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WordService {
    @Autowired
    WordRepository wordRepository;

    public void addDictionaryWordsToDb(List<String> wordList) {
        ArrayList<Word> wordsEntities = new ArrayList<Word>();
        for (String word : wordList) {
            Word wordToSave = new Word();
            wordToSave.setWord(word);
            wordsEntities.add(wordToSave);
        }
        wordRepository.saveAll(wordsEntities);
    }

    public void clearDatabase() {
        wordRepository.deleteAll();
    }
}

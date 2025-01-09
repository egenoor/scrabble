package com.ege.scrabble.service;

import com.ege.scrabble.entity.Word;
import com.ege.scrabble.exception.DuplicateException;
import com.ege.scrabble.repository.ScrabbleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WordService {
    @Autowired
    ScrabbleRepository scrabbleRepository;

    public void addDictionaryWordsToDb(List<String> wordList) {
        scrabbleRepository.deleteAll();
        ArrayList<Word> wordsEntities = new ArrayList<Word>();
        for (String word : wordList) {
            Word wordToSave = new Word();
            wordToSave.setWord(word);
            wordsEntities.add(wordToSave);
        }
        scrabbleRepository.saveAll(wordsEntities);
    }

    public void addWordToDictionary(String word) throws DuplicateException {
        if (scrabbleRepository.existsByWord(word)) {
            throw new DuplicateException("Word already exists in dictionary");
        }
        Word wordToAdd = new Word(word);
        scrabbleRepository.save(wordToAdd);
    }
}

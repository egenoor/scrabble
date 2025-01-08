package com.ege.scrabble;

import com.ege.scrabble.service.FileService;
import com.ege.scrabble.service.WordService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class ScrabbleApplication {
	@Autowired
    WordService wordService;

	@Autowired
	FileService fileService;

	@PostConstruct
	public void initWordDb() {
		List<String> wordList;
		wordList = fileService.readFileInList();
		wordService.addDictionaryWordsToDb(wordList);
	}

	public static void main(String[] args) {
		SpringApplication.run(ScrabbleApplication.class, args);
	}

}

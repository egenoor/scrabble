package com.ege.scrabble;

import com.ege.scrabble.service.FileService;
import com.ege.scrabble.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class ScrabbleApplication {

	public static void main(String[] args) {

		SpringApplication.run(ScrabbleApplication.class, args);

		List<String> wordList;
		wordList = FileService.readFileInList();
		WordService.addDictionaryWordsToDb(wordList);
	}

}

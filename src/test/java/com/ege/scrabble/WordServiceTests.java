package com.ege.scrabble;

import com.ege.scrabble.exception.NotFoundException;
import com.ege.scrabble.repository.ScrabbleRepository;
import com.ege.scrabble.service.FileService;
import com.ege.scrabble.service.WordService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class WordServiceTests {
    @Mock
    ScrabbleRepository scrabbleRepository;

    @InjectMocks
    WordService wordService;

    @Mock
    FileService fileService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void whenApplicationIsStarted_AddWordsFromDictionaryToDb() {
        List<String> input = Arrays.asList(
            "almond",
            "beaver",
            "cougar"
        );
        when(fileService.readFileInList()).thenReturn(input);
        when(scrabbleRepository.saveAll(any())).thenReturn(Collections.emptyList());

        List<String> mockedWords = fileService.readFileInList();
        wordService.addDictionaryWordsToDb(mockedWords);

        verify(scrabbleRepository, times(1)).deleteAll();
        verify(scrabbleRepository, times(1)).saveAll(any());
    }
    @Test
    void calculateScore_WhenWordExists_ShouldReturnCorrectScore() throws NotFoundException {
        String word = "ALMOND";
        when(scrabbleRepository.existsByWordIgnoreCase(word)).thenReturn(true);

        int score = wordService.calculateScore(word);
        assertEquals(9, score);
    }

    @Test
    void calculateScore_WhenWordDoesNotExist_ShouldThrowNotFoundException() {
        String word = "UNKNOWN";
        when(scrabbleRepository.existsByWordIgnoreCase(word)).thenReturn(false);
        NotFoundException exception = assertThrows(NotFoundException.class,
                () -> wordService.calculateScore(word)
        );
        assertEquals("Word does not exist in dictionary", exception.getMessage());
        verify(scrabbleRepository, never()).save(any());
    }

    @Test
    void calculateScore_ShouldIgnoreCaseSensitivity() throws NotFoundException {
        String word = "bad";
        when(scrabbleRepository.existsByWordIgnoreCase(word)).thenReturn(true);
        int score = wordService.calculateScore(word);

        assertEquals(6, score);
    }

    @Test
    void calculateScore_WhenWordHasUnknownLetter_ShouldIgnoreUnknownLetters() throws NotFoundException {
        String word = "BA@D";
        when(scrabbleRepository.existsByWordIgnoreCase(word)).thenReturn(true);
        int score = wordService.calculateScore(word);
        assertEquals(6, score);
    }

    @Test
    void whenDuplicateWordIsBeingSaved_ThrowDuplicateException() {

    }
}

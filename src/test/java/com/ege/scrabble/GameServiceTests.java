package com.ege.scrabble;

import com.ege.scrabble.exception.NotFoundException;
import com.ege.scrabble.repository.ScrabbleRepository;
import com.ege.scrabble.service.GameService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Map;

public class GameServiceTests {
    @Mock
    ScrabbleRepository scrabbleRepository;

    @InjectMocks
    GameService gameService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        gameService.initLetterValues();
    }

    @Test
    void initLetterValues_ShouldInitializeCorrectly() {
        gameService.initLetterValues();

        Map<String, Integer> letterValues = gameService.letterValues;
        assertNotNull(letterValues);
        assertEquals(1, letterValues.get("E"));
        assertEquals(10, letterValues.get("Z"));
        assertEquals(5, letterValues.get("K"));
    }

    @Test
    void calculateWord_WhenWordExists_ShouldReturnCorrectScore() throws NotFoundException {
        String word = "ALMOND";
        when(scrabbleRepository.existsByWordIgnoreCase(word)).thenReturn(true);

        int score = gameService.calculateWord(word);
        assertEquals(9, score);
    }

    @Test
    void calculateWord_WhenWordDoesNotExist_ShouldThrowNotFoundException() {
        String word = "UNKNOWN";
        when(scrabbleRepository.existsByWordIgnoreCase(word)).thenReturn(false);
        NotFoundException exception = assertThrows(NotFoundException.class,
                () -> gameService.calculateWord(word)
        );
        assertEquals("Word does not exist in dictionary", exception.getMessage());
        verify(scrabbleRepository, never()).save(any());
    }

    @Test
    void calculateWord_ShouldIgnoreCaseSensitivity() throws NotFoundException {
        String word = "bad";
        when(scrabbleRepository.existsByWordIgnoreCase(word)).thenReturn(true);
        int score = gameService.calculateWord(word);

        assertEquals(6, score);
    }

    @Test
    void calculateWord_WhenWordHasUnknownLetter_ShouldIgnoreUnknownLetters() throws NotFoundException {
        String word = "BA@D";
        when(scrabbleRepository.existsByWordIgnoreCase(word)).thenReturn(true);
        int score = gameService.calculateWord(word);
        assertEquals(6, score);
    }
}

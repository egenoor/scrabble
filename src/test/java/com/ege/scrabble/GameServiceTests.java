package com.ege.scrabble;

import com.ege.scrabble.repository.ScrabbleRepository;
import com.ege.scrabble.service.GameService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class GameServiceTests {
    @Mock
    ScrabbleRepository scrabbleRepository;

    @InjectMocks
    GameService gameService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void whenANewWordIsBeingSubmitted_SaveToDb() {

    }
}

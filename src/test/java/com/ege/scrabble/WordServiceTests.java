package com.ege.scrabble;

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
import org.springframework.test.context.TestPropertySource;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@TestPropertySource(locations="classpath:application.properties")
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
        List<String> input = Arrays.asList("almond",
                "beaver",
                "cougar"
        );
        when(fileService.readFileInList()).thenReturn(input);
        List<String> mockedWords = fileService.readFileInList();
        assertEquals(input, mockedWords);
        when(scrabbleRepository.saveAll(any())).thenReturn(Collections.emptyList());
        wordService.addDictionaryWordsToDb(mockedWords);

        verify(fileService, times(1)).readFileInList();
    }

//    @Test
//    void whenWordListIsEmpty_NoWordsAreSaved() {
//
//    }

    @Test
    void whenDuplicateWordIsBeingSaved_ThrowDuplicateException() {

    }

}

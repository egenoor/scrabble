package com.ege.scrabble;

import com.ege.scrabble.controller.GameController;
import com.ege.scrabble.exception.NotFoundException;
import com.ege.scrabble.service.GameService;
import com.ege.scrabble.service.WordService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class GameControllerTests {
    private MockMvc mvc;

    @Mock
    GameService gameService;

    @Mock
    WordService wordService;

    @InjectMocks
    GameController gameController;

    @BeforeEach
    void setUp() {
        mvc = MockMvcBuilders.standaloneSetup(gameController).build();
    }

    @Test
    void calculateWordWithNoParameter_ReturnsBadRequest() throws Exception {
        MockHttpServletResponse response = mvc
                .perform(MockMvcRequestBuilders.post("/api/scrabble/calculate"))
                .andReturn()
                .getResponse();
        assertEquals(HttpStatus.BAD_REQUEST.value(), response.getStatus());
    }

    @Test
    void calculateWordWithParameter_ReturnsOk() throws Exception {
        String word = "film";
        MockHttpServletResponse response = mvc.perform(MockMvcRequestBuilders
                        .post("/api/scrabble/calculate")
                        .param("word", word))
                        .andReturn().getResponse();
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }

    @Test
    void addWordToDictionaryWithNoParameter_ReturnsBadRequest() throws Exception {
        MockHttpServletResponse response = mvc
                .perform(MockMvcRequestBuilders.post("/api/scrabble/add"))
                .andReturn()
                .getResponse();
        assertEquals(HttpStatus.BAD_REQUEST.value(), response.getStatus());
    }

    @Test
    void addWordToDictionaryWithParameter_ReturnsOk() throws Exception {
        String word = "film";
        MockHttpServletResponse response = mvc.perform(MockMvcRequestBuilders
                        .post("/api/scrabble/add")
                        .param("word", word))
                .andReturn().getResponse();
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }
}

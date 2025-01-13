package com.ege.scrabble;

import com.ege.scrabble.controller.ScrabbleController;
import com.ege.scrabble.service.WordService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class ScrabbleControllerTests {
    private MockMvc mvc;

    @Mock
    WordService wordService;

    @InjectMocks
    ScrabbleController scrabbleController;

    @BeforeEach
    void setUp() {
        mvc = MockMvcBuilders.standaloneSetup(scrabbleController).build();
    }

    @Test
    void calculateScoreWithNoBody_ReturnsBadRequest() throws Exception {
        MockHttpServletResponse response = mvc
                .perform(
                    MockMvcRequestBuilders
                        .post("/api/scrabble/calculate-score")
                        .contentType(MediaType.APPLICATION_JSON)
                )
                .andReturn()
                .getResponse();
        assertEquals(HttpStatus.BAD_REQUEST.value(), response.getStatus());
    }

    @Test
    void calculateScoreWithBody_ReturnsOk() throws Exception {
        String body = "{\"word\": \"film\"}";

        MockHttpServletResponse response = mvc.perform(
            MockMvcRequestBuilders
                .post("/api/scrabble/calculate-score")
                .contentType(MediaType.APPLICATION_JSON)
                .content(body)
        ).andReturn().getResponse();

        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }

    @Test
    void calculateScoreWithInvalidBody_ThrowsBadRequest() throws Exception {
        ArrayList<String> invalidValues = new ArrayList<String>();
        invalidValues.add("{\"word\": \"\"}");
        invalidValues.add("{\"word\": \"1373H\"}");
        invalidValues.add("{\"word\": null}");
        for (String v: invalidValues) {
            MockHttpServletResponse response = mvc.perform(
                    MockMvcRequestBuilders
                            .post("/api/scrabble/calculate-score")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(v)
            ).andReturn().getResponse();
            assertEquals(HttpStatus.BAD_REQUEST.value(), response.getStatus());
        }
    }

    @Test
    void addWordToDictionaryWithNoBody_ReturnsBadRequest() throws Exception {
        MockHttpServletResponse response = mvc.perform(
            MockMvcRequestBuilders
                .post("/api/scrabble/word")
                .contentType(MediaType.APPLICATION_JSON)
        )
        .andReturn()
        .getResponse();

        assertEquals(HttpStatus.BAD_REQUEST.value(), response.getStatus());
    }

    @Test
    void addWordToDictionaryWithBody_ReturnsOk() throws Exception {
        String body = "{\"word\": \"film\"}";
        System.out.println(body);

        MockHttpServletResponse response = mvc.perform(MockMvcRequestBuilders
            .post("/api/scrabble/word")
            .contentType(MediaType.APPLICATION_JSON)
            .content(body)
        ).andReturn().getResponse();

        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }
}

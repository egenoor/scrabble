package com.ege.scrabble.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collections;
import java.util.List;

@Service
public class FileService {
    @Value(("${dictionary.path}"))
    String dictionaryPath;

    public List<String> readFileInList()
    {
        List<String> lines = Collections.emptyList();
        try {
            lines = Files.readAllLines(
                    Paths.get(dictionaryPath),
                    StandardCharsets.UTF_8);
        } catch(IOException e) {
            e.printStackTrace();
        }

        return lines;
    }
}

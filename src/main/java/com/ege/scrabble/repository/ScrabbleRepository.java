package com.ege.scrabble.repository;

import com.ege.scrabble.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScrabbleRepository extends JpaRepository<Word, String> {

    boolean existsByWord(String word);
}

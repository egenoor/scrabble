package com.ege.scrabble.repository;

import com.ege.scrabble.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {
}

package com.ege.scrabble.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionCatcher {
    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorMessage> HandleValidationException(ValidationException e) {
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setMessage(e.getMessage());
        return ResponseEntity.badRequest().body(errorMessage);
    }
}

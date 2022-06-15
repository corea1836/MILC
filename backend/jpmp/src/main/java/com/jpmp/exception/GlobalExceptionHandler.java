package com.jpmp.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;
import javax.validation.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;
import static com.jpmp.exception.ValidationErrorResponse.Error;
/**
    Exception 처리
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ErrorResponse> handleCustomException(CustomException ex, HttpServletRequest request) {
        System.out.println("GlobalExceptionHandler 31 request : " + request);
        log.error("handleCustomException throws CustomException : {}", ex.getErrorCode());
        return ErrorResponse.toResponseEntity(request, ex.getErrorCode());
    }
    @ExceptionHandler(CustomSecurityException.class)
    public ResponseEntity<ErrorResponse> handleCustomSecurityException(CustomException ex, HttpServletRequest request) {
        System.out.println("GlobalExceptionHandler 31 request : " + request);
        log.error("handleCustomException throws CustomException : {}", ex.getErrorCode());
        return ErrorResponse.toResponseEntity(request, ex.getErrorCode());
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleMethodArgNotValidException(MethodArgumentNotValidException ex, HttpServletRequest request) {
        List<Error> errors = new ArrayList<>();

        BindingResult bindingResult = ex.getBindingResult();
        bindingResult.getAllErrors().forEach(error -> {
            FieldError field = (FieldError) error;

            String fieldName = field.getField();
            String message = field.getDefaultMessage();
            String value = Objects.requireNonNull(field.getRejectedValue()).toString();

            Error errorMessage = new Error();
            errorMessage.setField(fieldName);
            errorMessage.setMessage(message);
            errorMessage.setInvalidValue(value);
            errors.add(errorMessage);
        });

        log.error("handleMethodArgNotValidException throws ValidationErrorResponse : {}", ex.getMessage());
        return ValidationErrorResponse.toResponseEntity(request, errors);
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    public ResponseEntity<ValidationErrorResponse> handleConstraintViolationException(ConstraintViolationException ex, HttpServletRequest request) {
        List<Error> errors = new ArrayList<>();

        ex.getConstraintViolations().forEach(error -> {
            Stream<Path.Node> stream = StreamSupport.stream(error.getPropertyPath().spliterator(), false);
            List<Path.Node> list = stream.collect(Collectors.toList());

            String fieldName = list.get(list.size() - 1).getName();
            String message = error.getMessage();
            String value = error.getInvalidValue().toString();

            Error errorMessage = new Error();
            errorMessage.setField(fieldName);
            errorMessage.setMessage(message);
            errorMessage.setInvalidValue(value);
            errors.add(errorMessage);
        });

        log.error("handleConstraintViolationException throws ValidationErrorResponse : {}", ex.getMessage());
        return ValidationErrorResponse.toResponseEntity(request, errors);
    }

    @ExceptionHandler(value = MissingServletRequestParameterException.class)
    public ResponseEntity<ValidationErrorResponse> MissingServletRequestParameterException(MissingServletRequestParameterException ex, HttpServletRequest request) {
        List<Error> errors = new ArrayList<>();
        String fieldName = ex.getParameterName();

        Error errorMessage = new Error();
        errorMessage.setField(fieldName);
        errorMessage.setMessage(ex.getMessage());
        errors.add(errorMessage);

        log.error("handleMissingServletRequestParameterException throws ValidationErrorResponse : {}", ex.getMessage());
        return ValidationErrorResponse.toResponseEntity(request, errors);
    }
}

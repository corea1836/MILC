package com.jpmp.exception;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Data
@Builder
public class ValidationErrorResponse {
    private final String requestUrl;
    private final int status;
    private final String error;

    private List<Error> errorList;

    @Data
    @NoArgsConstructor
    static class Error {
        private String field;
        private String message;
        private String invalidValue;
    }

    public static ResponseEntity<ValidationErrorResponse> toResponseEntity(
            HttpServletRequest request,
            List<Error> errors
            ) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ValidationErrorResponse.builder()
                        .requestUrl(request.getRequestURI())
                        .status(HttpStatus.BAD_REQUEST.value())
                        .error(HttpStatus.BAD_REQUEST.toString())
                        .errorList(errors)
                        .build()
                );
    }
}
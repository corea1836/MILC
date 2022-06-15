package com.jpmp.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.security.GeneralSecurityException;

@Getter
@AllArgsConstructor
public class CustomSecurityException extends GeneralSecurityException {
    private final ErrorCode errorCode;
}

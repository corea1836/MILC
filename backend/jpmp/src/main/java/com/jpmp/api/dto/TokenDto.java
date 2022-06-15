package com.jpmp.api.dto;

import com.jpmp.common.auth.JwtHeaderUtilEnums;
import com.jpmp.db.entity.user.User;
import lombok.*;


@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class TokenDto {

    private String grantType;
    private String accessToken;
    private String refreshToken;
    private User user;

    public static TokenDto of(String accessToken, String refreshToken , User user) {
        return TokenDto.builder()
                .grantType(JwtHeaderUtilEnums.GRANT_TYPE.getValue())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .user(user)
                .build();
    }


    public static TokenDto of(String accessToken, String refreshToken) {
        return TokenDto.builder()
                .grantType(JwtHeaderUtilEnums.GRANT_TYPE.getValue())
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }
}

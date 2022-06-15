package com.jpmp.api.dto.response.user;

import com.jpmp.api.dto.UserInfoDto;
import com.jpmp.api.dto.response.BaseResponseBody;
import com.jpmp.db.entity.user.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserLoginResponse")
public class UserLoginResDto extends BaseResponseBody {

    @ApiModelProperty(name="JWT 인증 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
    private String accessToken;

    @ApiModelProperty(name="JWT refresh 토큰", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
    private String refreshToken;

    private UserInfoDto user;

    public static UserLoginResDto of(Integer statusCode, String message, String accessToken, String refreshToken , User user ) {
        UserLoginResDto res = new UserLoginResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        res.setUser(UserInfoDto.of(user));
        res.setRefreshToken(refreshToken);
        return res;
    }

    public static UserLoginResDto of(Integer statusCode, String message, String accessToken) {
        UserLoginResDto res = new UserLoginResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        return res;
    }
}

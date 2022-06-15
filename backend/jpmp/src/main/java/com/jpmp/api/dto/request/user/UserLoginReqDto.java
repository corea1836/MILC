package com.jpmp.api.dto.request.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@ToString
public class UserLoginReqDto {

    @NotBlank
    @ApiModelProperty(name = "유저 email", example = "user@naver.com")
    private String email;

    @ApiModelProperty(name = "유저 Password", example = "your_password")
    private String password;




}

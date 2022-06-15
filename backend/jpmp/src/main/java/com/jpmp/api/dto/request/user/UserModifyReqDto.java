package com.jpmp.api.dto.request.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

import javax.validation.constraints.*;

@Getter
public class UserModifyReqDto {

    @Email
    @ApiModelProperty(name = "유저 Email", example = "user@naver.com")
    private String email;

    @NotBlank
    @ApiModelProperty(name = "닉네임", example = "냠냠")
    private String nickname;

    @ApiModelProperty(name = "이름", example = "장현진")
    private String userName;


    @ApiModelProperty(name = "전화번호", example = "010-1234-5678")
    private String phone;

    @ApiModelProperty(name = "자기 소개")
    private String description;

    @ApiModelProperty(name = "주소1")
    private String address1;
    @ApiModelProperty(name = "주소2")
    private String address2;

    @ApiModelProperty(name = "우편번호")
    private String zipCode;

}
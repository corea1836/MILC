package com.jpmp.api.dto.request.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@ToString
public class UserWalletReqDto {

    @NotBlank
    @ApiModelProperty(name = "유저 지갑 주소 ", example = "0x0x0")
    private String wallet;

}

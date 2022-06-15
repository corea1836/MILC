package com.jpmp.api.dto.request.user;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@ToString
public class UserImgReqDto {

    @NotBlank
    @ApiModelProperty(name = "유저 img Url ", example = "String")
    private String imgUrl;

}

package com.jpmp.api.dto.request.nft;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@ToString
public class NtfRequestReqDto {


    @ApiModelProperty(name = "유저 nftId", example = "zxs123123123")
    private String nftId;


}

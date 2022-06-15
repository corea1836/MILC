package com.jpmp.api.dto.request.nft;

import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@Builder
public class NFTReqDto {

    @NotBlank
    @ApiModelProperty(name = "유저 nftId", example = "zxs123123123")
    private String nftId;

    @NotBlank
    @ApiModelProperty(name = "nftName", example = "구찌 가방")
    private String nftName;


    @ApiModelProperty(name = "가격", example = "123123")
    private int price;

    @NotBlank
    @ApiModelProperty(name = "이미지 Url", example = "http~~~~")
    private String imgUrl;


}

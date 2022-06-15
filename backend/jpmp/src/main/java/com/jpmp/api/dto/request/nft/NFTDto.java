package com.jpmp.api.dto.request.nft;

import com.jpmp.db.entity.nft.Nft;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
@Builder
public class NFTDto {


    @ApiModelProperty(name = "유저 nftId", example = "zxs123123123")
    private String nftId;


    @ApiModelProperty(name = "nftName", example = "구찌 가방")
    private String nftName;


    @ApiModelProperty(name = "가격", example = "123123")
    private int price;

    @ApiModelProperty(name = "이미지 Url", example = "http~~~~")
    private String imgUrl;


    @ApiModelProperty(example = "전달 xxxxxx")
    private Boolean realStatus;

    @ApiModelProperty(example = "전달 xxxxxx")
    private Boolean seleStatus;

    @ApiModelProperty(example = "1")
    private int likeCount;

    @ApiModelProperty(example = "전달xxxxxx")
    private String owner;

    @ApiModelProperty(example = "전달 xxxxxx")
    private String enterprise;

    @ApiModelProperty(example = "전달 xxxxxx")
    private Boolean myLike;

    public static NFTDto of(Nft nft , Boolean like) {

        return NFTDto.builder()
                .nftId(nft.getNftId())
                .nftName(nft.getNftName())
                .price(nft.getPrice())
                .realStatus(nft.getRealizationStatus())
                .seleStatus(nft.getSeleStatus())
                .owner(nft.getOwner().getNickname())
                .enterprise(nft.getEnterprise().getNickname())
                .likeCount(nft.getLikeCount())
                .myLike(like)
                .imgUrl(nft.getImgUrl())
                .build();
    }

    public static NFTDto of(Nft nft ) {

        return NFTDto.builder()
                .nftId(nft.getNftId())
                .nftName(nft.getNftName())
                .price(nft.getPrice())
                .realStatus(nft.getRealizationStatus())
                .seleStatus(nft.getSeleStatus())
                .owner(nft.getOwner().getNickname())
                .enterprise(nft.getEnterprise().getNickname())
                .likeCount(nft.getLikeCount())
                .myLike(false)
                .imgUrl(nft.getImgUrl())
                .build();
    }
}

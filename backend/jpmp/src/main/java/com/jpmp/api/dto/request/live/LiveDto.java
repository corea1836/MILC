package com.jpmp.api.dto.request.live;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.jpmp.api.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.time.LocalTime;

@Data
@Getter
@Setter
@ToString
public class LiveDto {

    @ApiModelProperty(name = "경매방 Id", hidden = true)
    private int roomId;

    @ApiModelProperty(name = "유저 Id", example = "4")
    private int userId;

    @ApiModelProperty(name = "유저 nickname", example = "test")
    private String nickname;

    @ApiModelProperty(name = "cloudflareKey", example = "키값")
    private String cfKey;

    @ApiModelProperty(name = "cloudflareId", example = "아이디값")
    private String cfId;

    @ApiModelProperty(name = "cloudflareUrl", example = "url값")
    private String cfUrl;

    @ApiModelProperty(name = "경매방 이름", example = "구찌가방")
    private String roomName;

    @ApiModelProperty(name = "시작가격", example = "123456")
    private int startprice;

    @ApiModelProperty(name = "진행시간", example = "30")
    private int runtime;

    @ApiModelProperty(example = "값 전달 하지 마세요!!!!!",  hidden = true)
    private boolean finish;

    @ApiModelProperty(name = "nft 아이디", example = "nft id")
    private String nftId;

    @ApiModelProperty(name = "시작시간", example = "123456")
    private long starttime;
}

package com.jpmp.api.dto.response.live;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class LiveNftResDto {

    private int roomId;

    private int userId;

    private String nickname;

    private String cfKey;

    private String cfId;

    private String cfUrl;

    private String roomName;

    private int startprice;

    private int runtime;

    private boolean finish;

    private String nftId;

    private long starttime;

    private long id;

    private String imgUrl;
    private String nftName;
    private int price;
    private boolean realiztionStatus;
    private boolean seleStatus;
    private long enterprise;
    private long owner;
}

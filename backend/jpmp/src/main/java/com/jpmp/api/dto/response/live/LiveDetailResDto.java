package com.jpmp.api.dto.response.live;

import com.jpmp.api.dto.request.live.LiveDto;
import com.jpmp.api.dto.response.BaseResponseBody;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Data
@Getter
@Setter
@ToString
public class LiveDetailResDto extends BaseResponseBody {

    @ApiModelProperty(name="경매방 정보")
    private LiveNftResDto liveNftResDto;

    @ApiModelProperty(name="최고 입찰가")
    private int maxCost;



    public static LiveDetailResDto of(Integer statusCode, String message, LiveNftResDto dto, int maxcost) {
        LiveDetailResDto res = new LiveDetailResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setLiveNftResDto(dto);
        res.setMaxCost(maxcost);
        return res;
    }
}

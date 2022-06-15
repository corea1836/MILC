package com.jpmp.api.dto.response.live;

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
public class LiveResDto extends BaseResponseBody {

    @ApiModelProperty(name="경매방 Id", example = "1")
    private int roomId;

    public static LiveResDto of(Integer statusCode, String message, int roomId) {
        LiveResDto res = new LiveResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRoomId(roomId);
        return res;
    }
}

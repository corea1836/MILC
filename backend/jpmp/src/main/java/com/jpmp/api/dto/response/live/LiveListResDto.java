package com.jpmp.api.dto.response.live;

import com.jpmp.api.dto.request.live.LiveDto;
import com.jpmp.api.dto.response.BaseResponseBody;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Data
@Getter
@Setter
@ToString
public class LiveListResDto extends BaseResponseBody {

    private List<LiveNftResDto> liveNftResDtoList;

    public static LiveListResDto of(Integer statusCode, String message, List<LiveNftResDto> liveList) {
        LiveListResDto res = new LiveListResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setLiveNftResDtoList(liveList);
        return res;
    }

    public void setLiveNftResDtoList(List<LiveNftResDto> liveList) {
        liveNftResDtoList = new ArrayList<>();
        for (int i =0 ; i < liveList.size() ; i ++){
            liveNftResDtoList.add(liveList.get(i));
        }
    }

}

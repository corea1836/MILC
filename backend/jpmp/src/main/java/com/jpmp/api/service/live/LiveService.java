package com.jpmp.api.service.live;

import com.jpmp.api.dto.request.live.LiveDto;
import com.jpmp.api.dto.response.live.LiveNftResDto;

import java.util.List;

public interface LiveService {
    public void register(LiveDto dto);

    public List<LiveNftResDto> getLiveList();

    void finishLive(int roomId);

    public LiveNftResDto getLive(int roomId);

    public int getmaxCost(int roomId);
}

package com.jpmp.api.dao;

import com.jpmp.api.dto.request.live.LiveDto;
import com.jpmp.api.dto.response.live.LiveNftResDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LiveDao {
    public void register(LiveDto dto);

    public List<LiveNftResDto> getLiveList();

    void finishLive(int roomId);

    public LiveNftResDto getLive(int roomId);

    public int getmaxCost(int roomId);
}

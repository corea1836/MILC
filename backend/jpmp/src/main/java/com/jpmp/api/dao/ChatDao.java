package com.jpmp.api.dao;

import com.jpmp.api.dto.response.chat.ChatResDto;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ChatDao {
    public void addCost(ChatResDto tmpDto);

    public ChatResDto maxCost(int roomId);
}

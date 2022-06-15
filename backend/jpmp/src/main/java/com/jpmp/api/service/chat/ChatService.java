package com.jpmp.api.service.chat;

import com.jpmp.api.dto.response.chat.ChatResDto;

public interface ChatService {
    void addCost(ChatResDto tmpDto);

    ChatResDto maxCost(int roomId);
}

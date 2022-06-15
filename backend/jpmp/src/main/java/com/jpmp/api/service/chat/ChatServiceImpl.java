package com.jpmp.api.service.chat;

import com.jpmp.api.dao.ChatDao;
import com.jpmp.api.dto.response.chat.ChatResDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements ChatService{

    @Autowired
    ChatDao chatDao;

    @Override
    public void addCost(ChatResDto tmpDto) {
        chatDao.addCost(tmpDto);
    }

    @Override
    public ChatResDto maxCost(int roomId) {
        return chatDao.maxCost(roomId);
    }
}

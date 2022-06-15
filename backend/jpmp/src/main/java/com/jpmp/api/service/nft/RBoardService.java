package com.jpmp.api.service.nft;

import com.jpmp.api.dto.request.nft.NtfRequestReqDto;

import com.jpmp.api.dto.request.rBoard.RBoardReqDto;
import com.jpmp.db.entity.board.RealizationBoard;
import com.jpmp.db.entity.user.User;

import java.util.List;


public interface RBoardService {

    void addRBorad(User user, NtfRequestReqDto ntfRequestReqDto);



    List<RealizationBoard> getUserRBoradList(User user);

    List<RealizationBoard> getEnterpriseRBoradList(User user);

    void changeEnterpriseRBoradStatus(User user, RBoardReqDto rBoardReqDto);
}
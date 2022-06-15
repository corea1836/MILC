package com.jpmp.api.service.nft;

import com.jpmp.api.dto.request.nft.NtfRequestReqDto;

import com.jpmp.api.dto.request.rBoard.RBoardReqDto;
import com.jpmp.db.entity.board.RealizationBoard;
import com.jpmp.db.entity.nft.Nft;
import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.nft.NFTRepository;
import com.jpmp.db.repository.nft.RBoardRepository;
import com.jpmp.db.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class RBoardServiceImpl implements RBoardService {

    private final UserRepository userRepository;
    private final RBoardRepository rBoradRepository;
    private final NFTRepository nftRepository;

    @Override
    public void addRBorad(User user, NtfRequestReqDto ntfRequestReqDto) {


        Nft nft = nftRepository.findByNftId(ntfRequestReqDto.getNftId()).get();
        User enterprise = nft.getEnterprise();

        RealizationBoard realizationBoard = new RealizationBoard(nft , user , enterprise );

        rBoradRepository.save(realizationBoard);
    }

    @Override
    public List<RealizationBoard> getUserRBoradList(User user) {

        return user.getConsumerBoards();
    }

    @Override
    public List<RealizationBoard> getEnterpriseRBoradList(User user) {

        return user.getEnterpriseBoards();
    }

    @Override
    public void changeEnterpriseRBoradStatus(User user, RBoardReqDto rBoardReqDto) {


        System.out.println(rBoardReqDto.getRBoardId());
        RealizationBoard realizationBoard = rBoradRepository.findById(rBoardReqDto.getRBoardId()).get();

        realizationBoard.changeStatus(rBoardReqDto.getRBoardStatus());

        rBoradRepository.save(realizationBoard);
    }
}

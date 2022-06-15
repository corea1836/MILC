package com.jpmp.db.repository.nft;


import com.jpmp.db.entity.board.RealizationBoard;
import com.jpmp.db.entity.nft.Nft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface RBoardRepository extends JpaRepository<RealizationBoard, Long> {


    @Transactional(readOnly = true)
    Optional<RealizationBoard> findById(String nftId);



}
package com.jpmp.db.repository.nft;

import com.jpmp.api.dto.request.nft.NFTSearchReqDto;
import com.jpmp.db.entity.nft.Nft;
import com.jpmp.db.entity.user.User;
import com.querydsl.core.Tuple;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface NFTQueryRepository {

    Page<Nft> findByNFTSearchDto(NFTSearchReqDto reqDto, Pageable pageable);

    List<Nft> findByCoustomUserLikes(User userDetails);


    List<Tuple> findByNft(User userDetails);

}

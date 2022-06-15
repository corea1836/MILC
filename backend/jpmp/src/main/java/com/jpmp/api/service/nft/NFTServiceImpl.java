package com.jpmp.api.service.nft;

import com.jpmp.api.dto.request.nft.NFTDto;
import com.jpmp.api.dto.request.nft.NFTReqDto;
import com.jpmp.api.dto.request.nft.NFTSearchReqDto;
import com.jpmp.db.entity.nft.Nft;
import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.nft.NFTQueryRepository;
import com.jpmp.db.repository.nft.NFTRepository;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NFTServiceImpl implements NFTService {


    private final NFTRepository nftRepository;
    private final NFTQueryRepository nftQueryRepository;

    @Override
    public void createNFT(User user, NFTReqDto nftDto) {

        Nft nft = Nft.ofCreateNft(user, nftDto);
        nft.addNFT(user);
        nftRepository.save(nft);

    }

    @Override
    public void transferNFT(User userDetails, NFTDto nftDto) {

        Nft nft = nftRepository.findByNftId(nftDto.getNftId()).get();// 컨텍스트는 한 트렉젝션 내애서만 유지됨
        nft.buyNFT(userDetails);
        nftRepository.save(nft);
    }

    @Override
    public void sellNFT(User userDetails, NFTDto nftDto) {

        Nft nft = nftRepository.findByNftId(nftDto.getNftId()).get();// 컨텍스트는 한 트렉젝션 내애서만 유지됨
        nft.sellNFT(userDetails);
        nftRepository.save(nft);
    }


    @Override
    public List<Nft> getNftList(User userDetails) {
        System.out.println("nft controller  40 : " + userDetails.getNftList().size());
        return userDetails.getNftList();
    }

    @Override
    public List<Tuple> getNftMyList(User userDetails) {
        System.out.println("nft controller  40 : " + userDetails.getNftList().size());
        return nftQueryRepository.findByNft(userDetails);
    }


    @Override
    public List<Nft> getNftLikeList(User userDetails) {
        return nftQueryRepository.findByCoustomUserLikes(userDetails);
    }

    @Override
    public Page<Nft> getNftList(NFTSearchReqDto nftSearchReqDto, Pageable pageable) {
        return nftQueryRepository.findByNFTSearchDto(nftSearchReqDto , pageable);
    }

    @Override///////// 필요없는거
    public void getNftList(User userDetails, Boolean ownerIsEnterprise) {
        nftRepository.findByOwnerIsEnterprise(ownerIsEnterprise);
    }
}

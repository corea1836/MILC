package com.jpmp.db.repository.nft;



import com.jpmp.db.entity.nft.Nft;
import com.jpmp.db.entity.nft.NftUserLike;
import com.jpmp.db.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface NFTLikeRepository extends JpaRepository<NftUserLike, Long> {


    @Modifying(clearAutomatically = true)
    void deleteByUserAndNft(User user, Nft nft);

}
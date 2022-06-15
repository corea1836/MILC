package com.jpmp.db.repository.nft;



import com.jpmp.db.entity.nft.Nft;
import com.jpmp.db.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Transactional
public interface NFTRepository extends JpaRepository<Nft, Long> {

    @Transactional(readOnly = true)
    Optional<Nft> findByNftId(String nftId);

    @Transactional(readOnly = true)
    Optional<Nft> findByOwnerIsEnterprise(Boolean ownerIsEnterprise);

}
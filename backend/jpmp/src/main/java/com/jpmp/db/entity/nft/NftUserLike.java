package com.jpmp.db.entity.nft;


import com.jpmp.db.entity.user.User;
import lombok.*;

import javax.persistence.*;


@Builder
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class NftUserLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nft", referencedColumnName = "id")
    private Nft nft;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user", referencedColumnName = "id")
    private User user;

    public void addNFTLikeList(User user) {
        this.user = user;
        user.getNftUserLikes().add(this);
    }

    public static NftUserLike ofCreateNftLike(User user , Nft nft) {

        NftUserLike nftUserLike =  NftUserLike.builder()
                .nft(nft)
                .build();

        nftUserLike.addNFTLikeList(user);
        return nftUserLike;
    }




}

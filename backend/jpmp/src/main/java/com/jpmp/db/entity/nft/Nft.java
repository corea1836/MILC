package com.jpmp.db.entity.nft;


import com.jpmp.api.dto.request.nft.NFTDto;
import com.jpmp.api.dto.request.nft.NFTReqDto;
import com.jpmp.db.entity.user.User;
import lombok.*;



import javax.persistence.*;


@Builder
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Nft {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nftId;


    @Column(nullable = false)
    private String nftName;


    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private Boolean ownerIsEnterprise;

    @Column(nullable = false)
    private Boolean seleStatus;

    @Column(nullable = false)
    private Boolean realizationStatus;

    private String imgUrl;

    private int likeCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner", referencedColumnName = "id")
    private User owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enterprise", referencedColumnName = "id")
    private User enterprise;


    public static Nft ofCreateNft(User owner , NFTReqDto nftDto) {
        return Nft.builder()
                .nftId(nftDto.getNftId())
                .nftName(nftDto.getNftName())
                .price(nftDto.getPrice())
                .imgUrl(nftDto.getImgUrl())
                .seleStatus(false)//생성 판매는 따로
                .realizationStatus(false)//생성즉시기떄문에 아직 실물화 아님
                .ownerIsEnterprise(true)// 생성시 기업소유
                .owner(owner)
                .enterprise(owner)
                .build();
    }

    public void addNFT(User owner) {

        this.owner = owner;
        owner.getNftList().add(this);
    }
    public void buyNFT(User owner) {

        this.seleStatus =false;
        this.ownerIsEnterprise = false;
        this.owner = owner;
        owner.getNftList().add(this);
    }

    public void addLike() {
        likeCount++;
    }
    public void deleteLike() {
        likeCount--;
    }
    public void sellNFT(User userDetails) {
        this.seleStatus =true;

    }
}

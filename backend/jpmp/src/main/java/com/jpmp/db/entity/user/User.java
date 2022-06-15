package com.jpmp.db.entity.user;


import com.jpmp.api.dto.request.user.UserModifyReqDto;
import com.jpmp.api.dto.request.user.UserRegisterReqDto;
import com.jpmp.db.entity.board.RealizationBoard;
import com.jpmp.db.entity.common.Authority;
import com.jpmp.db.entity.nft.Nft;
import com.jpmp.db.entity.nft.NftUserLike;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;


import javax.persistence.*;
import java.util.*;

import static java.util.stream.Collectors.toList;
import static javax.persistence.CascadeType.ALL;


@Builder
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false , unique = true)
    private String nickname;


    @Column(unique = true)
    private String username;

    @Column(nullable = false)
    private String realname;

    @Column(nullable = false)
    private String password;

    private String phone;

    //https://lng1982.tistory.com/279 Enumerated 좋지 못한 방법
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    private String description;

    private String address1;

    private String address2;

    private String zipCode;

    private String profileImg;

    private String walletAddress;

    private String backgroundfileImg;

    @OneToMany(mappedBy = "consumer", cascade = {CascadeType.PERSIST , CascadeType.REMOVE} )
    private List<RealizationBoard> consumerBoards = new ArrayList<>();

    @OneToMany(mappedBy = "enterprise", cascade = {CascadeType.PERSIST , CascadeType.REMOVE} )
    private List<RealizationBoard> enterpriseBoards = new ArrayList<>();

    @OneToMany(mappedBy = "owner", cascade = ALL  )// 이건 생각좀
    private List<Nft> nftList = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = ALL  )
    private List<NftUserLike> nftUserLikes = new ArrayList<>();




    @OneToMany(mappedBy = "member", cascade = ALL, orphanRemoval = true)
    @Builder.Default
    private Set<Authority> authorities = new HashSet<>();

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    public void changeUser(UserModifyReqDto userModifyReqDto) {

        this.address1 = userModifyReqDto.getAddress1();
        this.address2 = userModifyReqDto.getAddress2();
        this.description = userModifyReqDto.getDescription();
        this.email = userModifyReqDto.getEmail();
        this.nickname = userModifyReqDto.getNickname();
        this.phone = userModifyReqDto.getPhone();
        this.zipCode = userModifyReqDto.getZipCode();
 
    }

    public void changeUserWallet(String walletAddress) {
        this.walletAddress =walletAddress;
    }

    public void changeBackgroundfileImg(String backgroundfileImg) {
        this.backgroundfileImg = backgroundfileImg;
    }

    public void changeProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }

    private void addAuthority(Authority authority) {
        authorities.add(authority);
    }

    public List<String> getRoles() {
        return authorities.stream()
                .map(Authority::getRole)
                .collect(toList());
    }
    public static User ofUser(UserRegisterReqDto joinDto) {
        User member = User.builder()
                .username(UUID.randomUUID().toString())//username 은 jwt를 위한 유일한 값으로
                .email(joinDto.getEmail())//
                .password(joinDto.getPassword())//
                .nickname(joinDto.getNickname())//
                .realname(joinDto.getRealName())//
                .phone(joinDto.getPhone())//
                .description(joinDto.getDescription())//
                .address1(joinDto.getAddress1())//
                .address2(joinDto.getAddress2())//
                .zipCode(joinDto.getZipCode())//
                .userRole(UserRole.ROLE_CONSUMER)
                .build();

        member.addAuthority(Authority.ofUser(member));
        return member;
    }

    public static User ofAdmin(UserRegisterReqDto joinDto) {
        User member = User.builder()
                .username(UUID.randomUUID().toString())//username 은 jwt를 위한 유일한 값으로
                .email(joinDto.getEmail())//
                .password(joinDto.getPassword())//
                .nickname(joinDto.getNickname())//
                .realname(joinDto.getRealName())//
                .phone(joinDto.getPhone())//
                .description(joinDto.getDescription())//
                .address1(joinDto.getAddress1())//
                .address2(joinDto.getAddress2())//
                .zipCode(joinDto.getZipCode())//
                .userRole(UserRole.ROLE_ENTERPRISE)
                .build();

        member.addAuthority(Authority.ofAdmin(member));
        return member;
    }
}

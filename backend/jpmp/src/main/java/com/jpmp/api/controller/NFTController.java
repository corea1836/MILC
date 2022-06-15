package com.jpmp.api.controller;


import com.jpmp.api.dto.request.nft.NFTDto;
import com.jpmp.api.dto.request.nft.NFTReqDto;
import com.jpmp.api.dto.request.nft.NFTSearchReqDto;
import com.jpmp.api.dto.response.BaseResponseBody;
import com.jpmp.api.dto.response.nft.NFTListResDto;
import com.jpmp.api.dto.response.nft.NFTResDto;
import com.jpmp.api.service.nft.NFTService;
import com.jpmp.api.service.user.UserService;
import com.jpmp.common.util.JwtTokenUtil;
import com.jpmp.db.entity.nft.Nft;
import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.nft.NFTRepository;
import com.jpmp.db.repository.user.UserRepository;
import com.jpmp.exception.CustomException;
import com.jpmp.exception.ErrorCode;
import com.querydsl.core.Tuple;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.jpmp.common.util.SecurityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;


@Slf4j
@Validated
@Api(tags = "NFT")
@RestController
@RequestMapping("/api/nft")
@RequiredArgsConstructor
public class NFTController {

    private final UserService userService;

    private final NFTService nftService;
    private final UserRepository userRepository;
    private final NFTRepository nftRepository;
    private final JwtTokenUtil jwtTokenUtil;


    @PostMapping()
    @ApiOperation(value = "nft 생성", notes = "nft 생성 및 기업에 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> createNft(@ApiIgnore Authentication authentication,
                                                      @Valid @RequestBody @ApiParam(value = "nft 토큰 id", required = true) NFTReqDto nftReqDto) {
        User userDetails = userRepository.findByUsername(getUsername());

        nftService.createNFT(userDetails, nftReqDto);

        return ResponseEntity.status(200).body(new BaseResponseBody(200, "Success"));
    }

    @PutMapping()
    @ApiOperation(value = "nft 소유권 이전", notes = "nft 생성 및 기업에 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> transferNft(@ApiIgnore Authentication authentication,
                                                        @Valid @RequestBody @ApiParam(value = "nft 토큰 id", required = true) NFTDto nftDto) {

        User userDetails = userRepository.findByUsername(getUsername());
        nftService.transferNFT(userDetails, nftDto);
        return ResponseEntity.status(200).body(new BaseResponseBody(200, "Success"));

    }

    @PutMapping("/sell")
    @ApiOperation(value = "nft 판매 등록 (개인)", notes = "개인이 nft 판매등록 기업은 생성과 동시에 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> sellNft(@ApiIgnore Authentication authentication,
                                                    @Valid @RequestBody @ApiParam(value = "nft 토큰 id", required = true) NFTDto nftDto) {

        User userDetails = userRepository.findByUsername(getUsername());
        nftService.sellNFT(userDetails, nftDto);
        return ResponseEntity.status(200).body(new BaseResponseBody(200, "Success"));

    }







    @GetMapping("/user")
    @ApiOperation(value = "나의 nft 조회", notes = "자신이 소유한 nft 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<NFTListResDto> getNftMyList(@ApiIgnore Authentication authentication) {
        User userDetails = userRepository.findByUsername(getUsername());

        List<Nft> nftList = nftService.getNftList(userDetails);
        if (userDetails != null) {
            List<Nft> likeList = nftService.getNftLikeList(userDetails);
            return ResponseEntity.status(200).body(NFTListResDto.of(200, "Success", nftList, likeList));
        } else {
            return ResponseEntity.status(200).body(NFTListResDto.of(200, "Success", nftList));
        }
    }



    @GetMapping("/user/{nickname}")
    @ApiOperation(value = "타인의 nft 조회", notes = "타인이 소유한 nft 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<NFTListResDto> getNftMyListByNickname(@NotNull @PathVariable String nickname) {
        User userDetails = userRepository.findByNickname(nickname).get();

        List<Nft> nftList = nftService.getNftList(userDetails);
        User likeUser = userRepository.findByUsername(getUsername());
        if (likeUser != null) {
            List<Nft> likeList = nftService.getNftLikeList(likeUser);
            return ResponseEntity.status(200).body(NFTListResDto.of(200, "Success", nftList, likeList));
        } else {
            return ResponseEntity.status(200).body(NFTListResDto.of(200, "Success", nftList));
        }
    }
    @GetMapping("/like")
    @ApiOperation(value = "나의 좋아요 nft 조회", notes = "자신이 좋아요한 nft 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<NFTListResDto> getNftMyLikeList(@ApiIgnore Authentication authentication) {
        User userDetails = userRepository.findByUsername(getUsername());

        List<Nft> nftList = nftService.getNftLikeList(userDetails);
        if (userDetails != null) {
            List<Nft> likeList = nftService.getNftLikeList(userDetails);
            return ResponseEntity.status(200).body(NFTListResDto.of(200, "Success", nftList, likeList));
        } else {
            return ResponseEntity.status(200).body(NFTListResDto.of(200, "Success", nftList));
        }
    }

    @GetMapping("/info/{nftId}")
    @ApiOperation(value = "상세 정보 조회", notes = "상세 정보 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<NFTResDto> getNftInfo(@NotNull @PathVariable String nftId) {
        User userDetails = userRepository.findByUsername(getUsername());

        Nft nft = nftRepository.findByNftId(nftId).get();
        if (userDetails != null) {
            List<Nft> likeList = nftService.getNftLikeList(userDetails);
            return ResponseEntity.status(200).body(NFTResDto.of(200, "Success", nft, likeList));
        } else {
            return ResponseEntity.status(200).body(NFTResDto.of(200, "Success", nft));
        }
    }

    @GetMapping("/like/{nickname}")
    @ApiOperation(value = "타인의 좋아요 nft 조회", notes = "타인이 좋아요한 nft 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<NFTListResDto> getNftMyLikeListByNickname(@NotNull @PathVariable String nickname) {

        User userDetails = userRepository.findByNickname(nickname).get();

        List<Nft> nftList = nftService.getNftLikeList(userDetails);
        User likeUser = userRepository.findByUsername(getUsername());
        if (likeUser != null) {
            List<Nft> likeList = nftService.getNftLikeList(likeUser);
            return ResponseEntity.status(200).body(NFTListResDto.of(200, "Success", nftList, likeList));
        } else {
            return ResponseEntity.status(200).body(NFTListResDto.of(200, "Success", nftList));
        }
    }


    @GetMapping("/search")
    @ApiOperation(value = "nft 조회 조건 검색", notes = "nft 조회 ex)sort=price,desc&sort=like_count,desc ")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<NFTListResDto> getNftList(@RequestParam(value = "keyword", defaultValue = "") String keyword,
                                                    @RequestParam(value = "enterprise", defaultValue = "") String enterprise,
                                                    @RequestParam(value = "max", defaultValue = "9999999") int max,
                                                    @RequestParam(value = "min", defaultValue = "0") int min,
                                                    @RequestParam(value = "ownerIsEnterprise", defaultValue = "") Boolean ownerIsEnterprise,
                                                    @PageableDefault(size = 20, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {//https://brunch.co.kr/@kd4/158
        ///members?page=0&size=3&sort=id,desc&sort=username,desc
        System.out.println("enterprise : " + enterprise);


        User enterpriseEntity =
                (enterprise.equals("")) ? null : userRepository.findByNickname(enterprise).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        NFTSearchReqDto nftSearchReqDto
                = NFTSearchReqDto.builder()
                .keyword(keyword)
                .enterprise(enterpriseEntity)// 이거 왜 realname은 안댐
                .max(max)
                .min(min)
                .ownerIsEnterprise(ownerIsEnterprise)
                .build();

        User userDetails = userRepository.findByUsername(getUsername());
        Page<Nft> nftListPage = nftService.getNftList(nftSearchReqDto, pageable);
        List<Nft> nftList = nftListPage.getContent();
        if (userDetails != null) {
            List<Nft> likeList = nftService.getNftLikeList(userDetails);
            return ResponseEntity.status(200).body(NFTListResDto.of(200, "Success", nftList, likeList , nftListPage.getTotalPages()));
        } else {
            return ResponseEntity.status(200).body(NFTListResDto.of(200, "Success", nftList ,  nftListPage.getTotalPages()));
        }

    }


//    @GetMapping("/{owner}")
//    @ApiOperation(value = "중고 / 명품 nft 조회", notes = "nft 카테고리별 조회")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "성공"),
//            @ApiResponse(code = 401, message = "인증 실패"),
//            @ApiResponse(code = 404, message = "사용자 없음"),
//            @ApiResponse(code = 500, message = "서버 오류")
//    })
//    public ResponseEntity<BaseResponseBody> getNft(@ApiIgnore Authentication authentication, @NotBlank @PathVariable Boolean ownerIsEnterprise) {
//        User userDetails = userRepository.findByUsername(getUsername());
//
//        nftService.getNftList(userDetails, ownerIsEnterprise);
//
//        return ResponseEntity.status(200).body(new BaseResponseBody(200, "Success"));
//    }


    public String getUsername() {
        return SecurityUtils.getCurrentUsername()
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
    }
}

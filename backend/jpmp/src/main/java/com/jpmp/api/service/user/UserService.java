package com.jpmp.api.service.user;

import com.jpmp.api.dto.TokenDto;
import com.jpmp.api.dto.request.nft.NtfRequestReqDto;
import com.jpmp.api.dto.request.user.UserLoginReqDto;
import com.jpmp.api.dto.request.user.UserModifyReqDto;
import com.jpmp.api.dto.request.user.UserRegisterReqDto;
import com.jpmp.api.dto.request.user.UserWalletReqDto;
import com.jpmp.db.entity.user.User;



public interface UserService {
    User createUser(UserRegisterReqDto userRegisterInfo);

    User getUserByEmail(String userId);
     TokenDto login(UserLoginReqDto userLoginReqDto);

    User modifyUser(User userDetails, UserModifyReqDto userModifyReqDto);
    User modifyBackImgUser(User user, String backFileImg);
    User modifyProImgUser(User user, String proFileImg);
    User addUserNftLike(User userDetails, String nftId);

    User deleteUserNftLike(User userDetails, String nftId);
    TokenDto reissue(String refreshToken , String username);
    Boolean checkDuplicateNickname(String nickname);

    User createAdmin(UserRegisterReqDto registerInfo);

    User modifyUserWallet(User userDetails, UserWalletReqDto userWalletReqDto);
}
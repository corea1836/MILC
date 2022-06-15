package com.jpmp.api.dto.response.user;


import com.jpmp.api.dto.UserInfoDto;
import com.jpmp.api.dto.request.nft.NFTDto;
import com.jpmp.api.dto.response.BaseResponseBody;
import com.jpmp.db.entity.nft.Nft;
import com.jpmp.db.entity.user.User;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class EnterpriseListResDto extends BaseResponseBody {

    private List<UserInfoDto> users;

    public static EnterpriseListResDto of(Integer statusCode, String message, List<User> users) {
        EnterpriseListResDto res = new EnterpriseListResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);


        res.setUsers(users);
        return res;
    }




    public void setUsers(List<User> users) {
        this.users = new ArrayList<>();
        for (int i =0 ; i < users.size() ; i ++){
            this.users.add(UserInfoDto.of(users.get(i)));
        }
    }




}

package com.jpmp.api.dto.response.nft;


import com.jpmp.api.dto.request.nft.NFTDto;
import com.jpmp.api.dto.response.BaseResponseBody;
import com.jpmp.db.entity.nft.Nft;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ApiModel("User")
public class NFTResDto extends BaseResponseBody {

    private NFTDto nft;


    public static NFTResDto of(Integer statusCode, String message, Nft nft, List<Nft> likeList) {
        NFTResDto res = new NFTResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);

        res.setNft(nft, likeList);
        return res;
    }
    public static NFTResDto of(Integer statusCode, String message, Nft nft) {
        NFTResDto res = new NFTResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);

        res.nft = NFTDto.of(nft);
        return res;
    }

    public void setNft(Nft nft, List<Nft> likeList) {
        if (likeList.contains(nft)) {
            this.nft = NFTDto.of(nft, true);
        } else {
            this.nft = NFTDto.of(nft);
        }

    }
}





package com.jpmp.api.dto.response.nft;


import com.jpmp.api.dto.request.nft.NFTDto;
import com.jpmp.api.dto.response.BaseResponseBody;
import com.jpmp.db.entity.nft.Nft;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class NFTListResDto extends BaseResponseBody {

    private List<NFTDto> nftDtoList;
    private int total;

    public static NFTListResDto of(Integer statusCode, String message, List<Nft> nftList) {
        NFTListResDto res = new NFTListResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);


        res.setNftDtos(nftList);
        return res;
    }

    public static NFTListResDto of(Integer statusCode, String message, List<Nft> nftList, List<Nft> likeList) {
        NFTListResDto res = new NFTListResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);


        res.setNftDtos(nftList, likeList);

        return res;
    }

    public static NFTListResDto of(Integer statusCode, String message, List<Nft> nftList, int total) {
        NFTListResDto res = new NFTListResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);

        res.setTotal(total);
        res.setNftDtos(nftList);
        return res;
    }

    public static NFTListResDto of(Integer statusCode, String message, List<Nft> nftList, List<Nft> likeList, int total) {
        NFTListResDto res = new NFTListResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);

        res.setTotal(total);
        res.setNftDtos(nftList, likeList);

        return res;
    }

    public void setNftDtos(List<Nft> nftList) {
        nftDtoList = new ArrayList<>();
        for (int i = 0; i < nftList.size(); i++) {
            nftDtoList.add(NFTDto.of(nftList.get(i)));
        }
    }


    public void setNftDtos(List<Nft> nftList, List<Nft> likeList) {
        nftDtoList = new ArrayList<>();
        for (int i = 0; i < nftList.size(); i++) {
            if (likeList.contains(nftList.get(i)))
                nftDtoList.add(NFTDto.of(nftList.get(i), true));
            else {
                nftDtoList.add(NFTDto.of(nftList.get(i)));
            }

        }
    }
}

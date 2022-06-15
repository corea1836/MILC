package com.jpmp.api.dto.request.nft;

import com.jpmp.api.dto.response.rBoard.RBoardDto;
import com.jpmp.db.entity.board.RealizationBoard;
import com.jpmp.db.entity.user.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
@Builder
public class NFTSearchReqDto {


    private String keyword;

    private User enterprise;

    private Boolean ownerIsEnterprise;

    private int max;

    private int min;



}

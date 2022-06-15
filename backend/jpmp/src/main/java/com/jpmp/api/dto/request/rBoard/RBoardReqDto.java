package com.jpmp.api.dto.request.rBoard;

import com.jpmp.db.entity.board.RBoardStatus;
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
public class RBoardReqDto {


    @ApiModelProperty(name = "변경 상태", example = "STATUS_ADM")
    private RBoardStatus rBoardStatus;


    @ApiModelProperty(name = "실물화 글 id", example = "1")
    private Long rBoardId;


}

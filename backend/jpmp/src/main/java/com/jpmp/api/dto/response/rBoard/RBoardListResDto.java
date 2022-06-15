package com.jpmp.api.dto.response.rBoard;

import com.jpmp.api.dto.response.BaseResponseBody;
import com.jpmp.db.entity.board.RealizationBoard;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Data
@ApiModel("RBoardListResDto")
public class RBoardListResDto extends BaseResponseBody {


    private List<RBoardDto> rBoardDtoList;



    public static RBoardListResDto of(Integer statusCode, String message,  List<RealizationBoard> realizationBoards) {
        RBoardListResDto res = new RBoardListResDto();
        res.setStatusCode(statusCode);
        res.setMessage(message);


        res.setrBoardDtoList(realizationBoards);
        return res;
    }


    public void setrBoardDtoList(List<RealizationBoard> realizationBoards) {
        rBoardDtoList = new ArrayList<>();
        for (int i =0 ; i < realizationBoards.size() ; i ++){
            rBoardDtoList.add(RBoardDto.of(realizationBoards.get(i)));
        }
    }




}

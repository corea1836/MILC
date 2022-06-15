package com.jpmp.api.controller;

import com.jpmp.api.dto.request.live.LiveDto;
import com.jpmp.api.dto.response.BaseResponseBody;
import com.jpmp.api.dto.response.live.LiveDetailResDto;
import com.jpmp.api.dto.response.live.LiveNftResDto;
import com.jpmp.api.dto.response.live.LiveResDto;
import com.jpmp.api.dto.response.live.LiveListResDto;
import com.jpmp.api.service.live.LiveService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Api(tags="라이브 경매")
@RestController
@RequestMapping("/api/live")
@RequiredArgsConstructor
public class LiveController {
    private final LiveService liveService;

    @PostMapping
    @ApiOperation(value = "경매방 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "방없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<LiveResDto> register(@Valid @RequestBody LiveDto liveDto){

        liveService.register(liveDto);

        return ResponseEntity.status(200).body(LiveResDto.of(200, "Success", liveDto.getRoomId()));
    }

    @GetMapping
    @ApiOperation(value = "경매방 리스트")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "방없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<LiveListResDto> getLiveList(){

        List<LiveNftResDto> liveList = liveService.getLiveList();

        return ResponseEntity.status(200).body(LiveListResDto.of(200, "Success", liveList));
    }

    @PutMapping
    @ApiOperation(value = "경매방 종료")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "방없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<BaseResponseBody> finishLive(@RequestParam("roomId") int roomId){

        liveService.finishLive(roomId);

        return ResponseEntity.status(200).body(new BaseResponseBody(200, "Success"));
    }

    @GetMapping("/{roomId}")
    @ApiOperation(value = "경매방 상세정보")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "방없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<LiveDetailResDto> getLive(@PathVariable int roomId){

        LiveNftResDto liveNftResDto = liveService.getLive(roomId);
        int maxcost = liveService.getmaxCost(roomId);
        if(maxcost == 0) maxcost = liveNftResDto.getStartprice();

        return ResponseEntity.status(200).body(LiveDetailResDto.of(200, "Success", liveNftResDto, maxcost));
    }
}

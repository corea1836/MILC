package com.jpmp.db.entity.board;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum RBoardStatus {
    STATUS_ADM,
    STATUS_NOTADM,
    STATUS_COM;

//    @JsonCreator
//    public static RBoardStatus from(String s) {
//        return RBoardStatus.valueOf(s.toUpperCase());
//    }
}



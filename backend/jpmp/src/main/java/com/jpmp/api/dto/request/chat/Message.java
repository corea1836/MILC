package com.jpmp.api.dto.request.chat;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Message {

    private int roomId;
    private String senderName;
    private String message;
    private int cost;
    private Status status;
}

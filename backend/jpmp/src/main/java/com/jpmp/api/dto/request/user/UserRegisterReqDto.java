package com.jpmp.api.dto.request.user;



import com.jpmp.db.entity.user.User;
import com.jpmp.db.entity.user.UserRole;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import javax.persistence.*;
import javax.validation.constraints.*;


@Getter
@Setter
@ToString
public class UserRegisterReqDto {

    @Email
    @NotBlank
    @ApiModelProperty(name="유저 Email", example="user@naver.com")
    private String email;

    @NotBlank
    @ApiModelProperty(name="유저 Password", example="your_password")
    private String password;

    @NotBlank
    @ApiModelProperty(name="유저 이름", example="장현진")
    private String realName;

    @NotBlank
    @ApiModelProperty(name="닉네임", example="냠냠")
    private String nickname;

    @ApiModelProperty(name="전화번호", example="010-1234-5678")
    private String phone;
    

    @ApiModelProperty(name="자기소개", example="안녕하세요")
    private String description;

    @ApiModelProperty(name="주소1", example="창원시 반지동")
    private String address1;
    @ApiModelProperty(name="주소2", example="창원시 반지동")
    private String address2;
    @ApiModelProperty(name="우편번호", example="54122")
    private String zipCode;


//    @Enumerated(EnumType.STRING)
//    @Column(name = "user_role")
//    private UserRole userRole;


}
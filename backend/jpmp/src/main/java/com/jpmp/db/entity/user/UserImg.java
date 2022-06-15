package com.jpmp.db.entity.user;

import lombok.*;

import javax.persistence.*;

@Builder
@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class UserImg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_img_id")
    private Long id;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_img_id")
    private User user;


    @Column
    private String fileName;

    @Column
    private Long fileSize;

    @Column
    private String fileContentType;

    @Column
    private String fileUrl;

}

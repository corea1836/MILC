package com.jpmp.db.entity.board;

import com.jpmp.db.entity.nft.Nft;
import com.jpmp.db.entity.user.User;
import lombok.*;
import javax.persistence.*;
import java.time.LocalDateTime;


@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class RealizationBoard  {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //처리현황
    @Enumerated(EnumType.STRING)
    private RBoardStatus status;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nft", referencedColumnName = "id")
    private Nft nft;

    //신청자
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consumer", referencedColumnName = "id")
    private User consumer;

    //기업
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "enterprise", referencedColumnName = "id")
    private User enterprise;

    //신청날짜
    private LocalDateTime applicationDate;

    protected void changeConsumer(User consumer) {
        consumer.getConsumerBoards().add(this);
        this.consumer = consumer;
    }

    protected void changeEnterprise(User enterprise) {
        enterprise.getConsumerBoards().add(this);
        this.enterprise = enterprise;
    }

    public void changeStatus(RBoardStatus rBoardStatus) {
        status = rBoardStatus;
    }


    @Builder
    public RealizationBoard(Nft nft, User consumer , User enterprise ) {
       this.status = RBoardStatus.STATUS_NOTADM;
       this.nft = nft;
       changeConsumer(consumer);
       changeEnterprise(enterprise);
       applicationDate = LocalDateTime.now();
    }

}
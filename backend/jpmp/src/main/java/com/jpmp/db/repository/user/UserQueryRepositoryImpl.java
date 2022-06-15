package com.jpmp.db.repository.user;


import com.jpmp.db.entity.user.User;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserQueryRepositoryImpl implements UserQueryRepository {

    private final JPAQueryFactory query;


    @Override
    public List<User> findNotFriendListByNicknameAndUser(String nickname, User user) {
        return null;
    }

    @Override
    public List<User> findFriendListByNicknameAndUser(String nickname, User user) {
        return null;
    }
}

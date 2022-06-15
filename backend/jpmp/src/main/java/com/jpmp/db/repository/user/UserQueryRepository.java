package com.jpmp.db.repository.user;



import com.jpmp.db.entity.user.User;

import java.util.List;

public interface UserQueryRepository {
    public List<User> findNotFriendListByNicknameAndUser(String nickname, User user);

    List<User> findFriendListByNicknameAndUser(String nickname, User user);

}

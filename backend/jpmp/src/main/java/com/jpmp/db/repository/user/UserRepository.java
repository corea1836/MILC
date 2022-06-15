package com.jpmp.db.repository.user;


import com.jpmp.db.entity.user.User;
import com.jpmp.db.entity.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Transactional
public interface UserRepository extends JpaRepository<User, Long> {

    @Transactional(readOnly = true)
    Optional<User> findByEmail(String email);

    Boolean existsByNickname(String nickname);

    @Transactional(readOnly = true)
    Optional<List<User>> findByUserRole(UserRole userRole);


    @Query("select m from User m join fetch m.authorities a where m.username = :username")
    Optional<User> findByUsernameWithAuthority(String username);

    @Transactional(readOnly = true)
    User findByUsername(String username);

    @Transactional(readOnly = true)
    Optional<User> findByRealname(String entrepriseName);

    @Transactional(readOnly = true)
    Optional<User> findByNickname(String nickname);
}
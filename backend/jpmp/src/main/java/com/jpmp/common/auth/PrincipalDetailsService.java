package com.jpmp.common.auth;


import com.jpmp.db.entity.user.User;
import com.jpmp.db.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    //우리가 만든 repository
    private final UserRepository userRepository;


    // 시큐리티 session = auntication(세션에 들어갈수있는 타입) = userdetails
    // 시큐리티session(내부 authentication(내부 userdetails))
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailService.loadUserByUsername");
        return userRepository.findByEmail(username)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저를 찾을 수 없습니다."));
    }

    private UserDetails createUserDetails(User users) {
       return new org.springframework.security.core.userdetails.User(users.getUsername(), users.getPassword(), users.getAuthorities());
    }
}
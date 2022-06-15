package com.jpmp.common.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jpmp.db.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomUserDetails implements UserDetails {
//CustomUserDetails 클래스를 따로 만든 이유는 Redis에 캐싱할 때,
// 기본적인 UserDetails로 저장할 경우는 역직렬화가 되지 않는 이슈를 확인했습니다.
// 인증과 권한 체크를 위한 정보들을 필드에 설정하였고,
// 저장할 때 관련이 없는 나머지 메서드들은 @JsonIgnore로 처리했습니다.
    private String username;
    private String password;
    @Builder.Default
    private List<String> roles = new ArrayList<>();

    public static UserDetails of(User member) {
        return CustomUserDetails.builder()
                .username(member.getUsername())
                .password(member.getPassword())
                .roles(member.getRoles())
                .build();
    }

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(toList());
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    @JsonIgnore
    public boolean isEnabled() {
        return false;
    }
}

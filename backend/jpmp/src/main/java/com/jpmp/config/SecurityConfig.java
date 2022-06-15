package com.jpmp.config;


import com.jpmp.common.auth.CustomUserDetailService;
import com.jpmp.common.auth.JwtAuthenticationFilter;
import com.jpmp.common.auth.JwtEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final JwtEntryPoint jwtEntryPoint;
    //우선 시큐리티는 각종 권한 인증 등등 보안과 관련된 것들을 체크하기 위해 여러 필터들이 존재합니다.
    // 저는 JWT 기반으로 구현해야 하기 때문에 JwtAuthenticationFilter 라는 이름의 클래스를 구현했고,
    // 만약 시큐리티 필터 과정중 에러가 발생할 경우는 JwtEntryPoint에서 처리하도록 구현했습니다
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailService customUserDetailService;
    //시큐리티에서는 UserDetailsService 라는 유저의 정보를 가져오기 위한 클래스를 제공합니다.
    // JWT 기반으로 구현해야하기 때문에 따로 커스터마이징 하였습니다.


    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManagerBean();

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    //비밀번호 암호화 클래스입니다. 사용자가 회원 가입시 입력한 비밀번호를 BCrypt strong hashing function을 통해 암호화하며, 단방향입니다.
    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/h2-console/**", "/favicon.ico");
        web.ignoring().antMatchers("/v2/api-docs/**");
        web.ignoring().antMatchers("/swagger.json");
        web.ignoring().antMatchers("/swagger-ui/**");
        web.ignoring().antMatchers("/swagger-resources/**");
        web.ignoring().antMatchers("/webjars/**");
    }
//진행하는 동안 시큐리티를 설정하고 나면 h2 데이터베이스 콘솔에 접속할 수 없습니다. 따라서 h2 관련 url은 ignore 해주었습니다.
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()

                .and()
                .csrf().disable()
                .authorizeRequests()
                //antMatchers("/", "/join/**", "/login", "/health").permitAll() 메서드를 통해 표기된 url은 권한에 제한 없이 요청할 수 있습니다.

//                .antMatchers("/", "/join/**", "/login", "/health").permitAll()// 인증절차없이 허용
//                .antMatchers("/logout").authenticated()//인증된 사용자만 접근 가능 // 다른경우는 인증을 하고 접근 가능
//                .anyRequest().authenticated()
//    .hasRole("USER")// 유저만 가능
                .antMatchers("/api/users/login", "/api/users/social/**", "/api/users/id/**", "/api/users/nickname/**", "/api/users").permitAll() // 인증권한이 필요한 페이지.
                .antMatchers("/api/oauth/**").permitAll()
                .antMatchers("/static/res/**").permitAll()
                .antMatchers("/ws/**").permitAll()
                .antMatchers("/api/chat/message/**").permitAll()
                .anyRequest().permitAll()  // 나머지 모든 요청 허용  ( 생략 가능 )

                .and()
                .exceptionHandling()
                .authenticationEntryPoint(jwtEntryPoint)

                .and()
                .logout().disable()
                //JWT 기반으로 로그인 / 로그아웃을 처리할 것이기 때문에 logout은 disable 해주었고,
                // 스프링 시큐리티는 기본 로그인 / 로그아웃 시 세션을 통해 유저 정보들을 저장합니다.
                .sessionManagement().sessionCreationPolicy(STATELESS)
                // 하지만 Redis를 사용할 것이기 때문에 상태를 저장하지 않는 STATELESS로 설정했습니다.

                .and()
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
                //앞에서 만들었던 JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter 전에 필터를 추가하겠다는 의미입니다.
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailService).passwordEncoder(passwordEncoder());
    }
}

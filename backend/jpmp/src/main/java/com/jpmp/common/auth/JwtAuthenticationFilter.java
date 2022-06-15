package com.jpmp.common.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jpmp.common.util.JwtTokenUtil;
import com.jpmp.db.repository.logout.LogoutAccessTokenRedisRepository;
import com.jpmp.exception.CustomException;
import com.jpmp.exception.ErrorCode;
import com.jpmp.exception.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.filter.OncePerRequestFilter;


import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenUtil jwtTokenUtil;

    private final CustomUserDetailService customUserDetailService;
    private final LogoutAccessTokenRedisRepository logoutAccessTokenRedisRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            //Spring Security 필터에서의 예외는 @ExceptionHandler로 잡히지 않는다.
            //(필터 단이 아닌 BadCredentialsException 은 잡힌다)
            //왜냐하면
            //Spring Security는 Spring 이전에 Filter 처리가 되므로 DispatcherServlet 까지 가지 않기 때문이다.
            //Security에는 각종 Filter를 상속받고 Filter 처리를 직접 작성할 수 있는데
            //
            //여기서 catch 로 Exception 처리를 해줘야한다.

            String accessToken = getToken(request);
            //getToken 메서드로 헤더에서 JWT를 'Bearer '를 제외하여 가져옵니다. 만약, JWT를 프론트에서 주지 않았을 경우 null로 그대로 반환합니다.

            if (accessToken != null) {
                checkLogout(accessToken);
                //해당 토큰이 null이 아닐 경우는 이 토큰이 로그아웃된 토큰인지 검증합니다.
                String username = jwtTokenUtil.getUsername(accessToken);
                System.out.println("jwt인증필터 63 String username = jwtTokenUtil.getUsername(accessToken) : " + username);


                //JwtTokenUtil에 선언된 메서드로 토큰에서 username을 가져옵니다.

                if (username != null) {
                    UserDetails userDetails = customUserDetailService.loadUserByUsername(username);
                    System.out.println("jwt인증필터 70 customUserDetailService.loadUserByUsername(username); : " + userDetails.getUsername());
                    //username이 null이 아닌 경우는 앞에서 만든 CustomUserDetailService에서 UserDetails객체를 가져옵니다.

                    validateAccessToken(accessToken, userDetails);
                    //이 토큰에서 추출한 username과 userDetailService에서 가져온 username이 맞는지 검증하고, 토큰의 유효성 검사를 진행합니다.

                    processSecurity(request, userDetails);
                    //검증 과정에 예외가 발생하지 않았다면, 해당 유저의 정보를 SecurityContext에 넣어줍니다.
                }
            }
            filterChain.doFilter(request, response);


        } catch (MalformedJwtException e) {/// 위조됨
            sendErrorResponse(response, ErrorCode.FORGERY_TOKEN);
        } catch (ExpiredJwtException e) {// 만료
            sendErrorResponse(response, ErrorCode.EXPIRED_TOKEN);
        } catch (UnsupportedJwtException e) { // 형식오류
            sendErrorResponse(response, ErrorCode.OAUTH_ERROR);
        } catch (SignatureException e) {// 틀림
            sendErrorResponse(response, ErrorCode.USER_PW_INVALID);
        }
    }

    private String getToken(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }

    private void checkLogout(String accessToken) {
        if (logoutAccessTokenRedisRepository.existsById(accessToken)) {
            throw new IllegalArgumentException("이미 로그아웃된 회원입니다.");
        }
    }

    private void validateAccessToken(String accessToken, UserDetails userDetails) {
        if (!jwtTokenUtil.validateToken(accessToken, userDetails)) {
            throw new IllegalArgumentException("토큰 검증 실패");
        }
    }

    private void processSecurity(HttpServletRequest request, UserDetails userDetails) {
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
    }

    private void sendErrorResponse(HttpServletResponse response, ErrorCode message) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        response.setCharacterEncoding("utf-8");
        response.setStatus(HttpStatus.UNAUTHORIZED.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.getWriter().write(objectMapper.writeValueAsString(ErrorResponse.toResponseEntity(message)));


    }


    public ResponseEntity<ErrorResponse> sendErrorResponse(CustomException ex, HttpServletRequest request) {
        log.error("handleCustomException throws CustomException : {}", ex.getErrorCode());
        return ErrorResponse.toResponseEntity(request, ex.getErrorCode());
    }
}

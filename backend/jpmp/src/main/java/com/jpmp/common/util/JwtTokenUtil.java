package com.jpmp.common.util;

import com.jpmp.exception.CustomException;
import com.jpmp.exception.CustomSecurityException;
import com.jpmp.exception.ErrorCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

import static com.jpmp.common.auth.JwtExpirationEnums.ACCESS_TOKEN_EXPIRATION_TIME;
import static com.jpmp.common.auth.JwtExpirationEnums.REFRESH_TOKEN_EXPIRATION_TIME;


@Slf4j
@Component
public class JwtTokenUtil {

    @Value("${jwt.secret}")
    private String SECRET_KEY;


    public Claims extractAllClaims(String token) {
        //Payload 부분에는 토큰에 담을 정보가 들어있습니다.
        // 여기에 담는 정보의 한 ‘조각’ 을 클레임(claim) 이라고 부르고,
        // 이는 name / value 의 한 쌍으로 이뤄져있습니다.
        // 토큰에는 여러개의 클레임 들을 넣을 수 있습니다.
        //payload 안에서 private 값을 Claims 객체에 담아 관리가능!
        //Authentication authentication = SecurityContextHolder.getContext().getAuthentication(); 이거 안함
        return Jwts.parserBuilder()//Jwts.parseBuilder메서드를 이용해서 JwtParseBuilder인스턴스를 생성한다.
                    .setSigningKey(getSigningKey(SECRET_KEY))//JWS 서명 검증을 위한 SecretKey 혹은 비대칭 PublicKey를 지정한다.
                    .build()//스레드에 안전한 JwtPaser를 리턴하기 위해 JwtPaserBuilder의 build()메서드를 호출한다.
                    .parseClaimsJws(token)//마지막으로 원본 JWS를 생성하는 jws를 가지고 parseClaimsJws(String)메서드를 호출한다.
                    .getBody();//파싱이나 서명검증오류 경우에 try/catch구문으로 전체를 감싼다. 예외와 실패 원인은 나중에 다룬다.
//            https://samtao.tistory.com/65

    }

    public String getUsername(String token) {
        return extractAllClaims(token).get("username", String.class);

    }

    private Key getSigningKey(String secretKey) {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public Boolean isTokenExpired(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        return expiration.before(new Date());
    }

    public String generateAccessToken(String username) {
        return doGenerateToken(username, ACCESS_TOKEN_EXPIRATION_TIME.getValue());
    }

    public String generateRefreshToken(String username) {
        return doGenerateToken(username, REFRESH_TOKEN_EXPIRATION_TIME.getValue());
    }

    private String doGenerateToken(String username, long expireTime) {
        Claims claims = Jwts.claims();
        claims.put("username", username);

        return Jwts.builder()//JwtBuilder객체를 생성하고 Jwts.builder() 메서드를 이용한다.
                .setClaims(claims)//header 파라메터와 claims를 추가하기위해 JwtBuilder 메서드를 호출한다.
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expireTime))
                .signWith(getSigningKey(SECRET_KEY), SignatureAlgorithm.HS256)//JWT를 서명하기위해 SecretKey나 PrivateKey를 지정한다.
                .compact();//마지막으로 압축하고 서명하기위해 compact()를 호출하고, jws를 생성한다.
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        String username = getUsername(token);
        System.out.println("jwt 토큰 유틸 79 username : " + username);
        System.out.println("jwt 토큰 유틸 80 username : " + userDetails.getUsername());
        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    public long getRemainMilliSeconds(String token) {
        Date expiration = extractAllClaims(token).getExpiration();
        Date now = new Date();
        return expiration.getTime() - now.getTime();
    }
}

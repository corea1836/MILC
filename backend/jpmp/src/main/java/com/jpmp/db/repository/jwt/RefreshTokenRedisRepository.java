package com.jpmp.db.repository.jwt;

import com.jpmp.common.util.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRedisRepository extends CrudRepository<RefreshToken, String> {
}

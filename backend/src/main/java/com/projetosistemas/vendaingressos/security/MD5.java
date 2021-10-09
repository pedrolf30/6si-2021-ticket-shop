package com.projetosistemas.vendaingressos.security;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5 {

    public static final String encrypt(String key) throws NoSuchAlgorithmException {
        MessageDigest md5 = MessageDigest.getInstance("MD5");
        md5.update(key.getBytes(),0, key.length());

        return new BigInteger(1, md5.digest()).toString(16);
    }

}

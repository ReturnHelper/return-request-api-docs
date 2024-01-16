import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Base64;



class Main {
  private static final String CHARACTER_ENCODING = "UTF-8";
  final static String ALGORITHM = "HmacSHA256";

  public static void main(String[] args) throws Exception {
    String payload="<body JSON string>";
    String action="<action>";
    String url="<url>";
    String timestamp="<timestamp>";
    String data=new String(Base64.encodeBase64((action+url+timestamp+payload).getBytes(CHARACTER_ENCODING)));
    System.out.println();
    String base64Key="<signing key>";
    String signature = sign(data,base64Key);
    System.out.println(signature);
  }

  private static String sign(String data, String secretKey)
      throws NoSuchAlgorithmException, InvalidKeyException, IllegalStateException, UnsupportedEncodingException {
    Mac mac = Mac.getInstance(ALGORITHM);
    mac.init(new SecretKeySpec(Base64.decodeBase64(secretKey), ALGORITHM));
    byte[] signature = mac.doFinal(Base64.decodeBase64(data));
    String signatureBase64 = new String(Base64.encodeBase64(signature), CHARACTER_ENCODING);
    return new String(signatureBase64);
  }
}
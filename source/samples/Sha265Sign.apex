public class Main {
    private static final String CHARACTER_ENCODING = 'UTF-8';
    private static final String ALGORITHM = 'HmacSHA256';

    public static void main() {
        String payload = '<body JSON string>';
        String action = '<action>';
        String url = '<url>';
        String timestamp = '<timestamp>';
        Blob data = EncodingUtil.base64Encode(Blob.valueOf(action + url + timestamp + payload));
        System.debug(data);
        String base64Key = '<signing key>';
        String signature = sign(data, base64Key);
        System.debug(signature);
    }

    private static String sign(Blob data, String secretKey) {
        Blob macKey = EncodingUtil.base64Decode(secretKey);
        Blob signature = Crypto.generateMac(ALGORITHM, data, macKey);
        String signatureBase64 = EncodingUtil.base64Encode(signature);
        return signatureBase64;
    }
}
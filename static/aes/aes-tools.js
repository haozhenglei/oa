// 数据加密
function encrypt(word) {
	var key = CryptoJS.enc.Utf8.parse("ijhy1876gbs0978n");

	var srcs = CryptoJS.enc.Utf8.parse(word);
	var encrypted = CryptoJS.AES.encrypt(srcs, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});

	return encrypted.ciphertext.toString();
}

// 数据解密
function decrypt(word) {
	var key = CryptoJS.enc.Utf8.parse("ijhy1876gbs0978n");
	var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
	var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr);

	var decrypt = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
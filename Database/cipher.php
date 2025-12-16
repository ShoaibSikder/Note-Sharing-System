<?php
// Caesar Cipher Functions
function caesar_encrypt($text, $shift = 5) {
    $result = "";
    $shift = $shift % 26;

    for ($i = 0; $i < strlen($text); $i++) {
        $char = $text[$i];

        if (ctype_alpha($char)) {
            $ascii = ord($char);
            $base = ctype_upper($char) ? 65 : 97;
            $result .= chr(($ascii - $base + $shift) % 26 + $base);
        } else {
            $result .= $char;
        }
    }
    return $result;
}

function caesar_decrypt($text, $shift = 5) {
    return caesar_encrypt($text, 26 - $shift);
}

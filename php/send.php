<?php
$name=$_POST['name'];
$email=$_POST['email'];
$message=$_POST['feedback-text'];

$name=htmlspecialchars($name);
$email=htmlspecialchars($email);
$message=htmlspecialchars($message);

$name=urldecode($name);
$email=urldecode($email);
$message=urldecode($message);

$name=trim($name);
$email=trim($email);
$message=trim($message);

$theme = 'Сообщение с сайта';

$allLetter = "Имя отправителя: ".$name;
$allLetter .= "\r\nEmail: ".$email;
$allLetter .= "\r\nСообщение: ".$message;

$headers = "from: ".$name.
            "\r\nReply-To: ".$email;

mail("vav200@gmail.com", $theme, $allLetter, $headers);

$redirect = isset($_SERVER['HTTP_REFERER'])? $_SERVER['HTTP_REFERER'].'#bottom':'redirect-form.html';
header("Location: $redirect");
exit();

?>
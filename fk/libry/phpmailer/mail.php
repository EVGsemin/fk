<?php

require_once('PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$subject = $_POST['subject'];

$name    = $_POST['name'];
$phone   = $_POST['phone'];
$email   = $_POST['email'];
$message = $_POST['message'];
$other   = $_POST['other'];

if ($subject == '') {
  $subject = "Заявка с сайта";
}

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.yandex.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'perevod-bel@yandex.ru'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'HocdoHauHonMok3'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('perevod-bel@yandex.ru'); // от кого будет уходить письмо?
$mail->addAddress('perevod-bel@yandex.ru');     // Кому будет уходить письмо
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
$mail->addAttachment($_FILES['upload']['tmp_name'], $_FILES['upload']['name']);    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = $subject;
$mail->Body    = "<b>Имя:</b> " .$name. " <br><b>Телефон:</b> " .$phone. " <br><b>Прочее:</b> " .$other. " <br><b>E-mail:</b> " .$email. "<br><br> <b>Сообщение:</b><br>" .$message. "<br><br><br>---<br>Новое сообщение с сайта. <br><br><br><br>";
$mail->AltBody = "";

if(!$mail->send()) {
  header('location: /?mail=Сообщение не было отправлено. Пожалуйста, обратитесь по телефону, указанному на сайте.');
  // echo 'Сообщение не было отправлено. Пожалуйста, обратитесь по телефону, указанному на сайте.';
} else {
  header('location: /?mail=Спасибо. Сообщение успешно отправлено');
}
?>
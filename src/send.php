
<?php
// Файлы phpmailer
require 'vendors/phpmailer/PHPMailer.php';
require 'vendors/phpmailer/SMTP.php';
require 'vendors/phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$phone = $_POST['phone'];
$comment = $_POST['comment'];


// Формирование самого письма
$title = "Теплотехника24, Вам пришла новая заявка!";
$body = "
<h2>Новое письмо</h2>
<p>Для связи с клиентом Вам пригодятся следующие контакты:</p>
<b>Имя:</b> $name<br>
<b>Номер телефона:</b> $phone<br>
<b>Комментарий:</b> $comment<br>
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.mail.ru'; // SMTP сервера вашей почты
    $mail->Username   = 'andy.biersack.2014@mail.ru'; // Логин на почте
    $mail->Password   = 'Yp9QY23DYrV0g3kDF7Rf'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('andy.biersack.2014@mail.ru', 'Новый заказчик'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('palagosik333@gmail.com');  
 

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) {$result = "success";} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}

// Отображение результата
echo json_encode(["result" => $result, "status" => $status]);

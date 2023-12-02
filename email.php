<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $first_name = $_POST['FirstName'];
    $last_name = $_POST['LastName'];
    $email = $_POST['Email'];
    $phone_number = $_POST['PhoneNumber'];
    $message = $_POST['Message'];

    // Set the recipient email address
    $to = "tangkenyi2001@gmail.com"; // Replace with your actual email address

    // Set the email subject
    $subject = "You've got mail!";

    // Compose the email message
    $message_body = "First Name: $first_name\n"
                   ."Last Name: $last_name\n"
                   ."Email: $email\n"
                   ."Phone Number: $phone_number\n"
                   ."Message:\n$message";

    // Set the headers
    $headers = "From: $email";

    // Send the email
    mail($to, $subject, $message_body, $headers);

    // You can redirect the user to a thank you page or display a success message
    header("Location: thank_you.html");
    exit();
}
?>

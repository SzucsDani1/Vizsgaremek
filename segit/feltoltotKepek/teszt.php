<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="POST" enctype="multipart/form-data">
    <input type="file" name="image" required>
    <button type="submit">Upload</button>


    
</form>

<div>
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $uploadDir = 'etelekKepek/'; // Directory to store images
    $uploadFile = $uploadDir . basename($_FILES['image']['name']);
    
    // Check if the file is an image
    $check = getimagesize($_FILES['image']['tmp_name']);
    if ($check !== false) {
        // Move the uploaded file to the target directory
        if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
            echo "File uploaded successfully: " . $uploadFile;
        } else {
            echo "Error uploading file.";
        }
    } else {
        echo "File is not a valid image.";
    }
}
?>
</div>
</body>
</html>


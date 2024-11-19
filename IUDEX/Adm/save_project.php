<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["title"], $_POST["description"], $_POST["admin"], $_POST["date"], $_FILES["image"])) {
    // Ambil data dari form
    $title = $_POST["title"];
    $description = $_POST["description"];
    $admin = $_POST["admin"];
    $date = $_POST["date"];
    $image = $_FILES["image"];

    // Validasi file
    if ($image["error"] == UPLOAD_ERR_OK) {
        // Path Direktori
        $uploadDirectory = 'Sidikporto/DA_';

        // Direktori Save Data
        if (!file_exists($uploadDirectory)) {
            mkdir($uploadDirectory, 0777, true);
        }

        $imagePath = $uploadDirectory . basename($image['name']);
        if (move_uploaded_file($image['tmp_name'], $imagePath)) {
            // Insert data ke database
            $sql = "INSERT INTO projects (title, description, admin, date, image)
                   VALUES ('$title', '$description', '$admin', '$date', '$imagePath')";

            if ($conn->query($sql) === TRUE) {
                echo "Successfully entered data";
            } else {
                echo "Error: " . $conn->error;
            }
        } else {
            echo "Error uploading file.";
        }
    } else {
        echo "Error uploading file.";
    }
} else {
    echo "Data tidak lengkap. Harap isi semua kolom.";
}

$conn->close();
?>

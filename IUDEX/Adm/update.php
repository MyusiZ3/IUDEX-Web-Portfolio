<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["id"])) {
    $id = $_POST["id"];

    $sql_select = "SELECT * FROM projects WHERE id = $id";
    $result = $conn->query($sql_select);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        $title = isset($_POST['title']) ? $_POST['title'] : $row['title'];
        $description = isset($_POST['description']) ? $_POST['description'] : $row['description'];
        $admin = isset($_POST['admin']) ? $_POST['admin'] : $row['admin'];
        $date = isset($_POST['date']) ? $_POST['date'] : $row['date'];

        if (isset($_FILES["newImage"]) && $_FILES["newImage"]["error"] == UPLOAD_ERR_OK) {
            $uploadDirectory = 'Sidikporto/DA_';
            if (!file_exists($uploadDirectory)) {
                mkdir($uploadDirectory, 0777, true);
            }

            $imagePath = $uploadDirectory . basename($_FILES['newImage']['name']);
            if (move_uploaded_file($_FILES['newImage']['tmp_name'], $imagePath)) {
                $sql_update = "UPDATE projects SET title = '$title', description = '$description', admin = '$admin', date = '$date', image = '$imagePath' WHERE id = $id";
            } else {
                echo "Error uploading new image file.";
                exit();
            }
        } else {
            // This is important to avoid undefined variable $sql_update
            $sql_update = "UPDATE projects SET title = '$title', description = '$description', admin = '$admin', date = '$date' WHERE id = $id";
        }

        // Eksekusi query update
        if (!empty($sql_update) && $conn->query($sql_update) === TRUE) {
            echo "Successfully updated data";
            // Redirect to Tabel1.php after successful update
            echo "<script>window.location.href = 'Tabel1.php';</script>";
        } else {
            echo "Error updating record: " . $conn->error;
        }
    } else {
        echo "Record not found.";
    }
} else {
    echo "Invalid request or missing required fields";
}

$conn->close();
?>

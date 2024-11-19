<?php
include 'koneksi.php';

if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["id"])) {
    $id = $_GET["id"];

    // Retrieve the image path from the database
    $sql_select = "SELECT image FROM projects WHERE id = $id";
    $result = $conn->query($sql_select);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $imagePath = $row["image"];

        // Perform the delete operation based on the id
        $sql_delete = "DELETE FROM projects WHERE id = $id";

        if ($conn->query($sql_delete) === TRUE) {
            // Delete the image file
            if (file_exists($imagePath)) {
                unlink($imagePath);
                // Redirect to Tabel1.php after the delete operation with a success message
                header("Location: Tabel1.php?success=1");
                exit();
            } else {
                // If the image file is not found, still redirect to Tabel1.php without success message
                header("Location: Tabel1.php");
                exit();
            }
        } else {
            // If there is an error in the delete operation, redirect to Tabel1.php without success message
            header("Location: Tabel1.php");
            exit();
        }
    } else {
        // If the record is not found, redirect to Tabel1.php without success message
        header("Location: Tabel1.php");
        exit();
    }
} else {
    // Handle the case where the id parameter is missing or invalid
    header("Location: Tabel1.php");
    exit();
}

$conn->close();
?>

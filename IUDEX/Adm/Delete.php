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

        // Display a confirmation prompt on the client side
        echo "
        <script>
            var confirmDelete = confirm('Are you sure you want to delete this project?');

            if (confirmDelete) {
                // User clicked 'OK,' proceed with the delete operation
                window.location.href = 'delete_process.php?id=$id';
            } else {
                // User clicked 'Cancel,' redirect to Tabel1.php
                window.location.href = 'Tabel1.php';
            }
        </script>
        ";
    } else {
        echo "Record not found";
    }
} else {
    // Handle the case where the id parameter is missing or invalid
    echo "Invalid request";
}

$conn->close();
?>

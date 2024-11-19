<?php
include 'koneksi.php';

// Periksa apakah ada parameter ID yang diterima melalui URL
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["id"])) {
    $id = $_GET["id"];

    // Ambil data proyek berdasarkan ID
    $sql = "SELECT * FROM projects WHERE id = $id";
    $result = $conn->query($sql);

    // Periksa apakah data ditemukan
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        // Isi data dalam variabel untuk ditampilkan dalam form
        $title = $row['title'];
        $description = $row['description'];
        $admin = $row['admin'];
        $date = $row['date'];
        $currentImage = $row['image'];
    } else {
        // Tampilkan pesan jika data tidak ditemukan
        echo "Data not found.";
        exit();
    }
} else {
    // Tampilkan pesan jika parameter ID tidak diterima
    echo "Invalid request.";
    exit();
}

$conn->close();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Update Project</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f8f9fa;
            margin: 0;
            padding: 0;
        }

        .form-container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #333;
        }

        input,
        textarea,
        select {
            width: 100%;
            padding: 10px;
            box-sizing: border-box;
            margin-bottom: 10px;
            border: 1px solid #ced4da;
            border-radius: 4px;
            background-color: #f8f9fa;
            color: #495057;
        }

        select {
            appearance: none;
        }

        button {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #0056b3;
        }

        #resetFormBtn {
            background-color: #dc3545;
        }

        #resetFormBtn:hover {
            background-color: #bd2130;
        }

        .image-container {
            text-align: center;
        }

        #imagePreview {
            max-width: 100%;
            height: auto;
            margin-top: 20px;
            border: 1px solid #ced4da;
            border-radius: 4px;
        }
    </style>
</head>

<body>
    <!-- Formulir input proyek -->
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary"></h6>
        </div>
        <div class="card-body">
            <!-- UPDATE DATA PERLU GANTI-->
            <form id="updateProjectForm" action="update.php" method="POST" enctype="multipart/form-data" class="form-container">
                <input type="hidden" name="id" value="<?php echo $id; ?>">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" id="title" name="title" value="<?php echo $title; ?>" required>
                </div>

                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" rows="5" required><?php echo $description; ?></textarea>
                </div>

                <div class="form-group">
                    <label for="admin">Admin</label>
                    <select id="admin" name="admin" required>
                        <option value="Sidik" <?php echo ($admin == 'Sidik') ? 'selected' : ''; ?>>Sidik</option>
                        <option value="Aliya" <?php echo ($admin == 'Aliya') ? 'selected' : ''; ?>>Aliya</option>
                        <option value="Bilqis" <?php echo ($admin == 'Bilqis') ? 'selected' : ''; ?>>Bilqis</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="date">Date</label>
                    <input type="date" id="date" name="date" value="<?php echo $date; ?>" required>
                </div>

                <div class="form-group">
                    <label for="image">Current Image</label>
                    <img src="<?php echo $currentImage; ?>" alt="Current Image" style="max-width: 100%;">
                </div>

                <div class="form-group">
                    <label for="newImage">New Image</label>
                    <input type="file" id="newImage" name="newImage" onchange="previewImage(this);">
                </div>
                <!--Perlu Nav Ulang-->
                <button type="submit" formaction="update.php">Update Project</button>

                <!-- Tombol Reset -->
                <button type="button" id="resetFormBtn" onclick="resetForm()">Reset Form</button>
            </form>
            <!-- UPDATE DATA END -->
        </div>
    </div>

    <!-- INPUT END -->

    <!-- Your JavaScript code for image preview and form reset here -->

</body>

</html>

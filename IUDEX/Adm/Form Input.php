<?php
session_start();
if(!isset($_SESSION['username'])) {
    header("Location: login.php");
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Head section -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Sidik Admin - Tables</title>
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">
    <link href="css/sb-admin-2.min.css" rel="stylesheet">
    <link href="vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet">
    <link href="css/porto.css" rel="stylesheet">
    <!-- Pastikan untuk menyertakan jQuery sebelum script Anda -->
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
</head>

<body id="page-top">
    <!-- Page Wrapper -->
    <div id="wrapper">
        <!-- SideBar-->
        <?php include("sidebar.php"); ?>
        <!-- SideBar End-->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Main Content -->
            <div id="content">
                <!--TOP BAR -->
                <?php include("topbar.php"); ?>
                <!--TOP BAR End-->
                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <!-- Page Heading -->
                    <h1 class="h3 mb-4 text-gray-800">Add Project</h1>
                    <a href="Tabel1.php" class="btn btn-primary mb-3 exit-btn">Exit</a>
                    <!-- Formulir input proyek -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Input Data</h6>
                        </div>
                        <div class="card-body">
                            <!-- INPUT DATA -->
                            <form id="addProjectForm" action="save_project.php" method="POST" enctype="multipart/form-data" class="form-container">
                                <div class="form-group">
                                    <label for="title">Title</label>
                                    <input type="text" id="title" name="title" required>
                                </div>

                                <div class="form-group">
                                    <label for="description">Description</label>
                                    <textarea id="description" name="description" rows="5" required></textarea>
                                </div>

                                <div class="form-group">
                                    <label for="admin">Admin</label>
                                    <select id="admin" name="admin" required>
                                        <option value="" disabled selected>Select Admin</option>
                                        <option value="Sidik">Sidik</option>
                                        <option value="Aliya">Aliya</option>
                                        <option value="Bilqis">Bilqis</option>
                                    </select>
                                </div>

                                <div class="form-group">
                                    <label for="date">Date</label>
                                    <input type="date" id="date" name="date" required>
                                </div>

                                <div class="form-group">
                                    <label for="image">Image</label>
                                    <input type="file" id="image" name="image" onchange="previewImage(this);" required>
                                </div>

                                <button type="button" id="saveProjectBtn">Save Project</button>

                                <!-- Tombol Reset -->
                                <button type="button" id="resetFormBtn" onclick="resetForm()">Reset Form</button>
                            </form>
                            <!-- INPUT DATA END-->
                            
                            <!--WAYANG -->
                            <!--div class="image-container">
                                <img id="imagePreview" src="img/Wayang.png" alt="Image Preview">
                            </div-->

                        </div>
                    </div>
                    <!--INPUT END-->
                </div>
                <!-- /.container-fluid -->
            </div>
            <!-- End of Main Content -->
            <!-- Footer -->
            <?php include 'footer.php'; ?>
            <!-- End of Footer -->
        </div>
        <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->
    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>
    <!-- LOGOUT-->
    <?php include 'logout_confirm.php'; ?>
    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>
    <!-- Page level plugins -->
    <script src="vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.min.js"></script>
    <!-- Page level custom scripts -->
    <script src="js/demo/datatables-demo.js"></script>
    <!-- JavaScript untuk menampilkan pratinjau gambar (previewImage) dapat ditambahkan di sini -->
    <script>
        $(document).ready(function() {
            $("#saveProjectBtn").click(function() {
                // Menggunakan AJAX untuk mengirim formulir secara asinkron
                $.ajax({
                    type: "POST",
                    url: $("#addProjectForm").attr("action"),
                    data: new FormData($("#addProjectForm")[0]),
                    processData: false,
                    contentType: false,
                    success: function(response) {
                        // Menanggapi respons
                        alert(response); // Gantilah ini dengan tindakan yang sesuai, misalnya menampilkan pesan sukses
                    },
                    error: function(xhr, status, error) {
                        // Menanggapi kesalahan
                        alert("Error: " + xhr.responseText); // Gantilah ini dengan tindakan yang sesuai, misalnya menampilkan pesan error
                    }
                });
            });
        });

        function resetForm() {
            // Reset semua nilai formulir ke nilai awal
            document.getElementById("addProjectForm").reset();
            // Reset tampilan gambar pratinjau (jika ada)
            document.getElementById("imagePreview").src = "";
        }

        function previewImage(input) {
            // Implementasi fungsi pratinjau gambar (Anda mungkin memiliki implementasi ini)
            // ...
        }
    </script>
</body>

</html>

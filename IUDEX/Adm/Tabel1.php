<?php
session_start();
if(!isset($_SESSION['username'])) {
    header("Location: login.php");
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>IUDEX Admin</title>
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">
    <link href="css/sb-admin-2.min.css" rel="stylesheet">
    <link href="https://cdn.datatables.net/1.10.24/css/dataTables.bootstrap4.min.css" rel="stylesheet">


    <style>
        /* Gaya dasar untuk tabel */
    
        /* Gaya untuk mengatur lebar maksimum kolom Description di tablet dan HP */
        @media screen and (max-width: 992px) {
            table#dataTable td:nth-child(2) {
                max-width: 100%; /* Menggunakan lebar maksimum untuk tablet dan HP */
                white-space: normal; /* Mengizinkan teks meluncur ke bawah */
                overflow: visible; /* Mengizinkan teks meluncur ke bawah */
                text-overflow: clip; /* Menghindari efek ellipsis pada teks */
            }

            .action-icons {
                text-align: center; /* Menengahkan tombol pada tampilan tablet dan HP */
                display: block;
            }
        }

        /* Gaya untuk mengatur lebar maksimum kolom Description di HP */
        @media screen and (max-width: 576px) {
            table#dataTable td:nth-child(2) {
                max-width: 100%; /* Menggunakan lebar maksimum untuk HP */
            }

            .table-responsive {
                overflow-x: auto;
            }
        }

        /* Gaya untuk menyusun tombol aksi secara berjejer di desktop */
        @media screen and (min-width: 992px) {
            .action-icons {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .action-icons a {
                margin-right: 5px;
            }
        }
    </style>

</head>

<body id="page-top">
    <div id="wrapper">
        <!-- Sidebar -->
        <?php
            include("sidebar.php");
        ?>
        <!-- End of Sidebar -->

        <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
                <!-- Topbar -->
                <?php
                    include("topbar.php");
                ?>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">
                    <h1 class="h3 mb-4 text-gray-800">Project</h1>
                    <a href="Form Input.php" class="btn btn-primary mb-3">Add Project</a>

                    <!-- DataTales Example -->
                    <div class="card shadow mb-4">
                        <div class="card-header py-3">
                            <h6 class="m-0 font-weight-bold text-primary">Data Tables</h6>
                        </div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Image</th>
                                            <th>Date</th>
                                            <th>Admin</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                                         include 'koneksi.php';

                                        $sql = "SELECT * FROM projects";
                                        $result = $conn->query($sql);

                                        if ($result->num_rows > 0) {
                                            while ($row = $result->fetch_assoc()) {
                                                echo "<tr>";
                                                echo "<td>" . $row["title"] . "</td>";
                                                echo "<td>" . $row["description"] . "</td>";
                                                echo "<td><img src='" . $row["image"] . "' alt='image' width='Auto' height='50'></td>";
                                                echo "<td>" . $row["date"] . "</td>";
                                                echo "<td>" . $row["admin"] . "</td>";
                                                echo "<td class='action-icons'>";
                                                
                                                // Edit
                                                echo "<a href='Edit.php?id=" . $row["id"] . "' title='Edit' class='btn btn-primary'>Edit</a>";
                                                echo "&nbsp;&nbsp;";
                                                // Delete
                                                echo "<a href='Delete.php?id=" . $row["id"] . "' title='Delete' class='btn btn-danger'>Delete</a>";
                                                
                                                echo "</td>";
                                                echo "</tr>";
                                            }
                                        } else {
                                            echo "<tr><td colspan='6'>No data available</td></tr>";
                                        }

                                        $conn->close();
                                        ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <?php include 'footer.php'; ?>
            <!-- End Footer -->
        </div>
        <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout-->
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
</body>

</html>

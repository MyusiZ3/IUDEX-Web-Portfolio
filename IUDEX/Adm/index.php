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
    <meta name="description" content="">
    <meta name="author" content="">

    <title>IUDEX ADMIN</title>

    <!-- Custom fonts for this template-->
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link
        href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">

    <!-- Custom styles for this template-->
    <link href="css/sb-admin-2.min.css" rel="stylesheet">

</head>

<body id="page-top">

    <!-- Page Wrapper -->
    <div id="wrapper">

        <?php
            include('sidebar.php');
        ?>

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">

            <!-- Main Content -->
            <div id="content">

                <!-- Topbar -->
            <?php
                include('topbar.php');
            ?>
                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">

                    <!-- Page Heading -->
                    <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
                    </div>

                    <!-- Content Row -->
                    <div class="row">
                            <!-- Approach -->
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">
                                        <?php
                                            echo "Hii Welcome, " . $_SESSION['username'] . "!";
                                        ?>
                                    </h6>
                                </div>
                                <div class="card-body">
                                    <p>Welcome to the Admin Portofolio Dashboard!</p>
                                    
                                    <p>This dashboard is your central hub for managing and updating the portfolio content. As an admin, you have the authority to make impactful changes to showcase the latest projects and achievements.</p>

                                    <p>Key Features:</p>
                                    <ul>
                                        <li>Update Portofolio Data: Easily modify and enhance project details, descriptions, and images to keep your portfolio up-to-date.</li>
                                        <li>Collaborative Management: With three dedicated admin members, you can efficiently collaborate and coordinate efforts to curate a compelling portfolio.</li>
                                        <li>User-Friendly Interface: The user-friendly interface of Admin Portofolio simplifies the process of managing content, ensuring a seamless experience for all admins.</li>
                                    </ul>

                                    <p>Whether it's showcasing new projects, refining project descriptions, or coordinating with fellow admins, use this dashboard to maintain a dynamic and impressive portfolio.</p>

                                    <p class="mb-0">Make your mark, and let the world see the best of your work!</p>
                                </div>
                                <?php include 'footer.php'; ?>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        
        
    </div>
    

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal -->

    <?php include 'logout_confirm.php'; ?>

    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>

    <!-- Page level plugins -->
    <script src="vendor/chart.js/Chart.min.js"></script>

    <!-- Page level custom scripts -->
    <script src="js/demo/chart-area-demo.js"></script>
    <script src="js/demo/chart-pie-demo.js"></script>

</body>

</html>
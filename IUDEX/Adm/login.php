<!-- login.php -->
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>IUDEX ADMIN Login</title>
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet">
    <link href="css/sb-admin-2.min.css" rel="stylesheet">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f8f9fc;
        }

        label {
            display: block;
            margin-bottom: 8px;
        }

        input {
            width: 100%;
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 32px;
            box-sizing: border-box;
        }

        input[type="submit"] {
            background-color: #4e73df;
            color: #fff;
            cursor: pointer;
        }

        /* Tambahkan gaya untuk pesan kesalahan */
        .error-message {
            color: red;
            margin-bottom: 10px;
        }
    </style>

</head>

<body class="bg-gradient-primary">

    <div class="container">

        <!-- Outer Row -->
        <div class="row justify-content-center">
            <div class="col-xl-10 col-lg-12 col-md-9">
                <div class="card o-hidden border-0 shadow-lg my-5">
                    <div class="card-body p-0">
                        <!-- Nested Row within Card Body -->
                        <div class="row">
                            <div class="col-lg-6 d-none d-lg-block">
                                <img src="img/wayang.png" alt="Deskripsi gambar" style="width: 100%; max-width: 385px;">
                            </div>
                            <div class="col-lg-6">
                                <div class="p-5">
                                    <div class="text-center">
                                        <h1 class="h4 text-gray-900 mb-4">Welcome Admin!</h1>
                                    </div>
                                    <form action="LOGINPRO.php" method="post" id="loginForm">
                                        <label for="username">Username:</label>
                                        <input type="text" name="username" id="username" required>

                                        <label for="password">Password:</label>
                                        <input type="password" name="password" id="password" required>

                                        <div class="error-message">
                                            <?php
                                           
                                            if (isset($_GET['error']) && !empty($_GET['error'])) {
                                                echo "Password or username incorrect";
                                            }
                                            ?>
                                        </div>

                                        <input type="submit" value="Login">
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>

    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin-2.min.js"></script>
    <script>
        // Sembunyikan teks di dalam field username dan password saat diketik
        document.getElementById('username').addEventListener('input', function () {
            this.setAttribute('value', this.value);
        });

        document.getElementById('password').addEventListener('input', function () {
            this.setAttribute('value', this.value);
        });
    </script>

</body>

</html>

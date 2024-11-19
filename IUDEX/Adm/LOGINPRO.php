<?php
session_start();

// Sesuaikan dengan detail koneksi database Anda
$host = "localhost";
$username = "root";
$password = "";
$database = "dbporto_sidik";

// Membuat koneksi ke database
$conn = new mysqli($host, $username, $password, $database);

// Cek koneksi
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Mengambil data dari form login
$username = $_POST['username'];
$password = $_POST['password'];

// Melakukan query untuk mencari user dengan username dan password yang sesuai
$query = "SELECT * FROM user WHERE username = '$username' AND password = '$password'";
$result = $conn->query($query);

// Mengecek apakah data ditemukan
if ($result->num_rows > 0) {
    // Jika ditemukan, set session dan redirect ke index.php
    $_SESSION['username'] = $username;
    header("Location: index.php");
} else {
    // Jika tidak ditemukan, kembalikan ke halaman login
    header("Location: login.php?error=1");
}

// Menutup koneksi
$conn->close();
?>

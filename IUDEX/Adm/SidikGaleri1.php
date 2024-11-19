
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Tugas Assesment 1 PWI" />
	<meta name="author" content="Kelompok 6" />
    <title>Muhamad Sidik Personal Portofolio</title>

   <link rel="icon" type="image/png" href="images/favicon.png">
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="css/responsifcss.css">
    <link rel="stylesheet" href="css/portoview.css">
    <!--main css file-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.6/gsap.min.js"></script>
      
</head>
<body>
    <!--contains all the div-->
    <div id="all">
    <!--mouse  follower-->
        <div class="cursor"></div>
    <!--mouse  follower-->
    <!--loader-->

    <!--loader-end-->
    <!--link-screen-->
        <div id="breaker">
        </div>
        <div id="breaker-two">
        </div>
    <!--link-screen-->
        <!--Main-Section-->

        <!--NAVIGASI-fullscreen-->
        <!--GANTI LOGO 1-->
        <div id="navigation-content">
            <div class="logo">
                <a href="Home.html">
                    <img src="logo foto/Team Logo.png" alt="logo">
                </a>
            </div>
            <div class="navigation-close">
                <span class="close-first"></span>
                <span class="close-second"></span>
            </div>
            <div class="navigation-links">
                <a href="Home.html" data-text="HOME" >HOME</a>
                <a href="Web Porto Sidik.html" data-text="PROFILE">PROFILE</a>
            </div>
        </div>
        <!--Navigator-Fullscreen END-->

          <!--Home Page-->
        <!--Menubar-->
        <!--Ganti Logo 2-->
        <div id="navigation-bar">
            <a href="Home.html">
                <img src="logo foto/Team Logo.png" alt="logo">
            </a>
            <div class="menubar">
                <span class="first-span"></span>
                <span class="second-span"></span>
                <span class="third-span"></span>
            </div>
        </div>
        <!--Menubar End-->
          <!--Header-->
        <div id="header">
            <div id="particles"></div>


        
            <!--services start-->
            <div id="services">
            <!-- Galery header-->
                    <div class="services-heading wow">
                        </span>My <span class="color">Gallery
                    </div>
            <!--services header end-->


                    <!-- Galery content -->

                    <!-- Galery content -->
                    <div class="services-content-wrapper">
                        <div class="services-content">
                            <!-- Connect -->
                            <?php
                            include("koneksi.php");
                            $sql = "SELECT * FROM projects WHERE admin='Sidik'";
                            $result = $conn->query($sql);

                            if ($result->num_rows > 0) {
                                // Output data
                                while ($row = $result->fetch_assoc()) {
                            ?>
                                    <div class="service-one service wow">
                                        <a href="<?php echo $row["image"]; ?>" target="_blank">
                                            <div class="services-img">
                                                <?php
                                                $imagePath = $row["image"];
                                                if (file_exists($imagePath)) {
                                                    echo '<img src="' . $imagePath . '" alt="service-one">';
                                                } else {
                                                    // Display a placeholder image if the file is not found
                                                    echo '<img src="placeholder.jpg" alt="service-one">';
                                                }
                                                ?>
                                            </div>
                                            <div class="services-description">
                                                <p><?php echo $row["description"]; ?></p>
                                            </div>
                                        </a>
                                    </div>
                            <?php
                                }
                            } else {
                                echo "No data available";
                            }
                            $conn->close();
                            ?>
                            
                        </div>
                    <!-- Galery content end -->




            <!--services end-->

            <!-- SKILL KaMU-->
            <div id="skills">
                    <div class="skills-header">
                    </div>
                        <p>  <br></p>
                    </div>
                </div>
                <div class="footer">
                    <div class="footer-text">
                        <img src="./images/copyright.png" alt="copyright-img" class="images" height="14px"> 2023 | IUDEX Team
                    </div>
                </div>
                
        </div>
        <!--about end-->
        <!--portfolio end-->
        <!--blog end-->
                    <!--copyright-->
        <div class="footer">
        </div>
        
               <!--copyright-section-->
                    </div>
        <!--contact end-->
    </div>
        <!--about end-->
        <!--portfolio end-->
        <!--blog end-->
 
        <!--contact end-->
    </div>
    <!--all the divisions-->
    <script src="js/jquery.min.js"></script>
    <script src="js/particles.js"></script>
    <script src="js/particles.min.js"></script>
    <script src="js/index.js"></script>
    <!--particles script-->
    <!--BACKUP<script>
 particlesJS("particles", {"particles":{"number":{"value":180,"density":
 {"enable":true,"value_area":800}},"color":{"value":"#ffffff"},
 "shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},
 "polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},
 "opacity":{"value":0.5,"random":false,"anim":{"enable":true,"speed":1,"opacity_min":0.1,"sync":false}},
 "size":{"value":3,"random":true,"anim":{"enable":true,"speed":0,"size_min":0.1,"sync":false}},
 "line_linked":{"enable":false,"distance":0,"color":"#ffffff","opacity":0.24463576890600452,"width":1.2626362266116362},
 "move":{"enable":true,"speed":3,"direction":"none","random":false,"straight":false,"out_mode":"out",
 "bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas",
 "events":{"onhover":{"enable":false,"mode":"grab"},"onclick":{"enable":true,"mode":"push"},"resize":true},
 "modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});
</script>-->

<script>
    particlesJS("particles", {
        "particles": {
            "number": {
                "value": 200,
                "density": {
                    "enable": true,
                    "value_area": 700
                }
            },
            "color": {
                "value": "random"  // Mengubah warna menjadi acak
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,  // Mengubah opasitas menjadi acak
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 0,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": false,
                "distance": 0,
                "color": "#ffffff",
                "opacity": 0.24463576890600452,
                "width": 1.2626362266116362
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": false,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });
    </script>
    

</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>IUDEX Profile Team</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/css/bootstrap.min.css" rel="stylesheet">
<style type="text/css">
    body {
        margin-top: 20px;
        background: #eee;
    }

    .single_advisor_profile {
        position: relative;
        margin-bottom: 50px;
        -webkit-transition-duration: 500ms;
        transition-duration: 500ms;
        z-index: 1;
        border-radius: 15px;
        -webkit-box-shadow: 0 0.25rem 1rem 0 rgba(47, 91, 234, 0.125);
        box-shadow: 0 0.25rem 1rem 0 rgba(47, 91, 234, 0.125);
    }

    .single_advisor_profile .advisor_thumb {
        position: relative;
        z-index: 1;
        border-radius: 15px 15px 0 0;
        margin: 0 auto;
        padding: 30px 30px 0 30px;
        background-color: #3f43fd;
        overflow: hidden;
    }

    .single_advisor_profile .advisor_thumb::after {
        -webkit-transition-duration: 500ms;
        transition-duration: 500ms;
        position: absolute;
        width: 150%;
        height: 80px;
        bottom: -45px;
        left: -25%;
        content: "";
        background-color: #ffffff;
        -webkit-transform: rotate(-15deg);
        transform: rotate(-15deg);
    }

    @media only screen and (max-width: 575px) {
        .single_advisor_profile .advisor_thumb::after {
            height: 160px;
            bottom: -90px;
        }
    }

    .single_advisor_profile .advisor_thumb .social-info {
        position: absolute;
        z-index: 1;
        width: 100%;
        bottom: 0;
        right: 30px;
        text-align: right;
    }

    .single_advisor_profile .advisor_thumb .social-info a {
        font-size: 14px;
        color: #020710;
        padding: 0 5px;
    }

    .single_advisor_profile .advisor_thumb .social-info a:hover,
    .single_advisor_profile .advisor_thumb .social-info a:focus {
        color: #3f43fd;
    }

    .single_advisor_profile .advisor_thumb .social-info a:last-child {
        padding-right: 0;
    }

    .single_advisor_profile .single_advisor_details_info {
        position: relative;
        z-index: 1;
        padding: 30px;
        text-align: right;
        -webkit-transition-duration: 500ms;
        transition-duration: 500ms;
        border-radius: 0 0 15px 15px;
        background-color: #ffffff;
    }

    .single_advisor_profile .single_advisor_details_info::after {
        -webkit-transition-duration: 500ms;
        transition-duration: 500ms;
        position: absolute;
        z-index: 1;
        width: 50px;
        height: 3px;
        background-color: #3f43fd;
        content: "";
        top: 12px;
        right: 30px;
    }

    .single_advisor_profile .single_advisor_details_info h6 {
        margin-bottom: 0.25rem;
        -webkit-transition-duration: 500ms;
        transition-duration: 500ms;
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) {
        .single_advisor_profile .single_advisor_details_info h6 {
            font-size: 14px;
        }
    }

    .single_advisor_profile .single_advisor_details_info p {
        -webkit-transition-duration: 500ms;
        transition-duration: 500ms;
        margin-bottom: 0;
        font-size: 14px;
    }

    @media only screen and (min-width: 768px) and (max-width: 991px) {
        .single_advisor_profile .single_advisor_details_info p {
            font-size: 12px;
        }
    }

    .single_advisor_profile:hover .advisor_thumb::after,
    .single_advisor_profile:focus .advisor_thumb::after {
        background-color: #070a57;
    }

    .single_advisor_profile:hover .advisor_thumb .social-info a,
    .single_advisor_profile:focus .advisor_thumb .social-info a {
        color: #ffffff;
    }

    .single_advisor_profile:hover .advisor_thumb .social-info a:hover,
    .single_advisor_profile:hover .advisor_thumb .social-info a:focus,
    .single_advisor_profile:focus .advisor_thumb .social-info a:hover,
    .single_advisor_profile:focus .advisor_thumb .social-info a:focus {
        color: #ffffff;
    }

    .single_advisor_profile:hover .single_advisor_details_info,
    .single_advisor_profile:focus .single_advisor_details_info {
        background-color: #070a57;
    }

    .single_advisor_profile:hover .single_advisor_details_info::after,
    .single_advisor_profile:focus .single_advisor_details_info::after {
        background-color: #ffffff;
    }

    .single_advisor_profile:hover .single_advisor_details_info h6,
    .single_advisor_profile:focus .single_advisor_details_info h6 {
        color: #ffffff;
    }

    .single_advisor_profile:hover .single_advisor_details_info p,
    .single_advisor_profile:focus .single_advisor_details_info p {
        color: #ffffff;
    }
</style>
</head>
<body>
    
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
<div class="container">
    <div class="row justify-content-center">
        <div class="col-12 col-sm-8 col-lg-6">

            <div class="section_heading text-center wow fadeInUp" data-wow-delay="0.2s" style="visibility: visible; animation-delay: 0.2s; animation-name: fadeInUp;">
                <h3>Our Creative <span> Team</span></h3>
                <p>IUDEX is completely creative, lightweight, clean &amp; super responsive website.</p>
            </div>
        </div>
    </div>
    <div class="row">
        <!--Sidik-->
        <div class="col-12 col-sm-6 col-lg-3">
            <div class="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s" style="visibility: visible; animation-delay: 0.2s; animation-name: fadeInUp;">

                <div class="advisor_thumb">
                    <img src="Sidik/sidiiik.JPG" alt="Sidik's Photo" style="width: auto; height: 315px; border-radius: 15px;">

                    <div class="social-info">
                        <a href="https://www.facebook.com/Im.myusi.z3/" target="_blank"><i class="fa fa-facebook"></i></a>
                        <a href="https://instagram.com/imyusi_?igshid=NTc4MTIwNjQ2YQ=="target="_blank"><i class="fa fa-instagram"></i></a> <!-- Ganti kelas ikon Twitter dengan ikon Instagram -->
                        <a href="https://www.linkedin.com/in/muhamad-sidik-a6757b25b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank"><i class="fa fa-linkedin"></i></a>
                    </div>
                </div>

                <div class="single_advisor_details_info">
                    <h6>Muhamad Sidik</h6>
                    <p class="designation">Project Manager, UI/UX </p>
                    <p class="designation">Full-stack Developer &amp; DBA</p>
                </div>
            </div>
        </div>
        <!--Aliya-->
        <div class="col-12 col-sm-6 col-lg-3">
            <div class="single_advisor_profile wow fadeInUp" data-wow-delay="0.3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInUp;">

                <div class="advisor_thumb">
                    <img src="Aliya/Profilealiyafoto.jpg" alt="Aliya's Photo" style="width: auto; height: 315px;border-radius: 15px;">

                    <div class="social-info">
                        <a href="https://www.tiktok.com/@scaramochie_?_t=8iFwYITvbbl&_r=1" target="_blank"><i class="fa fa-facebook"></i></a>
                        <a href="https://www.instagram.com/aeliya____?igshid=OGQ5ZDc2ODk2ZA" target="_blank"><i class="fa fa-instagram"></i></a> <!-- Ganti kelas ikon Twitter dengan ikon Instagram -->
                        <a href="https://www.linkedin.com/in/aliyaad?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank"><i class="fa fa-linkedin"></i></a>
                    </div>
                </div>

                <div class="single_advisor_details_info">
                    <h6>Aliya Dewi Lestari</h6>
                    <p class="designation">UI Designer,</p>
                    <p class="designation">Tester/QA &amp; Content Writer </p>
                </div>
            </div>
        </div>

        <!--Bilqis-->
        <div class="col-12 col-sm-6 col-lg-3">
            <div class="single_advisor_profile wow fadeInUp" data-wow-delay="0.4s" style="visibility: visible; animation-delay: 0.4s; animation-name: fadeInUp;">

                <div class="advisor_thumb">
                    <img src="Bilqis/Profile_Portobilqis.jpeg" alt="Bilqis's Photo" style="width: auto; height: 315px;border-radius: 15px;">

                    <div class="social-info">
                        <a href="https://www.facebook.com/bilqis.syifal"target="_blank"><i class="fa fa-facebook"></i></a>
                        <a href="https://instagram.com/bilqis.syi?igshid=MzMyNGUyNmU2YQ=="target="_blank"><i class="fa fa-instagram"></i></a> <!-- Ganti kelas ikon Twitter dengan ikon Instagram -->
                        <a href="https://www.linkedin.com/in/bilqis-syifa-l-524626296/"target="_blank"><i class="fa fa-linkedin"></i></a>
                    </div>
                </div>

                <div class="single_advisor_details_info">
                    <h6>RR Bilqis Syiefa Latiefa</h6>
                    <p class="designation">Responsive Design, Navigation &amp; Content Strategist </p>
                </div>
            </div>
        </div>

        <!--IUDEXX-->
        <div class="col-12 col-sm-6 col-lg-3">
            <div class="single_advisor_profile wow fadeInUp" data-wow-delay="0.5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInUp;">

                <div class="advisor_thumb">
                    <img src="img/IUDEX LOGO.png" alt="Team's Photo" style="width: auto; height: 315px;border-radius: 15px;">

                    <div class="social-info">
                    </div>
                </div>

                <div class="single_advisor_details_info">
                    <h6>Neuvillette</h6>
                    <p class="designation">Iudex of Fontaine and leader of Marechaussee Phantom.</p>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.0/dist/js/bootstrap.bundle.min.js"></script>
<script type="text/javascript">
    
</script>
</body>
</html>

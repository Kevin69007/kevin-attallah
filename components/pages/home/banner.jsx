import banner1 from "../../../public/assets/img/banner/banner-right-img.jpg";
import bannerShape from "../../../public/assets/img/shape/banner-shape.png";
import { useState, useEffect } from "react";
import ModalVideo from "react-modal-video";
import Link from "next/link";

const BannerOne = () => {
  const [openVideo, setOpenVideo] = useState(false);

  useEffect(() => {
    console.log("Début de useEffect");
    const waitForFbq = setInterval(() => {
      if (window.fbq) {
        console.log("fbq détecté dans useEffect");
        window.fbq("track", "ViewContent", {
          content_name: "Bannière Accueil",
          content_category: "Accueil",
          content_ids: ["banner-1"],
          value: 0.0,
          currency: "EUR",
        });
        console.log("ViewContent envoyé pour la bannière");
        clearInterval(waitForFbq);
      } else {
        console.log("fbq non détecté, en attente...");
      }
    }, 100);

    return () => {
      console.log("Nettoyage de useEffect");
      clearInterval(waitForFbq);
    };
  }, []);

  const openVideoModal = () => {
    setOpenVideo(true);
    console.log("Clic sur vidéo");
    if (window.fbq) {
      console.log("fbq détecté pour vidéo");
      window.fbq("track", "ViewContent", {
        content_name: "Vidéo Ikigaï",
        content_category: "Vidéo",
        content_ids: ["video-ikigai"],
      });
      console.log("ViewContent envoyé pour la vidéo");
    } else {
      console.warn("fbq non disponible pour la vidéo");
    }
  };

  const handleBusinessClick = (e) => {
    console.log("Clic sur 'Lancer mon business'");
    if (window.fbq) {
      console.log("fbq détecté pour business");
      window.fbq("track", "Lead", {
        content_name: "Lancer mon business",
        content_category: "Business",
      });
      console.log("Lead envoyé pour business");
    } else {
      console.warn("fbq non disponible pour business");
    }
  };

  const handleFormationClick = (e) => {
    console.log("Clic sur 'Me former'");
    if (window.fbq) {
      console.log("fbq détecté pour formation");
      window.fbq("track", "Lead", {
        content_name: "Me former",
        content_category: "Formation",
      });
      console.log("Lead envoyé pour formation");
    } else {
      console.warn("fbq non disponible pour formation");
    }
  };

  return (
    <>
      <div className="banner__one">
        <div className="banner-shape">
          <div className="shape banner-shape-1"></div>
          <div className="shape banner-shape-2"></div>
          <div className="shape banner-shape-3"></div>
          <div className="shape banner-shape-4"></div>
          <img className="shape banner-shape-5" src={bannerShape.src} alt="image" />
          <div className="shape banner-shape-7"></div>
          <div className="shape banner-shape-6"></div>
        </div>
        <div className="container">
          <div className="row align-items-center gy-4 justify-content-center">
            <div className="col-xl-6 col-lg-6">
              <div className="banner__one-content">
                <span className="subtitle-one">Kevin Attallah</span>
                <h2 className="text-center">
                  Lance-toi avant que l'IA ne remplace ton <span>job</span>
                </h2>
                <p>Tu as une idée qui te trotte ? Forme-toi avec ton CPF et transforme-la</p>
                <div className="grid grid-cols-1 gap-10 justify-content-between">
                   <div className="">
                      <Link
                        href="https://meet.brevo.com/kevin-a2ta2l/presentation"
                        target="_blank"
                        className="btn-one mb-10"
                        onClick={handleBusinessClick}
                      >
                        Vérifier mon éligibilité CPF
                      </Link>
                   </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5 offset-xl-1 col-lg-6 col-md-9">
              <div className="banner__one-image">
                <div className="banner__one-image-wrapper">
                  <div className="banner__one-image-wrapper-shapes animate-rotate">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                  </div>
                  <img src={banner1.src} alt="banner-image" />
                  <span className="video-play-btn-one" onClick={openVideoModal}>
                    <i className="fas fa-play"></i>
                  </span>
                  <h6>Découvrir l’ikigaï</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ModalVideo
          className="video-modal"
          channel="youtube"
          autoplay
          isOpen={openVideo}
          videoId="UnV3KK7hQeg"
          onClose={() => setOpenVideo(false)}
        />
      </div>
    </>
  );
};

export default BannerOne;
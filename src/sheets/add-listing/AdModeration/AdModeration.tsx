import styles from './index.module.scss';
import Lottie from "lottie-react";
import loadingAnimation from "./loading.json";
// npm install lottie-react -legacy-peer-deps
const AdModeration = () => {
  return (
    <div className={styles.container}>
        <div className={styles.loader}> 
          <Lottie  animationData={loadingAnimation} loop={true} />
        </div>
      <h2 className={styles.title}>La modération de l'annonce est en cours</h2>
      <p className={styles.subtitle}>
        Ne bloquez pas l'application pendant le traitement de votre annonce
      </p>
    </div>
  );
};

export default AdModeration;
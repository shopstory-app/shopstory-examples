import styles from "./BannerSection.module.css";
import Image from "next/image";
import { Button } from "../../common/Button/Button";
import Link from "next/link";

export type BannerSectionProps = {
  title: string;
  description: string;
  image: {
    src: string;
    width?: number;
    height?: number;
    title: string;
  };
  button?: {
    url: string;
    label: string;
  };
};

export const BannerSection: React.FC<BannerSectionProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.contentContainer}>
          <div className={styles.title}>{props.title}</div>
          <div className={styles.description}>{props.description}</div>
          {props.button && (
            <div className={styles.button}>
              <Link href={props.button.url} passHref={true}>
                <Button appearance={"solidBlack"} as={"a"}>
                  {props.button.label}
                </Button>
              </Link>
            </div>
          )}
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <Image
              src={props.image.src}
              width={props.image.width}
              height={props.image.height}
              layout={"fill"}
              objectFit={"cover"}
              alt={props.image.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

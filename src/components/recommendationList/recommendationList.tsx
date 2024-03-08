import styles from "./recommendationList.module.scss";
import typography from "../../scss/typography.module.scss";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { colorwhite700 } from "@/components/variables";
import { motion } from "framer-motion";
import { useState } from "react";
const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 1, y: "14rem" },
};
export default function RecommendationList() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <motion.nav animate={isOpen ? "open" : "closed"} variants={variants}>
      <div className={styles.container}>
          <button
            onClick={() => setIsOpen((isOpen) => !isOpen)}
            className={styles.container__heading}
          >
            <ArrowDownwardIcon
              htmlColor={colorwhite700}
              sx={{ fontSize: 32 }}
              style={
                isOpen
                  ? { transitionDuration: "0.5s" }
                  : { transform: "rotate(180deg)", transitionDuration: "0.5s" }
              }
            />
            <h3 className={typography.heading3__white}>Top Picks</h3>
          </button>
        <div className={styles.container__content}>
          <div className={styles.container__recommendation}>
            <div className={styles.container__recommendation__heading}>
              <h4 className={typography.heading4__white}>The Vineyard</h4>
              <p className={typography.paragraph__small}>Newcastle Upon Tyne</p>
            </div>
            <p className={typography.paragraph__white}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam
            </p>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

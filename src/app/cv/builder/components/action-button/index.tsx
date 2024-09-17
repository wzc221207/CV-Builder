import { Button } from "antd";
import styles from "./index.module.scss";
import { ComponentProps } from "react";

type propsType = ComponentProps<typeof Button>;

export default function ActionButton(props: propsType) {
  return (
    <Button {...props} className={styles["action-button"]}>
      {props.children}
    </Button>
  );
}

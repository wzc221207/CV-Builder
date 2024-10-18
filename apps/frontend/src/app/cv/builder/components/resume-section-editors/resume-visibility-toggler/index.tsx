import { SectionName } from "@/store/resume-slice";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useEffect } from "react";

import {
  useActiveSections,
  useAllowLocalStorage,
  useLocalActiveSections,
} from "../../../hooks";
import styles from "./index.module.scss";
import { useTranslation } from "react-i18next";

export default function SectionVisibilityToggler({
  sectionName,
}: {
  sectionName: SectionName;
}) {
  const { storeGetActiveSections, storeSetActiveSections } =
    useActiveSections();
  const activeSectionNames = storeGetActiveSections();
  const [_, setLocalActiveSections] = useLocalActiveSections();
  const [allowDataLocalStorage] = useAllowLocalStorage();
  const { t } = useTranslation();

  useEffect(() => {
    if (allowDataLocalStorage) {
      setLocalActiveSections(activeSectionNames); // sync data to local storage
    }
  }, [allowDataLocalStorage, activeSectionNames, setLocalActiveSections]);

  function toggleSectionVisibility(e: CheckboxChangeEvent) {
    if (e.target.checked) {
      if (!activeSectionNames.includes(sectionName)) {
        storeSetActiveSections([...activeSectionNames, sectionName]);
      }
    } else {
      storeSetActiveSections(
        activeSectionNames.filter((name) => name != sectionName)
      );
    }
  }

  return (
    <Checkbox
      checked={activeSectionNames.includes(sectionName)}
      onChange={toggleSectionVisibility}
      className={styles.checkbox}
    >
      {t("Show This Section in Resume")}
    </Checkbox>
  );
}

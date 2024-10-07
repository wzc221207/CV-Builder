import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useActiveSections } from "../../../hooks";
import { SectionName } from "@/store/resume-slice";
import styles from "./index.module.scss";

export default function SectionVisibilityToggler({
  sectionName,
}: {
  sectionName: SectionName;
}) {
  const { storeGetActiveSections, storeSetActiveSections } =
    useActiveSections();
  const activeSectionNames = storeGetActiveSections();

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
      Show This Section in Resume
    </Checkbox>
  );
}

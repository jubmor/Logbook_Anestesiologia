import React from "react";
import { RecordStatus } from "@/types/Records";

import "./styles.scss";

type Props = {
  status: RecordStatus;
};

const RecordStatusBadge = ({ status }: Props) => {
  const stateToLabel: { [key in RecordStatus]: string } = {
    archived: "Arquivado",
    in_progress: "Em Progresso"
  };

  return (
    <div className={`record_status_item__${status}`}>
      <div className={`status_badge__${status}`} />
      {stateToLabel[status]}
    </div>
  );
};

export default RecordStatusBadge;

import React, { useState } from "react";

import { IconButton, Tooltip } from "@mui/material";

import { FilterList } from "@mui/icons-material";
import StyledInput from "@/components/Inputs/StyledInput";

type Props = {};

const Filters = ({}: Props) => {
  const [searchTerm, setSerchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSerchTerm(value);
  };

  return (
    <div className="records_container__filters_container">
      <StyledInput
        id="search"
        value={searchTerm}
        onChange={handleSearch}
        label=""
        type="text"
        autoComplete="current-password"
        placeholder="Procurar..."
        extraClass="records_container__filters_container__search_input"
        containerExtraClass="records_container__filters_container__search_input_container"
      />

      <div className="records_container__filters_container__more_filters_btn">
        <IconButton>
          <FilterList />
        </IconButton>
      </div>
    </div>
  );
};

export default Filters;

/* 

<StyledInput
          id="username"
          value={form.username}
          onChange={handleInputChange}
          label="Utilizador / Email"
          type="text"
          autoComplete="username"
          error={!!formErrors.username}
          errorText={formErrors.username}
        />

*/

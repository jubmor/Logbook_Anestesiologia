schema "public" {}

table "users" {
  schema = schema.public
  column "id" {
    type = int
    identity {
      generated = ALWAYS
      // start     = 1
      increment = 1
    }
  }
  column "email" {
    type = varchar(100)
    null = false
  }
  column "password" {
    type = varchar(255)
    null = false
  }
  column "first_name" {
    type = varchar(100)
    null = false
  }
  column "last_name" {
    type = varchar(100)
    null = false
  }
  primary_key {
    columns = [column.id]
  }
}

table "specializations" {
  schema = schema.public
  column "id" {
    type = int
    identity {
      generated = ALWAYS
      increment = 1
    }
  }
  column "name" {
    type = varchar(50)
    null = false
  }
  primary_key {
    columns = [column.id]
  }
}

table "residencies" {
  schema = schema.public
  column "id" {
    type = int
    identity {
      generated = ALWAYS
      increment = 1
    }
  }
  column "user_id" {
    type = int
    null = false
  }
  column "name" {
    type = varchar(100)
    null = true
  }
  column "description" {
    type = varchar(100)
    null = true
  }
  column "start_date" {
    type = timestamp
    null = true
  }
  column "end_date" {
    type = timestamp
    null = true
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "user_id_fk" {
    columns     = [column.user_id]
    ref_columns = [table.users.column.id]
  }
}

table "rotations" {
  schema = schema.public
  column "id" {
    type = int
    identity {
      generated = ALWAYS
      increment = 1
    }
  }
  column "user_id" {
    type = int
    null = false
  }
  column "residency_id" {
    type = int
    null = false
  }
  column "specialization_id" {
    type = int
    null = false
  }
  column "name" {
    type = varchar(100)
    null = true
  }
  column "description" {
    type = varchar(100)
    null = true
  }
  column "start_date" {
    type = timestamp
    null = true
  }
  column "end_date" {
    type = timestamp
    null = true
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "user_id_fk" {
    columns     = [column.user_id]
    ref_columns = [table.users.column.id]
  }
  foreign_key "residency_id_fk" {
    columns     = [column.residency_id]
    ref_columns = [table.residencies.column.id]
  }
  foreign_key "specialization_id_fk" {
    columns     = [column.specialization_id]
    ref_columns = [table.specializations.column.id]
  }
}

table "hospitals" {
  schema = schema.public
  column "id" {
    type = int
    null = false
  }
  column "name" {
    type = varchar(100)
    null = false
  }
  primary_key {
    columns = [column.id]
  }
}

table "statuses" {
  schema = schema.public
  column "id" {
    type = int
    null = false
  }
  column "name" {
    type = varchar(15)
    null = false
  }
  primary_key {
    columns = [column.id]
  }
}

table "processes" {
  schema = schema.public
  column "id" {
    type = int
    identity {
      generated = ALWAYS
      increment = 1
    }
  }
  column "hospital_id" {
    type = int
    null = false
  }
  column "residency_id" {
    type = int
    null = false
  }
  column "rotation_id" {
    type = int
    null = false
  }
  column "start_date" {
    type = timestamp
    null = true
  }
  column "end_date" {
    type = timestamp
    null = true
  }
  column "status" {
    type = int
    null = false
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "hospital_id_fk" {
    columns     = [column.hospital_id]
    ref_columns = [table.hospitals.column.id]
  }
  foreign_key "residency_id_fk" {
    columns     = [column.residency_id]
    ref_columns = [table.residencies.column.id]
  }
  foreign_key "rotation_id_fk" {
    columns     = [column.rotation_id]
    ref_columns = [table.rotations.column.id]
  }
  foreign_key "status_id_fk" {
    columns     = [column.status]
    ref_columns = [table.statuses.column.id]
  }
}

table "episodes" {
  schema = schema.public
  column "id" {
    type = int
    identity {
      generated = ALWAYS
      increment = 1
    }
  }
  column "process_id" {
    type = int
    null = false
  }
  column "status" {
    type = int
    null = false
  }
  column "start_date" {
    type = timestamp
    null = false
  }
  column "end_date" {
    type = timestamp
    null = true
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "process_id_fk" {
    columns     = [column.process_id]
    ref_columns = [table.processes.column.id]
  }
  foreign_key "status_id_fk" {
    columns     = [column.status]
    ref_columns = [table.statuses.column.id]
  }
}

table "techniques" {
  schema = schema.public
  column "id" {
    type = int
    identity {
      generated = ALWAYS
      increment = 1
    }
  }
  column "name" {
    type = varchar(100)
    null = false
  }
  column "specialization_id" {
    type = int
    null = false
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "specialization_id_fk" {
    columns     = [column.specialization_id]
    ref_columns = [table.specializations.column.id]
  }
}

table "avatars" {
  schema = schema.public
  column "id" {
    type = int
    identity {
      generated = ALWAYS
      increment = 1
    }
  }
  column "user_id" {
    type = int
    null = false
  }
  column "filepath" {
    type = varchar(255)
    null = true
  }
  primary_key {
    columns = [column.id]
  }
  foreign_key "user_id_fk" {
    columns     = [column.user_id]
    ref_columns = [table.users.column.id]
  }
}
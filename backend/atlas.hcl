data "external_schema" "sqlalchemy" {
  program = [
    "python3",
    "load_models.py"
  ]
}

env "sqlalchemy" {
  src = data.external_schema.sqlalchemy.url
  dev = "docker://postgresql/8/dev"
  migration {
    dir = "file://migrations"
  }
  format {
    migrate {
      diff = "{{ sql . \"  \" }}"
    }
  }
}

env "dev" {
  src = "file://schema.hcl"
  dev = "docker://postgres/15/dev"
}

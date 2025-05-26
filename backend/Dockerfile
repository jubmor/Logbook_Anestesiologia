FROM python:3.12.10-alpine AS base

RUN apk add --no-cache curl && \
    curl -sSL https://release.ariga.io/atlas/atlas-linux-amd64-v0.27.0 -o /usr/local/bin/atlas && \
    chmod +x /usr/local/bin/atlas && \
    apk del curl

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && \
    mkdir -p /app/avatars

# COPY . .
COPY hospitals.xml /app/hospitals.xml
COPY schema.hcl /app/schema.hcl

CMD [ "uvicorn", "src.main:app", "--reload", "--host","0.0.0.0" ,"--port" ,"8000"]



FROM base AS production

COPY src /app/src

from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.api.files import router
from app.infrastructure.database import Base, engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Convenient for the first iteration. Use Alembic migrations in production.
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="File Metadata Service",
    description="Receives files, extracts system and embedded metadata, and catalogs the results.",
    version="0.1.0",
    lifespan=lifespan,
    docs_url="/swagger/index.html",
)

app.include_router(router)


@app.get(
    "/health",
    tags=["Health"],
    summary="Service health check",
    description="Returns `{\"status\": \"ok\"}` when the service is running.",
)
def health():
    return {"status": "ok"}

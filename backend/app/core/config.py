from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "SmartLab API"
    app_env: str = "development"
    database_url: str = "postgresql+psycopg://smartlab:change-this-local-password@localhost:5432/smartlab"
    agent_shared_secret: str = "development-only-change-me"
    cors_origins: list[str] = ["http://localhost:5173"]

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()

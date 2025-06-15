FROM python:3.10

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend .

CMD ["gunicorn", "--workers", "3", "--bind", "0.0.0.0:5000", "app:app"]
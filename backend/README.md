# Backend
python -m venv .venv
.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m ensurepip --upgrade
python -m pip install --upgrade pip
pip install -r requirements.txt
python main.py
fastapi dev
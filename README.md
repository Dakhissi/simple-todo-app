# Django React Project

This project is a web application built using Django for the backend and React for the frontend.

## Prerequisites

- Python 3.x
- Node.js
- npm or yarn
- Django
- Django REST framework
- React

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/Dakhissi/simple-todo-app
    ```
2. Navigate to the project directory:
    ```
    cd app
    ```

### Backend Setup

3. Create a virtual environment and activate it:
    ```
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
4. Install the required Python packages:
    ```
    pip install -r requirements.txt
    ```
5. Apply migrations and start the Django server:
    ```
    python manage.py migrate
    python manage.py runserver
    ```

### Frontend Setup

6. Navigate to the frontend directory:
    ```
    cd frontend
    ```
7. Install the required Node packages:
    ```
    npm install  # or `yarn install`
    ```
8. Start the React development server:
    ```
    npm start  # or `yarn start`
    ```

## Usage

- Access the Django backend at `http://localhost:8000`
- Access the React frontend at `http://localhost:3000`

## Project Structure

- `backend/`: Contains the Django project and app files.
- `frontend/`: Contains the React project files.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

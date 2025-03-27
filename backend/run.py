import os
import sys
try:
    import uvicorn
except ImportError:
    print("ERROR: uvicorn not found. Please install it with:")
    print("pip install uvicorn")
    sys.exit(1)
try:
    from dotenv import load_dotenv
except ImportError:
    print("ERROR: python-dotenv not found. Please install it with:")
    print("pip install python-dotenv")
    sys.exit(1)
load_dotenv()
if not os.path.exists("app") or not os.path.exists("app/main.py"):
    print("ERROR: app/main.py not found. Make sure you're running this script from the backend directory.")
    print("Current directory:", os.getcwd())
    sys.exit(1)
def main():
    print("Starting QuickRecap backend server...")
    port = int(os.getenv("PORT", 5000))
    host = os.getenv("HOST", "0.0.0.0")
    print(f"API will be available at http://{host}:{port}")
    print("Press CTRL+C to exit")
    uvicorn.run("app.main:app", host=host, port=port, reload=True)
if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"ERROR: {e}")
        sys.exit(1) 
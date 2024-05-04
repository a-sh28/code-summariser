from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

MYSQL_USER = 'root'
MYSQL_PASSWORD = 'root'
MYSQL_HOST = 'localhost'
MYSQL_DATABASE = 'code_summarizer'
DB_LEN = 1

def get_db_connection():
    # Establish a connection to the MySQL database
    conn = mysql.connector.connect(
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        host=MYSQL_HOST,
        database=MYSQL_DATABASE
    )
    return conn

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/usernames', methods=['GET'])
def get_usernames():
    search_term = request.args.get('search')
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT user_username FROM user_data')
    usernames = cursor.fetchall()
    usernames = [row[0] for row in usernames] # Extract usernames from query result
    print(usernames)
    conn.close()

    filtered_usernames = [username for username in usernames if username.startswith(search_term)]
    print(filtered_usernames)
    return jsonify(filtered_usernames)

# Mock category data
categories = ['Software Developer',
    'Business Intelligence Engineer',
    'Business Analyst',
    'Data Scientist',
    'Machine Learning Engineer',
    'AI Engineer',
    'Student',
    'Other']

@app.route('/api/categories', methods=['GET'])
def get_categories():
    return jsonify(categories)

@app.route('/api/singleUserEval', methods=['GET'])
def get_single_user_eval():
    search_term = request.args.get('search')
    conn = get_db_connection()
    cursor = conn.cursor()
    sql_query = """
    SELECT code_summary.*
    FROM code_summary
    JOIN user_data ON code_summary.user_id = user_data.user_id
    WHERE user_data.user_username = %s
    """
    cursor.execute(sql_query, (search_term,))
    rows = cursor.fetchall()

    naturalness = 0
    usefulness = 0
    consistency = 0
    count = 0
    for row in rows:
        naturalness += row[3]
        usefulness += row[4]
        consistency += row[5]
        count += 1
    data = { "naturalness" : naturalness,
             "usefulness" : usefulness,
             "consistency" : consistency,
             "count" : count}
    return jsonify(data)
    conn.close()

@app.route('/api/allUsersEval', methods=['GET'])
def get_all_users_eval():
    search_term = request.args.get('search')
    conn = get_db_connection()
    cursor = conn.cursor()
    sql_query = """
    SELECT * FROM code_summary
    """
    cursor.execute(sql_query)
    rows = cursor.fetchall()

    naturalness = 0
    usefulness = 0
    consistency = 0
    count = 0
    for row in rows:
        naturalness += row[3]
        usefulness += row[4]
        consistency += row[5]
        count += 1
    data = { "naturalness" : naturalness,
             "usefulness" : usefulness,
             "consistency" : consistency,
             "count" : count}
    return jsonify(data)
    conn.close()

@app.route('/api/categoryUsersEval', methods=['GET'])
def get_category_user_eval():
    search_term = request.args.get('search')
    conn = get_db_connection()
    cursor = conn.cursor()
    sql_query = """
    SELECT code_summary.*
    FROM code_summary
    JOIN user_data ON code_summary.user_id = user_data.user_id
    WHERE user_data.user_category = %s
    """
    cursor.execute(sql_query, (search_term,))
    rows = cursor.fetchall()

    naturalness = 0
    usefulness = 0
    consistency = 0
    count = 0
    for row in rows:
        naturalness += row[3]
        usefulness += row[4]
        consistency += row[5]
        count += 1
    data = { "naturalness" : naturalness,
             "usefulness" : usefulness,
             "consistency" : consistency,
             "count" : count}
    conn.close()
    return jsonify(data)
    

@app.route('/api/addAdmin', methods=['POST'])
def post_add_admin():
    global DB_LEN
    admin_data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    admin_password = admin_data["admin_password"]
    admin_username = admin_data["admin_username"]
    query = f'INSERT INTO admin_data(admin_username,admin_password) VALUES("{admin_username}", "{admin_password}")'
    DB_LEN += 1
    cursor.execute(query)
    conn.commit() 
    print(query)
    data = { "new_admin" : admin_username}
    conn.close()
    return jsonify(data)

@app.route('/api/adminData', methods=['GET'])
def get_admin_data():
    search_term = request.args.get('search')
    conn = get_db_connection()
    cursor = conn.cursor()
    query = f'SELECT * FROM admin_data where admin_id = {search_term}'
    print(query)
    cursor.execute(query)
    rows = cursor.fetchall()
    row = rows[0]
    data = { "admin_username" : row[1],
             "admin_password" : row[2]}

    return jsonify(data)

@app.route('/api/translate', methods=['POST'])
def translate():
    data = request.json
    summary = data.get('summary', '')
    target_language = data.get('targetLanguage', 'en')

    translator = Translator()
    translated_summary = translator.translate(summary, dest=target_language).text

    return jsonify({'translatedSummary': translated_summary})

# Dummy data for demonstration
code_summaries = [
    {"id": 1, "summary": "This is a summary for code 1"},
    {"id": 2, "summary": "This is a summary for code 2"},
    {"id": 3, "summary": "This is a summary for code 3"}
]

@app.route('/api/codeSummaries')
def get_code_summaries():
    return jsonify(code_summaries)

# Define the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/api/uploadSingleFile', methods=['POST'])
def upload_single_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'success': f'File {filename} uploaded successfully'}), 200

@app.route('/api/uploadMultipleFiles', methods=['POST'])
def upload_multiple_files():
    uploaded_files = request.files.getlist('files')
    for file in uploaded_files:
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

    for file in uploaded_files:
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

    return jsonify({'success': 'All files uploaded successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

MYSQL_USER = 'root'
MYSQL_PASSWORD = 'root'
MYSQL_HOST = 'localhost'
MYSQL_DATABASE = 'code_summarizer'

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
    return jsonify(data)
    conn.close()

@app.route('/api/addAdmin', methods=['POST'])
def post_add_admin():
    admin_data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    admin_id = admin_data["admin_id"]
    admin_password = admin_data["admin_password"]
    admin_username = admin_data["admin_username"]
    query = f'INSERT INTO admin_data VALUES({admin_id}, {admin_username}, {admin_password})'
    cursor.execute(query)
    conn.commit()
    conn.close()

@app.route('/api/accountSettings', methods=['POST'])
def post_account_settings():
    admin_data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    #To be implemented
    conn.commit()
    conn.close()

if __name__ == '__main__':
    app.run(debug=True)

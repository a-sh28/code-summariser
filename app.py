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

import requests
@app.route('/api/submitFeedback', methods=['POST'])
def submit_feedback():
    try:
        feedback_data = request.json
        # Dummy user_id for testing
        user_id = 1
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO code_summary (user_id, summary, naturalness, usefulness, consistency, feedback) VALUES (%s, %s, %s, %s, %s, %s)",
                    (user_id, feedback_data['summary'], feedback_data['naturalness'], feedback_data['usefulness'], feedback_data['consistency'], feedback_data['additional']))
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify(message='Feedback submitted successfully'), 201
    except Exception as e:
        return jsonify(error='Failed to submit feedback'), 500



if __name__ == '__main__':
    app.run(debug=True)

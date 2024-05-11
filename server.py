
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import mysql.connector
import random
import string
from flask_mail import Mail, Message
import pprint
#import google.generativeai as palm

app = Flask(__name__)
CORS(app, methods=["GET", "POST"])

MYSQL_USER = 'root'
MYSQL_PASSWORD = 'root'
MYSQL_HOST = 'localhost'
MYSQL_DATABASE = 'code_summarizer'
DB_LEN = 1 

def get_db_connection():
    conn = mysql.connector.connect(
        user=MYSQL_USER,
        password=MYSQL_PASSWORD,
        host=MYSQL_HOST,
        database=MYSQL_DATABASE
    )
    return conn

@app.route('/')
def index():
    return 'Hello, world!'

@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        first_name = data.get('firstName')
        last_name = data.get('lastName')
        profession = data.get('profession')
        username= data.get('username')

        if not email or not password or not first_name or not last_name or not profession:
            return jsonify({"error": "All fields are required"}), 4

        conn = get_db_connection()
        cursor = conn.cursor()
        query = "INSERT INTO user_data (user_username, user_password,user_category,user_email,user_firstname,user_lastname) VALUES (%s, %s, %s, %s, %s,%s)"
        cursor.execute(query, (username, password,profession,email,first_name,last_name))
        conn.commit()
        cursor.close()

        return jsonify({"message": "Signup successful"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/signin', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

        conn = get_db_connection()
        cursor = conn.cursor()
        query = "SELECT * FROM admin_data WHERE admin_username = %s AND admin_password = %s"
        cursor.execute(query, (username, password))
        admin = cursor.fetchone()
        if admin:
            adminid= admin[0]
            return jsonify({"message": "Admin login successful", "role": "admin","adminid":adminid}), 200
        query = "SELECT * FROM user_data WHERE user_username = %s AND user_password = %s"
        cursor.execute(query, (username, password))
        user = cursor.fetchone()
        if user:
            userid=user[0]
            return jsonify({"message": "User login successful", "role": "user","userid":userid}), 200
        else:
            return jsonify({"error": "User account does not exist"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route('/api/sendpassword', methods=['POST'])
def forgot_password():
    try:
        data = request.json
        email = data.get('email')
        conn = get_db_connection()
        cursor = conn.cursor()
        query = "SELECT * FROM user_data WHERE user_email = %s"
        cursor.execute(query, (email,))
        res = cursor.fetchone()
        print("res:",res)
        if res:
            app.config['MAIL_SERVER'] = 'smtp.gmail.com'
            app.config['MAIL_PORT'] = 465
            app.config['MAIL_USERNAME'] = 'code.summariser@gmail.com' 
            app.config['MAIL_PASSWORD'] = 'jopb flsr kjsn bjfa'        
            app.config['MAIL_USE_TLS'] = False
            app.config['MAIL_USE_SSL'] = True
            mail = Mail(app)
            random_string = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(5))
            query = "INSERT INTO verification_code (code, user_email) VALUES (%s, %s) ON DUPLICATE KEY UPDATE code = VALUES(code);"
            cursor.execute(query,(random_string,email))
            conn.commit()
            msg = Message('Change password request - Code Summariser Tool', sender='code.summariser@gmail.com', recipients=[email])
            msg.body = "Hello there! \n Enter this code - {} in the page for us to verify your account.\n After successful verification, you can change your password.".format(random_string)
            mail.send(msg)

            return jsonify({"success":True}), 200
       
        else:
            return jsonify({"error":"User not found"}), 404         

    except Exception as e:
        return jsonify({"error": str(e)}), 500 
@app.route('/api/checkpassword',methods=['POST'])
def checkpassword():
    try:
        data = request.json
        code_entered = data.get('password')
        email = data.get("email")
        if not email or not code_entered:
            return jsonify({"error": "Email and password are required as query parameters"}), 400
        conn = get_db_connection()
        query = "Select code from verification_code where user_email = %s"
        cursor = conn.cursor()
        cursor.execute(query,(email,))
        res = cursor.fetchone()
        print(res)
        if(res and res[0] == code_entered):
            return jsonify({"success":True}), 200
        else:
            return jsonify({"error":"Password not matching"}), 403      
    except Exception as e:
        return jsonify({"error": str(e)}), 500 

@app.route('/api/usernames', methods=['GET'])
def get_usernames():
    try:
        search_term = request.args.get('search')
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT user_username FROM user_data')
        usernames = cursor.fetchall()
        usernames = [row[0] for row in usernames] 
        print(usernames)
        conn.close()
        filtered_usernames = [username for username in usernames if username.startswith(search_term)]
        if filtered_usernames:
            print(filtered_usernames)
            return jsonify(filtered_usernames)
        else:
            print("no filtered usernames")
    except Exception as e:
        return jsonify({"error": str(e)}), 500


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

app.route('/api/updateAdminPassword', methods=['POST'])
def post_update_password():
    # Extract adminId and newPassword from the request body
    admin_id = request.json.get('adminId')
    new_password = request.json.get('newPassword')

    conn = get_db_connection()
    cursor = conn.cursor()
    query = f'UPDATE admin_data SET admin_password = "{new_password}" WHERE admin_id = {admin_id}';
    cursor.execute(query)
    conn.commit()
    conn.close()
    # Send a response back
    return jsonify({'message': 'Password updated successfully'})

@app.route("/api/savepassword",methods=['POST'])
def savepassword():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('newPassword')
        if not email or not password:
            return jsonify({"error":"Email or password not found"}),400
        conn = get_db_connection()
        query = "update user_data set user_password = %s where user_email = %s"
        cursor = conn.cursor()
        cursor.execute(query,(password,email))
        res= cursor.fetchone()
        conn.commit()
        return jsonify ({"success":"Password updated"}),200
    except Exception as e:
        return jsonify({"error": str(e)}), 500    
    
@app.route('/api/submitfeedback', methods=['POST'])
def submit_feedback():
    try:
        print("inside feedback")
        data = request.json
        userid=data.get('userid')
        summary = data.get('summary')
        naturalness = data.get('naturalness')
        usefulness = data.get ('usefulness')
        consistency = data.get('consistency')
        feedback = data.get('verbalFeedback')
        print("userid",userid)
        print("summary",summary)
        print("naturalness:",naturalness)
        print("usefulness:",usefulness)
        print("consistency:",consistency)
        print("feedback:",feedback)
        conn = get_db_connection()
        cursor = conn.cursor()
        print("gping to execite query now")
        query = " INSERT INTO code_summary (user_id, summary, naturalness, usefulness, consistency, feedback) VALUES (%s, %s, %s, %s, %s, %s)"
        cursor.execute(query,(userid,summary,naturalness,usefulness,consistency,feedback))
        print("query executed")
        conn.commit()
        return jsonify({"success":"Feedback submitted successfully"}),200
    except Exception as e:
        return jsonify({"error":str(e)}),500
    
@app.route('/api/generatesummary',methods=['POST'])
def generatesummary():
    try:
        print("inside summary")
        data = request.json
        inputcode= data.get('code')
        palm.configure(api_key='AIzaSyBos77hbBdG8OfZ5jMp51SzcZz4LsikS3A')
        models = [m for m in palm.list_models() if 'generateText' in m.supported_generation_methods]
        model = models[0].name
        prompt = '''Summarise the following code. It must be natural, useful and consistent. 
        The summary's should be in bullet points and its length must be proportional to the input code length. 
        It must only exaplain the logic of the code, not the program syntax and semantics. The input code is: {}'''.format(inputcode)
        completion = palm.generate_text(
        model=model,
        prompt=prompt,
        temperature=0.99)
        summary = completion.result
        print(summary)
        if summary:
            return jsonify({"success":"summary generated","summary":summary}),200
        else:
            return jsonify({"error":"summary not generated"}),500
    except Exception as e:
        return jsonify({"error":"try again later"}), 500

@app.route('/api/userData', methods=['GET'])
def get_user_data():
    search_term = request.args.get('search')
    conn = get_db_connection()
    cursor = conn.cursor()
    query = f'SELECT * FROM user_data where user_id = {search_term}'
    print(query)
    cursor.execute(query)
    rows = cursor.fetchall()
    row = rows[0]
    data = { "user_username" : row[4],
             "user_password" : row[5]}
    return jsonify(data)

# @app.route('/api/updateUserPassword', methods=['OPTIONS'])
# def handle_options():
#     # Add CORS headers to the response
#     response = jsonify({"message": "Preflight request received"})
#     response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
#     response.headers.add('Access-Control-Allow-Methods', 'POST')
#     return response

@app.route('/api/updateUserPassword', methods=['POST'])
def post_update_password_user():
    # Extract userId and newPassword from the request body
    user_id = request.json.get('userId')
    new_password = request.json.get('userPassword')

    conn = get_db_connection()
    cursor = conn.cursor()
    query = f'UPDATE user_data SET user_password = "{new_password}" WHERE user_id = {user_id}';
    print(query)
    cursor.execute(query)
    conn.commit()
    conn.close()
    # Send a response back
    return jsonify({'message': 'Password updated successfully'}),200

@app.route('/api/summaries', methods=['GET'])
def get_summaries():
    user_id = request.args.get('userId')

    conn = get_db_connection()
    cursor = conn.cursor()

    # Execute a SELECT query to retrieve summaries for the specified user ID
    query = f'SELECT * FROM code_summary WHERE user_id = {user_id}';
    cursor.execute(query)
    summaries = cursor.fetchall()

    conn.close()

    # Convert the results to a list of dictionaries for JSON serialization
    summaries_data = [{'code_id':row[0], 'summary': row[1], 'naturalness': row[3], 'usefulness': row[4], 'consistency': row[5], 'feedback': row[6]} for row in summaries]
    
    return jsonify(summaries_data)

if __name__ == '__main__':
    app.run(debug=True)

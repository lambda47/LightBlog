from app import app
from app.model.user import User
from getpass import getpass
from werkzeug.security import generate_password_hash


@app.cli.command('add-admin')
def add_admin():
    """添加管理员账户"""
    while True:
        username = input('Please Input the admin user name:')
        if username == '':
            continue
        if User.find_by_username(username) is None:
            break
        else:
            print('\033[31mThis admin user is exist.\033[0m')
    while True:
        password = getpass('Please input the admin password:')
        confirm_password = getpass('Repeat the password:')
        if password != '' and password == confirm_password:
            break
    User.add({
        'username': username,
        'password': generate_password_hash(password),
        'is_active': True,
        'is_admin': True
    })
    print('\033[32mAdmin user create success.\033[0m')

if __name__ == '__main__':
    app.run(debug=True)
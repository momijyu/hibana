from os import environ

from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)

PASSWORD = environ.get("APP_PASSWORD")
if not PASSWORD:
    raise RuntimeError("APP_PASSWORD environment variable is required.")


@app.route("/")
def index():
    return redirect(url_for("login"))


@app.route("/login/")
def login():
    return render_template("login.html")


@app.route("/menu/", methods=["GET", "POST"])
def menu():
    if request.method == "GET":
        return redirect(url_for("login"))

    password = request.form.get("password", "")
    if password == PASSWORD:
        return render_template("hanabi.html")

    return render_template("login.html", error=True)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)

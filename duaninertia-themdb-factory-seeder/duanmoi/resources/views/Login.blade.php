<form action="http://127.0.0.1:8000/api/login" method="post">
    @csrf
    <input type="email" name="email" placeholder="Email">
    <input type="password" name="password" placeholder="Password">
    <input type="submit" value="Login">
</form>